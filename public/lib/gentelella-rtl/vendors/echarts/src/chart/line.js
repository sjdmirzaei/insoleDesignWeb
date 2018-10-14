define(function (require) {

    var zrUtil = require('zrender/core/util');
    var echarts = require('../echarts');
<<<<<<< HEAD
    var PRIORITY = echarts.PRIORITY;
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    require('./line/LineSeries');
    require('./line/LineView');

<<<<<<< HEAD
    echarts.registerVisual(zrUtil.curry(
=======
    echarts.registerVisualCoding('chart', zrUtil.curry(
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        require('../visual/symbol'), 'line', 'circle', 'line'
    ));
    echarts.registerLayout(zrUtil.curry(
        require('../layout/points'), 'line'
    ));

    // Down sample after filter
<<<<<<< HEAD
    echarts.registerProcessor(PRIORITY.PROCESSOR.STATISTIC, zrUtil.curry(
=======
    echarts.registerProcessor('statistic', zrUtil.curry(
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        require('../processor/dataSample'), 'line'
    ));

    // In case developer forget to include grid component
<<<<<<< HEAD
    require('../component/gridSimple');
=======
    require('../component/grid');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
});