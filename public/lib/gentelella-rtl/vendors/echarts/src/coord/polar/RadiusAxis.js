define(function (require) {
    'use strict';

    var zrUtil = require('zrender/core/util');
    var Axis = require('../Axis');

    function RadiusAxis(scale, radiusExtent) {

        Axis.call(this, 'radius', scale, radiusExtent);

        /**
         * Axis type
         *  - 'category'
         *  - 'value'
         *  - 'time'
         *  - 'log'
         * @type {string}
         */
        this.type = 'category';
    }

    RadiusAxis.prototype = {

        constructor: RadiusAxis,

<<<<<<< HEAD
        /**
         * @override
         */
        pointToData: function (point, clamp) {
            return this.polar.pointToData(point, clamp)[this.dim === 'radius' ? 0 : 1];
        },

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        dataToRadius: Axis.prototype.dataToCoord,

        radiusToData: Axis.prototype.coordToData
    };

    zrUtil.inherits(RadiusAxis, Axis);

    return RadiusAxis;
});