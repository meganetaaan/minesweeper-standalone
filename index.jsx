import MineSweeper from 'minesweeper-engine';
import React from 'react';
import ReactDOM from 'react-dom';
import Timer from 'countup-timer';
import TimeFormatUtil from './formatter';
import {EventEmitter} from 'events';

const PHASE = {
  READY: 'READY',
  PLAYING: 'PLAYING',
  CLEARED: 'CLEARED',
  CABOOM: 'CABOOM'
};

const mineNumColor = {
  1: '#1976D2',
  2: '#388E3C',
  3: '#D32F2F',
  4: '#283593',
  5: '#5D4037',
  6: '#0097A7',
  7: '#7B1FA2',
  8: '#212121'
};

const style = {
  title: {
    flex: 3,
    marginLeft: '40px',
    fontSize: '1.2em',
    color: '#FAFAFA'
  },
  appContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
    fontFamily: '"游ゴシック", YuGothic, "Hiragino Kaku Gothic ProN", "Hiragino Kaku Gothic Pro", "ＭＳ ゴシック", sans-serif'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '42px',
    marginBottom: '4px',
    fontSize: '1.1em',
    backgroundColor: '#BF360C',
    boxShadow: '0 0 4px rgba(0,0,0,.7),0 2px 4px rgba(0,0,0,.14)',
    zIndex: 2
  },
  levelSelect: {
    flex: 1,
    textAlign: 'center'
  },
  flagAndMineCount: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FAFAFA'
  },
  timer: {
    flex: 1,
    width: '200px',
    height: '1.4em',
    fontSize: '1.1em',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FAFAFA'
  },
  field: {
    flex: 1,
    width: 'calc(100vmin - 48px)',
    height: 'calc(100vmin - 48px)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    textAlign: 'center',
    fontSize: '1.2em',
    borderCollapse: 'collapse',
    fontWeight: 'bold',
    tableLayout: 'fixed',
    backgroundColor: '#FAFAFA',
    boxShadow: '0 0 2px rgba(0,0,0,.7),0 2px 4px rgba(0,0,0,.14)'
  },
  cell: {
    color: '#757575',
    border: '1px solid #E0E0E0'
  }
};

class AppContainer extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      level: 'BEGINNER',
      totalMineNum: 0,
      flagNum: 0
    };
    this.emitter = new EventEmitter();
    this.emitter.on('change-field', ({flags, totalMineNum})=>{
      if(totalMineNum){
        this.setState({totalMineNum});
      }
      this.setState({flagNum: this._countFlag(flags)});
    });
  }

  onChangeLevel(e){
    const level = e.target.value;
    this.setState({level: level});
    this.emitter.emit('change-level', level);
  }

  //TODO: make Header Component
  render(){
    return <div>
    <div class={"app-container"}
    style={style.appContainer}>
    <div class={"header"}
    style={style.header}>
    <div style={style.title}>MineSweeper</div>
    <select style={style.levelSelect} onChange={this.onChangeLevel.bind(this)}>
    <option value="BEGINNER">BEGINNER</option>
    <option value="INTERMEDIATE">INTERMEDIATE</option>
    </select>
    <FlagAndMineCount 
    flagNum={this.state.flagNum}
    totalMineNum={this.state.totalMineNum}
    />
    <TimerCount
    emitter={this.emitter}
    />
    </div>
    <Field
    field={this.field}
    emitter={this.emitter}
    dispatch={this.emitter.emit.bind(this.emitter)}
    level={this.state.level} />
    </div>
    </div>;
  }

  _countFlag(flags){
    return flags.reduce((prev, current)=>{
      return prev + current.reduce((prev, current)=>{
        return prev + current;});
    }, 0);
  }
}

class Field extends React.Component {
  constructor(...args) {
    super(...args);
    this._mineSweeperLogic = new MineSweeperLogic();
    this.emitter = this.props.emitter || new EventEmitter;
    this.dispatch = this.props.dispatch;
    this.state = {
      field: [[]],
      flags: [[]],
      phase: PHASE.READY
    };
  }

  componentDidMount(){
    this.emitter.on('change-field', ({field, flags}) => {
      this.setState({field, flags});
    });
    this.emitter.on('change-level', (level)=>{
      this._reset(level);
    });
    this.emitter.on('openCell', cell=>{
      if(this.state.phase === PHASE.READY){
        this.state.phase = PHASE.PLAYING;
        this.dispatch('change-phase', PHASE.PLAYING);
      }
      if([PHASE.CABOOM, PHASE.CLEARED].indexOf(this.state.phase) !== -1){
        this._reset(this.props.level);
        return;
      }
      const result = this._mineSweeperLogic.open(cell.row, cell.col);
      if(result.status === 'ERROR'){
        return;
      } else if(result.status === 'CLEARED'){
        this.state.phase = 'CLEARED';
        this.dispatch('change-phase', PHASE.CLEARED);
      } else if(result.status === 'CABOOM'){
        this.state.phase = 'CABOOM';
        this.dispatch('change-phase', PHASE.CABOOM);
      }
      this.dispatch('change-field', {
        field: result.field,
        flags: result.flags
      });
    });
    this.emitter.on('flagCell', cell=>{
      const result = this._mineSweeperLogic.flag(cell.row, cell.col);
      this.dispatch('change-field', {
        field: result.field,
        flags: result.flags
      });
    });
    const level = this.props.level || 'BEGINNER';
    this._reset(level);
    /*
    const data = this._mineSweeperLogic.getNewField(level);
    this.state = {
      field: data.field,
      flags: data.flags,
      phase: PHASE.READY
    };
    */
  }

