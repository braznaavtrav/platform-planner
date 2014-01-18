// This require.config block is optimized by r.js, no logic or external variables can go in here

require.config({
    shim: {
      // underscore: {
      //   exports: '_'
      // },
      // backbone: {
      //   deps: ["underscore", "jquery"],
      //   exports: "Backbone"
      // },
      // bootstrap: {
      //   deps: ["jquery"],
      // }
      // newton: {
      //   exports: 'Newton'
      // }
      box2dweb: {
        exports: 'Box2D'
      }
    },
    baseUrl: 'js/',
    // packages: [
    //   {
    //     name: 'physicsjs',
    //     location: 'lib/physicsjs/dist',
    //     main: 'physicsjs-0.5.3.min'
    //   }
    // ],
    paths: {
      //'backbone': 'backbone-1.0.0',
      'jquery': 'lib/jquery-1.10.2',
      // 'newton': 'lib/newton-0.0.4'
      'box2dweb': 'lib/box2dweb',
      'easeljs': 'lib/easeljs-0.7.1.min'
    },
    config: {}
});

require(['jquery', 'box2dweb', 'easeljs'], 
  function ($, Box2D) {
    'use strict';
    
    var box2d = {
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

    var SCALE = 30,
        stage,
        world;

    stage = new createjs.Stage(document.getElementById('display'));

    setUpPhysics();

    createjs.Ticker.addListener(this);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.useRAF = true;

    function setupPhysics() {
      // create world
      world = new box2d.b2World(new box2d.b2Vec2(0, 50), true);

      // create ground
      var fixDef = new box2d.b2FixtureDef();
      fixDef.density = 1;
      fixDef.friction = 0.5;
      var bodyDef = new box2d.b2BodyDef();
      bodyDef.type = box2d.b2Body.b2_staticBody;
      bodyDef.position.x = 400 / SCALE;
      bodyDef.position.y = 600 / SCALE;
      fixDef.shape = new box2d.b2PolygonShape();
      fixDef.shape.SetAsBox(400 / SCALE, 10 / SCALE);
      world
        .CreateBody(bodyDef)
        .CreateFixture(fixDef);

      // setup debug draw
      var debugDraw = new box2d.b2DebugDraw();
      debugDraw.SetSprite(stage.canvas.getContext('2d'));
      debugDraw.SetDra
    }

    function tick() {

    }

  }
);