<<<<<<< HEAD
=======
// TODO minAngle

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
define(function (require) {

    var numberUtil = require('../../util/number');
    var parsePercent = numberUtil.parsePercent;
    var labelLayout = require('./labelLayout');
    var zrUtil = require('zrender/core/util');

    var PI2 = Math.PI * 2;
    var RADIAN = Math.PI / 180;

<<<<<<< HEAD
    return function (seriesType, ecModel, api, payload) {
=======
    return function (seriesType, ecModel, api) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        ecModel.eachSeriesByType(seriesType, function (seriesModel) {
            var center = seriesModel.get('center');
            var radius = seriesModel.get('radius');

            if (!zrUtil.isArray(radius)) {
                radius = [0, radius];
            }
            if (!zrUtil.isArray(center)) {
                center = [center, center];
            }

            var width = api.getWidth();
            var height = api.getHeight();
            var size = Math.min(width, height);
            var cx = parsePercent(center[0], width);
            var cy = parsePercent(center[1], height);
            var r0 = parsePercent(radius[0], size / 2);
            var r = parsePercent(radius[1], size / 2);

            var data = seriesModel.getData();

            var startAngle = -seriesModel.get('startAngle') * RADIAN;

            var minAngle = seriesModel.get('minAngle') * RADIAN;

<<<<<<< HEAD
            var validDataCount = 0;
            data.each('value', function (value) {
                !isNaN(value) && validDataCount++;
            });

            var sum = data.getSum('value');
            // Sum may be 0
            var unitRadian = Math.PI / (sum || validDataCount) * 2;
=======
            var sum = data.getSum('value');
            // Sum may be 0
            var unitRadian = Math.PI / (sum || data.count()) * 2;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            var clockwise = seriesModel.get('clockwise');

            var roseType = seriesModel.get('roseType');
<<<<<<< HEAD
            var stillShowZeroSum = seriesModel.get('stillShowZeroSum');
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            // [0...max]
            var extent = data.getDataExtent('value');
            extent[0] = 0;

            // In the case some sector angle is smaller than minAngle
            var restAngle = PI2;
            var valueSumLargerThanMinAngle = 0;

            var currentAngle = startAngle;
<<<<<<< HEAD
            var dir = clockwise ? 1 : -1;

            data.each('value', function (value, idx) {
                var angle;
                if (isNaN(value)) {
                    data.setItemLayout(idx, {
                        angle: NaN,
                        startAngle: NaN,
                        endAngle: NaN,
                        clockwise: clockwise,
                        cx: cx,
                        cy: cy,
                        r0: r0,
                        r: roseType
                            ? NaN
                            : r
                    });
                    return;
                }

                // FIXME 兼容 2.0 但是 roseType 是 area 的时候才是这样？
                if (roseType !== 'area') {
                    angle = (sum === 0 && stillShowZeroSum)
                        ? unitRadian : (value * unitRadian);
                }
                else {
                    angle = PI2 / validDataCount;
=======

            var dir = clockwise ? 1 : -1;
            data.each('value', function (value, idx) {
                var angle;
                // FIXME 兼容 2.0 但是 roseType 是 area 的时候才是这样？
                if (roseType !== 'area') {
                    angle = sum === 0 ? unitRadian : (value * unitRadian);
                }
                else {
                    angle = PI2 / (data.count() || 1);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                }

                if (angle < minAngle) {
                    angle = minAngle;
                    restAngle -= minAngle;
                }
                else {
                    valueSumLargerThanMinAngle += value;
                }

                var endAngle = currentAngle + dir * angle;
                data.setItemLayout(idx, {
                    angle: angle,
                    startAngle: currentAngle,
                    endAngle: endAngle,
                    clockwise: clockwise,
                    cx: cx,
                    cy: cy,
                    r0: r0,
                    r: roseType
                        ? numberUtil.linearMap(value, extent, [r0, r])
                        : r
                });

                currentAngle = endAngle;
            }, true);

            // Some sector is constrained by minAngle
            // Rest sectors needs recalculate angle
<<<<<<< HEAD
            if (restAngle < PI2 && validDataCount) {
                // Average the angle if rest angle is not enough after all angles is
                // Constrained by minAngle
                if (restAngle <= 1e-3) {
                    var angle = PI2 / validDataCount;
                    data.each('value', function (value, idx) {
                        if (!isNaN(value)) {
                            var layout = data.getItemLayout(idx);
                            layout.angle = angle;
                            layout.startAngle = startAngle + dir * idx * angle;
                            layout.endAngle = startAngle + dir * (idx + 1) * angle;
                        }
=======
            if (restAngle < PI2) {
                // Average the angle if rest angle is not enough after all angles is
                // Constrained by minAngle
                if (restAngle <= 1e-3) {
                    var angle = PI2 / data.count();
                    data.each(function (idx) {
                        var layout = data.getItemLayout(idx);
                        layout.startAngle = startAngle + dir * idx * angle;
                        layout.endAngle = startAngle + dir * (idx + 1) * angle;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    });
                }
                else {
                    unitRadian = restAngle / valueSumLargerThanMinAngle;
                    currentAngle = startAngle;
                    data.each('value', function (value, idx) {
<<<<<<< HEAD
                        if (!isNaN(value)) {
                            var layout = data.getItemLayout(idx);
                            var angle = layout.angle === minAngle
                                ? minAngle : value * unitRadian;
                            layout.startAngle = currentAngle;
                            layout.endAngle = currentAngle + dir * angle;
                            currentAngle += dir * angle;
                        }
=======
                        var layout = data.getItemLayout(idx);
                        var angle = layout.angle === minAngle
                            ? minAngle : value * unitRadian;
                        layout.startAngle = currentAngle;
                        layout.endAngle = currentAngle + dir * angle;
                        currentAngle += angle;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    });
                }
            }

            labelLayout(seriesModel, r, width, height);
        });
    };
});