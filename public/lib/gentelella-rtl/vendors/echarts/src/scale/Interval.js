/**
 * Interval scale
 * @module echarts/scale/Interval
 */

define(function (require) {

    var numberUtil = require('../util/number');
    var formatUtil = require('../util/format');
    var Scale = require('./Scale');
<<<<<<< HEAD
    var helper = require('./helper');

    var roundNumber = numberUtil.round;

=======

    var mathFloor = Math.floor;
    var mathCeil = Math.ceil;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    /**
     * @alias module:echarts/coord/scale/Interval
     * @constructor
     */
    var IntervalScale = Scale.extend({

        type: 'interval',

        _interval: 0,

<<<<<<< HEAD
        _intervalPrecision: 2,

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        setExtent: function (start, end) {
            var thisExtent = this._extent;
            //start,end may be a Number like '25',so...
            if (!isNaN(start)) {
                thisExtent[0] = parseFloat(start);
            }
            if (!isNaN(end)) {
                thisExtent[1] = parseFloat(end);
            }
        },

        unionExtent: function (other) {
            var extent = this._extent;
            other[0] < extent[0] && (extent[0] = other[0]);
            other[1] > extent[1] && (extent[1] = other[1]);

            // unionExtent may called by it's sub classes
            IntervalScale.prototype.setExtent.call(this, extent[0], extent[1]);
        },
        /**
         * Get interval
         */
        getInterval: function () {
<<<<<<< HEAD
=======
            if (!this._interval) {
                this.niceTicks();
            }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            return this._interval;
        },

        /**
         * Set interval
         */
        setInterval: function (interval) {
            this._interval = interval;
            // Dropped auto calculated niceExtent and use user setted extent
            // We assume user wan't to set both interval, min, max to get a better result
            this._niceExtent = this._extent.slice();
<<<<<<< HEAD

            this._intervalPrecision = helper.getIntervalPrecision(interval);
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * @return {Array.<number>}
         */
        getTicks: function () {
<<<<<<< HEAD
            return helper.intervalScaleGetTicks(
                this._interval, this._extent, this._niceExtent, this._intervalPrecision
            );
=======
            if (!this._interval) {
                this.niceTicks();
            }
            var interval = this._interval;
            var extent = this._extent;
            var ticks = [];

            // Consider this case: using dataZoom toolbox, zoom and zoom.
            var safeLimit = 10000;

            if (interval) {
                var niceExtent = this._niceExtent;
                if (extent[0] < niceExtent[0]) {
                    ticks.push(extent[0]);
                }
                var tick = niceExtent[0];
                while (tick <= niceExtent[1]) {
                    ticks.push(tick);
                    // Avoid rounding error
                    tick = numberUtil.round(tick + interval);
                    if (ticks.length > safeLimit) {
                        return [];
                    }
                }
                if (extent[1] > niceExtent[1]) {
                    ticks.push(extent[1]);
                }
            }

            return ticks;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * @return {Array.<string>}
         */
        getTicksLabels: function () {
            var labels = [];
            var ticks = this.getTicks();
            for (var i = 0; i < ticks.length; i++) {
                labels.push(this.getLabel(ticks[i]));
            }
            return labels;
        },

        /**
<<<<<<< HEAD
         * @param {number} data
         * @param {Object} [opt]
         * @param {number|string} [opt.precision] If 'auto', use nice presision.
         * @param {boolean} [opt.pad] returns 1.50 but not 1.5 if precision is 2.
         * @return {string}
         */
        getLabel: function (data, opt) {
            if (data == null) {
                return '';
            }

            var precision = opt && opt.precision;

            if (precision == null) {
                precision = numberUtil.getPrecisionSafe(data) || 0;
            }
            else if (precision === 'auto') {
                // Should be more precise then tick.
                precision = this._intervalPrecision;
            }

            // (1) If `precision` is set, 12.005 should be display as '12.00500'.
            // (2) Use roundNumber (toFixed) to avoid scientific notation like '3.5e-7'.
            data = roundNumber(data, precision, true);

=======
         * @param {number} n
         * @return {number}
         */
        getLabel: function (data) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            return formatUtil.addCommas(data);
        },

        /**
         * Update interval and extent of intervals for nice ticks
         *
         * @param {number} [splitNumber = 5] Desired number of ticks
<<<<<<< HEAD
         * @param {number} [minInterval]
         */
        niceTicks: function (splitNumber, minInterval) {
=======
         */
        niceTicks: function (splitNumber) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            splitNumber = splitNumber || 5;
            var extent = this._extent;
            var span = extent[1] - extent[0];
            if (!isFinite(span)) {
                return;
            }
            // User may set axis min 0 and data are all negative
            // FIXME If it needs to reverse ?
            if (span < 0) {
                span = -span;
                extent.reverse();
            }

<<<<<<< HEAD
            var result = helper.intervalScaleNiceTicks(extent, splitNumber, minInterval);

            this._intervalPrecision = result.intervalPrecision;
            this._interval = result.interval;
            this._niceExtent = result.niceTickExtent;
=======
            // From "Nice Numbers for Graph Labels" of Graphic Gems
            // var niceSpan = numberUtil.nice(span, false);
            var step = numberUtil.nice(span / splitNumber, true);

            // Niced extent inside original extent
            var niceExtent = [
                numberUtil.round(mathCeil(extent[0] / step) * step),
                numberUtil.round(mathFloor(extent[1] / step) * step)
            ];

            this._interval = step;
            this._niceExtent = niceExtent;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * Nice extent.
<<<<<<< HEAD
         * @param {Object} opt
         * @param {number} [opt.splitNumber = 5] Given approx tick number
         * @param {boolean} [opt.fixMin=false]
         * @param {boolean} [opt.fixMax=false]
         * @param {boolean} [opt.minInterval=false]
         */
        niceExtent: function (opt) {
=======
         * @param {number} [splitNumber = 5] Given approx tick number
         * @param {boolean} [fixMin=false]
         * @param {boolean} [fixMax=false]
         */
        niceExtent: function (splitNumber, fixMin, fixMax) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            var extent = this._extent;
            // If extent start and end are same, expand them
            if (extent[0] === extent[1]) {
                if (extent[0] !== 0) {
                    // Expand extent
<<<<<<< HEAD
                    var expandSize = extent[0];
                    // In the fowllowing case
                    //      Axis has been fixed max 100
                    //      Plus data are all 100 and axis extent are [100, 100].
                    // Extend to the both side will cause expanded max is larger than fixed max.
                    // So only expand to the smaller side.
                    if (!opt.fixMax) {
                        extent[1] += expandSize / 2;
                        extent[0] -= expandSize / 2;
                    }
                    else {
                        extent[0] -= expandSize / 2;
                    }
=======
                    var expandSize = extent[0] / 2;
                    extent[0] -= expandSize;
                    extent[1] += expandSize;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                }
                else {
                    extent[1] = 1;
                }
            }
            var span = extent[1] - extent[0];
            // If there are no data and extent are [Infinity, -Infinity]
            if (!isFinite(span)) {
                extent[0] = 0;
                extent[1] = 1;
            }

<<<<<<< HEAD
            this.niceTicks(opt.splitNumber, opt.minInterval);
=======
            this.niceTicks(splitNumber);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            // var extent = this._extent;
            var interval = this._interval;

<<<<<<< HEAD
            if (!opt.fixMin) {
                extent[0] = roundNumber(Math.floor(extent[0] / interval) * interval);
            }
            if (!opt.fixMax) {
                extent[1] = roundNumber(Math.ceil(extent[1] / interval) * interval);
=======
            if (!fixMin) {
                extent[0] = numberUtil.round(mathFloor(extent[0] / interval) * interval);
            }
            if (!fixMax) {
                extent[1] = numberUtil.round(mathCeil(extent[1] / interval) * interval);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }
        }
    });

    /**
     * @return {module:echarts/scale/Time}
     */
    IntervalScale.create = function () {
        return new IntervalScale();
    };

    return IntervalScale;
});
