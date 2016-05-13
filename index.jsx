require('h5');

(function(){
  'use strict';
  const React = require('react');
  const ReactDOM = require('react-dom');

  const ItemList = props => {
    return <ul className="item-list">
    {props.items.map(item => <ItemDetail key={item.id} item={item} />)}
    </ul>;
  };

  const ItemDetail = props => {
    const item = props.item;
    return <li className={'item' + item.stock === 0 ? ' soldout' : ''}>
      <div className="item-name">{item.name}</div>
      <div className="item-price">{item.price}</div>
      <OrderButton />
    </li>
  };

  const OrderButton = props => <button className="orderButton">注文</button>;

  const mineSweeperLogic = {
    __name: 'minesweeper.mineSweeperLogic'
};

  const mineSweeperController = {
    __name: 'minesweeper.mineSweeperController',
    _mineSweeperLogic: mineSweeperLogic,

    __ready: function(){
      const data = {
        items: [
          {
            id: 'item1',
            stock: 1,
            name: 'hoge',
            price: 500
          }
        ]
      };
      ReactDOM.render(
        <ItemList items={data.items} />,
        document.getElementById('container')
      );
    },
    '.orderButton click': function() {
      alert('wow!');
    }
  };

  jQuery(function() {
    h5.core.controller('#mineSweeperContainer', mineSweeperController)
  });
})();
