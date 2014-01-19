define(['jquery', 'models/piece-model'], 
  function ($, Piece) {
    'use strict';

    var Level = function () {
      this.startPos = {};
      this.finishPos = {};

      this.init = function () {
        var self = this,
            startPiece,
            finishPiece;

        // place start
        startPiece = new Piece(self.startPos, 'start');
        // place finish
        finishPiece = new Piece(self.finishPos, 'finish');
        // set up commands
        // set up pieces
        // place character
        // set eventlisteners
      }
    };

    return Level;

});