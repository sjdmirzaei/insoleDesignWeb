define(function (require) {

    var echarts = require('../echarts');
    var zrUtil = require('zrender/core/util');

    require('./graph/GraphSeries');
    require('./graph/GraphView');

<<<<<<< HEAD
    require('./graph/graphAction');

    echarts.registerProcessor(require('./graph/categoryFilter'));

    echarts.registerVisual(zrUtil.curry(
        require('../visual/symbol'), 'graph', 'circle', null
    ));
    echarts.registerVisual(require('./graph/categoryVisual'));
    echarts.registerVisual(require('./graph/edgeVisual'));
=======
    require('./graph/roamAction');

    echarts.registerProcessor('filter', require('./graph/categoryFilter'));

    echarts.registerVisualCoding('chart', zrUtil.curry(
        require('../visual/symbol'), 'graph', 'circle', null
    ));
    echarts.registerVisualCoding('chart', require('./graph/categoryVisual'));
    echarts.registerVisualCoding('chart', require('./graph/edgeVisual'));
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    echarts.registerLayout(require('./graph/simpleLayout'));
    echarts.registerLayout(require('./graph/circularLayout'));
    echarts.registerLayout(require('./graph/forceLayout'));

    // Graph view coordinate system
    echarts.registerCoordinateSystem('graphView', {
        create: require('./graph/createView')
    });
});