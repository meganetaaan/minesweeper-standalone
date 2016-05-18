require('h5');

(function(){
  'use strict';
  const MineSweeper = require('minesweeper-engine');
  const React = require('react');
  const ReactDOM = require('react-dom');

  const Field = (props) => {
    return <table className="field">
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
    {mineNumber(cell)}
    </td>
  };

  const mineNumber = function(cell){
    if(cell.flag){
      return '\u2690'; // Flag symbol
    }
    if(cell.nabors == 0 || cell.isOpened === false){
      return '　';
    } else {
      return cell.nabors === -1 ? '!' : cell.nabors
    }
  };

  const mineSweeperLogic = {
    _mine: null,
    _flags: null,
    __name: 'minesweeper.mineSweeperLogic',
    __ready: function(){
      this.getNewField();
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
      this._mine = new MineSweeper(16, 16, 40);
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
    _isCaboomed: false,

    _render: function(data){
      ReactDOM.render(
        <Field field={data.field} flagsField={data.flags}/>,
          this.$find('.fieldContainer').get(0)
      );
    },

    __ready: function(){
      this._render(this._mineSweeperLogic.getField());
    },

    _reset: function(){
      const field =       this._isCaboomed = false;
      this._render(this._mineSweeperLogic.getNewField());
    },

    '.cell click': function(context, $el) {
      if(this._isCaboomed){
        this._reset();
      } else if($el.attr('data-mine-flag') === 'true'){
        return;
      } else {
        const row = Number($el.attr('data-mine-row'));
        const col = Number($el.attr('data-mine-col'));
        const result = this._mineSweeperLogic.open(row, col);
        if(result.status === 'CABOOM'){
          this._isCaboomed = true;
        }
        this._render(result);
      }
    },

    '.cell contextmenu': function(context, $el) {
      context.event.preventDefault();
      const isOpened = $el.attr('data-mine-isopened') === 'true';
      if(isOpened || this._isCaboomed){
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
})();
