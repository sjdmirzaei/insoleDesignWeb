define(function (require) {

    var zrUtil = require('zrender/core/util');

    // FIXME 公用？
    /**
     * @param {Array.<module:echarts/data/List>} datas
<<<<<<< HEAD
     * @param {string} statisticType 'average' 'sum'
     * @inner
     */
    function dataStatistics(datas, statisticType) {
        var dataNameMap = {};
        var dims = ['value'];

        zrUtil.each(datas, function (data) {
            data.each(dims, function (value, idx) {
                // Add prefix to avoid conflict with Object.prototype.
                var mapKey = 'ec-' + data.getName(idx);
                dataNameMap[mapKey] = dataNameMap[mapKey] || [];
                if (!isNaN(value)) {
                    dataNameMap[mapKey].push(value);
                }
            });
        });

        return datas[0].map(dims, function (value, idx) {
            var mapKey = 'ec-' + datas[0].getName(idx);
            var sum = 0;
            var min = Infinity;
            var max = -Infinity;
            var len = dataNameMap[mapKey].length;
            for (var i = 0; i < len; i++) {
                min = Math.min(min, dataNameMap[mapKey][i]);
                max = Math.max(max, dataNameMap[mapKey][i]);
                sum += dataNameMap[mapKey][i];
            }
            var result;
            if (statisticType === 'min') {
                result = min;
            }
            else if (statisticType === 'max') {
                result = max;
            }
            else if (statisticType === 'average') {
=======
     * @param {string} statisticsType 'average' 'sum'
     * @inner
     */
    function dataStatistics(datas, statisticsType) {
        var dataNameMap = {};
        var dims = ['value'];

        for (var i = 0; i < datas.length; i++) {
            datas[i].each(dims, function (value, idx) {
                var name = datas[i].getName(idx);
                dataNameMap[name] = dataNameMap[name] || [];
                if (!isNaN(value)) {
                    dataNameMap[name].push(value);
                }
            });
        }

        return datas[0].map(dims, function (value, idx) {
            var name = datas[0].getName(idx);
            var sum = 0;
            var min = Infinity;
            var max = -Infinity;
            var len = dataNameMap[name].length;
            for (var i = 0; i < len; i++) {
                min = Math.min(min, dataNameMap[name][i]);
                max = Math.max(max, dataNameMap[name][i]);
                sum += dataNameMap[name][i];
            }
            var result;
            if (statisticsType === 'min') {
                result = min;
            }
            else if (statisticsType === 'max') {
                result = max;
            }
            else if (statisticsType === 'average') {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                result = sum / len;
            }
            else {
                result = sum;
            }
            return len === 0 ? NaN : result;
        });
    }

    return function (ecModel) {
<<<<<<< HEAD
        var seriesGroups = {};
        ecModel.eachSeriesByType('map', function (seriesModel) {
            var hostGeoModel = seriesModel.getHostGeoModel();
            var key = hostGeoModel ? 'o' + hostGeoModel.id : 'i' + seriesModel.getMapType();
            (seriesGroups[key] = seriesGroups[key] || []).push(seriesModel);
        });

        zrUtil.each(seriesGroups, function (seriesList, key) {
=======
        var seriesGroupByMapType = {};
        ecModel.eachSeriesByType('map', function (seriesModel) {
            var mapType = seriesModel.get('map');
            seriesGroupByMapType[mapType] = seriesGroupByMapType[mapType] || [];
            seriesGroupByMapType[mapType].push(seriesModel);
        });

        zrUtil.each(seriesGroupByMapType, function (seriesList, mapType) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            var data = dataStatistics(
                zrUtil.map(seriesList, function (seriesModel) {
                    return seriesModel.getData();
                }),
                seriesList[0].get('mapValueCalculation')
            );

<<<<<<< HEAD
            for (var i = 0; i < seriesList.length; i++) {
                seriesList[i].originalData = seriesList[i].getData();
            }
=======
            seriesList[0].seriesGroup = [];

            seriesList[0].setData(data);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            // FIXME Put where?
            for (var i = 0; i < seriesList.length; i++) {
                seriesList[i].seriesGroup = seriesList;
<<<<<<< HEAD
                seriesList[i].needsDrawMap = i === 0 && !seriesList[i].getHostGeoModel();

                seriesList[i].setData(data.cloneShallow());
                seriesList[i].mainSeries = seriesList[0];
=======
                seriesList[i].needsDrawMap = i === 0;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }
        });
    };
});