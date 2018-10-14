/**
 * Parallel coordinate system creater.
 */
define(function(require) {

    var Parallel = require('./Parallel');

    function create(ecModel, api) {
        var coordSysList = [];

        ecModel.eachComponent('parallel', function (parallelModel, idx) {
            var coordSys = new Parallel(parallelModel, ecModel, api);

            coordSys.name = 'parallel_' + idx;
            coordSys.resize(parallelModel, api);

            parallelModel.coordinateSystem = coordSys;
            coordSys.model = parallelModel;

            coordSysList.push(coordSys);
        });

        // Inject the coordinateSystems into seriesModel
        ecModel.eachSeries(function (seriesModel) {
            if (seriesModel.get('coordinateSystem') === 'parallel') {
<<<<<<< HEAD
                var parallelModel = ecModel.queryComponents({
                    mainType: 'parallel',
                    index: seriesModel.get('parallelIndex'),
                    id: seriesModel.get('parallelId')
                })[0];
                seriesModel.coordinateSystem = parallelModel.coordinateSystem;
=======
                var parallelIndex = seriesModel.get('parallelIndex');
                seriesModel.coordinateSystem = coordSysList[parallelIndex];
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }
        });

        return coordSysList;
    }

    require('../../CoordinateSystem').register('parallel', {create: create});

});