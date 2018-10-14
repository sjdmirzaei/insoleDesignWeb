define(function (require) {

    var simpleLayoutHelper = require('./simpleLayoutHelper');
    var simpleLayoutEdge = require('./simpleLayoutEdge');
<<<<<<< HEAD

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    return function (ecModel, api) {
        ecModel.eachSeriesByType('graph', function (seriesModel) {
            var layout = seriesModel.get('layout');
            var coordSys = seriesModel.coordinateSystem;
            if (coordSys && coordSys.type !== 'view') {
                var data = seriesModel.getData();
<<<<<<< HEAD
                var dimensions = coordSys.dimensions;

                data.each(dimensions, function () {
                    var hasValue;
                    var args = arguments;
                    var value = [];
                    for (var i = 0; i < dimensions.length; i++) {
                        if (!isNaN(args[i])) {
                            hasValue = true;
                        }
                        value.push(args[i]);
                    }
                    var idx = args[args.length - 1];

                    if (hasValue) {
                        data.setItemLayout(idx, coordSys.dataToPoint(value));
=======
                data.each(coordSys.dimensions, function (x, y, idx) {
                    if (!isNaN(x) && !isNaN(y)) {
                        data.setItemLayout(idx, coordSys.dataToPoint([x, y]));
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    }
                    else {
                        // Also {Array.<number>}, not undefined to avoid if...else... statement
                        data.setItemLayout(idx, [NaN, NaN]);
                    }
                });

                simpleLayoutEdge(data.graph);
            }
            else if (!layout || layout === 'none') {
                simpleLayoutHelper(seriesModel);
            }
        });
    };
<<<<<<< HEAD
});
=======
});
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
