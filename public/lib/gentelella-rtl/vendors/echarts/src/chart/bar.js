define(function (require) {

    var zrUtil = require('zrender/core/util');

    require('../coord/cartesian/Grid');

    require('./bar/BarSeries');
    require('./bar/BarView');

    var barLayoutGrid = require('../layout/barGrid');
    var echarts = require('../echarts');

    echarts.registerLayout(zrUtil.curry(barLayoutGrid, 'bar'));
<<<<<<< HEAD

    // Visual coding for legend
    echarts.registerVisual(function (ecModel) {
=======
    // Visual coding for legend
    echarts.registerVisualCoding('chart', function (ecModel) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        ecModel.eachSeriesByType('bar', function (seriesModel) {
            var data = seriesModel.getData();
            data.setVisual('legendSymbol', 'roundRect');
        });
    });

    // In case developer forget to include grid component
<<<<<<< HEAD
    require('../component/gridSimple');
=======
    require('../component/grid');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
});