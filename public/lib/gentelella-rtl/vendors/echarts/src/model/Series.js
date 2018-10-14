define(function(require) {

    'use strict';

    var zrUtil = require('zrender/core/util');
    var formatUtil = require('../util/format');
<<<<<<< HEAD
    var classUtil = require('../util/clazz');
    var modelUtil = require('../util/model');
    var ComponentModel = require('./Component');
    var colorPaletteMixin = require('./mixin/colorPalette');
    var env = require('zrender/core/env');
    var layout = require('../util/layout');

    var set = classUtil.set;
    var get = classUtil.get;
=======
    var modelUtil = require('../util/model');
    var ComponentModel = require('./Component');

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    var encodeHTML = formatUtil.encodeHTML;
    var addCommas = formatUtil.addCommas;

    var SeriesModel = ComponentModel.extend({

        type: 'series.__base__',

        /**
         * @readOnly
         */
        seriesIndex: 0,

        // coodinateSystem will be injected in the echarts/CoordinateSystem
        coordinateSystem: null,

        /**
         * @type {Object}
         * @protected
         */
        defaultOption: null,

        /**
         * Data provided for legend
         * @type {Function}
         */
        // PENDING
        legendDataProvider: null,

<<<<<<< HEAD
        /**
         * Access path of color for visual
         */
        visualColorAccessPath: 'itemStyle.normal.color',

        /**
         * Support merge layout params.
         * Only support 'box' now (left/right/top/bottom/width/height).
         * @type {string|Object} Object can be {ignoreSize: true}
         * @readOnly
         */
        layoutMode: null,

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        init: function (option, parentModel, ecModel, extraOpt) {

            /**
             * @type {number}
             * @readOnly
             */
            this.seriesIndex = this.componentIndex;

            this.mergeDefaultAndTheme(option, ecModel);

<<<<<<< HEAD
            var data = this.getInitialData(option, ecModel);
            if (__DEV__) {
                zrUtil.assert(data, 'getInitialData returned invalid data.');
            }
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            /**
             * @type {module:echarts/data/List|module:echarts/data/Tree|module:echarts/data/Graph}
             * @private
             */
<<<<<<< HEAD
            set(this, 'dataBeforeProcessed', data);

            // If we reverse the order (make data firstly, and then make
            // dataBeforeProcessed by cloneShallow), cloneShallow will
            // cause data.graph.data !== data when using
            // module:echarts/data/Graph or module:echarts/data/Tree.
            // See module:echarts/data/helper/linkList
            this.restoreData();
=======
            this._dataBeforeProcessed = this.getInitialData(option, ecModel);

            // If we reverse the order (make this._data firstly, and then make
            // this._dataBeforeProcessed by cloneShallow), cloneShallow will
            // cause this._data.graph.data !== this._data when using
            // module:echarts/data/Graph or module:echarts/data/Tree.
            // See module:echarts/data/helper/linkList
            this._data = this._dataBeforeProcessed.cloneShallow();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * Util for merge default and theme to option
         * @param  {Object} option
         * @param  {module:echarts/model/Global} ecModel
         */
        mergeDefaultAndTheme: function (option, ecModel) {
<<<<<<< HEAD
            var layoutMode = this.layoutMode;
            var inputPositionParams = layoutMode
                ? layout.getLayoutParams(option) : {};

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            zrUtil.merge(
                option,
                ecModel.getTheme().get(this.subType)
            );
            zrUtil.merge(option, this.getDefaultOption());

            // Default label emphasis `position` and `show`
            // FIXME Set label in mergeOption
            modelUtil.defaultEmphasis(option.label, modelUtil.LABEL_OPTIONS);

            this.fillDataTextStyle(option.data);
<<<<<<< HEAD

            if (layoutMode) {
                layout.mergeLayoutParam(option, inputPositionParams, layoutMode);
            }
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        mergeOption: function (newSeriesOption, ecModel) {
            newSeriesOption = zrUtil.merge(this.option, newSeriesOption, true);
            this.fillDataTextStyle(newSeriesOption.data);

<<<<<<< HEAD
            var layoutMode = this.layoutMode;
            if (layoutMode) {
                layout.mergeLayoutParam(this.option, newSeriesOption, layoutMode);
            }

            var data = this.getInitialData(newSeriesOption, ecModel);
            // TODO Merge data?
            if (data) {
                set(this, 'data', data);
                set(this, 'dataBeforeProcessed', data.cloneShallow());
=======
            var data = this.getInitialData(newSeriesOption, ecModel);
            // TODO Merge data?
            if (data) {
                this._data = data;
                this._dataBeforeProcessed = data.cloneShallow();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }
        },

        fillDataTextStyle: function (data) {
            // Default data label emphasis `position` and `show`
            // FIXME Tree structure data ?
            // FIXME Performance ?
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i] && data[i].label) {
                        modelUtil.defaultEmphasis(data[i].label, modelUtil.LABEL_OPTIONS);
                    }
                }
            }
        },

        /**
         * Init a data structure from data related option in series
         * Must be overwritten
         */
        getInitialData: function () {},

        /**
         * @param {string} [dataType]
         * @return {module:echarts/data/List}
         */
        getData: function (dataType) {
<<<<<<< HEAD
            var data = get(this, 'data');
            return dataType == null ? data : data.getLinkedData(dataType);
=======
            return dataType == null ? this._data : this._data.getLinkedData(dataType);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * @param {module:echarts/data/List} data
         */
        setData: function (data) {
<<<<<<< HEAD
            set(this, 'data', data);
=======
            this._data = data;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * Get data before processed
         * @return {module:echarts/data/List}
         */
        getRawData: function () {
<<<<<<< HEAD
            return get(this, 'dataBeforeProcessed');
=======
            return this._dataBeforeProcessed;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * Coord dimension to data dimension.
         *
         * By default the result is the same as dimensions of series data.
         * But in some series data dimensions are different from coord dimensions (i.e.
         * candlestick and boxplot). Override this method to handle those cases.
         *
         * Coord dimension to data dimension can be one-to-many
         *
         * @param {string} coordDim
         * @return {Array.<string>} dimensions on the axis.
         */
        coordDimToDataDim: function (coordDim) {
<<<<<<< HEAD
            return modelUtil.coordDimToDataDim(this.getData(), coordDim);
=======
            return [coordDim];
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * Convert data dimension to coord dimension.
         *
         * @param {string|number} dataDim
         * @return {string}
         */
        dataDimToCoordDim: function (dataDim) {
<<<<<<< HEAD
            return modelUtil.dataDimToCoordDim(this.getData(), dataDim);
=======
            return dataDim;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * Get base axis if has coordinate system and has axis.
         * By default use coordSys.getBaseAxis();
         * Can be overrided for some chart.
         * @return {type} description
         */
        getBaseAxis: function () {
            var coordSys = this.coordinateSystem;
            return coordSys && coordSys.getBaseAxis && coordSys.getBaseAxis();
        },

        // FIXME
        /**
         * Default tooltip formatter
         *
         * @param {number} dataIndex
         * @param {boolean} [multipleSeries=false]
         * @param {number} [dataType]
         */
        formatTooltip: function (dataIndex, multipleSeries, dataType) {
<<<<<<< HEAD
            function formatArrayValue(value) {
                var vertially = zrUtil.reduce(value, function (vertially, val, idx) {
                    var dimItem = data.getDimensionInfo(idx);
                    return vertially |= dimItem && dimItem.tooltip !== false && dimItem.tooltipName != null;
                }, 0);

                var result = [];
                var tooltipDims = modelUtil.otherDimToDataDim(data, 'tooltip');

                tooltipDims.length
                    ? zrUtil.each(tooltipDims, function (dimIdx) {
                        setEachItem(data.get(dimIdx, dataIndex), dimIdx);
                    })
                    // By default, all dims is used on tooltip.
                    : zrUtil.each(value, setEachItem);

                function setEachItem(val, dimIdx) {
                    var dimInfo = data.getDimensionInfo(dimIdx);
                    // If `dimInfo.tooltip` is not set, show tooltip.
                    if (!dimInfo || dimInfo.otherDims.tooltip === false) {
                        return;
                    }
                    var dimType = dimInfo.type;
                    var valStr = (vertially ? '- ' + (dimInfo.tooltipName || dimInfo.name) + ': ' : '')
                        + (dimType === 'ordinal'
                            ? val + ''
                            : dimType === 'time'
                            ? (multipleSeries ? '' : formatUtil.formatTime('yyyy/MM/dd hh:mm:ss', val))
                            : addCommas(val)
                        );
                    valStr && result.push(encodeHTML(valStr));
                }

                return (vertially ? '<br/>' : '') + result.join(vertially ? '<br/>' : ', ');
            }

            var data = get(this, 'data');

            var value = this.getRawValue(dataIndex);
            var formattedValue = zrUtil.isArray(value)
                ? formatArrayValue(value) : encodeHTML(addCommas(value));
            var name = data.getName(dataIndex);

            var color = data.getItemVisual(dataIndex, 'color');
            if (zrUtil.isObject(color) && color.colorStops) {
                color = (color.colorStops[0] || {}).color;
            }
            color = color || 'transparent';

            var colorEl = formatUtil.getTooltipMarker(color);
=======
            var data = this._data;
            var value = this.getRawValue(dataIndex);
            var formattedValue = zrUtil.isArray(value)
                ? zrUtil.map(value, addCommas).join(', ') : addCommas(value);
            var name = data.getName(dataIndex);
            var color = data.getItemVisual(dataIndex, 'color');
            var colorEl = '<span style="display:inline-block;margin-right:5px;'
                + 'border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            var seriesName = this.name;
            // FIXME
            if (seriesName === '\0-') {
                // Not show '-'
                seriesName = '';
            }
<<<<<<< HEAD
            seriesName = seriesName
                ? encodeHTML(seriesName) + (!multipleSeries ? '<br/>' : ': ')
                : '';
            return !multipleSeries
                ? seriesName + colorEl
                    + (name
                        ? encodeHTML(name) + ': ' + formattedValue
                        : formattedValue
                    )
                : colorEl + seriesName + formattedValue;
        },

        /**
         * @return {boolean}
         */
        isAnimationEnabled: function () {
            if (env.node) {
                return false;
            }

            var animationEnabled = this.getShallow('animation');
            if (animationEnabled) {
                if (this.getData().count() > this.getShallow('animationThreshold')) {
                    animationEnabled = false;
                }
            }
            return animationEnabled;
        },

        restoreData: function () {
            set(this, 'data', get(this, 'dataBeforeProcessed').cloneShallow());
        },

        getColorFromPalette: function (name, scope) {
            var ecModel = this.ecModel;
            // PENDING
            var color = colorPaletteMixin.getColorFromPalette.call(this, name, scope);
            if (!color) {
                color = ecModel.getColorFromPalette(name, scope);
            }
            return color;
        },

        /**
         * Get data indices for show tooltip content. See tooltip.
         * @abstract
         * @param {Array.<string>|string} dim
         * @param {Array.<number>} value
         * @param {module:echarts/coord/single/SingleAxis} baseAxis
         * @return {Object} {dataIndices, nestestValue}.
         */
        getAxisTooltipData: null,

        /**
         * See tooltip.
         * @abstract
         * @param {number} dataIndex
         * @return {Array.<number>} Point of tooltip. null/undefined can be returned.
         */
        getTooltipPosition: null
    });

    zrUtil.mixin(SeriesModel, modelUtil.dataFormatMixin);
    zrUtil.mixin(SeriesModel, colorPaletteMixin);
=======
            return !multipleSeries
                ? ((seriesName && encodeHTML(seriesName) + '<br />') + colorEl
                    + (name
                        ? encodeHTML(name) + ' : ' + formattedValue
                        : formattedValue)
                  )
                : (colorEl + encodeHTML(this.name) + ' : ' + formattedValue);
        },

        restoreData: function () {
            this._data = this._dataBeforeProcessed.cloneShallow();
        },

        getAxisTooltipDataIndex: null
    });

    zrUtil.mixin(SeriesModel, modelUtil.dataFormatMixin);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    return SeriesModel;
});