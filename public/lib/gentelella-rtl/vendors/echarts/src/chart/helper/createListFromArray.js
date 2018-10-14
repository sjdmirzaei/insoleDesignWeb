define(function(require) {
    'use strict';

    var List = require('../../data/List');
    var completeDimensions = require('../../data/helper/completeDimensions');
    var zrUtil = require('zrender/core/util');
    var modelUtil = require('../../util/model');
    var CoordinateSystem = require('../../CoordinateSystem');
    var getDataItemValue = modelUtil.getDataItemValue;
    var converDataValue = modelUtil.converDataValue;

    function firstDataNotNull(data) {
        var i = 0;
        while (i < data.length && data[i] == null) {
            i++;
        }
        return data[i];
    }
    function ifNeedCompleteOrdinalData(data) {
        var sampleItem = firstDataNotNull(data);
        return sampleItem != null
            && !zrUtil.isArray(getDataItemValue(sampleItem));
    }

    /**
     * Helper function to create a list from option data
     */
    function createListFromArray(data, seriesModel, ecModel) {
        // If data is undefined
        data = data || [];

<<<<<<< HEAD
        if (__DEV__) {
            if (!zrUtil.isArray(data)) {
                throw new Error('Invalid data.');
            }
=======
        if (!zrUtil.isArray(data)) {
            throw new Error('Invalid data.');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        }

        var coordSysName = seriesModel.get('coordinateSystem');
        var creator = creators[coordSysName];
        var registeredCoordSys = CoordinateSystem.get(coordSysName);
<<<<<<< HEAD
        var completeDimOpt = {
            encodeDef: seriesModel.get('encode'),
            dimsDef: seriesModel.get('dimensions')
        };

        // FIXME
        var axesInfo = creator && creator(data, seriesModel, ecModel, completeDimOpt);
        var dimensions = axesInfo && axesInfo.dimensions;
        if (!dimensions) {
            // Get dimensions from registered coordinate system
            dimensions = (registeredCoordSys && (
                registeredCoordSys.getDimensionsInfo
                    ? registeredCoordSys.getDimensionsInfo()
                    : registeredCoordSys.dimensions.slice()
            )) || ['x', 'y'];
            dimensions = completeDimensions(dimensions, data, completeDimOpt);
        }

        var categoryIndex = axesInfo ? axesInfo.categoryIndex : -1;

        var list = new List(dimensions, seriesModel);

        var nameList = createNameList(axesInfo, data);

        var categories = {};
        var dimValueGetter = (categoryIndex >= 0 && ifNeedCompleteOrdinalData(data))
            ? function (itemOpt, dimName, dataIndex, dimIndex) {
                // If any dataItem is like { value: 10 }
                if (modelUtil.isDataItemOption(itemOpt)) {
                    list.hasItemOption = true;
                }

                // Use dataIndex as ordinal value in categoryAxis
                return dimIndex === categoryIndex
=======
        // FIXME
        var result = creator && creator(data, seriesModel, ecModel);
        var dimensions = result && result.dimensions;
        if (!dimensions) {
            // Get dimensions from registered coordinate system
            dimensions = (registeredCoordSys && registeredCoordSys.dimensions) || ['x', 'y'];
            dimensions = completeDimensions(dimensions, data, dimensions.concat(['value']));
        }
        var categoryAxisModel = result && result.categoryAxisModel;
        var categories;

        var categoryDimIndex = dimensions[0].type === 'ordinal'
            ? 0 : (dimensions[1].type === 'ordinal' ? 1 : -1);

        var list = new List(dimensions, seriesModel);

        var nameList = createNameList(result, data);

        var dimValueGetter = (categoryAxisModel && ifNeedCompleteOrdinalData(data))
            ? function (itemOpt, dimName, dataIndex, dimIndex) {
                // Use dataIndex as ordinal value in categoryAxis
                return dimIndex === categoryDimIndex
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    ? dataIndex
                    : converDataValue(getDataItemValue(itemOpt), dimensions[dimIndex]);
            }
            : function (itemOpt, dimName, dataIndex, dimIndex) {
                var value = getDataItemValue(itemOpt);
                var val = converDataValue(value && value[dimIndex], dimensions[dimIndex]);
<<<<<<< HEAD
                // If any dataItem is like { value: 10 }
                if (modelUtil.isDataItemOption(itemOpt)) {
                    list.hasItemOption = true;
                }

                var categoryAxesModels = axesInfo && axesInfo.categoryAxesModels;
                if (categoryAxesModels && categoryAxesModels[dimName]) {
                    // If given value is a category string
                    if (typeof val === 'string') {
                        // Lazy get categories
                        categories[dimName] = categories[dimName]
                            || categoryAxesModels[dimName].getCategories();
                        val = zrUtil.indexOf(categories[dimName], val);
=======
                if (categoryDimIndex === dimIndex) {
                    // If given value is a category string
                    if (typeof val === 'string') {
                        // Lazy get categories
                        categories = categories || categoryAxisModel.getCategories();
                        val = zrUtil.indexOf(categories, val);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                        if (val < 0 && !isNaN(val)) {
                            // In case some one write '1', '2' istead of 1, 2
                            val = +val;
                        }
                    }
                }
                return val;
            };

<<<<<<< HEAD
        list.hasItemOption = false;
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        list.initData(data, nameList, dimValueGetter);

        return list;
    }

    function isStackable(axisType) {
        return axisType !== 'category' && axisType !== 'time';
    }

    function getDimTypeByAxis(axisType) {
        return axisType === 'category'
            ? 'ordinal'
            : axisType === 'time'
            ? 'time'
            : 'float';
    }

    /**
     * Creaters for each coord system.
<<<<<<< HEAD
     */
    var creators = {

        cartesian2d: function (data, seriesModel, ecModel, completeDimOpt) {

            var axesModels = zrUtil.map(['xAxis', 'yAxis'], function (name) {
                return ecModel.queryComponents({
                    mainType: name,
                    index: seriesModel.get(name + 'Index'),
                    id: seriesModel.get(name + 'Id')
                })[0];
            });
            var xAxisModel = axesModels[0];
            var yAxisModel = axesModels[1];

            if (__DEV__) {
                if (!xAxisModel) {
                    throw new Error('xAxis "' + zrUtil.retrieve(
                        seriesModel.get('xAxisIndex'),
                        seriesModel.get('xAxisId'),
                        0
                    ) + '" not found');
                }
                if (!yAxisModel) {
                    throw new Error('yAxis "' + zrUtil.retrieve(
                        seriesModel.get('xAxisIndex'),
                        seriesModel.get('yAxisId'),
                        0
                    ) + '" not found');
                }
=======
     * @return {Object} {dimensions, categoryAxisModel};
     */
    var creators = {

        cartesian2d: function (data, seriesModel, ecModel) {
            var xAxisModel = ecModel.getComponent('xAxis', seriesModel.get('xAxisIndex'));
            var yAxisModel = ecModel.getComponent('yAxis', seriesModel.get('yAxisIndex'));
            if (!xAxisModel || !yAxisModel) {
                throw new Error('Axis option not found');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }

            var xAxisType = xAxisModel.get('type');
            var yAxisType = yAxisModel.get('type');

            var dimensions = [
                {
                    name: 'x',
                    type: getDimTypeByAxis(xAxisType),
                    stackable: isStackable(xAxisType)
                },
                {
                    name: 'y',
                    // If two category axes
                    type: getDimTypeByAxis(yAxisType),
                    stackable: isStackable(yAxisType)
                }
            ];

            var isXAxisCateogry = xAxisType === 'category';
<<<<<<< HEAD
            var isYAxisCategory = yAxisType === 'category';

            dimensions = completeDimensions(dimensions, data, completeDimOpt);

            var categoryAxesModels = {};
            if (isXAxisCateogry) {
                categoryAxesModels.x = xAxisModel;
            }
            if (isYAxisCategory) {
                categoryAxesModels.y = yAxisModel;
            }
            return {
                dimensions: dimensions,
                categoryIndex: isXAxisCateogry ? 0 : (isYAxisCategory ? 1 : -1),
                categoryAxesModels: categoryAxesModels
            };
        },

        singleAxis: function (data, seriesModel, ecModel, completeDimOpt) {

            var singleAxisModel = ecModel.queryComponents({
                mainType: 'singleAxis',
                index: seriesModel.get('singleAxisIndex'),
                id: seriesModel.get('singleAxisId')
            })[0];

            if (__DEV__) {
                if (!singleAxisModel) {
                    throw new Error('singleAxis should be specified.');
                }
            }

            var singleAxisType = singleAxisModel.get('type');
            var isCategory = singleAxisType === 'category';

            var dimensions = [{
                name: 'single',
                type: getDimTypeByAxis(singleAxisType),
                stackable: isStackable(singleAxisType)
            }];

            dimensions = completeDimensions(dimensions, data, completeDimOpt);

            var categoryAxesModels = {};
            if (isCategory) {
                categoryAxesModels.single = singleAxisModel;
            }

            return {
                dimensions: dimensions,
                categoryIndex: isCategory ? 0 : -1,
                categoryAxesModels: categoryAxesModels
            };
        },

        polar: function (data, seriesModel, ecModel, completeDimOpt) {
            var polarModel = ecModel.queryComponents({
                mainType: 'polar',
                index: seriesModel.get('polarIndex'),
                id: seriesModel.get('polarId')
            })[0];

            var angleAxisModel = polarModel.findAxisModel('angleAxis');
            var radiusAxisModel = polarModel.findAxisModel('radiusAxis');

            if (__DEV__) {
                if (!angleAxisModel) {
                    throw new Error('angleAxis option not found');
                }
                if (!radiusAxisModel) {
                    throw new Error('radiusAxis option not found');
                }
=======

            completeDimensions(dimensions, data, ['x', 'y', 'z']);

            return {
                dimensions: dimensions,
                categoryIndex: isXAxisCateogry ? 0 : 1,
                categoryAxisModel: isXAxisCateogry
                    ? xAxisModel
                    : (yAxisType === 'category' ? yAxisModel : null)
            };
        },

        polar: function (data, seriesModel, ecModel) {
            var polarIndex = seriesModel.get('polarIndex') || 0;

            var axisFinder = function (axisModel) {
                return axisModel.get('polarIndex') === polarIndex;
            };

            var angleAxisModel = ecModel.findComponents({
                mainType: 'angleAxis', filter: axisFinder
            })[0];
            var radiusAxisModel = ecModel.findComponents({
                mainType: 'radiusAxis', filter: axisFinder
            })[0];

            if (!angleAxisModel || !radiusAxisModel) {
                throw new Error('Axis option not found');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }

            var radiusAxisType = radiusAxisModel.get('type');
            var angleAxisType = angleAxisModel.get('type');

            var dimensions = [
                {
                    name: 'radius',
                    type: getDimTypeByAxis(radiusAxisType),
                    stackable: isStackable(radiusAxisType)
                },
                {
                    name: 'angle',
                    type: getDimTypeByAxis(angleAxisType),
                    stackable: isStackable(angleAxisType)
                }
            ];
            var isAngleAxisCateogry = angleAxisType === 'category';
<<<<<<< HEAD
            var isRadiusAxisCateogry = radiusAxisType === 'category';

            dimensions = completeDimensions(dimensions, data, completeDimOpt);

            var categoryAxesModels = {};
            if (isRadiusAxisCateogry) {
                categoryAxesModels.radius = radiusAxisModel;
            }
            if (isAngleAxisCateogry) {
                categoryAxesModels.angle = angleAxisModel;
            }
            return {
                dimensions: dimensions,
                categoryIndex: isAngleAxisCateogry ? 1 : (isRadiusAxisCateogry ? 0 : -1),
                categoryAxesModels: categoryAxesModels
            };
        },

        geo: function (data, seriesModel, ecModel, completeDimOpt) {
=======

            completeDimensions(dimensions, data, ['radius', 'angle', 'value']);

            return {
                dimensions: dimensions,
                categoryIndex: isAngleAxisCateogry ? 1 : 0,
                categoryAxisModel: isAngleAxisCateogry
                    ? angleAxisModel
                    : (radiusAxisType === 'category' ? radiusAxisModel : null)
            };
        },

        geo: function (data, seriesModel, ecModel) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            // TODO Region
            // 多个散点图系列在同一个地区的时候
            return {
                dimensions: completeDimensions([
                    {name: 'lng'},
                    {name: 'lat'}
<<<<<<< HEAD
                ], data, completeDimOpt)
=======
                ], data, ['lng', 'lat', 'value'])
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            };
        }
    };

    function createNameList(result, data) {
        var nameList = [];

<<<<<<< HEAD
        var categoryDim = result && result.dimensions[result.categoryIndex];
        var categoryAxisModel;
        if (categoryDim) {
            categoryAxisModel = result.categoryAxesModels[categoryDim.name];
        }

        if (categoryAxisModel) {
            // FIXME Two category axis
            var categories = categoryAxisModel.getCategories();
=======
        if (result && result.categoryAxisModel) {
            // FIXME Two category axis
            var categories = result.categoryAxisModel.getCategories();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            if (categories) {
                var dataLen = data.length;
                // Ordered data is given explicitly like
                // [[3, 0.2], [1, 0.3], [2, 0.15]]
                // or given scatter data,
                // pick the category
                if (zrUtil.isArray(data[0]) && data[0].length > 1) {
                    nameList = [];
                    for (var i = 0; i < dataLen; i++) {
                        nameList[i] = categories[data[i][result.categoryIndex || 0]];
                    }
                }
                else {
                    nameList = categories.slice(0);
                }
            }
        }

        return nameList;
    }

    return createListFromArray;

});