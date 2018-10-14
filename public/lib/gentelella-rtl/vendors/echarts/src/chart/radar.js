define(function (require) {

    var zrUtil = require('zrender/core/util');
    var echarts = require('../echarts');

    // Must use radar component
    require('../component/radar');

    require('./radar/RadarSeries');
    require('./radar/RadarView');

<<<<<<< HEAD
    echarts.registerVisual(zrUtil.curry(require('../visual/dataColor'), 'radar'));
    echarts.registerVisual(zrUtil.curry(
=======
    echarts.registerVisualCoding(
        'chart',  zrUtil.curry(require('../visual/dataColor'), 'radar')
    );
    echarts.registerVisualCoding('chart', zrUtil.curry(
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        require('../visual/symbol'), 'radar', 'circle', null
    ));
    echarts.registerLayout(require('./radar/radarLayout'));

    echarts.registerProcessor(
<<<<<<< HEAD
        zrUtil.curry(require('../processor/dataFilter'), 'radar')
=======
        'filter', zrUtil.curry(require('../processor/dataFilter'), 'radar')
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    );

    echarts.registerPreprocessor(require('./radar/backwardCompat'));
});