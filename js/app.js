define(['jquery', 'box2dweb', 'easeljs', 'utils', 'models/level-model'], 
  function ($, Box2D, createjs, utils, Level) {
    'use strict';

    var app = {};

    app.init = function () {

      utils.setUpApp();
      utils.setUpPhysics();

      this.levelOne();

    };

    app.levelOne = function () {
      var level = new Level();
      level.commands = [
        {command: 'walk right', position: 'fixed', seconds: 3}
      ];
      level.pieces = ['normal'];
      level.startPos.x = 290;
      level.startPos.y = 290;
      level.finishPos.x = 690;
      level.finishPos.y = 465;
      level.init();
    };

    return app;

});