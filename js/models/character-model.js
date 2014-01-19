define(['jquery', 'easeljs', 'utils'], 
  function ($, createjs, utils) {
    'use strict';

    var Character = function () {
      var self = this,
          width = 100,
          height = 171;

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

      var animation = new createjs.Sprite(self.spriteSheet, 'standLeft');
      animation.x = 100;
      animation.y = 50;
      utils.stage.addChild(animation);

      // this.view = new createjs.Bitmap('../img/piece-' + name + '.png');
      // this.view.regX = width/2;
      // this.view.regY = height/2;
      // var fixDef = new utils.box2d.b2FixtureDef();
      // fixDef.density = 1;
      // fixDef.friction = 0.5;
      // fixDef.restitution = 0.5;
      // var bodyDef = new utils.box2d.b2BodyDef();
      // bodyDef.type = utils.box2d.b2Body.b2_staticBody;
      // bodyDef.position.x = pos.x / utils.SCALE;
      // bodyDef.position.y = pos.y / utils.SCALE;
      // fixDef.shape = new utils.box2d.b2PolygonShape();
      // fixDef.shape.SetAsBox(width/2/utils.SCALE, height/2/utils.SCALE);
      // this.view.body = utils.world.CreateBody(bodyDef);
      // this.view.body.CreateFixture(fixDef);
      // utils.stage.addChild(self.view);
      // this.view.on('tick', function (e) {
      //   this.x = this.body.GetPosition().x * utils.SCALE;
      //   this.y = this.body.GetPosition().y * utils.SCALE;
      //   this.rotation = this.body.GetAngle() * (180/Math.PI);
      // });
    };

    return Character;

});