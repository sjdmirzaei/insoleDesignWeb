define(function (require) {

    var echarts = require('../echarts');
<<<<<<< HEAD
    var PRIORITY = echarts.PRIORITY;
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    require('./map/MapSeries');

    require('./map/MapView');

    require('../action/geoRoam');

    require('../coord/geo/geoCreator');

    echarts.registerLayout(require('./map/mapSymbolLayout'));

<<<<<<< HEAD
    echarts.registerVisual(require('./map/mapVisual'));

    echarts.registerProcessor(PRIORITY.PROCESSOR.STATISTIC, require('./map/mapDataStatistic'));
=======
    echarts.registerVisualCoding('chart', require('./map/mapVisual'));

    echarts.registerProcessor('statistic', require('./map/mapDataStatistic'));
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    echarts.registerPreprocessor(require('./map/backwardCompat'));

    require('../action/createDataSelectAction')('map', [{
        type: 'mapToggleSelect',
        event: 'mapselectchanged',
        method: 'toggleSelected'
    }, {
        type: 'mapSelect',
        event: 'mapselected',
        method: 'select'
    }, {
        type: 'mapUnSelect',
        event: 'mapunselected',
        method: 'unSelect'
    }]);
});