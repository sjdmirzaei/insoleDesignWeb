/**
 * DataZoom component entry
 */
define(function (require) {

    require('../echarts').registerPreprocessor(
        require('./visualMap/preprocessor')
    );

    require('./visualMap/typeDefaulter');
<<<<<<< HEAD
    require('./visualMap/visualEncoding');
=======
    require('./visualMap/visualCoding');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    require('./visualMap/PiecewiseModel');
    require('./visualMap/PiecewiseView');
    require('./visualMap/visualMapAction');

});