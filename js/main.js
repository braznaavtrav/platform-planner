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
      newton: {
        exports: 'Newton'
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
      'newton': 'lib/newton-0.0.4'
    },
    config: {}
});

require(['jquery', 'newton'], 
  function ($, Newton) {
    'use strict';
    
    var renderer = Newton.Renderer(document.getElementById('display'));
    var sim = Newton.Simulator(simulate, renderer.callback, 60);
    
    var envLayer = sim.Layer();
    var fixedLayer = sim.Layer();
    var playerLayer = sim.Layer();

    var material = Newton.Material({
      weight: 2,
      restitution: 0.5,
      friction: 0.2,
      maxVelocity: 50
    });

    var gravity = Newton.LinearGravity(0, 0.001, 0);
    var terrain = Newton.Body();
    var player = Newton.Body();

    envLayer                // shared forces like gravity
      .addForce(gravity);

    fixedLayer              // responds to no forces, no collisions
      .respondTo([])
      .addBody(terrain);

    playerLayer             // responds to forces and collisions on all layers
      .addBody(player)
      .respondTo([playerLayer, fixedLayer, envLayer]);

    sim.start();

    var p1 = Newton.Particle(100, 100, 2);
    var p2 = Newton.Particle(200, 100, 2);
    var edge = Newton.Edge(p1, p2, material);
    terrain.addEdge(edge);

    var characterAA = {x: 125, y: 10};
    var characterBB = {x: 175, y: 50};

    box(characterAA, characterBB, player, material);

    function box(aa, bb, body, material) {
      // create 4 particles
      var tl = Newton.Particle(aa.x, aa.y, 3);
      var tr = Newton.Particle(bb.x, aa.y, 3);
      var br = Newton.Particle(bb.x, bb.y, 3);
      var bl = Newton.Particle(aa.x, bb.y, 3);
      // create edges between particles
      var top = Newton.Edge(tl, tr, material);
      var right = Newton.Edge(tr, br, material);
      var bottom = Newton.Edge(br, bl, material);
      var left = Newton.Edge(bl, tl, material);
      // create constraints
      // var tc = tl.DistanceConstraint(tr, top.length, 2, 0);
      // var rc = tr.DistanceConstraint(br, right.length, 2, 0);
      // var bc = br.DistanceConstraint(bl, bottom.length, 2, 0);
      // var lc = bl.DistanceConstraint(tl, left.length, 2, 0);
      body.addParticle(tl);
      body.addParticle(tr);
      body.addParticle(br);
      body.addParticle(bl);
      body.addEdge(top);
      body.addEdge(right);
      body.addEdge(bottom);
      body.addEdge(left);
    }

    function simulate(time) {
    }

  }
);