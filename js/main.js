// This require.config block is optimized by r.js, no logic or external variables can go in here

require.config({
    shim: {
        /*
        underscore: {
          exports: '_'
        },
        backbone: {
          deps: ["underscore", "jquery"],
          exports: "Backbone"
        },
        bootstrap: {
          deps: ["jquery"],
        }
        */
    },
    baseUrl: 'js/',
    packages: [
      {
        name: 'physicsjs',
        location: 'lib/physicsjs/dist',
        main: 'physicsjs-0.5.3.min'
      }
    ],
    paths: {
        //'backbone': 'backbone-1.0.0',
        'jquery': 'lib/jquery-1.10.2',
        //'knockout': 'knockout-2.2.0.debug',
        //'knockback': 'knockback-0.17.2',
        //'underscore': 'underscore-1.5.1'
    },
    config: {}
})


require(['jquery', 'physicsjs', 'physicsjs/renderers/canvas', 'physicsjs/bodies/circle', 'physicsjs/behaviors/edge-collision-detection', 'physicsjs/behaviors/body-impulse-response', 'physicsjs/behaviors/constant-acceleration', 'physicsjs/bodies/convex-polygon'], 
  function ($, Physics) {
    /**
     * PhysicsJS by Jasper Palfree <wellcaffeinated.net>
     * http://wellcaffeinated.net/PhysicsJS
     *
     * Simple "Hello world" example
     */
    Physics(function(world){

      var viewWidth = 1024;
      var viewHeight = 768;
            
      var renderer = Physics.renderer('canvas', {
        el: 'display',
        width: viewWidth,
        height: viewHeight,
        meta: false, // don't display meta data
        styles: {
            // set colors for the circle bodies
            'circle' : {
                strokeStyle: 'hsla(60, 37%, 17%, 1)',
                lineWidth: 1,
                fillStyle: 'hsla(60, 37%, 57%, 0.8)',
                angleIndicator: 'hsla(60, 37%, 17%, 0.4)'
            }
        }
      });

      // add the renderer
      world.add( renderer );
      // render on each step
      world.subscribe('step', function(){
        world.render();
      });
      
      // bounds of the window
      var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
      
      // constrain objects to these bounds
      world.add(Physics.behavior('edge-collision-detection', {
          aabb: viewportBounds,
          restitution: 0.99,
          cof: 0.99
      }));

      world.add(Physics.behavior('body-impulse-response', {
          aabb: Physics.aabb(100, 100, 200, 120),
          restitution: 0.99,
          cof: 0.99
      }));

      // add a circle
      world.add(
          Physics.body('circle', {
            x: 150, // x-coordinate
            y: 50, // y-coordinate
            vx: 0, // velocity in x-direction
            vy: 0.01, // velocity in y-direction
            radius: 20
          })
      );

      var square = Physics.body('convex-polygon', {
          // place the center of the square at (0, 0)
          x: 0,
          y: 0,
          vertices: [
              { x: 0, y: 0 },
              { x: 0, y: 20 },
              { x: 20, y: 20 },
              { x: 20, y: 0 }
          ]
      });

      world.add(square);

      // ensure objects bounce when edge collision is detected
      world.add( Physics.behavior('body-impulse-response') );

      // add some gravity
      world.add( Physics.behavior('constant-acceleration') );

      // subscribe to ticker to advance the simulation
      Physics.util.ticker.subscribe(function( time, dt ){
        
          world.step( time );
      });

      // start the ticker
      Physics.util.ticker.start();

    });
    
  }
);