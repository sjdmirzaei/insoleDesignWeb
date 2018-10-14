<<<<<<< HEAD
/**
 * @file Visual encoding for themeRiver view
 * @author  Deqing Li(annong035@gmail.com)
 */
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
define(function (require) {

    return function (ecModel) {
        ecModel.eachSeriesByType('themeRiver', function (seriesModel) {
            var data = seriesModel.getData();
            var rawData = seriesModel.getRawData();
            var colorList = seriesModel.get('color');

            data.each(function (index) {
                var name = data.getName(index);
<<<<<<< HEAD
                var color = colorList[(seriesModel.nameMap.get(name) - 1) % colorList.length];
                rawData.setItemVisual(index, 'color', color);
            });
        });
    };
});
=======
                var rawIndex = data.getRawIndex(index);
                // use rawData just for drawing legend
                rawData.setItemVisual(
                    rawIndex,
                    'color',
                    colorList[(seriesModel.nameMap[name] - 1) % colorList.length]
                );
            });
        });
   };
});
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
