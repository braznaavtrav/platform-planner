define(['jquery', 'box2dweb', 'easeljs', 'utils', 'models/level-model'], 
  function ($, Box2D, createjs, utils, Level) {
    'use strict';

    var app = {};

    app.init = function () {

      utils.setUpApp();
      utils.setUpPhysics();

      this.levelOne();

      // $('#display').on( 'mousedown', function (e) {
      //   console.log('ball');
      //   var b = new Ball();
      //   console.log(b.view.onTick);
      //   utils.stage.addChild(b.view);
      // });

      // function Ball() {
      //   this.view = new createjs.Bitmap('../img/dude-test.png');
      //   this.view.regX = 150;
      //   this.view.regY = 150;
      //   var fixDef = new utils.box2d.b2FixtureDef();
      //   fixDef.density = 1;
      //   fixDef.friction = 0.5;
      //   fixDef.restitution = 0.5;
      //   var bodyDef = new utils.box2d.b2BodyDef();
      //   bodyDef.type = utils.box2d.b2Body.b2_dynamicBody;
      //   bodyDef.position.x = Math.random() * 1024 / utils.SCALE;
      //   bodyDef.position.y = 0;
      //   fixDef.shape = new utils.box2d.b2CircleShape(150 / utils.SCALE);
      //   this.view.body = utils.world.CreateBody(bodyDef);
      //   this.view.body.CreateFixture(fixDef);
      //   this.view.on('tick', function (e) {
      //     this.x = this.body.GetPosition().x * utils.SCALE;
      //     this.y = this.body.GetPosition().y * utils.SCALE;
      //     this.rotation = this.body.GetAngle() * (180/Math.PI);
      //   });
      // }

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