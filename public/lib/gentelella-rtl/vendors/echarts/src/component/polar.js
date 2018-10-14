define(function(require) {
    'use strict';

<<<<<<< HEAD
    var zrUtil = require('zrender/core/util');

    require('../coord/polar/polarCreator');
    require('./angleAxis');
    require('./radiusAxis');
    require('./axisPointer');

    require('./axisPointer/PolarAxisPointer');

    // For reducing size of echarts.min, barLayoutPolar is required by polar.
    require('../echarts').registerLayout(zrUtil.curry(require('../layout/barPolar'), 'bar'));
=======
    require('../coord/polar/polarCreator');
    require('./angleAxis');
    require('./radiusAxis');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    // Polar view
    require('../echarts').extendComponentView({
        type: 'polar'
    });
});