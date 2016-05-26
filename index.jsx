import MineSweeper from 'minesweeper-engine';
import React from 'react';
import ReactDOM from 'react-dom';
import Timer from 'countup-timer';
import TimeFormatUtil from './formatter';
import {EventEmitter} from 'events';
const timer = new Timer();
const PHASE = {
  READY: 'READY',
  PLAYING: 'PLAYING',
  CLEARED: 'CLEARED',
  CABOOM: 'CABOOM'
};

class AppContainer extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      phase: PHASE.READY
    };
    this.timer = new Timer();
    this.emitter = new EventEmitter();
    this.emitter.on('openCell', cell=>{
      if(this.state.phase === PHASE.READY){
        this.timer.start();
        this.state.phase = PHASE.PLAYING;
      }
      if([PHASE.CABOOM, PHASE.CLEARED].indexOf(this._status) !== -1){
        this._reset();
      }
      this._mineSweeperLogic.open(cell.row, cell.col);
    });
  }
  render(){
    return <Field field={this.field} dispatch={this.emitter.emit.bind(this.emitter)} />;
  }
}

class Field extends React.Component {
  constructor(...args) {
    super(...args);
    this._mineSweeperLogic = new MineSweeperLogic();
    const data = this._mineSweeperLogic.getNewField();
    this.state = {
      field: data.field,
      flags: data.flags
    };
    this.emitter = this.props.emitter || new EventEmitter();
    this.emitter.on('change-field', (field, flags) => {
      this.setState({field, flags});
    });
    this.emitter.on('openCell', cell=>{
      const result = this._mineSweeperLogic.open(cell.row, cell.col);
      this.emitter.dispatch('change-field', (result.field, result.flags));
    });
    this.emitter.on('flagCell', cell=>{
      this._mineSweeperLogic.flag(cell.row, cell.col);
    });
  }
  render() {
    return <table data-mine-status={this.props.status}>
    <tbody>
    {this.props.field.map((row, rowNum) =>
                          <tr>
                          {row.map((mineNum, colNum)=>
                                   <Cell
                                   key={rowNum + '_' + colNum}
                                   dispatch={this.props.dispatch}
                                   cell={
                                     {
                                       nabors: mineNum,
                                       flag: this.props.flags[rowNum][colNum],
                                       isOpened: mineNum !== null,
                                       row: rowNum,
                                       col: colNum
                                     }
                                   }/>
                                  )}
                                  </tr>
                         )};
                         </tbody>
                         </table>;
  }
}

class Cell extends React.Component {
  _onOpenCell(){
    this.props.dispatch('openCell', {
      row: this.props.cell.row,
      col: this.props.cell.col
    });
  }
  _onFlagCell(){
    if(this.props.cell.isOpened){
      return;
    }
    this.props.dispatch('flagCell', {
      row: this.props.cell.row,
      col: this.props.cell.col
    });
  }
  _mineNumber(cell){
    if(cell.flag){
      return '\u2690'; // Flag symbol
    }
    if(cell.nabors == 0 || cell.isOpened === false){
      return '　';
    } else {
      return cell.nabors === -1 ? '\ud83d\udca3' : cell.nabors;
    }
  }
  render() {
    const cell = this.props.cell;
    return <td className="cell"
    onClick={this._onOpenCell.bind(this)}
    onContextMenu={this._onOpenCell.bind(this)}
    data-mine-isopened={cell.isOpened}
    data-mine-col={cell.col}
    data-mine-row={cell.row}
    data-mine-num={cell.nabors}
    data-mine-flag={cell.flag}>
    <div>
    {this._mineNumber(cell)}
    </div>
    </td>;
  }
}

class MineSweeperLogic {
  constructor(){
    this._mine = null;
    this._flags = null;
    this._LEVELS = {
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
    };
    this.getNewField();
  }

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
  }

  _rotateFlag(flag){
    return !flag;
  }

  _mixFlag(data){
    return Object.assign(data, {
      flags: this._flags
    });
  }

  getNewField(){
    const level = this._LEVELS.INTERMEDIATE;
    this._mine = new MineSweeper(level.rowNum, level.colNum, level.mineNum);
    this._flags = this._createFlags();
    return this.getField();
  }

  getField(){
    const field = this._mine.getField();
    return this._mixFlag({field: field});
  }

  getRowNum(){
    return this._mine.rowNum;
  }

  getColNum(){
    return this._mine.colNum;
  }

  open(row, col){
    return this._mixFlag(this._mine.open(row, col));
  }

  flag(row, col){
    if(row < 0 || row > this.getRowNum || col < 0 || col > this.getColNum){
      throw new Error('flagging out of bound');
    }
    this._flags[row][col] = this._rotateFlag(this._flags[row][col]);
    return this.getField();
  }
}

const mineSweeperController = {
  _mineSweeperLogic: mineSweeperLogic,
  _status: null,

  _reset: function(){
    this._render(this._mineSweeperLogic.getNewField());
    timer.reset();
    this._status = STATUS.READY;
  },

  '.cell click': function(context, $el) {
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
};

ReactDOM.render(
  <AppContainer/>,
  document.querySelector('.mineSweeperContainer')
);
