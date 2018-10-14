/**
 * Legend component entry file8
 */
define(function (require) {

    require('./legend/LegendModel');
    require('./legend/legendAction');
    require('./legend/LegendView');

    var echarts = require('../echarts');
    // Series Filter
<<<<<<< HEAD
    echarts.registerProcessor(require('./legend/legendFilter'));
=======
    echarts.registerProcessor('filter', require('./legend/legendFilter'));
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
});