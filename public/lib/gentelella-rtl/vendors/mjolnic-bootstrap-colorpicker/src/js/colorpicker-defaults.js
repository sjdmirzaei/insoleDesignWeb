/*
 * Default plugin options
 */
var defaults = {
  horizontal: false, // horizontal mode layout ?
  inline: false, //forces to show the colorpicker as an inline element
  color: false, //forces a color
  format: false, //forces a format
  input: 'input', // children input selector
  container: false, // container selector
  component: '.add-on, .input-group-addon', // children component selector
<<<<<<< HEAD
  fallbackColor: false, // fallback color value. null = keeps current color.
  fallbackFormat: 'hex', // fallback color format
  hexNumberSignPrefix: true, // put a '#' (number sign) before hex strings
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
  sliders: {
    saturation: {
      maxLeft: 100,
      maxTop: 100,
      callLeft: 'setSaturation',
      callTop: 'setBrightness'
    },
    hue: {
      maxLeft: 0,
      maxTop: 100,
      callLeft: false,
      callTop: 'setHue'
    },
    alpha: {
      maxLeft: 0,
      maxTop: 100,
      callLeft: false,
      callTop: 'setAlpha'
    }
  },
  slidersHorz: {
    saturation: {
      maxLeft: 100,
      maxTop: 100,
      callLeft: 'setSaturation',
      callTop: 'setBrightness'
    },
    hue: {
      maxLeft: 100,
      maxTop: 0,
      callLeft: 'setHue',
      callTop: false
    },
    alpha: {
      maxLeft: 100,
      maxTop: 0,
      callLeft: 'setAlpha',
      callTop: false
    }
  },
  template: '<div class="colorpicker dropdown-menu">' +
    '<div class="colorpicker-saturation"><i><b></b></i></div>' +
    '<div class="colorpicker-hue"><i></i></div>' +
    '<div class="colorpicker-alpha"><i></i></div>' +
    '<div class="colorpicker-color"><div /></div>' +
    '<div class="colorpicker-selectors"></div>' +
    '</div>',
  align: 'right',
<<<<<<< HEAD
  customClass: null, // custom class added to the colorpicker element
  colorSelectors: null // custom color aliases
=======
  customClass: null,
  colorSelectors: null
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
};
