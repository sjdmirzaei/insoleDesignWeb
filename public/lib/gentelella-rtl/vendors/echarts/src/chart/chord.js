define(function (require) {

    require('./chord/ChordSeries');
    require('./chord/ChordView');

    var echarts = require('../echarts');
    var zrUtil = require('zrender/core/util');
    echarts.registerLayout(require('./chord/chordCircularLayout'));

<<<<<<< HEAD
    echarts.registerVisual(zrUtil.curry(require('../visual/dataColor'), 'chord'));

    echarts.registerProcessor(zrUtil.curry(require('../processor/dataFilter'), 'pie'));
=======
    echarts.registerVisualCoding(
        'chart',  zrUtil.curry(require('../visual/dataColor'), 'chord')
    );

    echarts.registerProcessor(
        'filter', zrUtil.curry(require('../processor/dataFilter'), 'pie')
    );
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
});