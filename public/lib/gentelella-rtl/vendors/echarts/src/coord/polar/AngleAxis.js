define(function(require) {
    'use strict';

    var zrUtil = require('zrender/core/util');
    var Axis = require('../Axis');

    function AngleAxis(scale, angleExtent) {

        angleExtent = angleExtent || [0, 360];

        Axis.call(this, 'angle', scale, angleExtent);

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

    AngleAxis.prototype = {

        constructor: AngleAxis,

<<<<<<< HEAD
        /**
         * @override
         */
        pointToData: function (point, clamp) {
            return this.polar.pointToData(point, clamp)[this.dim === 'radius' ? 0 : 1];
        },

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        dataToAngle: Axis.prototype.dataToCoord,

        angleToData: Axis.prototype.coordToData
    };

    zrUtil.inherits(AngleAxis, Axis);

    return AngleAxis;
});