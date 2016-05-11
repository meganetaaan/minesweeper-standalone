require('h5');

(function(){
  const mineSweeperLogic = {
    __name: 'minesweeper.mineSweeperLogic'
  };

  const mineSweeperController = {
    __name: 'minesweeper.mineSweeperController',
    _mineSweeperLogic: mineSweeperLogic,
      '#cell click': function() {
        this.$find('#bar').text('yeah');
      }
  };

  jQuery(function() {
    h5.core.controller('#mineSweeperContainer', mineSweeperController)
  });
})();
