/**
 * Export echarts as CommonJS module
 */
module.exports = require('./lib/echarts');

require('./lib/chart/line');
require('./lib/chart/bar');
require('./lib/chart/pie');
require('./lib/chart/scatter');
<<<<<<< HEAD
require('./lib/component/graphic');
require('./lib/component/tooltip');
require('./lib/component/axisPointer');
=======
require('./lib/component/tooltip');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
require('./lib/component/legend');

require('./lib/component/grid');
require('./lib/component/title');

require('./lib/component/markPoint');
require('./lib/component/markLine');
<<<<<<< HEAD
require('./lib/component/markArea');
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
require('./lib/component/dataZoom');
require('./lib/component/toolbox');

require('zrender/lib/vml/vml');