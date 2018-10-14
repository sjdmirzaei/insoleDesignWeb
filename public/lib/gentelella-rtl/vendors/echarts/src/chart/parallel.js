define(function (require) {

    var echarts = require('../echarts');

    require('../component/parallel');

    require('./parallel/ParallelSeries');
    require('./parallel/ParallelView');

<<<<<<< HEAD
    echarts.registerVisual(require('./parallel/parallelVisual'));
=======
    echarts.registerVisualCoding('chart', require('./parallel/parallelVisual'));
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

});