define(function (require) {

    var echarts = require('../echarts');

    require('./treemap/TreemapSeries');
    require('./treemap/TreemapView');
    require('./treemap/treemapAction');

<<<<<<< HEAD
    echarts.registerVisual(require('./treemap/treemapVisual'));
=======
    echarts.registerVisualCoding('chart', require('./treemap/treemapVisual'));
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    echarts.registerLayout(require('./treemap/treemapLayout'));
});