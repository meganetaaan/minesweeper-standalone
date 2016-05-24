require('h5');

(function(){
  'use strict';
  const MineSweeper = require('minesweeper-engine');
  const React = require('react');
  const ReactDOM = require('react-dom');
  const Timer = require('countup-timer');
  const timer = new Timer();
  const TimeFormatUtil = require('./formatter');

  const STATUS = {
    READY: 'READY',
    PLAYING: 'PLAYING',
    CLEARED: 'CLEARED',
    CABOOM: 'CABOOM'
  };

  const Field = (props) => {
    return <table className="field" data-mine-status={props.status}>
    <tbody>
    {props.field.map((row, idx) =>
                     <Row key={idx} cells={row} row={idx} flags={props.flagsField[idx]}/>
                    )}
                    </tbody>
                    </table>
  };

  const Row = props => {
    return <tr>
    {props.cells.map((mineNum, idx) =>
                     <Cell key={idx} cell={{
                       nabors: mineNum,
                       flag: props.flags[idx],
                       isOpened: mineNum !== null,
                       row: props.row,
                       col: idx}
                     }/>
                    )}
                    </tr>
  };

  const Cell = props => {
    const cell = props.cell;
    return <td className="cell"
    data-mine-isopened={cell.isOpened}
    data-mine-col={cell.col}
    data-mine-row={cell.row}
    data-mine-num={cell.nabors}
    data-mine-flag={cell.flag}>
    <div>
      {mineNumber(cell)}
    </div>
    </td>
  };

  const mineNumber = function(cell){
    if(cell.flag){
      return '\u2690'; // Flag symbol
    }
    if(cell.nabors == 0 || cell.isOpened === false){
      return '　';
    } else {
      return cell.nabors === -1 ? "\ud83d\udca3" : cell.nabors
    }
  };

  const mineSweeperLogic = {
    _mine: null,
    _flags: null,
    __name: 'minesweeper.mineSweeperLogic',
    __ready: function(){
      this.getNewField();
    },
    _LEVELS: {
      BEGINNER: {
        rowNum: 9,
        colNum: 9,
        mineNum: 10
      },
      INTERMEDIATE: {
        rowNum: 16,
        colNum: 16,
        mineNum: 40
      },
      EXPERT: {
        rowNum: 30,
        colNum: 16,
        mineNum: 99
      }
    },

    _createFlags(){
      const flags = [];
      const rowNum = this.getRowNum();
      const colNum = this.getColNum();
      for(let i = 0; i < rowNum; i++){
        flags.push([]);
        for(let j = 0; j < colNum; j++){
          flags[i].push(false);
        }
      }
      return flags;
    },

    _rotateFlag(flag){
      return !flag;
    },

    _mixFlag(data){
      return jQuery.extend(data, {
        flags: this._flags
      });
    },

    getNewField: function(){
      const level = this._LEVELS.INTERMEDIATE;
      this._mine = new MineSweeper(level.rowNum, level.colNum, level.mineNum);
      this._flags = this._createFlags();
      return this.getField();
    },

    getField: function(){
      const field = this._mine.getField();
      return this._mixFlag({field: field});
    },

    getRowNum: function(){
      return this._mine.rowNum;
    },

    getColNum: function(){
      return this._mine.colNum;
    },

    open: function(row, col){
      return this._mixFlag(this._mine.open(row, col));
    },

    flag: function(row, col){
      if(row < 0 || row > this.getRowNum || col < 0 || col > this.getColNum){
        throw new Error('flagging out of bound');
      }
      this._flags[row][col] = this._rotateFlag(this._flags[row][col]);
      return this.getField();
    }
  };

  const mineSweeperController = {
    __name: 'minesweeper.mineSweeperController',
    _mineSweeperLogic: mineSweeperLogic,
    _status: null,

    _render: function(data){
      ReactDOM.render(
        <Field status={data.status} field={data.field} flagsField={data.flags}/>,
          this.$find('.fieldContainer').get(0)
      );
    },

    __ready: function(){
      this._render(this._mineSweeperLogic.getField());
      this._status = STATUS.READY;
    },

    _reset: function(){
      this._render(this._mineSweeperLogic.getNewField());
      timer.reset();
      this._status = STATUS.READY;
    },

    '.cell click': function(context, $el) {
      if(this._status === STATUS.READY){
        timer.start();
        this._status = STATUS.PLAYING;
      }
      if([STATUS.CABOOM, STATUS.CLEARED].indexOf(this._status) !== -1){
        this._reset();
      } else if($el.attr('data-mine-flag') === 'true'){
        return;
      } else {
        const row = Number($el.attr('data-mine-row'));
        const col = Number($el.attr('data-mine-col'));
        const result = this._mineSweeperLogic.open(row, col);

        if(result.status === 'ERROR'){
          this.log.error(result.message);
          return;
        } else if(result.status === 'CLEARED'){
          this._status = STATUS.CLEARED;
          timer.stop();
        } else if(result.status === 'CABOOM'){
          this._status = STATUS.CABOOM;
          timer.stop();
        }
        this._render(result);
      }
    },

    '.cell contextmenu': function(context, $el) {
      context.event.preventDefault();
      const isOpened = $el.attr('data-mine-isopened') === 'true';
      if(isOpened || this._isCaboom){
        return;
      } else { 
        const row = Number($el.attr('data-mine-row'));
        const col = Number($el.attr('data-mine-col'));
        this._render(this._mineSweeperLogic.flag(row, col));
      }
    }
  };

  jQuery(function() {
    h5.core.controller('#mineSweeperContainer', mineSweeperController)
  });

  const TimerCount = props => {
    return <div className="timer">
      {TimeFormatUtil.formatTimeString(props.milliseconds)}
      {TimeFormatUtil.formatMsecString(props.milliseconds)}
  </div>
  };

  const timerController = {
    __name: 'minesweeper.TimerController',
    _render: function(data){
      ReactDOM.render(
        <TimerCount milliseconds={data.milliseconds}/>,
          this.rootElement
      );
    },

    __ready: function(){
      const timerDom = document.createElement('div');
      timerDom.setAttribute('class', 'timer');
      this.rootElement.appendChild(timerDom)
      this._render({milliseconds: 0});

      timer.on('start', data => {
        this._render(data);
      });
      timer.on('reset', data => {
        this._render(data);
      });
      timer.on('frame', data => {
        this._render(data);
      });
    }
  }

  jQuery(function() {
    h5.core.controller('.timerContainer', timerController)
  });

})();
