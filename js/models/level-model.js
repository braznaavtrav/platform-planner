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
        for (var i = 0; i < self.commands.length; i++) {
          self.commandBox[i] = new createjs.Text(self.commands[i].command.toUpperCase(), '800 13px Avenir', '#1B1464');
          self.commandBox[i].x = 70;
          self.commandBox[i].y = 30 * i + 50;
          self.commandBox[i].textAlign = 'center';
          utils.stage.addChild(self.commandBox[i]);
        };

        // SET UP PIECES
        self.pieceBox= [];
        for (var i = 0; i < self.pieces.length; i++) {
          self.pieceBox[i] = new createjs.Bitmap('../img/piece-' + self.pieces[i] + '.png');
          self.pieceBox[i].name = self.pieces[i];
          self.pieceBox[i].setTransform(10, 40 * i + 440, 0.7, 0.7);
          utils.stage.addChild(self.pieceBox[i]);

          self.pieceBox[i].on("pressmove", function(e) {
            this.setTransform(e.stageX - 88, e.stageY - 22, 1, 1);
          });

          self.pieceBox[i].on("pressup", function(e) {
            new Piece({x: e.stageX, y: e.stageY}, e.target.name);
          });
        };

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
            self.character.remove();
            self.character = new Character();
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

        self.character.performCommand(self.commands);
      };
    };

    return Level;

});