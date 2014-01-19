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
        framerate: 5,
        images: ['../img/character-sprite.png'],
        frames: {
          width: width,
          height: height,
          regX: width/2,
          regY: height/2
        },
        animations: {
          standRight: [0],
          standLeft: [1],
          walkRight: [2, 4],
          walkLeft: [3, 5], 
        }
      });

      // attach spritesheet to dynamic body
      var fixDef = new utils.box2d.b2FixtureDef();
      fixDef.density = 1;
      fixDef.friction = 0.5;
      fixDef.restitution = 0.5;
      var bodyDef = new utils.box2d.b2BodyDef();
      bodyDef.type = utils.box2d.b2Body.b2_dynamicBody;
      bodyDef.position.x = 250 / utils.SCALE;
      bodyDef.position.y = 10 / utils.SCALE;
      fixDef.shape = new utils.box2d.b2PolygonShape();
      fixDef.shape.SetAsBox(width/2/utils.SCALE, height/2/utils.SCALE);
      self.body = utils.world.CreateBody(bodyDef);
      self.body.CreateFixture(fixDef);

      // create animation
      self.animation = new createjs.Sprite(self.spriteSheet, 'standLeft');

      utils.stage.addChild(self.animation);

      self.animation.on('tick', function (e) {
        self.animation.x = self.body.GetPosition().x * utils.SCALE;
        self.animation.y = self.body.GetPosition().y * utils.SCALE + 12;
        self.rotation = self.body.GetAngle() * (180/Math.PI);
      });
    };

    return Character;

});