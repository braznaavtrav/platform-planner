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

require(['jquery', 'app'], 
  function ($, app) {
    'use strict';

    $(function () {
      app.init();
    });
        
  }
);