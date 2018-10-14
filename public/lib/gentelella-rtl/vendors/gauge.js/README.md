gauge.js
========

<<<<<<< HEAD
100% native and cool looking animated JavaScript/CoffeScript gauge.
=======
100% native and cool looking animated JavaScript/CoffeScript gauge
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

 * No images, no external CSS - pure canvas
 * No dependencies
 * Highly configurable
 * Resolution independent
<<<<<<< HEAD
 * Animated gauge value changes
=======
 * Animated guage value changes
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
 * Works in all major browsers
 * MIT License

## Usage

```javascript
var opts = {
<<<<<<< HEAD
  angle: 0.15, /// The span of the gauge arc
  lineWidth: 0.44, // The line thickness
  pointer: {
    length: 0.9, // Relative to gauge radius
    strokeWidth: 0.035 // The thickness
=======
  lines: 12, // The number of lines to draw
  angle: 0.15, // The length of each line
  lineWidth: 0.44, // The line thickness
  pointer: {
    length: 0.9, // The radius of the inner circle
    strokeWidth: 0.035 // The rotation offset
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
  },
  colorStart: '#6FADCF',   // Colors
  colorStop: '#8FC0DA',    // just experiment with them
  strokeColor: '#E0E0E0'   // to see which ones work best for you
};
var target = document.getElementById('foo'); // your canvas element
var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
<<<<<<< HEAD
gauge.maxValue = 3000; // set max gauge value
gauge.setMinValue(0);  // set min value
gauge.set(1250); // set actual value
=======
gauge.value = 1250; // set actual value
gauge.maxValue = 3000; // set max gauge value
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
```

For an interactive demo and a list of all supported options please refer to the [project's homepage](http://bernii.github.com/gauge.js).
