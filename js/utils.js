define(['jquery', 'box2dweb', 'easeljs'], 
  function ($, Box2D, createjs) {
    'use strict';

    var utils = {};

    utils.setUpApp = function () {
      var self = this;
      this.box2d = {
        b2Vec2: Box2D.Common.Math.b2Vec2,
        b2BodyDef: Box2D.Dynamics.b2BodyDef,
        b2Body: Box2D.Dynamics.b2Body,
        b2FixtureDef: Box2D.Dynamics.b2FixtureDef,
        b2Fixture: Box2D.Dynamics.b2Fixture,
        b2World: Box2D.Dynamics.b2World,
        b2MassData: Box2D.Collision.Shapes.b2MassData,
        b2PolygonShape: Box2D.Collision.Shapes.b2PolygonShape,
        b2CircleShape: Box2D.Collision.Shapes.b2CircleShape,
        b2DebugDraw: Box2D.Dynamics.b2DebugDraw
      };
      this.SCALE = 30;
      this.stage = new createjs.Stage(document.getElementById('display'));

      this.debug = document.getElementById('debug');

      createjs.Ticker.addEventListener('tick', function() {
        self.tick();
      });

      createjs.Ticker.setFPS(60);
      createjs.Ticker.useRAF = true;

    };

    utils.setUpPhysics = function () {
      var self = this;
      // create world
      this.world = new self.box2d.b2World(new self.box2d.b2Vec2(0, 50), true);

      // create background
      var backgroundImage = new createjs.Bitmap('../img/background.png');
      this.stage.addChild(backgroundImage);

      // create ground
      var fixDef = new self.box2d.b2FixtureDef();
      fixDef.density = 1;
      fixDef.friction = 0.5;
      var bodyDef = new self.box2d.b2BodyDef();
      bodyDef.type = self.box2d.b2Body.b2_staticBody;
      bodyDef.position.x = 1024 / 2 / self.SCALE;
      bodyDef.position.y = (768 / self.SCALE) - (5 / self.SCALE);
      fixDef.shape = new self.box2d.b2PolygonShape();
      fixDef.shape.SetAsBox(1024 / self.SCALE, 10 / self.SCALE);
      this.world
        .CreateBody(bodyDef)
        .CreateFixture(fixDef);

      // setup debug draw
      var debugDraw = new self.box2d.b2DebugDraw();
      debugDraw.SetSprite(debug.getContext('2d'));
      debugDraw.SetDrawScale(self.SCALE);
      debugDraw.SetFlags(self.box2d.b2DebugDraw.e_shapeBit | self.box2d.b2DebugDraw.e_jointBit);
      self.world.SetDebugDraw(debugDraw);
    };

    utils.tick = function () {
      var self = this;
      self.stage.update();
      // uncomment to debug draw
      self.world.DrawDebugData();
      self.world.Step(1/60, 10, 10);
      self.world.ClearForces();
    };

    return utils;

});