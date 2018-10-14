<<<<<<< HEAD
/* global window: false */
'use strict';
=======
/*global window: false */
"use strict";
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

var moment = require('moment');
moment = typeof(moment) === 'function' ? moment : window.moment;

module.exports = function(Chart) {

	var helpers = Chart.helpers;
<<<<<<< HEAD
	var interval = {
		millisecond: {
			size: 1,
			steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
		},
		second: {
			size: 1000,
			steps: [1, 2, 5, 10, 30]
		},
		minute: {
			size: 60000,
			steps: [1, 2, 5, 10, 30]
		},
		hour: {
			size: 3600000,
			steps: [1, 2, 3, 6, 12]
		},
		day: {
			size: 86400000,
			steps: [1, 2, 5]
		},
		week: {
			size: 604800000,
			maxStep: 4
		},
		month: {
			size: 2.628e9,
			maxStep: 3
		},
		quarter: {
			size: 7.884e9,
			maxStep: 4
		},
		year: {
			size: 3.154e10,
			maxStep: false
		}
	};

	var defaultConfig = {
		position: 'bottom',
=======
	var time = {
		units: [{
			name: 'millisecond',
			steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
		}, {
			name: 'second',
			steps: [1, 2, 5, 10, 30]
		}, {
			name: 'minute',
			steps: [1, 2, 5, 10, 30]
		}, {
			name: 'hour',
			steps: [1, 2, 3, 6, 12]
		}, {
			name: 'day',
			steps: [1, 2, 5]
		}, {
			name: 'week',
			maxStep: 4
		}, {
			name: 'month',
			maxStep: 3
		}, {
			name: 'quarter',
			maxStep: 4
		}, {
			name: 'year',
			maxStep: false
		}]
	};

	var defaultConfig = {
		position: "bottom",
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

		time: {
			parser: false, // false == a pattern string from http://momentjs.com/docs/#/parsing/string-format/ or a custom callback that converts its argument to a moment
			format: false, // DEPRECATED false == date objects, moment object, callback or a pattern string from http://momentjs.com/docs/#/parsing/string-format/
			unit: false, // false == automatic or override with week, month, year, etc.
			round: false, // none, or override with week, month, year, etc.
			displayFormat: false, // DEPRECATED
			isoWeekday: false, // override week start day - see http://momentjs.com/docs/#/get-set/iso-weekday/
<<<<<<< HEAD
			minUnit: 'millisecond',

			// defaults to unit's corresponding unitFormat below or override using pattern string from http://momentjs.com/docs/#/displaying/format/
			displayFormats: {
				millisecond: 'h:mm:ss.SSS a', // 11:20:01.123 AM,
				second: 'h:mm:ss a', // 11:20:01 AM
				minute: 'h:mm:ss a', // 11:20:01 AM
				hour: 'MMM D, hA', // Sept 4, 5PM
				day: 'll', // Sep 4 2015
				week: 'll', // Week 46, or maybe "[W]WW - YYYY" ?
				month: 'MMM YYYY', // Sept 2015
				quarter: '[Q]Q - YYYY', // Q3
				year: 'YYYY' // 2015
			},
=======

			// defaults to unit's corresponding unitFormat below or override using pattern string from http://momentjs.com/docs/#/displaying/format/
			displayFormats: {
				'millisecond': 'h:mm:ss.SSS a', // 11:20:01.123 AM,
				'second': 'h:mm:ss a', // 11:20:01 AM
				'minute': 'h:mm:ss a', // 11:20:01 AM
				'hour': 'MMM D, hA', // Sept 4, 5PM
				'day': 'll', // Sep 4 2015
				'week': 'll', // Week 46, or maybe "[W]WW - YYYY" ?
				'month': 'MMM YYYY', // Sept 2015
				'quarter': '[Q]Q - YYYY', // Q3
				'year': 'YYYY' // 2015
			}
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
		},
		ticks: {
			autoSkip: false
		}
	};

<<<<<<< HEAD
	/**
	 * Helper function to parse time to a moment object
	 * @param axis {TimeAxis} the time axis
	 * @param label {Date|string|number|Moment} The thing to parse
	 * @return {Moment} parsed time
	 */
	function parseTime(axis, label) {
		var timeOpts = axis.options.time;
		if (typeof timeOpts.parser === 'string') {
			return moment(label, timeOpts.parser);
		}
		if (typeof timeOpts.parser === 'function') {
			return timeOpts.parser(label);
		}
		if (typeof label.getMonth === 'function' || typeof label === 'number') {
			// Date objects
			return moment(label);
		}
		if (label.isValid && label.isValid()) {
			// Moment support
			return label;
		}
		var format = timeOpts.format;
		if (typeof format !== 'string' && format.call) {
			// Custom parsing (return an instance of moment)
			console.warn('options.time.format is deprecated and replaced by options.time.parser.');
			return format(label);
		}
		// Moment format parsing
		return moment(label, format);
	}

	/**
	 * Figure out which is the best unit for the scale
	 * @param minUnit {String} minimum unit to use
	 * @param min {Number} scale minimum
	 * @param max {Number} scale maximum
	 * @return {String} the unit to use
	 */
	function determineUnit(minUnit, min, max, maxTicks) {
		var units = Object.keys(interval);
		var unit;
		var numUnits = units.length;

		for (var i = units.indexOf(minUnit); i < numUnits; i++) {
			unit = units[i];
			var unitDetails = interval[unit];
			var steps = (unitDetails.steps && unitDetails.steps[unitDetails.steps.length - 1]) || unitDetails.maxStep;
			if (steps === undefined || Math.ceil((max - min) / (steps * unitDetails.size)) <= maxTicks) {
				break;
			}
		}

		return unit;
	}

	/**
	 * Determines how we scale the unit
	 * @param min {Number} the scale minimum
	 * @param max {Number} the scale maximum
	 * @param unit {String} the unit determined by the {@see determineUnit} method
	 * @return {Number} the axis step size as a multiple of unit
	 */
	function determineStepSize(min, max, unit, maxTicks) {
		// Using our unit, figoure out what we need to scale as
		var unitDefinition = interval[unit];
		var unitSizeInMilliSeconds = unitDefinition.size;
		var sizeInUnits = Math.ceil((max - min) / unitSizeInMilliSeconds);
		var multiplier = 1;
		var range = max - min;

		if (unitDefinition.steps) {
			// Have an array of steps
			var numSteps = unitDefinition.steps.length;
			for (var i = 0; i < numSteps && sizeInUnits > maxTicks; i++) {
				multiplier = unitDefinition.steps[i];
				sizeInUnits = Math.ceil(range / (unitSizeInMilliSeconds * multiplier));
			}
		} else {
			while (sizeInUnits > maxTicks && maxTicks > 0) {
				++multiplier;
				sizeInUnits = Math.ceil(range / (unitSizeInMilliSeconds * multiplier));
			}
		}

		return multiplier;
	}

	/**
	 * Helper for generating axis labels.
	 * @param options {ITimeGeneratorOptions} the options for generation
	 * @param dataRange {IRange} the data range
	 * @param niceRange {IRange} the pretty range to display
	 * @return {Number[]} ticks
	 */
	function generateTicks(options, dataRange, niceRange) {
		var ticks = [];
		if (options.maxTicks) {
			var stepSize = options.stepSize;
			ticks.push(options.min !== undefined ? options.min : niceRange.min);
			var cur = moment(niceRange.min);
			while (cur.add(stepSize, options.unit).valueOf() < niceRange.max) {
				ticks.push(cur.valueOf());
			}
			var realMax = options.max || niceRange.max;
			if (ticks[ticks.length - 1] !== realMax) {
				ticks.push(realMax);
			}
		}
		return ticks;
	}

	/**
	 * @function Chart.Ticks.generators.time
	 * @param options {ITimeGeneratorOptions} the options for generation
	 * @param dataRange {IRange} the data range
	 * @return {Number[]} ticks
	 */
	Chart.Ticks.generators.time = function(options, dataRange) {
		var niceMin;
		var niceMax;
		var isoWeekday = options.isoWeekday;
		if (options.unit === 'week' && isoWeekday !== false) {
			niceMin = moment(dataRange.min).startOf('isoWeek').isoWeekday(isoWeekday).valueOf();
			niceMax = moment(dataRange.max).startOf('isoWeek').isoWeekday(isoWeekday);
			if (dataRange.max - niceMax > 0) {
				niceMax.add(1, 'week');
			}
			niceMax = niceMax.valueOf();
		} else {
			niceMin = moment(dataRange.min).startOf(options.unit).valueOf();
			niceMax = moment(dataRange.max).startOf(options.unit);
			if (dataRange.max - niceMax > 0) {
				niceMax.add(1, options.unit);
			}
			niceMax = niceMax.valueOf();
		}
		return generateTicks(options, dataRange, {
			min: niceMin,
			max: niceMax
		});
	};

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
	var TimeScale = Chart.Scale.extend({
		initialize: function() {
			if (!moment) {
				throw new Error('Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com');
			}

			Chart.Scale.prototype.initialize.call(this);
		},
<<<<<<< HEAD
		determineDataLimits: function() {
			var me = this;
			var timeOpts = me.options.time;

			// We store the data range as unix millisecond timestamps so dataMin and dataMax will always be integers.
			var dataMin = Number.MAX_SAFE_INTEGER;
			var dataMax = Number.MIN_SAFE_INTEGER;

			var chartData = me.chart.data;
			var parsedData = {
				labels: [],
				datasets: []
			};

			var timestamp;

			helpers.each(chartData.labels, function(label, labelIndex) {
				var labelMoment = parseTime(me, label);

				if (labelMoment.isValid()) {
					// We need to round the time
					if (timeOpts.round) {
						labelMoment.startOf(timeOpts.round);
					}

					timestamp = labelMoment.valueOf();
					dataMin = Math.min(timestamp, dataMin);
					dataMax = Math.max(timestamp, dataMax);

					// Store this value for later
					parsedData.labels[labelIndex] = timestamp;
				}
			});

			helpers.each(chartData.datasets, function(dataset, datasetIndex) {
				var timestamps = [];

				if (typeof dataset.data[0] === 'object' && dataset.data[0] !== null && me.chart.isDatasetVisible(datasetIndex)) {
					// We have potential point data, so we need to parse this
					helpers.each(dataset.data, function(value, dataIndex) {
						var dataMoment = parseTime(me, me.getRightValue(value));

						if (dataMoment.isValid()) {
							if (timeOpts.round) {
								dataMoment.startOf(timeOpts.round);
							}

							timestamp = dataMoment.valueOf();
							dataMin = Math.min(timestamp, dataMin);
							dataMax = Math.max(timestamp, dataMax);
							timestamps[dataIndex] = timestamp;
						}
					});
				} else {
					// We have no x coordinates, so use the ones from the labels
					timestamps = parsedData.labels.slice();
				}

				parsedData.datasets[datasetIndex] = timestamps;
			});

			me.dataMin = dataMin;
			me.dataMax = dataMax;
			me._parsedData = parsedData;
		},
		buildTicks: function() {
			var me = this;
			var timeOpts = me.options.time;

			var minTimestamp;
			var maxTimestamp;
			var dataMin = me.dataMin;
			var dataMax = me.dataMax;

			if (timeOpts.min) {
				var minMoment = parseTime(me, timeOpts.min);
				if (timeOpts.round) {
					minMoment.round(timeOpts.round);
				}
				minTimestamp = minMoment.valueOf();
			}

			if (timeOpts.max) {
				maxTimestamp = parseTime(me, timeOpts.max).valueOf();
			}

			var maxTicks = me.getLabelCapacity(minTimestamp || dataMin);
			var unit = timeOpts.unit || determineUnit(timeOpts.minUnit, minTimestamp || dataMin, maxTimestamp || dataMax, maxTicks);
			me.displayFormat = timeOpts.displayFormats[unit];

			var stepSize = timeOpts.stepSize || determineStepSize(minTimestamp || dataMin, maxTimestamp || dataMax, unit, maxTicks);
			me.ticks = Chart.Ticks.generators.time({
				maxTicks: maxTicks,
				min: minTimestamp,
				max: maxTimestamp,
				stepSize: stepSize,
				unit: unit,
				isoWeekday: timeOpts.isoWeekday
			}, {
				min: dataMin,
				max: dataMax
			});

			// At this point, we need to update our max and min given the tick values since we have expanded the
			// range of the scale
			me.max = helpers.max(me.ticks);
			me.min = helpers.min(me.ticks);
		},
		// Get tooltip label
		getLabelForIndex: function(index, datasetIndex) {
			var me = this;
			var label = me.chart.data.labels && index < me.chart.data.labels.length ? me.chart.data.labels[index] : '';
			var value = me.chart.data.datasets[datasetIndex].data[index];

			if (value !== null && typeof value === 'object') {
				label = me.getRightValue(value);
			}

			// Format nicely
			if (me.options.time.tooltipFormat) {
				label = parseTime(me, label).format(me.options.time.tooltipFormat);
=======
		getLabelMoment: function(datasetIndex, index) {
			return this.labelMoments[datasetIndex][index];
		},
		getMomentStartOf: function(tick) {
			if (this.options.time.unit === 'week' && this.options.time.isoWeekday !== false) {
				return tick.clone().startOf('isoWeek').isoWeekday(this.options.time.isoWeekday);
			} else {
				return tick.clone().startOf(this.tickUnit);
			}
		},
		determineDataLimits: function() {
			this.labelMoments = [];

			// Only parse these once. If the dataset does not have data as x,y pairs, we will use
			// these
			var scaleLabelMoments = [];
			if (this.chart.data.labels && this.chart.data.labels.length > 0) {
				helpers.each(this.chart.data.labels, function(label, index) {
					var labelMoment = this.parseTime(label);

					if (labelMoment.isValid()) {
						if (this.options.time.round) {
							labelMoment.startOf(this.options.time.round);
						}
						scaleLabelMoments.push(labelMoment);
					}
				}, this);

				this.firstTick = moment.min.call(this, scaleLabelMoments);
				this.lastTick = moment.max.call(this, scaleLabelMoments);
			} else {
				this.firstTick = null;
				this.lastTick = null;
			}

			helpers.each(this.chart.data.datasets, function(dataset, datasetIndex) {
				var momentsForDataset = [];
				var datasetVisible = this.chart.isDatasetVisible(datasetIndex);

				if (typeof dataset.data[0] === 'object' && dataset.data[0] !== null) {
					helpers.each(dataset.data, function(value, index) {
						var labelMoment = this.parseTime(this.getRightValue(value));

						if (labelMoment.isValid()) {
							if (this.options.time.round) {
								labelMoment.startOf(this.options.time.round);
							}
							momentsForDataset.push(labelMoment);

							if (datasetVisible) {
								// May have gone outside the scale ranges, make sure we keep the first and last ticks updated
								this.firstTick = this.firstTick !== null ? moment.min(this.firstTick, labelMoment) : labelMoment;
								this.lastTick = this.lastTick !== null ? moment.max(this.lastTick, labelMoment) : labelMoment;
							}
						}
					}, this);
				} else {
					// We have no labels. Use the ones from the scale
					momentsForDataset = scaleLabelMoments;
				}

				this.labelMoments.push(momentsForDataset);
			}, this);

			// Set these after we've done all the data
			if (this.options.time.min) {
				this.firstTick = this.parseTime(this.options.time.min);
			}

			if (this.options.time.max) {
				this.lastTick = this.parseTime(this.options.time.max);
			}

			// We will modify these, so clone for later
			this.firstTick = (this.firstTick || moment()).clone();
			this.lastTick = (this.lastTick || moment()).clone();
		},
		buildTicks: function(index) {

			this.ctx.save();
			var tickFontSize = helpers.getValueOrDefault(this.options.ticks.fontSize, Chart.defaults.global.defaultFontSize);
			var tickFontStyle = helpers.getValueOrDefault(this.options.ticks.fontStyle, Chart.defaults.global.defaultFontStyle);
			var tickFontFamily = helpers.getValueOrDefault(this.options.ticks.fontFamily, Chart.defaults.global.defaultFontFamily);
			var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
			this.ctx.font = tickLabelFont;

			this.ticks = [];
			this.unitScale = 1; // How much we scale the unit by, ie 2 means 2x unit per step
			this.scaleSizeInUnits = 0; // How large the scale is in the base unit (seconds, minutes, etc)

			// Set unit override if applicable
			if (this.options.time.unit) {
				this.tickUnit = this.options.time.unit || 'day';
				this.displayFormat = this.options.time.displayFormats[this.tickUnit];
				this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, true);
				this.unitScale = helpers.getValueOrDefault(this.options.time.unitStepSize, 1);
			} else {
				// Determine the smallest needed unit of the time
				var innerWidth = this.isHorizontal() ? this.width - (this.paddingLeft + this.paddingRight) : this.height - (this.paddingTop + this.paddingBottom);

				// Crude approximation of what the label length might be
				var tempFirstLabel = this.tickFormatFunction(this.firstTick, 0, []);
				var tickLabelWidth = this.ctx.measureText(tempFirstLabel).width;
				var cosRotation = Math.cos(helpers.toRadians(this.options.ticks.maxRotation));
				var sinRotation = Math.sin(helpers.toRadians(this.options.ticks.maxRotation));
				tickLabelWidth = (tickLabelWidth * cosRotation) + (tickFontSize * sinRotation);
				var labelCapacity = innerWidth / (tickLabelWidth);

				// Start as small as possible
				this.tickUnit = 'millisecond';
				this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, true);
				this.displayFormat = this.options.time.displayFormats[this.tickUnit];

				var unitDefinitionIndex = 0;
				var unitDefinition = time.units[unitDefinitionIndex];

				// While we aren't ideal and we don't have units left
				while (unitDefinitionIndex < time.units.length) {
					// Can we scale this unit. If `false` we can scale infinitely
					this.unitScale = 1;

					if (helpers.isArray(unitDefinition.steps) && Math.ceil(this.scaleSizeInUnits / labelCapacity) < helpers.max(unitDefinition.steps)) {
						// Use one of the prefedined steps
						for (var idx = 0; idx < unitDefinition.steps.length; ++idx) {
							if (unitDefinition.steps[idx] >= Math.ceil(this.scaleSizeInUnits / labelCapacity)) {
								this.unitScale = helpers.getValueOrDefault(this.options.time.unitStepSize, unitDefinition.steps[idx]);
								break;
							}
						}

						break;
					} else if ((unitDefinition.maxStep === false) || (Math.ceil(this.scaleSizeInUnits / labelCapacity) < unitDefinition.maxStep)) {
						// We have a max step. Scale this unit
						this.unitScale = helpers.getValueOrDefault(this.options.time.unitStepSize, Math.ceil(this.scaleSizeInUnits / labelCapacity));
						break;
					} else {
						// Move to the next unit up
						++unitDefinitionIndex;
						unitDefinition = time.units[unitDefinitionIndex];

						this.tickUnit = unitDefinition.name;
						var leadingUnitBuffer = this.firstTick.diff(this.getMomentStartOf(this.firstTick), this.tickUnit, true);
						var trailingUnitBuffer = this.getMomentStartOf(this.lastTick.clone().add(1, this.tickUnit)).diff(this.lastTick, this.tickUnit, true);
						this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, true) + leadingUnitBuffer + trailingUnitBuffer;
						this.displayFormat = this.options.time.displayFormats[unitDefinition.name];
					}
				}
			}

			var roundedStart;

			// Only round the first tick if we have no hard minimum
			if (!this.options.time.min) {
				this.firstTick = this.getMomentStartOf(this.firstTick);
				roundedStart = this.firstTick;
			} else {
				roundedStart = this.getMomentStartOf(this.firstTick);
			}

			// Only round the last tick if we have no hard maximum
			if (!this.options.time.max) {
				var roundedEnd = this.getMomentStartOf(this.lastTick);
				if (roundedEnd.diff(this.lastTick, this.tickUnit, true) !== 0) {
					// Do not use end of because we need this to be in the next time unit
					this.lastTick = this.getMomentStartOf(this.lastTick.add(1, this.tickUnit));
				}
			}

			this.smallestLabelSeparation = this.width;

			helpers.each(this.chart.data.datasets, function(dataset, datasetIndex) {
				for (var i = 1; i < this.labelMoments[datasetIndex].length; i++) {
					this.smallestLabelSeparation = Math.min(this.smallestLabelSeparation, this.labelMoments[datasetIndex][i].diff(this.labelMoments[datasetIndex][i - 1], this.tickUnit, true));
				}
			}, this);

			// Tick displayFormat override
			if (this.options.time.displayFormat) {
				this.displayFormat = this.options.time.displayFormat;
			}

			// first tick. will have been rounded correctly if options.time.min is not specified
			this.ticks.push(this.firstTick.clone());

			// For every unit in between the first and last moment, create a moment and add it to the ticks tick
			for (var i = 1; i <= this.scaleSizeInUnits; ++i) {
				var newTick = roundedStart.clone().add(i, this.tickUnit);

				// Are we greater than the max time
				if (this.options.time.max && newTick.diff(this.lastTick, this.tickUnit, true) >= 0) {
					break;
				}

				if (i % this.unitScale === 0) {
					this.ticks.push(newTick);
				}
			}

			// Always show the right tick
			var diff = this.ticks[this.ticks.length - 1].diff(this.lastTick, this.tickUnit);
			if (diff !== 0 || this.scaleSizeInUnits === 0) {
				// this is a weird case. If the <max> option is the same as the end option, we can't just diff the times because the tick was created from the roundedStart
				// but the last tick was not rounded.
				if (this.options.time.max) {
					this.ticks.push(this.lastTick.clone());
					this.scaleSizeInUnits = this.lastTick.diff(this.ticks[0], this.tickUnit, true);
				} else {
					this.ticks.push(this.lastTick.clone());
					this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, true);
				}
			}

			this.ctx.restore();
		},
		// Get tooltip label
		getLabelForIndex: function(index, datasetIndex) {
			var label = this.chart.data.labels && index < this.chart.data.labels.length ? this.chart.data.labels[index] : '';

			if (typeof this.chart.data.datasets[datasetIndex].data[0] === 'object') {
				label = this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
			}

			// Format nicely
			if (this.options.time.tooltipFormat) {
				label = this.parseTime(label).format(this.options.time.tooltipFormat);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
			}

			return label;
		},
		// Function to format an individual tick mark
<<<<<<< HEAD
		tickFormatFunction: function(tick, index, ticks) {
=======
		tickFormatFunction: function tickFormatFunction(tick, index, ticks) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
			var formattedTick = tick.format(this.displayFormat);
			var tickOpts = this.options.ticks;
			var callback = helpers.getValueOrDefault(tickOpts.callback, tickOpts.userCallback);

			if (callback) {
				return callback(formattedTick, index, ticks);
<<<<<<< HEAD
			}
			return formattedTick;
		},
		convertTicksToLabels: function() {
			var me = this;
			me.ticksAsTimestamps = me.ticks;
			me.ticks = me.ticks.map(function(tick) {
				return moment(tick);
			}).map(me.tickFormatFunction, me);
		},
		getPixelForOffset: function(offset) {
			var me = this;
			var epochWidth = me.max - me.min;
			var decimal = epochWidth ? (offset - me.min) / epochWidth : 0;

			if (me.isHorizontal()) {
				var valueOffset = (me.width * decimal);
				return me.left + Math.round(valueOffset);
			}

			var heightOffset = (me.height * decimal);
			return me.top + Math.round(heightOffset);
		},
		getPixelForValue: function(value, index, datasetIndex) {
			var me = this;
			var offset = null;
			if (index !== undefined && datasetIndex !== undefined) {
				offset = me._parsedData.datasets[datasetIndex][index];
			}

			if (offset === null) {
				if (!value || !value.isValid) {
					// not already a moment object
					value = parseTime(me, me.getRightValue(value));
				}

				if (value && value.isValid && value.isValid()) {
					offset = value.valueOf();
				}
			}

			if (offset !== null) {
				return me.getPixelForOffset(offset);
			}
		},
		getPixelForTick: function(index) {
			return this.getPixelForOffset(this.ticksAsTimestamps[index]);
		},
		getValueForPixel: function(pixel) {
			var me = this;
			var innerDimension = me.isHorizontal() ? me.width : me.height;
			var offset = (pixel - (me.isHorizontal() ? me.left : me.top)) / innerDimension;
			return moment(me.min + (offset * (me.max - me.min)));
		},
		// Crude approximation of what the label width might be
		getLabelWidth: function(label) {
			var me = this;
			var ticks = me.options.ticks;

			var tickLabelWidth = me.ctx.measureText(label).width;
			var cosRotation = Math.cos(helpers.toRadians(ticks.maxRotation));
			var sinRotation = Math.sin(helpers.toRadians(ticks.maxRotation));
			var tickFontSize = helpers.getValueOrDefault(ticks.fontSize, Chart.defaults.global.defaultFontSize);
			return (tickLabelWidth * cosRotation) + (tickFontSize * sinRotation);
		},
		getLabelCapacity: function(exampleTime) {
			var me = this;

			me.displayFormat = me.options.time.displayFormats.millisecond;	// Pick the longest format for guestimation
			var exampleLabel = me.tickFormatFunction(moment(exampleTime), 0, []);
			var tickLabelWidth = me.getLabelWidth(exampleLabel);

			var innerWidth = me.isHorizontal() ? me.width : me.height;
			var labelCapacity = innerWidth / tickLabelWidth;
			return labelCapacity;
		}
	});
	Chart.scaleService.registerScaleType('time', TimeScale, defaultConfig);
