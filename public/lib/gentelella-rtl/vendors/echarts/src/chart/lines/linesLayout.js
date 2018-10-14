define(function (require) {

    return function (ecModel) {
        ecModel.eachSeriesByType('lines', function (seriesModel) {
            var coordSys = seriesModel.coordinateSystem;
<<<<<<< HEAD
            var lineData = seriesModel.getData();

            // FIXME Use data dimensions ?
            lineData.each(function (idx) {
                var itemModel = lineData.getItemModel(idx);

                var coords = (itemModel.option instanceof Array) ?
                    itemModel.option : itemModel.get('coords');

                if (__DEV__) {
                    if (!(coords instanceof Array && coords.length > 0 && coords[0] instanceof Array)) {
                        throw new Error('Invalid coords ' + JSON.stringify(coords) + '. Lines must have 2d coords array in data item.');
                    }
                }
                var pts = [];

                if (seriesModel.get('polyline')) {
                    for (var i = 0; i < coords.length; i++) {
                        pts.push(coordSys.dataToPoint(coords[i]));
                    }
                }
                else {
                    pts[0] = coordSys.dataToPoint(coords[0]);
                    pts[1] = coordSys.dataToPoint(coords[1]);

                    var curveness = itemModel.get('lineStyle.normal.curveness');
                    if (+curveness) {
                        pts[2] = [
                            (pts[0][0] + pts[1][0]) / 2 - (pts[0][1] - pts[1][1]) * curveness,
                            (pts[0][1] + pts[1][1]) / 2 - (pts[1][0] - pts[0][0]) * curveness
                        ];
                    }
                }
                lineData.setItemLayout(idx, pts);
=======
            var fromData = seriesModel.fromData;
            var toData = seriesModel.toData;
            var lineData = seriesModel.getData();

            var dims = coordSys.dimensions;
            fromData.each(dims, function (x, y, idx) {
                fromData.setItemLayout(idx, coordSys.dataToPoint([x, y]));
            });
            toData.each(dims, function (x, y, idx) {
                toData.setItemLayout(idx, coordSys.dataToPoint([x, y]));
            });
            lineData.each(function (idx) {
                var p1 = fromData.getItemLayout(idx);
                var p2 = toData.getItemLayout(idx);
                var curveness = lineData.getItemModel(idx).get('lineStyle.normal.curveness');
                var cp1;
                if (curveness > 0) {
                    cp1 = [
                        (p1[0] + p2[0]) / 2 - (p1[1] - p2[1]) * curveness,
                        (p1[1] + p2[1]) / 2 - (p2[0] - p1[0]) * curveness
                    ];
                }
                lineData.setItemLayout(idx, [p1, p2, cp1]);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            });
        });
    };
});