  _reset(level){
    const data = this._mineSweeperLogic.getNewField(level);
    this.dispatch('change-field', {
      field: data.field,
      flags: data.flags,
      totalMineNum: this._mineSweeperLogic.getTotalMineNum()
    });
    this.state.phase = PHASE.READY;
    this.dispatch('change-phase', PHASE.READY);
  }

  render() {
    return <table
    style={style.field}
    data-mine-status={this.props.status}>
    <tbody>
    {this.state.field.map(
      (row, rowNum) =>
      <tr key={rowNum}>
      {row.map(
        (mineNum, colNum)=>
        <Cell
        key={rowNum + '_' + colNum}
        dispatch={this.props.dispatch}
        cell={
          {
            mineNum: mineNum,
            flag: this.state.flags[rowNum][colNum],
            isOpened: mineNum !== null,
            row: rowNum,
            col: colNum,
            phase: this.state.phase
          }
        }/>
      )}
      </tr>
    )}
    </tbody>
    </table>;
  }
}

class Cell extends React.Component {
  _onClick(){
    if(this.props.cell.flag){
      return;
    } else {
      this.props.dispatch('openCell', {
        row: this.props.cell.row,
        col: this.props.cell.col
      });
    }
  }
  _onContextMenu(ev){
    ev.preventDefault();
    const phase = this.props.cell.phase;
    if([PHASE.CABOOM, PHASE.CLEARED].indexOf(phase) !== -1 || this.props.cell.isOpened){
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
    if(cell.mineNum == 0 || cell.isOpened === false){
      return '　';
    } else {
      return cell.mineNum === -1 ? '\ud83d\udca3' : cell.mineNum;
    }
  }
  render() {
    const cell = this.props.cell;
    const color = {color: mineNumColor[cell.mineNum]};
    const zeroStyle = cell.isOpened ? {backgroundColor: '#EEEEEE'} : {};
    const mineStyle = cell.mineNum === -1 ? {backgroundColor: '#E64A19', color: '#FAFAFA'} : {};
    const clearedStyle = cell.phase === PHASE.CLEARED && !cell.isOpened ? {backgroundColor: '#00E676', color: '#FAFAFA'} : {};
    const cellStyle = Object.assign({}, style.cell, zeroStyle, color, mineStyle, clearedStyle);
    return <td
    style={cellStyle}
    onClick={this._onClick.bind(this)}
    onContextMenu={this._onContextMenu.bind(this)}
    >
    <div style={{maxHeight: '1.4em', overflow: 'hidden'}}>
    {this._mineNumber(cell)}
    </div>
    </td>;
  }
}

class MineSweeperLogic {
  constructor(){
    this._mine = null;
    this._flags = null;

    // TODO: This should be managed by the engine itself
    this._totalMineNum = null;
    this.LEVELS = {
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
        rowNum: 16,
        colNum: 30,
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

  getNewField(level){
    const lv = (level && this.LEVELS[level] ) || this.LEVELS.INTERMEDIATE;
    this._mine = new MineSweeper(lv.rowNum, lv.colNum, lv.mineNum);
    this._totalMineNum = lv.mineNum;
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

  getTotalMineNum(){
    return this._totalMineNum;
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

class FlagAndMineCount extends React.Component{
  render(){
    return <div className="flagAndMineCount"
    style={style.flagAndMineCount}>
    {'\u2690'}&nbsp;{this.props.flagNum}
    {'/'}
    {'\ud83d\udca3'}&nbsp;{this.props.totalMineNum}
    </div>;
  }
}

class TimerCount extends React.Component{
  constructor(...args){
    super(...args);
    this.state = {
      milliseconds: 0
    };

    this.timer = new Timer();
    this.timer.on('start', data => { this.setState(data); });
    this.timer.on('reset', data => { this.setState(data); });
    this.timer.on('frame', data => { this.setState(data); });

    this.emitter = this.props.emitter;
    this.emitter.on('change-phase', (phase)=> {
      if(phase === PHASE.READY){
        this.timer.reset();
      } else if(phase === PHASE.CLEARED || phase === PHASE.CABOOM){
        this.timer.stop();
      } else if(phase === PHASE.PLAYING){
        this.timer.start();
      }

    });
  }
  render(){
    return <div className="timer"
    style={style.timer}>
    {'\u25F4'}&nbsp;
    {TimeFormatUtil.formatTimeString(this.state.milliseconds)}
    {TimeFormatUtil.formatMsecString(this.state.milliseconds)}
    </div>;
  }
}

ReactDOM.render(
  <AppContainer/>,
  document.querySelector('.mineSweeperContainer')
);
