define(function (require) {

<<<<<<< HEAD
    return function (seriesType, ecModel) {
=======
    return function (seriesType, ecModel, api) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        ecModel.eachSeriesByType(seriesType, function (seriesModel) {
            var data = seriesModel.getData();
            var coordSys = seriesModel.coordinateSystem;

<<<<<<< HEAD
            if (!coordSys) {
                return;
            }

            var dims = [];
            var coordDims = coordSys.dimensions;
            for (var i = 0; i < coordDims.length; i++) {
                dims.push(seriesModel.coordDimToDataDim(coordSys.dimensions[i])[0]);
            }

            if (dims.length === 1) {
                data.each(dims[0], function (x, idx) {
                    // Also {Array.<number>}, not undefined to avoid if...else... statement
                    data.setItemLayout(idx, isNaN(x) ? [NaN, NaN] : coordSys.dataToPoint(x));
                });
            }
            else if (dims.length === 2) {
                data.each(dims, function (x, y, idx) {
                    // Also {Array.<number>}, not undefined to avoid if...else... statement
                    data.setItemLayout(
                        idx, (isNaN(x) || isNaN(y)) ? [NaN, NaN] : coordSys.dataToPoint([x, y])
                    );
=======
            if (coordSys) {
                var dims = coordSys.dimensions;
                data.each(dims, function (x, y, idx) {
                    var point;
                    if (!isNaN(x) && !isNaN(y)) {
                        point = coordSys.dataToPoint([x, y]);
                    }
                    else {
                        // Also {Array.<number>}, not undefined to avoid if...else... statement
                        point = [NaN, NaN];
                    }

                    data.setItemLayout(idx, point);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                }, true);
            }
        });
    };
<<<<<<< HEAD
});
=======
});
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
