<<<<<<< HEAD
// Pick color from palette for each data item.
// Applicable for charts that require applying color palette
// in data level (like pie, funnel, chord).
define(function (require) {

    return function (seriesType, ecModel) {
        // Pie and funnel may use diferrent scope
        var paletteScope = {};
        ecModel.eachRawSeriesByType(seriesType, function (seriesModel) {
            var dataAll = seriesModel.getRawData();
            var idxMap = {};
            if (!ecModel.isSeriesFiltered(seriesModel)) {
                var data = seriesModel.getData();
                data.each(function (idx) {
                    var rawIdx = data.getRawIndex(idx);
                    idxMap[rawIdx] = idx;
                });
                dataAll.each(function (rawIdx) {
                    var filteredIdx = idxMap[rawIdx];

                    // If series.itemStyle.normal.color is a function. itemVisual may be encoded
                    var singleDataColor = filteredIdx != null
                        && data.getItemVisual(filteredIdx, 'color', true);

                    if (!singleDataColor) {
                        // FIXME Performance
                        var itemModel = dataAll.getItemModel(rawIdx);
                        var color = itemModel.get('itemStyle.normal.color')
                            || seriesModel.getColorFromPalette(dataAll.getName(rawIdx), paletteScope);
                        // Legend may use the visual info in data before processed
                        dataAll.setItemVisual(rawIdx, 'color', color);

                        // Data is not filtered
                        if (filteredIdx != null) {
                            data.setItemVisual(filteredIdx, 'color', color);
                        }
=======
// Pick color from palette for each data item
define(function (require) {

    return function (seriesType, ecModel) {
        var globalColorList = ecModel.get('color');
        var offset = 0;
        ecModel.eachRawSeriesByType(seriesType, function (seriesModel) {
            var colorList = seriesModel.get('color', true);
            var dataAll = seriesModel.getRawData();
            if (!ecModel.isSeriesFiltered(seriesModel)) {
                var data = seriesModel.getData();
                data.each(function (idx) {
                    var itemModel = data.getItemModel(idx);
                    var rawIdx = data.getRawIndex(idx);
                    // If series.itemStyle.normal.color is a function. itemVisual may be encoded
                    var singleDataColor = data.getItemVisual(idx, 'color', true);
                    if (!singleDataColor) {
                        var paletteColor = colorList ? colorList[rawIdx % colorList.length]
                            : globalColorList[(rawIdx + offset) % globalColorList.length];
                        var color = itemModel.get('itemStyle.normal.color') || paletteColor;
                        // Legend may use the visual info in data before processed
                        dataAll.setItemVisual(rawIdx, 'color', color);
                        data.setItemVisual(idx, 'color', color);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    }
                    else {
                        // Set data all color for legend
                        dataAll.setItemVisual(rawIdx, 'color', singleDataColor);
                    }
                });
            }
<<<<<<< HEAD
=======
            offset += dataAll.count();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        });
    };
});