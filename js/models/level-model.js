define(['jquery', 'easeljs', 'utils', 'models/piece-model', 'models/character-model'], 
  function ($, createjs, utils, Piece, Character) {
    'use strict';

    var Level = function () {
      this.startPos = {};
      this.finishPos = {};

      this.init = function () {
        var self = this;

        // PLACE START
        self.startPiece = new Piece(self.startPos, 'start');

        // PLACE FINISH
        self.finishPiece = new Piece(self.finishPos, 'finish');

        // SET UP COMMANDS
        self.commandBox = [];
        self.commandTimeSeconds = 0;
        for (var i = 0; i < self.commands.length; i++) {
          self.commandBox[i] = new createjs.Text(self.commands[i].command.toUpperCase(), '800 13px Avenir', '#1B1464');
          self.commandBox[i].x = 70;
          self.commandBox[i].y = 30 * i + 50;
          self.commandBox[i].textAlign = 'center';
          utils.stage.addChild(self.commandBox[i]);

          self.commandTimeSeconds += self.commands[i].seconds;
        };

        // SET UP PIECES

        // PLACE CHARACTER
        self.character = new Character();

        // ADD RUN BUTTON
        self.goButton = {};
        self.goButton.w = 143;
        self.goButton.h = 78;
        self.goButton.shape = new createjs.Shape();
        self.goButton.shape.graphics.beginFill("#88FF4C").beginStroke('#fff').drawRect(0, 700, self.goButton.w, self.goButton.h);
        self.goButton.text = new createjs.Text('RUN', '800 33px Avenir', '#fff');
        self.goButton.text.x = self.goButton.w / 2;
        self.goButton.text.y = 700 + ((self.goButton.h - 33) / 2);
        self.goButton.text.textAlign = 'center';
        utils.stage.addChild(self.goButton.shape, self.goButton.text);

        // SET EVENT LISTENERS
        self.goButton.shape.addEventListener( 'click', function (e) {
          if (self.running) {
            self.running = false;
            self.goButton.text.text = 'RUN';
            self.goButton.shape.graphics.beginFill('#88FF4C').drawRect(0, 700, self.goButton.w, self.goButton.h);
          }
          else {
            self.running = true;
            self.goButton.text.text = 'RESET';
            self.goButton.shape.graphics.beginFill('#f00').drawRect(0, 700, self.goButton.w, self.goButton.h);
            self.run();
          }
        });

      };

      this.run = function () {
        var self = this;

        // Todo: this for loop / setTimeout needs to be refactored,
        //       probably using recursion.
        for (var i = 0; i < self.commands.length; i++) {
          self.character.performCommand(self.commands[i].command);
          setTimeout( function () {
            if (i === self.commands.length - 1) {
              return;
            }
          }, self.commands[i].seconds * 1000);
        };
        setTimeout( function () {
          self.character.performCommand('stand right');
        }, self.commandTimeSeconds * 1000);
      };
    };

    return Level;

});