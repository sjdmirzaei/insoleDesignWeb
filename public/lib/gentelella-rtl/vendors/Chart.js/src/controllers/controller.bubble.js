<<<<<<< HEAD
'use strict';
=======
"use strict";
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

module.exports = function(Chart) {

	var helpers = Chart.helpers;

	Chart.defaults.bubble = {
		hover: {
<<<<<<< HEAD
			mode: 'single'
=======
			mode: "single"
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
		},

		scales: {
			xAxes: [{
<<<<<<< HEAD
				type: 'linear', // bubble should probably use a linear scale by default
				position: 'bottom',
				id: 'x-axis-0' // need an ID so datasets can reference the scale
			}],
			yAxes: [{
				type: 'linear',
				position: 'left',
				id: 'y-axis-0'
=======
				type: "linear", // bubble should probably use a linear scale by default
				position: "bottom",
				id: "x-axis-0" // need an ID so datasets can reference the scale
			}],
			yAxes: [{
				type: "linear",
				position: "left",
				id: "y-axis-0"
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
			}]
		},

		tooltips: {
			callbacks: {
<<<<<<< HEAD
				title: function() {
=======
				title: function(tooltipItems, data) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
					// Title doesn't make sense for scatter since we format the data as a point
					return '';
				},
				label: function(tooltipItem, data) {
					var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
					var dataPoint = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
<<<<<<< HEAD
					return datasetLabel + ': (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ', ' + dataPoint.r + ')';
=======
					return datasetLabel + ': (' + dataPoint.x + ', ' + dataPoint.y + ', ' + dataPoint.r + ')';
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
				}
			}
		}
	};

	Chart.controllers.bubble = Chart.DatasetController.extend({

		dataElementType: Chart.elements.Point,

<<<<<<< HEAD
		update: function(reset) {
			var me = this;
			var meta = me.getMeta();
=======
		update: function update(reset) {
			var meta = this.getMeta();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
			var points = meta.data;

			// Update Points
			helpers.each(points, function(point, index) {
<<<<<<< HEAD
				me.updateElement(point, index, reset);
			});
		},

		updateElement: function(point, index, reset) {
			var me = this;
			var meta = me.getMeta();
			var xScale = me.getScaleForId(meta.xAxisID);
			var yScale = me.getScaleForId(meta.yAxisID);

			var custom = point.custom || {};
			var dataset = me.getDataset();
			var data = dataset.data[index];
			var pointElementOptions = me.chart.options.elements.point;
			var dsIndex = me.index;
=======
				this.updateElement(point, index, reset);
			}, this);
		},

		updateElement: function(point, index, reset) {
			var meta = this.getMeta();
			var xScale = this.getScaleForId(meta.xAxisID);
			var yScale = this.getScaleForId(meta.yAxisID);

			var custom = point.custom || {};
			var dataset = this.getDataset();
			var data = dataset.data[index];
			var pointElementOptions = this.chart.options.elements.point;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

			helpers.extend(point, {
				// Utility
				_xScale: xScale,
				_yScale: yScale,
<<<<<<< HEAD
				_datasetIndex: dsIndex,
=======
				_datasetIndex: this.index,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
				_index: index,

				// Desired view properties
				_model: {
<<<<<<< HEAD
					x: reset ? xScale.getPixelForDecimal(0.5) : xScale.getPixelForValue(typeof data === 'object' ? data : NaN, index, dsIndex, me.chart.isCombo),
					y: reset ? yScale.getBasePixel() : yScale.getPixelForValue(data, index, dsIndex),
					// Appearance
					radius: reset ? 0 : custom.radius ? custom.radius : me.getRadius(data),
=======
					x: reset ? xScale.getPixelForDecimal(0.5) : xScale.getPixelForValue(data, index, this.index, this.chart.isCombo),
					y: reset ? yScale.getBasePixel() : yScale.getPixelForValue(data, index, this.index),
					// Appearance
					radius: reset ? 0 : custom.radius ? custom.radius : this.getRadius(data),
					backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, pointElementOptions.backgroundColor),
					borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, pointElementOptions.borderColor),
					borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, pointElementOptions.borderWidth),
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

					// Tooltip
					hitRadius: custom.hitRadius ? custom.hitRadius : helpers.getValueAtIndexOrDefault(dataset.hitRadius, index, pointElementOptions.hitRadius)
				}
			});

<<<<<<< HEAD
			// Trick to reset the styles of the point
			Chart.DatasetController.prototype.removeHoverStyle.call(me, point, pointElementOptions);

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
			var model = point._model;
			model.skip = custom.skip ? custom.skip : (isNaN(model.x) || isNaN(model.y));

			point.pivot();
		},

		getRadius: function(value) {
			return value.r || this.chart.options.elements.point.radius;
		},

		setHoverStyle: function(point) {
<<<<<<< HEAD
			var me = this;
			Chart.DatasetController.prototype.setHoverStyle.call(me, point);

			// Radius
			var dataset = me.chart.data.datasets[point._datasetIndex];
			var index = point._index;
			var custom = point.custom || {};
			var model = point._model;
			model.radius = custom.hoverRadius ? custom.hoverRadius : (helpers.getValueAtIndexOrDefault(dataset.hoverRadius, index, me.chart.options.elements.point.hoverRadius)) + me.getRadius(dataset.data[index]);
		},

		removeHoverStyle: function(point) {
			var me = this;
			Chart.DatasetController.prototype.removeHoverStyle.call(me, point, me.chart.options.elements.point);

			var dataVal = me.chart.data.datasets[point._datasetIndex].data[point._index];
			var custom = point.custom || {};
			var model = point._model;

			model.radius = custom.radius ? custom.radius : me.getRadius(dataVal);
=======
			// Point
			var dataset = this.chart.data.datasets[point._datasetIndex];
			var index = point._index;
			var custom = point.custom || {};
			var model = point._model;

			model.radius = custom.hoverRadius ? custom.hoverRadius : (helpers.getValueAtIndexOrDefault(dataset.hoverRadius, index, this.chart.options.elements.point.hoverRadius)) + this.getRadius(this.getDataset().data[point._index]);
			model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.hoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
			model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.hoverBorderColor, index, helpers.getHoverColor(model.borderColor));
			model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
		},

		removeHoverStyle: function(point) {
			var dataset = this.chart.data.datasets[point._datasetIndex];
			var index = point._index;
			var custom = point.custom || {};
			var model = point._model;
			var pointElementOptions = this.chart.options.elements.point;

			model.radius = custom.radius ? custom.radius : this.getRadius(dataset.data[point._index]);
			model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, pointElementOptions.backgroundColor);
			model.borderColor = custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, pointElementOptions.borderColor);
			model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, pointElementOptions.borderWidth);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
		}
	});
};
