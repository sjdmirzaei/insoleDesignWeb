define(function(require) {

    var List = require('../../data/List');
    var zrUtil = require('zrender/core/util');
    var SeriesModel = require('../../model/Series');
<<<<<<< HEAD
    var completeDimensions = require('../../data/helper/completeDimensions');
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    return SeriesModel.extend({

        type: 'series.parallel',

        dependencies: ['parallel'],

<<<<<<< HEAD
        visualColorAccessPath: 'lineStyle.normal.color',

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        getInitialData: function (option, ecModel) {
            var parallelModel = ecModel.getComponent(
                'parallel', this.get('parallelIndex')
            );
<<<<<<< HEAD
            var parallelAxisIndices = parallelModel.parallelAxisIndex;

            var rawData = option.data;
            var modelDims = parallelModel.dimensions;

            var dataDims = generateDataDims(modelDims, rawData);

            var dataDimsInfo = zrUtil.map(dataDims, function (dim, dimIndex) {

                var modelDimsIndex = zrUtil.indexOf(modelDims, dim);
                var axisModel = modelDimsIndex >= 0 && ecModel.getComponent(
                    'parallelAxis', parallelAxisIndices[modelDimsIndex]
                );

                if (axisModel && axisModel.get('type') === 'category') {
                    translateCategoryValue(axisModel, dim, rawData);
                    return {name: dim, type: 'ordinal'};
                }
                else if (modelDimsIndex < 0) {
                    return completeDimensions.guessOrdinal(rawData, dimIndex)
                        ? {name: dim, type: 'ordinal'}
                        : dim;
                }
=======
            var dimensions = parallelModel.dimensions;
            var parallelAxisIndices = parallelModel.parallelAxisIndex;

            var rawData = option.data;

            var dimensionsInfo = zrUtil.map(dimensions, function (dim, index) {
                var axisModel = ecModel.getComponent(
                    'parallelAxis', parallelAxisIndices[index]
                );
                if (axisModel.get('type') === 'category') {
                    translateCategoryValue(axisModel, dim, rawData);
                    return {name: dim, type: 'ordinal'};
                }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                else {
                    return dim;
                }
            });

<<<<<<< HEAD
            var list = new List(dataDimsInfo, this);
            list.initData(rawData);

            // Anication is forbiden in progressive data mode.
            if (this.option.progressive) {
                this.option.animation = false;
            }

=======
            var list = new List(dimensionsInfo, this);
            list.initData(rawData);

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            return list;
        },

        /**
         * User can get data raw indices on 'axisAreaSelected' event received.
         *
         * @public
         * @param {string} activeState 'active' or 'inactive' or 'normal'
         * @return {Array.<number>} Raw indices
         */
        getRawIndicesByActiveState: function (activeState) {
            var coordSys = this.coordinateSystem;
            var data = this.getData();
            var indices = [];

            coordSys.eachActiveState(data, function (theActiveState, dataIndex) {
                if (activeState === theActiveState) {
                    indices.push(data.getRawIndex(dataIndex));
                }
            });

            return indices;
        },

        defaultOption: {
            zlevel: 0,                  // 一级层叠
            z: 2,                       // 二级层叠

            coordinateSystem: 'parallel',
            parallelIndex: 0,

<<<<<<< HEAD
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
=======
            // FIXME 尚无用
            label: {
                normal: {
                    show: false
                    // formatter: 标签文本格式器，同Tooltip.formatter，不支持异步回调
                    // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                    //           'inside'|'left'|'right'|'top'|'bottom'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                },
                emphasis: {
                    show: false
                    // formatter: 标签文本格式器，同Tooltip.formatter，不支持异步回调
                    // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                    //           'inside'|'left'|'right'|'top'|'bottom'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                }
            },

            inactiveOpacity: 0.05,
            activeOpacity: 1,

            lineStyle: {
                normal: {
<<<<<<< HEAD
                    width: 1,
=======
                    width: 2,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    opacity: 0.45,
                    type: 'solid'
                }
            },
<<<<<<< HEAD
            progressive: false, // 100
            smooth: false,
=======
            // smooth: false
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            animationEasing: 'linear'
        }
    });

    function translateCategoryValue(axisModel, dim, rawData) {
        var axisData = axisModel.get('data');
<<<<<<< HEAD
        var numberDim = convertDimNameToNumber(dim);
=======
        var numberDim = +dim.replace('dim', '');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

        if (axisData && axisData.length) {
            zrUtil.each(rawData, function (dataItem) {
                if (!dataItem) {
                    return;
                }
<<<<<<< HEAD
                // FIXME
                // time consuming, should use hash?
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                var index = zrUtil.indexOf(axisData, dataItem[numberDim]);
                dataItem[numberDim] = index >= 0 ? index : NaN;
            });
        }
        // FIXME
        // 如果没有设置axis data, 应自动算出，或者提示。
    }
<<<<<<< HEAD

    function convertDimNameToNumber(dimName) {
        return +dimName.replace('dim', '');
    }

    function generateDataDims(modelDims, rawData) {
        // parallelModel.dimension should not be regarded as data
        // dimensions. Consider dimensions = ['dim4', 'dim2', 'dim6'];

        // We detect max dim by parallelModel.dimensions and fist
        // item in rawData arbitrarily.
        var maxDimNum = 0;
        zrUtil.each(modelDims, function (dimName) {
            var numberDim = convertDimNameToNumber(dimName);
            numberDim > maxDimNum && (maxDimNum = numberDim);
        });

        var firstItem = rawData[0];
        if (firstItem && firstItem.length - 1 > maxDimNum) {
            maxDimNum = firstItem.length - 1;
        }

        var dataDims = [];
        for (var i = 0; i <= maxDimNum; i++) {
            dataDims.push('dim' + i);
        }

        return dataDims;
    }
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
});