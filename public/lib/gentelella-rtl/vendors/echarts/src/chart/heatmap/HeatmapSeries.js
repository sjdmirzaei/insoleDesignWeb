define(function (require) {

    var SeriesModel = require('../../model/Series');
    var createListFromArray = require('../helper/createListFromArray');

    return SeriesModel.extend({
        type: 'series.heatmap',

        getInitialData: function (option, ecModel) {
            return createListFromArray(option.data, this, ecModel);
        },

        defaultOption: {

            // Cartesian2D or geo
            coordinateSystem: 'cartesian2d',

            zlevel: 0,

            z: 2,

            // Cartesian coordinate system
<<<<<<< HEAD
            // xAxisIndex: 0,
            // yAxisIndex: 0,
=======
            xAxisIndex: 0,
            yAxisIndex: 0,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            // Geo coordinate system
            geoIndex: 0,

            blurSize: 30,

            pointSize: 20,

            maxOpacity: 1,

            minOpacity: 0
        }
    });
});