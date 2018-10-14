<<<<<<< HEAD
'use strict';
=======
"use strict";
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

module.exports = function(Chart) {

	var defaultConfig = {
		hover: {
			mode: 'single'
		},

		scales: {
			xAxes: [{
<<<<<<< HEAD
				type: 'linear', // scatter should not use a category axis
				position: 'bottom',
				id: 'x-axis-1' // need an ID so datasets can reference the scale
			}],
			yAxes: [{
				type: 'linear',
				position: 'left',
				id: 'y-axis-1'
=======
				type: "linear", // scatter should not use a category axis
				position: "bottom",
				id: "x-axis-1" // need an ID so datasets can reference the scale
			}],
			yAxes: [{
				type: "linear",
				position: "left",
				id: "y-axis-1"
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
			}]
		},

		tooltips: {
			callbacks: {
<<<<<<< HEAD
				title: function() {
					// Title doesn't make sense for scatter since we format the data as a point
					return '';
				},
				label: function(tooltipItem) {
=======
				title: function(tooltipItems, data) {
					// Title doesn't make sense for scatter since we format the data as a point
					return '';
				},
				label: function(tooltipItem, data) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
					return '(' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
				}
			}
		}
	};

	// Register the default config for this type
	Chart.defaults.scatter = defaultConfig;

	// Scatter charts use line controllers
	Chart.controllers.scatter = Chart.controllers.line;

	Chart.Scatter = function(context, config) {
		config.type = 'scatter';
		return new Chart(context, config);
	};

<<<<<<< HEAD
};
=======
};
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