=======
			} else {
				return formattedTick;
			}
		},
		convertTicksToLabels: function() {
			this.tickMoments = this.ticks;
			this.ticks = this.ticks.map(this.tickFormatFunction, this);
		},
		getPixelForValue: function(value, index, datasetIndex, includeOffset) {
			var labelMoment = value && value.isValid && value.isValid() ? value : this.getLabelMoment(datasetIndex, index);

			if (labelMoment) {
				var offset = labelMoment.diff(this.firstTick, this.tickUnit, true);

				var decimal = offset / this.scaleSizeInUnits;

				if (this.isHorizontal()) {
					var innerWidth = this.width - (this.paddingLeft + this.paddingRight);
					var valueWidth = innerWidth / Math.max(this.ticks.length - 1, 1);
					var valueOffset = (innerWidth * decimal) + this.paddingLeft;

					return this.left + Math.round(valueOffset);
				} else {
					var innerHeight = this.height - (this.paddingTop + this.paddingBottom);
					var valueHeight = innerHeight / Math.max(this.ticks.length - 1, 1);
					var heightOffset = (innerHeight * decimal) + this.paddingTop;

					return this.top + Math.round(heightOffset);
				}
			}
		},
		getPixelForTick: function(index, includeOffset) {
			return this.getPixelForValue(this.tickMoments[index], null, null, includeOffset);
		},
		getValueForPixel: function(pixel) {
			var innerDimension = this.isHorizontal() ? this.width - (this.paddingLeft + this.paddingRight) : this.height - (this.paddingTop + this.paddingBottom);
			var offset = (pixel - (this.isHorizontal() ? this.left + this.paddingLeft : this.top + this.paddingTop)) / innerDimension;
			offset *= this.scaleSizeInUnits;
			return this.firstTick.clone().add(moment.duration(offset, this.tickUnit).asSeconds(), 'seconds');
		},
		parseTime: function(label) {
			if (typeof this.options.time.parser === 'string') {
				return moment(label, this.options.time.parser);
			}
			if (typeof this.options.time.parser === 'function') {
				return this.options.time.parser(label);
			}
			// Date objects
			if (typeof label.getMonth === 'function' || typeof label === 'number') {
				return moment(label);
			}
			// Moment support
			if (label.isValid && label.isValid()) {
				return label;
			}
			// Custom parsing (return an instance of moment)
			if (typeof this.options.time.format !== 'string' && this.options.time.format.call) {
				console.warn("options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale");
				return this.options.time.format(label);
			}
			// Moment format parsing
			return moment(label, this.options.time.format);
		}
	});
	Chart.scaleService.registerScaleType("time", TimeScale, defaultConfig);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

};
