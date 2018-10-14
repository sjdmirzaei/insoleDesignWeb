define(function(require) {

    'use strict';

    var zrUtil = require('zrender/core/util');
    var ComponentModel = require('../../model/Component');
    var axisModelCreator = require('../axisModelCreator');

    var PolarAxisModel = ComponentModel.extend({
<<<<<<< HEAD

        type: 'polarAxis',

        /**
         * @type {module:echarts/coord/polar/AngleAxis|module:echarts/coord/polar/RadiusAxis}
         */
        axis: null,

        /**
         * @override
         */
        getCoordSysModel: function () {
            return this.ecModel.queryComponents({
                mainType: 'polar',
                index: this.option.polarIndex,
                id: this.option.polarId
            })[0];
        }

=======
        type: 'polarAxis',
        /**
         * @type {module:echarts/coord/polar/AngleAxis|module:echarts/coord/polar/RadiusAxis}
         */
        axis: null
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    });

    zrUtil.merge(PolarAxisModel.prototype, require('../axisModelCommonMixin'));

    var polarAxisDefaultExtendedOption = {
        angle: {
<<<<<<< HEAD
            // polarIndex: 0,
            // polarId: '',
=======
            polarIndex: 0,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            startAngle: 90,

            clockwise: true,

            splitNumber: 12,

            axisLabel: {
                rotate: false
            }
        },
        radius: {
<<<<<<< HEAD
            // polarIndex: 0,
            // polarId: '',
=======
            polarIndex: 0,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            splitNumber: 5
        }
    };

    function getAxisType(axisDim, option) {
        // Default axis with data is category axis
        return option.type || (option.data ? 'category' : 'value');
    }

    axisModelCreator('angle', PolarAxisModel, getAxisType, polarAxisDefaultExtendedOption.angle);
    axisModelCreator('radius', PolarAxisModel, getAxisType, polarAxisDefaultExtendedOption.radius);

});