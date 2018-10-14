define(function (require) {

    var zrUtil = require('zrender/core/util');
    var echarts = require('../echarts');

    require('./scatter/ScatterSeries');
    require('./scatter/ScatterView');

<<<<<<< HEAD
    echarts.registerVisual(zrUtil.curry(
=======
    echarts.registerVisualCoding('chart', zrUtil.curry(
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        require('../visual/symbol'), 'scatter', 'circle', null
    ));
    echarts.registerLayout(zrUtil.curry(
        require('../layout/points'), 'scatter'
    ));

    // In case developer forget to include grid component
<<<<<<< HEAD
    require('../component/gridSimple');
=======
    require('../component/grid');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
});