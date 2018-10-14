define(function (require) {

    var echarts = require('../echarts');

    require('./candlestick/CandlestickSeries');
    require('./candlestick/CandlestickView');

    echarts.registerPreprocessor(
        require('./candlestick/preprocessor')
    );

<<<<<<< HEAD
    echarts.registerVisual(require('./candlestick/candlestickVisual'));
=======
    echarts.registerVisualCoding('chart', require('./candlestick/candlestickVisual'));
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    echarts.registerLayout(require('./candlestick/candlestickLayout'));

});