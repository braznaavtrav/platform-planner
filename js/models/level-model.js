define(['jquery', 'easeljs', 'utils', 'models/piece-model', 'models/character-model'], 
  function ($, createjs, utils, Piece, Character) {
    'use strict';

    var Level = function () {
      this.startPos = {};
      this.finishPos = {};

      this.init = function () {
        var self = this;

        // place start
        self.startPiece = new Piece(self.startPos, 'start');
        // place finish
        self.finishPiece = new Piece(self.finishPos, 'finish');

        // set up commands
        self.commandBox = [];
        for (var i = 0; i < self.commands.length; i++) {
          console.log(self.commands[i].command);
          self.commandBox[i] = new createjs.Text(self.commands[i].command.toUpperCase(), '800 13px Avenir', '#1B1464');
          self.commandBox[i].x = 70;
          self.commandBox[i].y = 30 * i + 50;
          self.commandBox[i].textAlign = 'center';
          utils.stage.addChild(self.commandBox[i]);
        };

        // set up pieces

        // place character
        self.character = new Character();
        self.placeCharacter(self.character);

        // set eventlisteners
      },

      this.placeCharacter = function () {
        console.log('placeCharacter', self.character);
      }
    };

    return Level;

});