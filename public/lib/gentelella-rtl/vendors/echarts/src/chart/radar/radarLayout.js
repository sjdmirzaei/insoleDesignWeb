define(function (require) {

<<<<<<< HEAD
    return function (ecModel) {
=======
    return function (ecModel, api) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        ecModel.eachSeriesByType('radar', function (seriesModel) {
            var data = seriesModel.getData();
            var points = [];
            var coordSys = seriesModel.coordinateSystem;
            if (!coordSys) {
                return;
            }

            function pointsConverter(val, idx) {
                points[idx] = points[idx] || [];
                points[idx][i] = coordSys.dataToPoint(val, i);
            }
            for (var i = 0; i < coordSys.getIndicatorAxes().length; i++) {
                var dim = data.dimensions[i];
                data.each(dim, pointsConverter);
            }

            data.each(function (idx) {
                // Close polygon
                points[idx][0] && points[idx].push(points[idx][0].slice());
                data.setItemLayout(idx, points[idx]);
            });
        });
    };
});