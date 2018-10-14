/**
 * Export echarts as CommonJS module
 */
module.exports = require('./lib/echarts');

// Import all charts and components
require('./lib/chart/line');
require('./lib/chart/bar');
require('./lib/chart/pie');
require('./lib/chart/scatter');
require('./lib/chart/radar');

require('./lib/chart/map');
require('./lib/chart/treemap');
require('./lib/chart/graph');
require('./lib/chart/gauge');
require('./lib/chart/funnel');
require('./lib/chart/parallel');
require('./lib/chart/sankey');
require('./lib/chart/boxplot');
require('./lib/chart/candlestick');
require('./lib/chart/effectScatter');
require('./lib/chart/lines');
require('./lib/chart/heatmap');
<<<<<<< HEAD
require('./lib/chart/pictorialBar');
require('./lib/chart/themeRiver');
require('./lib/chart/custom');

require('./lib/component/graphic');
require('./lib/component/grid');
require('./lib/component/legend');
require('./lib/component/tooltip');
require('./lib/component/axisPointer');
require('./lib/component/polar');
require('./lib/component/geo');
require('./lib/component/parallel');
require('./lib/component/singleAxis');
require('./lib/component/brush');
require('./lib/component/calendar');
=======

require('./lib/component/grid');
require('./lib/component/legend');
require('./lib/component/tooltip');
require('./lib/component/polar');
require('./lib/component/geo');
require('./lib/component/parallel');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

require('./lib/component/title');

require('./lib/component/dataZoom');
require('./lib/component/visualMap');

require('./lib/component/markPoint');
require('./lib/component/markLine');
<<<<<<< HEAD
require('./lib/component/markArea');
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

require('./lib/component/timeline');
require('./lib/component/toolbox');

require('zrender/lib/vml/vml');
