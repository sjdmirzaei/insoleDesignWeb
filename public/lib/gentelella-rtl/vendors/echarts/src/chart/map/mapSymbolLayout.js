define(function (require) {

    var zrUtil = require('zrender/core/util');

    return function (ecModel) {

        var processedMapType = {};

        ecModel.eachSeriesByType('map', function (mapSeries) {
<<<<<<< HEAD
            var mapType = mapSeries.getMapType();
            if (mapSeries.getHostGeoModel() || processedMapType[mapType]) {
=======
            var mapType = mapSeries.get('map');
            if (processedMapType[mapType]) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                return;
            }

            var mapSymbolOffsets = {};

            zrUtil.each(mapSeries.seriesGroup, function (subMapSeries) {
                var geo = subMapSeries.coordinateSystem;
<<<<<<< HEAD
                var data = subMapSeries.originalData;
=======
                var data = subMapSeries.getData();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                if (subMapSeries.get('showLegendSymbol') && ecModel.getComponent('legend')) {
                    data.each('value', function (value, idx) {
                        var name = data.getName(idx);
                        var region = geo.getRegion(name);

<<<<<<< HEAD
                        // If input series.data is [11, 22, '-'/null/undefined, 44],
                        // it will be filled with NaN: [11, 22, NaN, 44] and NaN will
                        // not be drawn. So here must validate if value is NaN.
=======
                        // No region or no value
                        // In MapSeries data regions will be filled with NaN
                        // If they are not in the series.data array.
                        // So here must validate if value is NaN
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                        if (!region || isNaN(value)) {
                            return;
                        }

                        var offset = mapSymbolOffsets[name] || 0;

                        var point = geo.dataToPoint(region.center);

                        mapSymbolOffsets[name] = offset + 1;

                        data.setItemLayout(idx, {
                            point: point,
                            offset: offset
                        });
                    });
                }
            });

            // Show label of those region not has legendSymbol(which is offset 0)
            var data = mapSeries.getData();
            data.each(function (idx) {
                var name = data.getName(idx);
                var layout = data.getItemLayout(idx) || {};
                layout.showLabel = !mapSymbolOffsets[name];
                data.setItemLayout(idx, layout);
            });

            processedMapType[mapType] = true;
        });
    };
});