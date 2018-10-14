define(function (require) {

    var echarts = require('../echarts');

    require('./boxplot/BoxplotSeries');
    require('./boxplot/BoxplotView');

<<<<<<< HEAD
    echarts.registerVisual(require('./boxplot/boxplotVisual'));
=======
    echarts.registerVisualCoding('chart', require('./boxplot/boxplotVisual'));
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    echarts.registerLayout(require('./boxplot/boxplotLayout'));

});