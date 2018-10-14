<<<<<<< HEAD
'use strict';

module.exports = function(Chart) {

	Chart.Radar = function(context, config) {
=======
"use strict";

module.exports = function(Chart) {
	
	Chart.Radar = function(context, config) {
		config.options = Chart.helpers.configMerge({ aspectRatio: 1 }, config.options);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
		config.type = 'radar';

		return new Chart(context, config);
	};

};
