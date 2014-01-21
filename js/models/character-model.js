define(['jquery', 'easeljs', 'utils'], 
  function ($, createjs, utils) {
    'use strict';

    var Character = function () {
      var self = this,
          width = 100,
          height = 171;

      // create dynamic body

      // create spritesheet
      self.spriteSheet = new createjs.SpriteSheet({
        images: ['../img/character-sprite.png'],
        frames: {
          width: width,
          height: height,
          regX: width/2,
          regY: height/2
        },
        animations: {
          'stand right': [0],
          'stand left': [1],
          'walk right': {
            frames: [2, 0, 4, 0],
            speed: 0.1
          },
          'walk left': {
            frames: [3, 1, 5, 1],
            speed: 0.1
          } 
        }
      });

      // attach spritesheet to dynamic body
      var fixDef = new utils.box2d.b2FixtureDef();
      fixDef.density = 1;
      fixDef.friction = 0.2;
      fixDef.restitution = 0.2;
      var bodyDef = new utils.box2d.b2BodyDef();
      bodyDef.type = utils.box2d.b2Body.b2_dynamicBody;
      bodyDef.position.x = 250 / utils.SCALE;
      bodyDef.position.y = 10 / utils.SCALE;
      fixDef.shape = new utils.box2d.b2PolygonShape();
      fixDef.shape.SetAsBox(width/2/utils.SCALE, height/2/utils.SCALE);
      self.body = utils.world.CreateBody(bodyDef);
      self.body.CreateFixture(fixDef);
      
      self.setTick = function () {
        var self = this;
        self.animation.on('tick', function (e) {
          self.animation.x = self.body.GetPosition().x * utils.SCALE;
          self.animation.y = self.body.GetPosition().y * utils.SCALE + 12;
          self.animation.rotation = self.body.GetAngle() * (180/Math.PI);
        });
      };

      self.walkRightTick = function () {
        var self = this,
            velocity = self.body.GetLinearVelocity();

        velocity.x = 40;

        self.body.SetLinearVelocity(velocity);

        self.animation.on('tick', function (e) {
          self.animation.x = self.body.GetPosition().x * utils.SCALE;
          self.animation.y = self.body.GetPosition().y * utils.SCALE + 12;
          self.animation.rotation = self.body.GetAngle() * (180/Math.PI);
        });
      };

      self.performCommand = function (command) {
        var self = this;
        if (self.animation) {
          utils.stage.removeChild(self.animation);
        }
        self.animation = new createjs.Sprite(self.spriteSheet, command);
        utils.stage.addChild(self.animation);
        if (command === 'walk right') {
          self.walkRightTick();
        }
        else {
          self.setTick();
        }
      };

      self.performCommand('stand right');

    };

    return Character;

});