define(function (require) {

    var echarts = require('../echarts');
    var zrUtil = require('zrender/core/util');

<<<<<<< HEAD
    require('../component/singleAxis');

    require('./themeRiver/ThemeRiverSeries');

=======

    require('./themeRiver/ThemeRiverSeries');
    
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    require('./themeRiver/ThemeRiverView');

    echarts.registerLayout(require('./themeRiver/themeRiverLayout'));

<<<<<<< HEAD
    echarts.registerVisual(require('./themeRiver/themeRiverVisual'));

    echarts.registerProcessor(
        zrUtil.curry(require('../processor/dataFilter'), 'themeRiver')
    );
=======
    echarts.registerVisualCoding('chart', require('./themeRiver/themeRiverVisual'));

    echarts.registerProcessor(
        'filter', zrUtil.curry(require('../processor/dataFilter'), 'themeRiver')
    );    
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
});