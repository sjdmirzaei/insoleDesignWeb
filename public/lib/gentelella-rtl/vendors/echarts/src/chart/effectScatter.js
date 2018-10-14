define(function (require) {

    var zrUtil = require('zrender/core/util');
    var echarts = require('../echarts');

    require('./effectScatter/EffectScatterSeries');
    require('./effectScatter/EffectScatterView');

<<<<<<< HEAD
    echarts.registerVisual(zrUtil.curry(
=======
    echarts.registerVisualCoding('chart', zrUtil.curry(
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        require('../visual/symbol'), 'effectScatter', 'circle', null
    ));
    echarts.registerLayout(zrUtil.curry(
        require('../layout/points'), 'effectScatter'
    ));
});