define(['jquery', 'easeljs', 'utils'], 
  function ($, createjs, utils) {
    'use strict';

    var Character = function () {
      var self = this,
          width = 100,
          height = 171;

      self.walkSpeed = 5;

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
          },
          'jump right start': {
            frames: [6],
            speed: 0.04
          },
          'jump right': {
            frames: [8]
          },
          'jump left start': {
            frames: [7],
            speed: 0.04
          },
          'jump left': {
            frames: [9]
          },

        }
      });

      self.animation = new createjs.Sprite(self.spriteSheet, 'stand right');
      self.animation.on('complete', function (a, b) {
        console.log(a, b);
      });
      utils.stage.addChild(self.animation);

      // attach spritesheet to dynamic body
      var fixDef = new utils.box2d.b2FixtureDef();
      fixDef.density = 1;
      fixDef.friction = 0;
      fixDef.restitution = 0.2;
      var bodyDef = new utils.box2d.b2BodyDef();
      bodyDef.type = utils.box2d.b2Body.b2_dynamicBody;
      bodyDef.position.x = 250 / utils.SCALE;
      bodyDef.position.y = 10 / utils.SCALE;
      fixDef.shape = new utils.box2d.b2PolygonShape();
      fixDef.shape.SetAsBox(width/2/utils.SCALE, height/2/utils.SCALE);
      self.body = utils.world.CreateBody(bodyDef);
      self.body.CreateFixture(fixDef);

      self.animation.on('tick', function (e) {
        self.animation.x = self.body.GetPosition().x * utils.SCALE;
        self.animation.y = self.body.GetPosition().y * utils.SCALE + 12;
        self.body.SetAngle(0);
        self.animation.rotation = self.body.GetAngle() * (180/Math.PI);
      });

      self.stand = function () {
        var self = this,
            velocity = self.body.GetLinearVelocity();

        velocity.x = 0;

        self.body.SetLinearVelocity(velocity);
      };

      self.walkRight = function () {
        var self = this,
            velocity = self.body.GetLinearVelocity();

        velocity.x = self.walkSpeed;

        self.body.SetLinearVelocity(velocity);
      };

      self.walkLeft = function () {
        var self = this,
            velocity = self.body.GetLinearVelocity();

        velocity.x = 0 - self.walkSpeed;

        self.body.SetLinearVelocity(velocity);
      };

      self.jumpRight = function () {
        var self = this,
            velocity = self.body.GetLinearVelocity();

        velocity.x = self.walkSpeed;
        velocity.y = 100;

        self.body.SetLinearVelocity(velocity);
      };

      self.jumpLeft = function () {
        var self = this,
            velocity = self.body.GetLinearVelocity();

        velocity.x = 0 - self.walkSpeed;
        velocity.y = 100;

        self.body.SetLinearVelocity(velocity);
      }

      self.performCommand = function (commands) {
        var self = this;

        self.currentCommand = self.currentCommand ? self.currentCommand : 0;
        if (self.currentCommand < commands.length) {
          
          switch (commands[self.currentCommand].command) {
            case 'walk right':
              self.animation.gotoAndPlay(commands[self.currentCommand].command);
              self.walkRight();
              break;
            case 'walk left':
              self.animation.gotoAndPlay(commands[self.currentCommand].command);
              self.walkLeft();
              break;
            case 'jump left':
              self.animation.gotoAndPlay('jump left start');
              setTimeout( function () {
                self.animation.gotoAndPlay('jump left');
                self.jumpLeft();
              }, 600);
              break;
            case 'jump right':
              self.animation.gotoAndPlay('jump right start');
              setTimeout( function () {
                self.animation.gotoAndPlay('jump right');
                self.jumpRight();
              }, 600);
              break;
            case 'stand left' || 'stand right':
              self.stand();
              break;
          }

          setTimeout( function () {
            self.performCommand(commands)
          }, commands[self.currentCommand].seconds * 1000);

          self.currentCommand += 1;
        }
        else {
          self.animation.gotoAndPlay('stand right');
          self.stand();
        }
      };

      self.remove = function () {
        utils.world.DestroyBody(self.body);
        utils.stage.removeChild(self.animation);
      };

    };

    return Character;

});