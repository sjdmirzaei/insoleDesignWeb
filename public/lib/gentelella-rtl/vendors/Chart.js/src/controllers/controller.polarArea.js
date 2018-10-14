<<<<<<< HEAD
'use strict';
=======
"use strict";
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.polarArea = {

		scale: {
<<<<<<< HEAD
			type: 'radialLinear',
			angleLines: {
				display: false
			},
			gridLines: {
				circular: true
			},
			pointLabels: {
				display: false
			},
			ticks: {
				beginAtZero: true
			}
		},

		// Boolean - Whether to animate the rotation of the chart
=======
			type: "radialLinear",
			lineArc: true // so that lines are circular
		},

		//Boolean - Whether to animate the rotation of the chart
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
		animation: {
			animateRotate: true,
			animateScale: true
		},

<<<<<<< HEAD
		startAngle: -0.5 * Math.PI,
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
		aspectRatio: 1,
		legendCallback: function(chart) {
			var text = [];
			text.push('<ul class="' + chart.id + '-legend">');

			var data = chart.data;
			var datasets = data.datasets;
			var labels = data.labels;

			if (datasets.length) {
				for (var i = 0; i < datasets[0].data.length; ++i) {
<<<<<<< HEAD
					text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '"></span>');
					if (labels[i]) {
						text.push(labels[i]);
					}
					text.push('</li>');
=======
					text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '">');
					if (labels[i]) {
						text.push(labels[i]);
					}
					text.push('</span></li>');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
				}
			}

			text.push('</ul>');
<<<<<<< HEAD
			return text.join('');
