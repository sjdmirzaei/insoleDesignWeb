<<<<<<< HEAD
/**
 * @namespace Chart
 */
var Chart = require('./core/core.js')();

require('./core/core.helpers')(Chart);
require('./platforms/platform.js')(Chart);
require('./core/core.canvasHelpers')(Chart);
require('./core/core.element')(Chart);
require('./core/core.plugin.js')(Chart);
=======
var Chart = require('./core/core.js')();

require('./core/core.helpers')(Chart);
require('./core/core.element')(Chart);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
require('./core/core.animation')(Chart);
require('./core/core.controller')(Chart);
require('./core/core.datasetController')(Chart);
require('./core/core.layoutService')(Chart);
<<<<<<< HEAD
require('./core/core.scaleService')(Chart);
require('./core/core.ticks.js')(Chart);
require('./core/core.scale')(Chart);
require('./core/core.interaction')(Chart);
=======
require('./core/core.legend')(Chart);
require('./core/core.plugin.js')(Chart);
require('./core/core.scale')(Chart);
require('./core/core.scaleService')(Chart);
require('./core/core.title')(Chart);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
require('./core/core.tooltip')(Chart);

require('./elements/element.arc')(Chart);
require('./elements/element.line')(Chart);
require('./elements/element.point')(Chart);
require('./elements/element.rectangle')(Chart);

<<<<<<< HEAD
require('./scales/scale.linearbase.js')(Chart);
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
require('./scales/scale.category')(Chart);
require('./scales/scale.linear')(Chart);
require('./scales/scale.logarithmic')(Chart);
require('./scales/scale.radialLinear')(Chart);
require('./scales/scale.time')(Chart);

// Controllers must be loaded after elements
// See Chart.core.datasetController.dataElementType
require('./controllers/controller.bar')(Chart);
require('./controllers/controller.bubble')(Chart);
require('./controllers/controller.doughnut')(Chart);
require('./controllers/controller.line')(Chart);
require('./controllers/controller.polarArea')(Chart);
require('./controllers/controller.radar')(Chart);

require('./charts/Chart.Bar')(Chart);
require('./charts/Chart.Bubble')(Chart);
require('./charts/Chart.Doughnut')(Chart);
require('./charts/Chart.Line')(Chart);
require('./charts/Chart.PolarArea')(Chart);
require('./charts/Chart.Radar')(Chart);
require('./charts/Chart.Scatter')(Chart);

<<<<<<< HEAD
// Loading built-it plugins
var plugins = [];

plugins.push(
    require('./plugins/plugin.filler.js')(Chart),
    require('./plugins/plugin.legend.js')(Chart),
    require('./plugins/plugin.title.js')(Chart)
);

Chart.plugins.register(plugins);

module.exports = Chart;
if (typeof window !== 'undefined') {
	window.Chart = Chart;
}
=======
window.Chart = module.exports = Chart;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
