/**
 * Log scale
 * @module echarts/scale/Log
 */
define(function (require) {

    var zrUtil = require('zrender/core/util');
    var Scale = require('./Scale');
    var numberUtil = require('../util/number');

    // Use some method of IntervalScale
    var IntervalScale = require('./Interval');

    var scaleProto = Scale.prototype;
    var intervalScaleProto = IntervalScale.prototype;

<<<<<<< HEAD
    var getPrecisionSafe = numberUtil.getPrecisionSafe;
    var roundingErrorFix = numberUtil.round;

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    var mathFloor = Math.floor;
    var mathCeil = Math.ceil;
    var mathPow = Math.pow;

<<<<<<< HEAD
=======
    var LOG_BASE = 10;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    var mathLog = Math.log;

    var LogScale = Scale.extend({

        type: 'log',

<<<<<<< HEAD
        base: 10,

        $constructor: function () {
            Scale.apply(this, arguments);
            this._originalScale = new IntervalScale();
        },

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        /**
         * @return {Array.<number>}
         */
        getTicks: function () {
<<<<<<< HEAD
            var originalScale = this._originalScale;
            var extent = this._extent;
            var originalExtent = originalScale.getExtent();

            return zrUtil.map(intervalScaleProto.getTicks.call(this), function (val) {
                var powVal = numberUtil.round(mathPow(this.base, val));

                // Fix #4158
                powVal = (val === extent[0] && originalScale.__fixMin)
                    ? fixRoundingError(powVal, originalExtent[0])
                    : powVal;
                powVal = (val === extent[1] && originalScale.__fixMax)
                    ? fixRoundingError(powVal, originalExtent[1])
                    : powVal;

                return powVal;
            }, this);
=======
            return zrUtil.map(intervalScaleProto.getTicks.call(this), function (val) {
                return numberUtil.round(mathPow(LOG_BASE, val));
            });
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * @param {number} val
         * @return {string}
         */
        getLabel: intervalScaleProto.getLabel,

        /**
         * @param  {number} val
         * @return {number}
         */
        scale: function (val) {
            val = scaleProto.scale.call(this, val);
<<<<<<< HEAD
            return mathPow(this.base, val);
=======
            return mathPow(LOG_BASE, val);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * @param {number} start
         * @param {number} end
         */
        setExtent: function (start, end) {
<<<<<<< HEAD
            var base = this.base;
            start = mathLog(start) / mathLog(base);
            end = mathLog(end) / mathLog(base);
=======
            start = mathLog(start) / mathLog(LOG_BASE);
            end = mathLog(end) / mathLog(LOG_BASE);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            intervalScaleProto.setExtent.call(this, start, end);
        },

        /**
         * @return {number} end
         */
        getExtent: function () {
<<<<<<< HEAD
            var base = this.base;
            var extent = scaleProto.getExtent.call(this);
            extent[0] = mathPow(base, extent[0]);
            extent[1] = mathPow(base, extent[1]);

            // Fix #4158
            var originalScale = this._originalScale;
            var originalExtent = originalScale.getExtent();
            originalScale.__fixMin && (extent[0] = fixRoundingError(extent[0], originalExtent[0]));
            originalScale.__fixMax && (extent[1] = fixRoundingError(extent[1], originalExtent[1]));

=======
            var extent = scaleProto.getExtent.call(this);
            extent[0] = mathPow(LOG_BASE, extent[0]);
            extent[1] = mathPow(LOG_BASE, extent[1]);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            return extent;
        },

        /**
         * @param  {Array.<number>} extent
         */
        unionExtent: function (extent) {
<<<<<<< HEAD
            this._originalScale.unionExtent(extent);

            var base = this.base;
            extent[0] = mathLog(extent[0]) / mathLog(base);
            extent[1] = mathLog(extent[1]) / mathLog(base);
=======
            extent[0] = mathLog(extent[0]) / mathLog(LOG_BASE);
            extent[1] = mathLog(extent[1]) / mathLog(LOG_BASE);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            scaleProto.unionExtent.call(this, extent);
        },

        /**
<<<<<<< HEAD
         * @override
         */
        unionExtentFromData: function (data, dim) {
            this.unionExtent(data.getDataExtent(dim, true, function (val) {
                return val > 0;
            }));
        },

        /**
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
         * Update interval and extent of intervals for nice ticks
         * @param  {number} [approxTickNum = 10] Given approx tick number
         */
        niceTicks: function (approxTickNum) {
            approxTickNum = approxTickNum || 10;
            var extent = this._extent;
            var span = extent[1] - extent[0];
            if (span === Infinity || span <= 0) {
                return;
            }

<<<<<<< HEAD
            var interval = numberUtil.quantity(span);
=======
            var interval = mathPow(10, mathFloor(mathLog(span / approxTickNum) / Math.LN10));
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            var err = approxTickNum / span * interval;

            // Filter ticks to get closer to the desired count.
            if (err <= 0.5) {
                interval *= 10;
            }
<<<<<<< HEAD

            // Interval should be integer
            while (!isNaN(interval) && Math.abs(interval) < 1 && Math.abs(interval) > 0) {
                interval *= 10;
            }

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            var niceExtent = [
                numberUtil.round(mathCeil(extent[0] / interval) * interval),
                numberUtil.round(mathFloor(extent[1] / interval) * interval)
            ];

            this._interval = interval;
            this._niceExtent = niceExtent;
        },

        /**
         * Nice extent.
<<<<<<< HEAD
         * @override
         */
        niceExtent: function (opt) {
            intervalScaleProto.niceExtent.call(this, opt);

            var originalScale = this._originalScale;
            originalScale.__fixMin = opt.fixMin;
            originalScale.__fixMax = opt.fixMax;
        }

=======
         * @param {number} [approxTickNum = 10] Given approx tick number
         * @param {boolean} [fixMin=false]
         * @param {boolean} [fixMax=false]
         */
        niceExtent: intervalScaleProto.niceExtent
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    });

    zrUtil.each(['contain', 'normalize'], function (methodName) {
        LogScale.prototype[methodName] = function (val) {
<<<<<<< HEAD
            val = mathLog(val) / mathLog(this.base);
=======
            val = mathLog(val) / mathLog(LOG_BASE);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            return scaleProto[methodName].call(this, val);
        };
    });

    LogScale.create = function () {
        return new LogScale();
    };

<<<<<<< HEAD
    function fixRoundingError(val, originalVal) {
        return roundingErrorFix(val, getPrecisionSafe(originalVal));
    }

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    return LogScale;
});