=======
			return text.join("");
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
		},
		legend: {
			labels: {
				generateLabels: function(chart) {
					var data = chart.data;
					if (data.labels.length && data.datasets.length) {
						return data.labels.map(function(label, i) {
							var meta = chart.getDatasetMeta(0);
							var ds = data.datasets[0];
							var arc = meta.data[i];
							var custom = arc.custom || {};
							var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
							var arcOpts = chart.options.elements.arc;
							var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
							var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
							var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

							return {
								text: label,
								fillStyle: fill,
								strokeStyle: stroke,
								lineWidth: bw,
								hidden: isNaN(ds.data[i]) || meta.data[i].hidden,

								// Extra data used for toggling the correct item
								index: i
							};
						});
<<<<<<< HEAD
					}
					return [];
=======
					} else {
						return [];
					}
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
				}
			},

			onClick: function(e, legendItem) {
				var index = legendItem.index;
				var chart = this.chart;
				var i, ilen, meta;

				for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
					meta = chart.getDatasetMeta(i);
					meta.data[index].hidden = !meta.data[index].hidden;
				}

				chart.update();
			}
		},

		// Need to override these to give a nice default
		tooltips: {
			callbacks: {
				title: function() {
					return '';
				},
				label: function(tooltipItem, data) {
					return data.labels[tooltipItem.index] + ': ' + tooltipItem.yLabel;
				}
			}
		}
	};

	Chart.controllers.polarArea = Chart.DatasetController.extend({

		dataElementType: Chart.elements.Arc,

		linkScales: helpers.noop,

<<<<<<< HEAD
		update: function(reset) {
			var me = this;
			var chart = me.chart;
			var chartArea = chart.chartArea;
			var meta = me.getMeta();
=======
		update: function update(reset) {
			var _this = this;
			var chart = _this.chart;
			var chartArea = chart.chartArea;
			var meta = this.getMeta();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
			var opts = chart.options;
			var arcOpts = opts.elements.arc;
			var minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
			chart.outerRadius = Math.max((minSize - arcOpts.borderWidth / 2) / 2, 0);
			chart.innerRadius = Math.max(opts.cutoutPercentage ? (chart.outerRadius / 100) * (opts.cutoutPercentage) : 1, 0);
			chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();

<<<<<<< HEAD
			me.outerRadius = chart.outerRadius - (chart.radiusLength * me.index);
			me.innerRadius = me.outerRadius - chart.radiusLength;

			meta.count = me.countVisibleElements();

			helpers.each(meta.data, function(arc, index) {
				me.updateElement(arc, index, reset);
=======
			_this.outerRadius = chart.outerRadius - (chart.radiusLength * _this.index);
			_this.innerRadius = _this.outerRadius - chart.radiusLength;

			meta.count = _this.countVisibleElements();

			helpers.each(meta.data, function(arc, index) {
				_this.updateElement(arc, index, reset);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
			});
		},

		updateElement: function(arc, index, reset) {
<<<<<<< HEAD
			var me = this;
			var chart = me.chart;
			var dataset = me.getDataset();
			var opts = chart.options;
			var animationOpts = opts.animation;
=======
			var _this = this;
			var chart = _this.chart;
			var chartArea = chart.chartArea;
			var dataset = _this.getDataset();
			var opts = chart.options;
			var animationOpts = opts.animation;
			var arcOpts = opts.elements.arc;
			var custom = arc.custom || {};
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
			var scale = chart.scale;
			var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
			var labels = chart.data.labels;

<<<<<<< HEAD
			var circumference = me.calculateCircumference(dataset.data[index]);
			var centerX = scale.xCenter;
			var centerY = scale.yCenter;
=======
			var circumference = _this.calculateCircumference(dataset.data[index]);
			var centerX = (chartArea.left + chartArea.right) / 2;
			var centerY = (chartArea.top + chartArea.bottom) / 2;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

			// If there is NaN data before us, we need to calculate the starting angle correctly.
			// We could be way more efficient here, but its unlikely that the polar area chart will have a lot of data
			var visibleCount = 0;
<<<<<<< HEAD
			var meta = me.getMeta();
=======
			var meta = _this.getMeta();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
			for (var i = 0; i < index; ++i) {
				if (!isNaN(dataset.data[i]) && !meta.data[i].hidden) {
					++visibleCount;
				}
			}

<<<<<<< HEAD
			// var negHalfPI = -0.5 * Math.PI;
			var datasetStartAngle = opts.startAngle;
			var distance = arc.hidden ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);
			var startAngle = datasetStartAngle + (circumference * visibleCount);
			var endAngle = startAngle + (arc.hidden ? 0 : circumference);

			var resetRadius = animationOpts.animateScale ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);

			helpers.extend(arc, {
				// Utility
				_datasetIndex: me.index,
=======
			var distance = arc.hidden? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);
			var startAngle = (-0.5 * Math.PI) + (circumference * visibleCount);
			var endAngle = startAngle + (arc.hidden? 0 : circumference);

			var resetModel = {
				x: centerX,
				y: centerY,
				innerRadius: 0,
				outerRadius: animationOpts.animateScale ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]),
				startAngle: animationOpts.animateRotate ? Math.PI * -0.5 : startAngle,
				endAngle: animationOpts.animateRotate ? Math.PI * -0.5 : endAngle,

				backgroundColor: custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(dataset.backgroundColor, index, arcOpts.backgroundColor),
				borderWidth: custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(dataset.borderWidth, index, arcOpts.borderWidth),
				borderColor: custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(dataset.borderColor, index, arcOpts.borderColor),

				label: getValueAtIndexOrDefault(labels, index, labels[index])
			};

			helpers.extend(arc, {
				// Utility
				_datasetIndex: _this.index,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
				_index: index,
				_scale: scale,

				// Desired view properties
<<<<<<< HEAD
				_model: {
					x: centerX,
					y: centerY,
					innerRadius: 0,
					outerRadius: reset ? resetRadius : distance,
					startAngle: reset && animationOpts.animateRotate ? datasetStartAngle : startAngle,
					endAngle: reset && animationOpts.animateRotate ? datasetStartAngle : endAngle,
=======
				_model: reset ? resetModel : {
					x: centerX,
					y: centerY,
					innerRadius: 0,
					outerRadius: distance,
					startAngle: startAngle,
					endAngle: endAngle,

					backgroundColor: custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(dataset.backgroundColor, index, arcOpts.backgroundColor),
					borderWidth: custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(dataset.borderWidth, index, arcOpts.borderWidth),
					borderColor: custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(dataset.borderColor, index, arcOpts.borderColor),

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
					label: getValueAtIndexOrDefault(labels, index, labels[index])
				}
			});

<<<<<<< HEAD
			// Apply border and fill style
			me.removeHoverStyle(arc);

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
			arc.pivot();
		},

		removeHoverStyle: function(arc) {
			Chart.DatasetController.prototype.removeHoverStyle.call(this, arc, this.chart.options.elements.arc);
		},

		countVisibleElements: function() {
			var dataset = this.getDataset();
			var meta = this.getMeta();
			var count = 0;

			helpers.each(meta.data, function(element, index) {
				if (!isNaN(dataset.data[index]) && !element.hidden) {
					count++;
				}
			});

			return count;
		},

		calculateCircumference: function(value) {
			var count = this.getMeta().count;
			if (count > 0 && !isNaN(value)) {
				return (2 * Math.PI) / count;
<<<<<<< HEAD
			}
			return 0;
=======
			} else {
				return 0;
			}
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
		}
	});
};
