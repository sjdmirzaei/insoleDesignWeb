/*!
<<<<<<< HEAD
 * Bootstrap Colorpicker v2.5.1
 * https://itsjavi.com/bootstrap-colorpicker/
=======
 * Bootstrap Colorpicker v//@version
 * http://mjolnic.github.io/bootstrap-colorpicker/
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
 *
 * Originally written by (c) 2012 Stefan Petre
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0.txt
 *
 */

<<<<<<< HEAD
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function(jq) {
      return (factory(jq));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else if (jQuery && !jQuery.fn.colorpicker) {
    factory(jQuery);
  }
}(this, function($) {
  'use strict';
=======
(function(factory) {
  "use strict";
  if (typeof exports === 'object') {
    module.exports = factory(window.jQuery);
  } else if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (window.jQuery && !window.jQuery.fn.colorpicker) {
    factory(window.jQuery);
  }
}(function($) {
  'use strict';

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
  //@colorpicker-color
  //@colorpicker-defaults
  //@colorpicker-component
}));
