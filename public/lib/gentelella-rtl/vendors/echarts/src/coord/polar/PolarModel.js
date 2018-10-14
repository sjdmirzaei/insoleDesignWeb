define(function (require) {

    'use strict';

    require('./AxisModel');

    require('../../echarts').extendComponentModel({

        type: 'polar',

        dependencies: ['polarAxis', 'angleAxis'],

        /**
         * @type {module:echarts/coord/polar/Polar}
         */
        coordinateSystem: null,

        /**
         * @param {string} axisType
         * @return {module:echarts/coord/polar/AxisModel}
         */
        findAxisModel: function (axisType) {
<<<<<<< HEAD
            var foundAxisModel;
            var ecModel = this.ecModel;

            ecModel.eachComponent(axisType, function (axisModel) {
                if (axisModel.getCoordSysModel() === this) {
                    foundAxisModel = axisModel;
                }
            }, this);
            return foundAxisModel;
=======
            var angleAxisModel;
            var ecModel = this.ecModel;
            ecModel.eachComponent(axisType, function (axisModel) {
                if (ecModel.getComponent(
                        'polar', axisModel.getShallow('polarIndex')
                    ) === this) {
                    angleAxisModel = axisModel;
                }
            }, this);
            return angleAxisModel;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        defaultOption: {

            zlevel: 0,

            z: 0,

            center: ['50%', '50%'],

            radius: '80%'
        }
    });
});