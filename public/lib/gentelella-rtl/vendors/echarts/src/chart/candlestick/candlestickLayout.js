define(function (require) {

<<<<<<< HEAD
    var zrUtil = require('zrender/core/util');
    var retrieve = require('zrender/core/util').retrieve;
    var parsePercent = require('../../util/number').parsePercent;

    return function (ecModel) {
=======
    var CANDLE_MIN_WIDTH = 2;
    var CANDLE_MIN_NICE_WIDTH = 5;
    var GPA_MIN = 4;

    return function (ecModel, api) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

        ecModel.eachSeriesByType('candlestick', function (seriesModel) {

            var coordSys = seriesModel.coordinateSystem;
            var data = seriesModel.getData();
<<<<<<< HEAD
            var candleWidth = calculateCandleWidth(seriesModel, data);
            var chartLayout = seriesModel.get('layout');
            var variableDim = chartLayout === 'horizontal' ? 0 : 1;
            var constDim = 1 - variableDim;
            var coordDims = ['x', 'y'];
            var vDims = [];
            var cDim;

            zrUtil.each(data.dimensions, function (dimName) {
                var dimInfo = data.getDimensionInfo(dimName);
                var coordDim = dimInfo.coordDim;
                if (coordDim === coordDims[constDim]) {
                    vDims.push(dimName);
                }
                else if (coordDim === coordDims[variableDim]) {
                    cDim = dimName;
                }
            });

            if (cDim == null || vDims.length < 4) {
                return;
            }

            data.each([cDim].concat(vDims), function () {
                var args = arguments;
                var axisDimVal = args[0];
                var idx = args[vDims.length + 1];
=======
            var dimensions = seriesModel.dimensions;
            var chartLayout = seriesModel.get('layout');

            var candleWidth = calculateCandleWidth(seriesModel, data);

            data.each(dimensions, function () {
                var args = arguments;
                var dimLen = dimensions.length;
                var axisDimVal = args[0];
                var idx = args[dimLen];
                var variableDim = chartLayout === 'horizontal' ? 0 : 1;
                var constDim = 1 - variableDim;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

                var openVal = args[1];
                var closeVal = args[2];
                var lowestVal = args[3];
                var highestVal = args[4];

                var ocLow = Math.min(openVal, closeVal);
                var ocHigh = Math.max(openVal, closeVal);

                var ocLowPoint = getPoint(ocLow);
                var ocHighPoint = getPoint(ocHigh);
                var lowestPoint = getPoint(lowestVal);
                var highestPoint = getPoint(highestVal);

                var whiskerEnds = [
                    [highestPoint, ocHighPoint],
                    [lowestPoint, ocLowPoint]
                ];

                var bodyEnds = [];
                addBodyEnd(ocHighPoint, 0);
                addBodyEnd(ocLowPoint, 1);

                data.setItemLayout(idx, {
                    chartLayout: chartLayout,
                    sign: openVal > closeVal ? -1 : openVal < closeVal ? 1 : 0,
                    initBaseline: openVal > closeVal
                        ? ocHighPoint[constDim] : ocLowPoint[constDim], // open point.
                    bodyEnds: bodyEnds,
<<<<<<< HEAD
                    whiskerEnds: whiskerEnds,
                    brushRect: makeBrushRect()
=======
                    whiskerEnds: whiskerEnds
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                });

                function getPoint(val) {
                    var p = [];
                    p[variableDim] = axisDimVal;
                    p[constDim] = val;
                    return (isNaN(axisDimVal) || isNaN(val))
                        ? [NaN, NaN]
                        : coordSys.dataToPoint(p);
                }

                function addBodyEnd(point, start) {
                    var point1 = point.slice();
                    var point2 = point.slice();
                    point1[variableDim] += candleWidth / 2;
                    point2[variableDim] -= candleWidth / 2;
                    start
                        ? bodyEnds.push(point1, point2)
                        : bodyEnds.push(point2, point1);
                }

<<<<<<< HEAD
                function makeBrushRect() {
                    var pmin = getPoint(Math.min(openVal, closeVal, lowestVal, highestVal));
                    var pmax = getPoint(Math.max(openVal, closeVal, lowestVal, highestVal));

                    pmin[variableDim] -= candleWidth / 2;
                    pmax[variableDim] -= candleWidth / 2;

                    return {
                        x: pmin[0],
                        y: pmin[1],
                        width: constDim ? candleWidth : pmax[0] - pmin[0],
                        height: constDim ? pmax[1] - pmin[1] : candleWidth
                    };
                }

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }, true);
        });
    };

    function calculateCandleWidth(seriesModel, data) {
        var baseAxis = seriesModel.getBaseAxis();
        var extent;

        var bandWidth = baseAxis.type === 'category'
            ? baseAxis.getBandWidth()
            : (
                extent = baseAxis.getExtent(),
                Math.abs(extent[1] - extent[0]) / data.count()
            );

<<<<<<< HEAD
        var barMaxWidth = parsePercent(
            retrieve(seriesModel.get('barMaxWidth'), bandWidth),
            bandWidth
        );
        var barMinWidth = parsePercent(
            retrieve(seriesModel.get('barMinWidth'), 1),
            bandWidth
        );
        var barWidth = seriesModel.get('barWidth');
        return barWidth != null
            ? parsePercent(barWidth, bandWidth)
            // Put max outer to ensure bar visible in spite of overlap.
            : Math.max(Math.min(bandWidth / 2, barMaxWidth), barMinWidth);
=======
        // Half band width is perfect when space is enouph, otherwise
        // try not to be smaller than CANDLE_MIN_NICE_WIDTH (and only
        // gap is compressed), otherwise ensure not to be smaller than
        // CANDLE_MIN_WIDTH in spite of overlap.

        return bandWidth / 2 - 2 > CANDLE_MIN_NICE_WIDTH // "- 2" is minus border width
            ? bandWidth / 2 - 2
            : bandWidth - CANDLE_MIN_NICE_WIDTH > GPA_MIN
            ? CANDLE_MIN_NICE_WIDTH
            : Math.max(bandWidth - GPA_MIN, CANDLE_MIN_WIDTH);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    }

});