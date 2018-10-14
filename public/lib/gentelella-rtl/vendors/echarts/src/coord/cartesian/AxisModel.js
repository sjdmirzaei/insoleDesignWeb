define(function(require) {

    'use strict';

    var ComponentModel = require('../../model/Component');
    var zrUtil = require('zrender/core/util');
    var axisModelCreator = require('../axisModelCreator');

    var AxisModel = ComponentModel.extend({

        type: 'cartesian2dAxis',

        /**
         * @type {module:echarts/coord/cartesian/Axis2D}
         */
        axis: null,

        /**
         * @override
         */
        init: function () {
            AxisModel.superApply(this, 'init', arguments);
<<<<<<< HEAD
            this.resetRange();
=======
            this._resetRange();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * @override
         */
        mergeOption: function () {
            AxisModel.superApply(this, 'mergeOption', arguments);
<<<<<<< HEAD
            this.resetRange();
=======
            this._resetRange();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * @override
         */
        restoreData: function () {
            AxisModel.superApply(this, 'restoreData', arguments);
<<<<<<< HEAD
            this.resetRange();
        },

        /**
         * @override
         * @return {module:echarts/model/Component}
         */
        getCoordSysModel: function () {
            return this.ecModel.queryComponents({
                mainType: 'grid',
                index: this.option.gridIndex,
                id: this.option.gridId
            })[0];
=======
            this._resetRange();
        },

        /**
         * @public
         * @param {number} rangeStart
         * @param {number} rangeEnd
         */
        setRange: function (rangeStart, rangeEnd) {
            this.option.rangeStart = rangeStart;
            this.option.rangeEnd = rangeEnd;
        },

        /**
         * @public
         * @return {Array.<number|string|Date>}
         */
        getMin: function () {
            var option = this.option;
            return option.rangeStart != null ? option.rangeStart : option.min;
        },

        /**
         * @public
         * @return {Array.<number|string|Date>}
         */
        getMax: function () {
            var option = this.option;
            return option.rangeEnd != null ? option.rangeEnd : option.max;
        },

        /**
         * @public
         * @return {boolean}
         */
        getNeedCrossZero: function () {
            var option = this.option;
            return (option.rangeStart != null || option.rangeEnd != null)
                ? false : !option.scale;
        },

        /**
         * @private
         */
        _resetRange: function () {
            // rangeStart and rangeEnd is readonly.
            this.option.rangeStart = this.option.rangeEnd = null;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        }

    });

    function getAxisType(axisDim, option) {
        // Default axis with data is category axis
        return option.type || (option.data ? 'category' : 'value');
    }

    zrUtil.merge(AxisModel.prototype, require('../axisModelCommonMixin'));

    var extraOption = {
<<<<<<< HEAD
        // gridIndex: 0,
        // gridId: '',

        // Offset is for multiple axis on the same position
        offset: 0
=======
        gridIndex: 0
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    };

    axisModelCreator('x', AxisModel, getAxisType, extraOption);
    axisModelCreator('y', AxisModel, getAxisType, extraOption);

    return AxisModel;
});