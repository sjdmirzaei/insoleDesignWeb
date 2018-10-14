define(function (require) {

    var echarts = require('../echarts');

    require('./sankey/SankeySeries');
    require('./sankey/SankeyView');
    echarts.registerLayout(require('./sankey/sankeyLayout'));
<<<<<<< HEAD
    echarts.registerVisual(require('./sankey/sankeyVisual'));
=======
    echarts.registerVisualCoding('chart', require('./sankey/sankeyVisual'));
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
});