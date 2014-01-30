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

        self.illegalPiecePlacement = function (e) {
          console.log(e);
          var tl = {
                x: e.target.x, 
                y: e.target.y 
              },
              br = {
                x: e.target.x + (e.rawX - e.target.x),
                y: e.target.y + (e.rawY - e.target.y)
              };

          for (var i = utils.stage.collisionAABB.list.length - 1; i >= 0; i--) {
            if (!(br.x < utils.stage.collisionAABB.list[i].tl.x || utils.stage.collisionAABB.list[i].br.x < tl.x || br.y < utils.stage.collisionAABB.list[i].tl.y || utils.stage.collisionAABB.list[i].br.y < tl.y)) {
              return true;
            }
          };
          return false;
        };

        // SET UP PIECES
        self.pieceBox= [];
        for (var i = 0; i < self.pieces.length; i++) {
          var index = i;
          self.pieceBox[index] = new createjs.Bitmap('../img/piece-' + self.pieces[index] + '.png');
          self.pieceBox[index].name = self.pieces[index];
          self.pieceBox[index].setTransform(10, 40 * index + 440, 0.7, 0.7);
          utils.stage.addChild(self.pieceBox[index]);

          self.pieceBox[index].on("pressmove", function(e) {
            var scale = 1,
                pB = this;

            // create ghost
            if (!pB.hasGhost) {
              pB.ghost = new createjs.Shape();
              pB.ghost.graphics.beginFill("rgba(0,0,0,0.1)").drawRect(10, 40 * index + 440, 123.2, 31.5);
              utils.stage.addChildAt(pB.ghost, 1);
              pB.hasGhost = true;
            }

            if (pB.piece) {
              pB.piece.remove();
            }

            if (e.stageX < 140) {
              scale = 0.7;
            }

            pB.setTransform(e.stageX - 88, e.stageY - 22, scale, scale);
          });

          self.pieceBox[index].on("pressup", function(e) {
            var pB = this,
                scale = 1;

            // if in illegal place
            // return to start
            if (e.stageX < 140 || self.illegalPiecePlacement(e)) {
              scale = 0.7;
              pB.setTransform(10, 40 * index + 440, 0.7, 0.7);
            }
            // else make piece
            else {
              pB.piece = new Piece({x: e.stageX, y: e.stageY}, e.target.name);
            }
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
        // TODO: remove editing event listeners
        self.character.performCommand(self.commands);
      };
    };

    return Level;

});