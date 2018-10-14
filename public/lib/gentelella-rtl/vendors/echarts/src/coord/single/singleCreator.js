/**
 * Single coordinate system creator.
 */
define(function (require) {

    var Single = require('./Single');

    /**
     * Create single coordinate system and inject it into seriesModel.
     *
     * @param {module:echarts/model/Global} ecModel
     * @param {module:echarts/ExtensionAPI} api
     * @return {Array.<module:echarts/coord/single/Single>}
     */
    function create(ecModel, api) {
        var singles = [];

        ecModel.eachComponent('singleAxis', function(axisModel, idx) {

            var single = new Single(axisModel, ecModel, api);
            single.name = 'single_' + idx;
            single.resize(axisModel, api);
            axisModel.coordinateSystem = single;
            singles.push(single);

        });

        ecModel.eachSeries(function (seriesModel) {
<<<<<<< HEAD
            if (seriesModel.get('coordinateSystem') === 'singleAxis') {
                var singleAxisModel = ecModel.queryComponents({
                    mainType: 'singleAxis',
                    index: seriesModel.get('singleAxisIndex'),
                    id: seriesModel.get('singleAxisId')
                })[0];
                seriesModel.coordinateSystem = singleAxisModel && singleAxisModel.coordinateSystem;
=======

            if (seriesModel.get('coordinateSystem') === 'single') {
                var singleAxisIndex = seriesModel.get('singleAxisIndex');
                var axisModel = ecModel.getComponent('singleAxis', singleAxisIndex);
                seriesModel.coordinateSystem = axisModel.coordinateSystem;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }
        });

        return singles;
    }

<<<<<<< HEAD
    require('../../CoordinateSystem').register('single', {
        create: create,
        dimensions: Single.prototype.dimensions
    });
=======
    require('../../CoordinateSystem').register('single', {create: create});
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
});