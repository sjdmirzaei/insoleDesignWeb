define(function (require) {

    require('./lines/LinesSeries');
    require('./lines/LinesView');

<<<<<<< HEAD
=======
    var zrUtil = require('zrender/core/util');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    var echarts = require('../echarts');
    echarts.registerLayout(
        require('./lines/linesLayout')
    );
<<<<<<< HEAD
    echarts.registerVisual(
        require('./lines/linesVisual')
=======

    echarts.registerVisualCoding(
        'chart', zrUtil.curry(require('../visual/seriesColor'), 'lines', 'lineStyle')
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    );
});