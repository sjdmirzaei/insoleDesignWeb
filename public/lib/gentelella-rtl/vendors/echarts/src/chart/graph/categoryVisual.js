define(function (require) {

    return function (ecModel) {
<<<<<<< HEAD

        var paletteScope = {};
        ecModel.eachSeriesByType('graph', function (seriesModel) {
=======
        ecModel.eachSeriesByType('graph', function (seriesModel) {
            var colorList = seriesModel.get('color');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            var categoriesData = seriesModel.getCategoriesData();
            var data = seriesModel.getData();

            var categoryNameIdxMap = {};

            categoriesData.each(function (idx) {
<<<<<<< HEAD
                var name = categoriesData.getName(idx);
                // Add prefix to avoid conflict with Object.prototype.
                categoryNameIdxMap['ec-' + name] = idx;

                var itemModel = categoriesData.getItemModel(idx);
                var color = itemModel.get('itemStyle.normal.color')
                    || seriesModel.getColorFromPalette(name, paletteScope);
=======
                categoryNameIdxMap[categoriesData.getName(idx)] = idx;

                var itemModel = categoriesData.getItemModel(idx);
                var rawIdx = categoriesData.getRawIndex(idx);
                var color = itemModel.get('itemStyle.normal.color')
                    || colorList[rawIdx % colorList.length];
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                categoriesData.setItemVisual(idx, 'color', color);
            });

            // Assign category color to visual
            if (categoriesData.count()) {
                data.each(function (idx) {
                    var model = data.getItemModel(idx);
                    var category = model.getShallow('category');
                    if (category != null) {
                        if (typeof category === 'string') {
<<<<<<< HEAD
                            category = categoryNameIdxMap['ec-' + category];
=======
                            category = categoryNameIdxMap[category];
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                        }
                        if (!data.getItemVisual(idx, 'color', true)) {
                            data.setItemVisual(
                                idx, 'color',
                                categoriesData.getItemVisual(category, 'color')
                            );
                        }
                    }
                });
            }
        });
    };
});