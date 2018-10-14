define(function (require) {
    var Gradient = require('zrender/graphic/Gradient');
<<<<<<< HEAD
    return function (ecModel) {
        function encodeColor(seriesModel) {
            var colorAccessPath = (seriesModel.visualColorAccessPath || 'itemStyle.normal.color').split('.');
            var data = seriesModel.getData();
            var color = seriesModel.get(colorAccessPath) // Set in itemStyle
                || seriesModel.getColorFromPalette(seriesModel.get('name'));  // Default color
=======
    return function (seriesType, styleType, ecModel) {
        function encodeColor(seriesModel) {
            var colorAccessPath = [styleType, 'normal', 'color'];
            var colorList = ecModel.get('color');
            var data = seriesModel.getData();
            var color = seriesModel.get(colorAccessPath) // Set in itemStyle
                || colorList[seriesModel.seriesIndex % colorList.length];  // Default color
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            // FIXME Set color function or use the platte color
            data.setVisual('color', color);

            // Only visible series has each data be visual encoded
            if (!ecModel.isSeriesFiltered(seriesModel)) {
                if (typeof color === 'function' && !(color instanceof Gradient)) {
                    data.each(function (idx) {
                        data.setItemVisual(
                            idx, 'color', color(seriesModel.getDataParams(idx))
                        );
                    });
                }

<<<<<<< HEAD
                // itemStyle in each data item
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                data.each(function (idx) {
                    var itemModel = data.getItemModel(idx);
                    var color = itemModel.get(colorAccessPath, true);
                    if (color != null) {
                        data.setItemVisual(idx, 'color', color);
                    }
                });
            }
        }
<<<<<<< HEAD
        ecModel.eachRawSeries(encodeColor);
=======
        seriesType ? ecModel.eachSeriesByType(seriesType, encodeColor)
            : ecModel.eachSeries(encodeColor);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    };
});