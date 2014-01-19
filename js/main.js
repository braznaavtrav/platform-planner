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
      },
      easeljs: {
        exports: 'createjs'
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
  function ($, Box2D, createjs) {
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
        world,
        debug;

    stage = new createjs.Stage(document.getElementById('display'));
    debug = document.getElementById('debug');

    setUpPhysics();

    $('#display').on( 'click', function (e) {
      var b = new Ball();
      console.log(b.view.onTick);
      stage.addChild(b.view);
    });

    createjs.Ticker.addEventListener('tick', function() {
      tick();
    });

    createjs.Ticker.setFPS(60);
    createjs.Ticker.useRAF = true;

    function setUpPhysics() {
      // create world
      world = new box2d.b2World(new box2d.b2Vec2(0, 50), true);

      // create ground
      var fixDef = new box2d.b2FixtureDef();
      fixDef.density = 1;
      fixDef.friction = 0.5;
      var bodyDef = new box2d.b2BodyDef();
      bodyDef.type = box2d.b2Body.b2_staticBody;
      bodyDef.position.x = 1024 / 2 / SCALE;
      bodyDef.position.y = (768 / SCALE) - (5 / SCALE);
      fixDef.shape = new box2d.b2PolygonShape();
      fixDef.shape.SetAsBox(1024 / SCALE, 10 / SCALE);
      world
        .CreateBody(bodyDef)
        .CreateFixture(fixDef);

      // setup debug draw
      var debugDraw = new box2d.b2DebugDraw();
      debugDraw.SetSprite(debug.getContext('2d'));
      debugDraw.SetDrawScale(SCALE);
      debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
      world.SetDebugDraw(debugDraw);
    }

    function tick() {
      stage.update();
      // uncomment to debug draw
      world.DrawDebugData();
      world.Step(1/60, 10, 10);
      world.ClearForces();
    }

    function Ball() {
      this.view = new createjs.Bitmap('../img/dude-test.png');
      this.view.regX = 150;
      this.view.regY = 150;
      var fixDef = new box2d.b2FixtureDef();
      fixDef.density = 1;
      fixDef.friction = 0.5;
      fixDef.restitution = 0.5;
      var bodyDef = new box2d.b2BodyDef();
      bodyDef.type = box2d.b2Body.b2_dynamicBody;
      bodyDef.position.x = Math.random() * 1024 / SCALE;
      bodyDef.position.y = 0;
      fixDef.shape = new box2d.b2CircleShape(150 / SCALE);
      this.view.body = world.CreateBody(bodyDef);
      this.view.body.CreateFixture(fixDef);
      this.view.on('tick', function (e) {
        this.x = this.body.GetPosition().x * SCALE;
        this.y = this.body.GetPosition().y * SCALE;
        this.rotation = this.body.GetAngle() * (180/Math.PI);
      });
    }

  }
);