define(['jquery', 'utils'], 
  function ($, utils) {
    'use strict';

    var Piece = function (pos, name) {
      var self = this,
          width = 176,
          height = 45;

      this.view = new createjs.Bitmap('../img/piece-' + name + '.png');
      this.view.regX = width/2;
      this.view.regY = height/2;
      var fixDef = new utils.box2d.b2FixtureDef();
      fixDef.density = 1;
      fixDef.friction = 0.5;
      fixDef.restitution = 0.1;
      var bodyDef = new utils.box2d.b2BodyDef();
      bodyDef.type = utils.box2d.b2Body.b2_staticBody;
      bodyDef.position.x = pos.x / utils.SCALE;
      bodyDef.position.y = pos.y / utils.SCALE;
      fixDef.shape = new utils.box2d.b2PolygonShape();
      fixDef.shape.SetAsBox(width/2/utils.SCALE, height/2/utils.SCALE);
      this.view.body = utils.world.CreateBody(bodyDef);
      this.view.body.CreateFixture(fixDef);
      utils.stage.addChild(self.view);
      this.view.on('tick', function (e) {
        this.x = this.body.GetPosition().x * utils.SCALE;
        this.y = this.body.GetPosition().y * utils.SCALE;
        this.rotation = this.body.GetAngle() * (180/Math.PI);
      });
    };

    return Piece;

});