require('h5');

(function(){
  'use strict';
  const MineSweeper = require('minesweeper-engine');
  const React = require('react');
  const ReactDOM = require('react-dom');
  const Field = props => {
    return <table className="field">
    <tbody>
    {props.field.map((row, idx) => <Row key={idx} cells={row} row={idx}/>)}
    </tbody>
    </table>
  };

  const Row = props => {
    return <tr>
    {props.cells.map((mineNum, idx) =>
                     <Cell key={idx} cell={{nabors: mineNum, isOpened: mineNum !== null, row: props.row, col: idx}}/>
    )}
    </tr>
  };

  const Cell = props => {
    const cell = props.cell;
    return <td className="cell"
    data-mine-isopened={cell.isOpened}
    data-mine-col={cell.col}
    data-mine-row={cell.row}>
    {cell.isOpened ? cell.nabors : '-'}
    </td>
  };

  const mineSweeperLogic = {
    _mine: null,
    __name: 'minesweeper.mineSweeperLogic',
    __ready: function(){
      this._mine = new MineSweeper(9, 9, 10);
    },

    getField: function(){
      return this._mine.getField();
    },

    open: function(row, col){
      return this._mine.open(row, col);
    }
  };

  const mineSweeperController = {
    __name: 'minesweeper.mineSweeperController',
    _mineSweeperLogic: mineSweeperLogic,

    _render: function(data){
      const field = data.field;
      ReactDOM.render(
        <Field field={field}/>,
          this.$find('.fieldContainer').get(0)
      );
    },

    __ready: function(){
      const field = this._mineSweeperLogic.getField();
      this._render({
        field: field
      });
    },

    '.cell click': function(context, $el) {
      const row = Number($el.attr('data-mine-row'));
      const col = Number($el.attr('data-mine-col'));

      this.log.debug(`opening: ${row}, ${col}`)
      const result = this._mineSweeperLogic.open(row, col);
      this.log.debug(result);
      
      this._render(result);
    }
  };

  jQuery(function() {
    h5.core.controller('#mineSweeperContainer', mineSweeperController)
  });
})();