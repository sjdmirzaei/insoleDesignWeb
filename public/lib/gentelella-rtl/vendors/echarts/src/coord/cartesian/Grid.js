/**
 * Grid is a region which contains at most 4 cartesian systems
 *
 * TODO Default cartesian
 */
define(function(require, factory) {

    var layout = require('../../util/layout');
    var axisHelper = require('../../coord/axisHelper');

    var zrUtil = require('zrender/core/util');
    var Cartesian2D = require('./Cartesian2D');
    var Axis2D = require('./Axis2D');

    var each = zrUtil.each;

    var ifAxisCrossZero = axisHelper.ifAxisCrossZero;
    var niceScaleExtent = axisHelper.niceScaleExtent;

    // 依赖 GridModel, AxisModel 做预处理
    require('./GridModel');

    /**
     * Check if the axis is used in the specified grid
     * @inner
     */
    function isAxisUsedInTheGrid(axisModel, gridModel, ecModel) {
<<<<<<< HEAD
        return axisModel.getCoordSysModel() === gridModel;
=======
        return ecModel.getComponent('grid', axisModel.get('gridIndex')) === gridModel;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    }

    function getLabelUnionRect(axis) {
        var axisModel = axis.model;
        var labels = axisModel.getFormattedLabels();
<<<<<<< HEAD
        var textStyleModel = axisModel.getModel('axisLabel.textStyle');
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        var rect;
        var step = 1;
        var labelCount = labels.length;
        if (labelCount > 40) {
            // Simple optimization for large amount of labels
            step = Math.ceil(labelCount / 40);
        }
        for (var i = 0; i < labelCount; i += step) {
            if (!axis.isLabelIgnored(i)) {
<<<<<<< HEAD
                var singleRect = textStyleModel.getTextRect(labels[i]);
=======
                var singleRect = axisModel.getTextRect(labels[i]);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                // FIXME consider label rotate
                rect ? rect.union(singleRect) : (rect = singleRect);
            }
        }
        return rect;
    }

    function Grid(gridModel, ecModel, api) {
        /**
         * @type {Object.<string, module:echarts/coord/cartesian/Cartesian2D>}
         * @private
         */
        this._coordsMap = {};

        /**
         * @type {Array.<module:echarts/coord/cartesian/Cartesian>}
         * @private
         */
        this._coordsList = [];

        /**
         * @type {Object.<string, module:echarts/coord/cartesian/Axis2D>}
         * @private
         */
        this._axesMap = {};

        /**
         * @type {Array.<module:echarts/coord/cartesian/Axis2D>}
         * @private
         */
        this._axesList = [];

        this._initCartesian(gridModel, ecModel, api);

<<<<<<< HEAD
        this.model = gridModel;
=======
        this._model = gridModel;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    }

    var gridProto = Grid.prototype;

    gridProto.type = 'grid';

<<<<<<< HEAD
    gridProto.axisPointerEnabled = true;

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    gridProto.getRect = function () {
        return this._rect;
    };

    gridProto.update = function (ecModel, api) {

        var axesMap = this._axesMap;

<<<<<<< HEAD
        this._updateScale(ecModel, this.model);
=======
        this._updateScale(ecModel, this._model);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

        function ifAxisCanNotOnZero(otherAxisDim) {
            var axes = axesMap[otherAxisDim];
            for (var idx in axes) {
<<<<<<< HEAD
                if (axes.hasOwnProperty(idx)) {
                    var axis = axes[idx];
                    if (axis && (
                        axis.type === 'category' || axis.type === 'time' || !ifAxisCrossZero(axis)
                    )) {
                        return true;
                    }
=======
                var axis = axes[idx];
                if (axis && (axis.type === 'category' || !ifAxisCrossZero(axis))) {
                    return true;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                }
            }
            return false;
        }

        each(axesMap.x, function (xAxis) {
<<<<<<< HEAD
            niceScaleExtent(xAxis.scale, xAxis.model);
        });
        each(axesMap.y, function (yAxis) {
            niceScaleExtent(yAxis.scale, yAxis.model);
=======
            niceScaleExtent(xAxis, xAxis.model);
        });
        each(axesMap.y, function (yAxis) {
            niceScaleExtent(yAxis, yAxis.model);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        });
        // Fix configuration
        each(axesMap.x, function (xAxis) {
            // onZero can not be enabled in these two situations
            // 1. When any other axis is a category axis
            // 2. When any other axis not across 0 point
            if (ifAxisCanNotOnZero('y')) {
                xAxis.onZero = false;
            }
        });
        each(axesMap.y, function (yAxis) {
            if (ifAxisCanNotOnZero('x')) {
                yAxis.onZero = false;
            }
        });

        // Resize again if containLabel is enabled
        // FIXME It may cause getting wrong grid size in data processing stage
<<<<<<< HEAD
        this.resize(this.model, api);
=======
        this.resize(this._model, api);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    };

    /**
     * Resize the grid
     * @param {module:echarts/coord/cartesian/GridModel} gridModel
     * @param {module:echarts/ExtensionAPI} api
     */
<<<<<<< HEAD
    gridProto.resize = function (gridModel, api, ignoreContainLabel) {
=======
    gridProto.resize = function (gridModel, api) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

        var gridRect = layout.getLayoutRect(
            gridModel.getBoxLayoutParams(), {
                width: api.getWidth(),
                height: api.getHeight()
            });

        this._rect = gridRect;

        var axesList = this._axesList;

        adjustAxes();

        // Minus label size
<<<<<<< HEAD
        if (!ignoreContainLabel && gridModel.get('containLabel')) {
=======
        if (gridModel.get('containLabel')) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            each(axesList, function (axis) {
                if (!axis.model.get('axisLabel.inside')) {
                    var labelUnionRect = getLabelUnionRect(axis);
                    if (labelUnionRect) {
                        var dim = axis.isHorizontal() ? 'height' : 'width';
                        var margin = axis.model.get('axisLabel.margin');
                        gridRect[dim] -= labelUnionRect[dim] + margin;
                        if (axis.position === 'top') {
                            gridRect.y += labelUnionRect.height + margin;
                        }
                        else if (axis.position === 'left')  {
                            gridRect.x += labelUnionRect.width + margin;
                        }
                    }
                }
            });

            adjustAxes();
        }

        function adjustAxes() {
            each(axesList, function (axis) {
                var isHorizontal = axis.isHorizontal();
                var extent = isHorizontal ? [0, gridRect.width] : [0, gridRect.height];
                var idx = axis.inverse ? 1 : 0;
                axis.setExtent(extent[idx], extent[1 - idx]);
                updateAxisTransfrom(axis, isHorizontal ? gridRect.x : gridRect.y);
            });
        }
    };

    /**
     * @param {string} axisType
     * @param {ndumber} [axisIndex]
     */
    gridProto.getAxis = function (axisType, axisIndex) {
        var axesMapOnDim = this._axesMap[axisType];
        if (axesMapOnDim != null) {
            if (axisIndex == null) {
                // Find first axis
                for (var name in axesMapOnDim) {
<<<<<<< HEAD
                    if (axesMapOnDim.hasOwnProperty(name)) {
                        return axesMapOnDim[name];
                    }
=======
                    return axesMapOnDim[name];
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                }
            }
            return axesMapOnDim[axisIndex];
        }
    };

<<<<<<< HEAD
    /**
     * @return {Array.<module:echarts/coord/Axis>}
     */
    gridProto.getAxes = function () {
        return this._axesList.slice();
    };

    /**
     * Usage:
     *      grid.getCartesian(xAxisIndex, yAxisIndex);
     *      grid.getCartesian(xAxisIndex);
     *      grid.getCartesian(null, yAxisIndex);
     *      grid.getCartesian({xAxisIndex: ..., yAxisIndex: ...});
     *
     * @param {number|Object} [xAxisIndex]
     * @param {number} [yAxisIndex]
     */
    gridProto.getCartesian = function (xAxisIndex, yAxisIndex) {
        if (xAxisIndex != null && yAxisIndex != null) {
            var key = 'x' + xAxisIndex + 'y' + yAxisIndex;
            return this._coordsMap[key];
        }

        if (zrUtil.isObject(xAxisIndex)) {
            yAxisIndex = xAxisIndex.yAxisIndex;
            xAxisIndex = xAxisIndex.xAxisIndex;
        }
        // When only xAxisIndex or yAxisIndex given, find its first cartesian.
        for (var i = 0, coordList = this._coordsList; i < coordList.length; i++) {
            if (coordList[i].getAxis('x').index === xAxisIndex
                || coordList[i].getAxis('y').index === yAxisIndex
            ) {
                return coordList[i];
            }
        }
    };

    gridProto.getCartesians = function () {
        return this._coordsList.slice();
    };

    /**
     * @implements
     * see {module:echarts/CoodinateSystem}
     */
    gridProto.convertToPixel = function (ecModel, finder, value) {
        var target = this._findConvertTarget(ecModel, finder);

        return target.cartesian
            ? target.cartesian.dataToPoint(value)
            : target.axis
            ? target.axis.toGlobalCoord(target.axis.dataToCoord(value))
            : null;
    };

    /**
     * @implements
     * see {module:echarts/CoodinateSystem}
     */
    gridProto.convertFromPixel = function (ecModel, finder, value) {
        var target = this._findConvertTarget(ecModel, finder);

        return target.cartesian
            ? target.cartesian.pointToData(value)
            : target.axis
            ? target.axis.coordToData(target.axis.toLocalCoord(value))
            : null;
    };

    /**
     * @inner
     */
    gridProto._findConvertTarget = function (ecModel, finder) {
        var seriesModel = finder.seriesModel;
        var xAxisModel = finder.xAxisModel
            || (seriesModel && seriesModel.getReferringComponents('xAxis')[0]);
        var yAxisModel = finder.yAxisModel
            || (seriesModel && seriesModel.getReferringComponents('yAxis')[0]);
        var gridModel = finder.gridModel;
        var coordsList = this._coordsList;
        var cartesian;
        var axis;

        if (seriesModel) {
            cartesian = seriesModel.coordinateSystem;
            zrUtil.indexOf(coordsList, cartesian) < 0 && (cartesian = null);
        }
        else if (xAxisModel && yAxisModel) {
            cartesian = this.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex);
        }
        else if (xAxisModel) {
            axis = this.getAxis('x', xAxisModel.componentIndex);
        }
        else if (yAxisModel) {
            axis = this.getAxis('y', yAxisModel.componentIndex);
        }
        // Lowest priority.
        else if (gridModel) {
            var grid = gridModel.coordinateSystem;
            if (grid === this) {
                cartesian = this._coordsList[0];
            }
        }

        return {cartesian: cartesian, axis: axis};
    };

    /**
     * @implements
     * see {module:echarts/CoodinateSystem}
     */
    gridProto.containPoint = function (point) {
        var coord = this._coordsList[0];
        if (coord) {
            return coord.containPoint(point);
        }
=======
    gridProto.getCartesian = function (xAxisIndex, yAxisIndex) {
        var key = 'x' + xAxisIndex + 'y' + yAxisIndex;
        return this._coordsMap[key];
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    };

    /**
     * Initialize cartesian coordinate systems
     * @private
     */
    gridProto._initCartesian = function (gridModel, ecModel, api) {
        var axisPositionUsed = {
            left: false,
            right: false,
            top: false,
            bottom: false
        };

        var axesMap = {
            x: {},
            y: {}
        };
        var axesCount = {
            x: 0,
            y: 0
        };

        /// Create axis
        ecModel.eachComponent('xAxis', createAxisCreator('x'), this);
        ecModel.eachComponent('yAxis', createAxisCreator('y'), this);

        if (!axesCount.x || !axesCount.y) {
            // Roll back when there no either x or y axis
            this._axesMap = {};
            this._axesList = [];
            return;
        }

        this._axesMap = axesMap;

        /// Create cartesian2d
        each(axesMap.x, function (xAxis, xAxisIndex) {
            each(axesMap.y, function (yAxis, yAxisIndex) {
                var key = 'x' + xAxisIndex + 'y' + yAxisIndex;
                var cartesian = new Cartesian2D(key);

                cartesian.grid = this;
<<<<<<< HEAD
                cartesian.model = gridModel;
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

                this._coordsMap[key] = cartesian;
                this._coordsList.push(cartesian);

                cartesian.addAxis(xAxis);
                cartesian.addAxis(yAxis);
            }, this);
        }, this);

        function createAxisCreator(axisType) {
            return function (axisModel, idx) {
                if (!isAxisUsedInTheGrid(axisModel, gridModel, ecModel)) {
                    return;
                }

                var axisPosition = axisModel.get('position');
                if (axisType === 'x') {
                    // Fix position
                    if (axisPosition !== 'top' && axisPosition !== 'bottom') {
                        // Default bottom of X
                        axisPosition = 'bottom';
<<<<<<< HEAD
                        if (axisPositionUsed[axisPosition]) {
                            axisPosition = axisPosition === 'top' ? 'bottom' : 'top';
                        }
=======
                    }
                    if (axisPositionUsed[axisPosition]) {
                        axisPosition = axisPosition === 'top' ? 'bottom' : 'top';
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    }
                }
                else {
                    // Fix position
                    if (axisPosition !== 'left' && axisPosition !== 'right') {
                        // Default left of Y
                        axisPosition = 'left';
<<<<<<< HEAD
                        if (axisPositionUsed[axisPosition]) {
                            axisPosition = axisPosition === 'left' ? 'right' : 'left';
                        }
=======
                    }
                    if (axisPositionUsed[axisPosition]) {
                        axisPosition = axisPosition === 'left' ? 'right' : 'left';
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    }
                }
                axisPositionUsed[axisPosition] = true;

                var axis = new Axis2D(
                    axisType, axisHelper.createScaleByModel(axisModel),
                    [0, 0],
                    axisModel.get('type'),
                    axisPosition
                );

                var isCategory = axis.type === 'category';
                axis.onBand = isCategory && axisModel.get('boundaryGap');
                axis.inverse = axisModel.get('inverse');

                axis.onZero = axisModel.get('axisLine.onZero');

                // Inject axis into axisModel
                axisModel.axis = axis;

                // Inject axisModel into axis
                axis.model = axisModel;

<<<<<<< HEAD
                // Inject grid info axis
                axis.grid = this;

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                // Index of axis, can be used as key
                axis.index = idx;

                this._axesList.push(axis);

                axesMap[axisType][idx] = axis;
                axesCount[axisType]++;
            };
        }
    };

    /**
     * Update cartesian properties from series
     * @param  {module:echarts/model/Option} option
     * @private
     */
    gridProto._updateScale = function (ecModel, gridModel) {
        // Reset scale
        zrUtil.each(this._axesList, function (axis) {
            axis.scale.setExtent(Infinity, -Infinity);
        });
        ecModel.eachSeries(function (seriesModel) {
<<<<<<< HEAD
            if (isCartesian2D(seriesModel)) {
                var axesModels = findAxesModels(seriesModel, ecModel);
                var xAxisModel = axesModels[0];
                var yAxisModel = axesModels[1];
=======
            if (seriesModel.get('coordinateSystem') === 'cartesian2d') {
                var xAxisIndex = seriesModel.get('xAxisIndex');
                var yAxisIndex = seriesModel.get('yAxisIndex');

                var xAxisModel = ecModel.getComponent('xAxis', xAxisIndex);
                var yAxisModel = ecModel.getComponent('yAxis', yAxisIndex);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

                if (!isAxisUsedInTheGrid(xAxisModel, gridModel, ecModel)
                    || !isAxisUsedInTheGrid(yAxisModel, gridModel, ecModel)
                 ) {
                    return;
                }

<<<<<<< HEAD
                var cartesian = this.getCartesian(
                    xAxisModel.componentIndex, yAxisModel.componentIndex
                );
=======
                var cartesian = this.getCartesian(xAxisIndex, yAxisIndex);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                var data = seriesModel.getData();
                var xAxis = cartesian.getAxis('x');
                var yAxis = cartesian.getAxis('y');

                if (data.type === 'list') {
                    unionExtent(data, xAxis, seriesModel);
                    unionExtent(data, yAxis, seriesModel);
                }
            }
        }, this);

        function unionExtent(data, axis, seriesModel) {
            each(seriesModel.coordDimToDataDim(axis.dim), function (dim) {
<<<<<<< HEAD
                axis.scale.unionExtentFromData(data, dim);
=======
                axis.scale.unionExtent(data.getDataExtent(
                    dim, axis.scale.type !== 'ordinal'
                ));
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            });
        }
    };

    /**
<<<<<<< HEAD
     * @param {string} [dim] 'x' or 'y' or 'auto' or null/undefined
     * @return {Object} {baseAxes: [], otherAxes: []}
     */
    gridProto.getTooltipAxes = function (dim) {
        var baseAxes = [];
        var otherAxes = [];

        each(this.getCartesians(), function (cartesian) {
            var baseAxis = (dim != null && dim !== 'auto')
                ? cartesian.getAxis(dim) : cartesian.getBaseAxis();
            var otherAxis = cartesian.getOtherAxis(baseAxis);
            zrUtil.indexOf(baseAxes, baseAxis) < 0 && baseAxes.push(baseAxis);
            zrUtil.indexOf(otherAxes, otherAxis) < 0 && otherAxes.push(otherAxis);
        });

        return {baseAxes: baseAxes, otherAxes: otherAxes};
    };

    /**
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
     * @inner
     */
    function updateAxisTransfrom(axis, coordBase) {
        var axisExtent = axis.getExtent();
        var axisExtentSum = axisExtent[0] + axisExtent[1];

        // Fast transform
        axis.toGlobalCoord = axis.dim === 'x'
            ? function (coord) {
                return coord + coordBase;
            }
            : function (coord) {
                return axisExtentSum - coord + coordBase;
            };
        axis.toLocalCoord = axis.dim === 'x'
            ? function (coord) {
                return coord - coordBase;
            }
            : function (coord) {
                return axisExtentSum - coord + coordBase;
            };
    }

<<<<<<< HEAD
    var axesTypes = ['xAxis', 'yAxis'];
    /**
     * @inner
     */
    function findAxesModels(seriesModel, ecModel) {
        return zrUtil.map(axesTypes, function (axisType) {
            var axisModel = seriesModel.getReferringComponents(axisType)[0];

            if (__DEV__) {
                if (!axisModel) {
                    throw new Error(axisType + ' "' + zrUtil.retrieve(
                        seriesModel.get(axisType + 'Index'),
                        seriesModel.get(axisType + 'Id'),
                        0
                    ) + '" not found');
                }
            }
            return axisModel;
        });
    }

    /**
     * @inner
     */
    function isCartesian2D(seriesModel) {
        return seriesModel.get('coordinateSystem') === 'cartesian2d';
    }

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    Grid.create = function (ecModel, api) {
        var grids = [];
        ecModel.eachComponent('grid', function (gridModel, idx) {
            var grid = new Grid(gridModel, ecModel, api);
            grid.name = 'grid_' + idx;
<<<<<<< HEAD
            // dataSampling requires axis extent, so resize
            // should be performed in create stage.
            grid.resize(gridModel, api, true);
=======
            grid.resize(gridModel, api);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            gridModel.coordinateSystem = grid;

            grids.push(grid);
        });

        // Inject the coordinateSystems into seriesModel
        ecModel.eachSeries(function (seriesModel) {
<<<<<<< HEAD
            if (!isCartesian2D(seriesModel)) {
                return;
            }

            var axesModels = findAxesModels(seriesModel, ecModel);
            var xAxisModel = axesModels[0];
            var yAxisModel = axesModels[1];

            var gridModel = xAxisModel.getCoordSysModel();

            if (__DEV__) {
                if (!gridModel) {
                    throw new Error(
                        'Grid "' + zrUtil.retrieve(
                            xAxisModel.get('gridIndex'),
                            xAxisModel.get('gridId'),
                            0
                        ) + '" not found'
                    );
                }
                if (xAxisModel.getCoordSysModel() !== yAxisModel.getCoordSysModel()) {
                    throw new Error('xAxis and yAxis must use the same grid');
                }
            }

            var grid = gridModel.coordinateSystem;

            seriesModel.coordinateSystem = grid.getCartesian(
                xAxisModel.componentIndex, yAxisModel.componentIndex
=======
            if (seriesModel.get('coordinateSystem') !== 'cartesian2d') {
                return;
            }
            var xAxisIndex = seriesModel.get('xAxisIndex');
            // TODO Validate
            var xAxisModel = ecModel.getComponent('xAxis', xAxisIndex);
            var grid = grids[xAxisModel.get('gridIndex')];
            seriesModel.coordinateSystem = grid.getCartesian(
                xAxisIndex, seriesModel.get('yAxisIndex')
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            );
        });

        return grids;
    };

    // For deciding which dimensions to use when creating list data
<<<<<<< HEAD
    Grid.dimensions = Grid.prototype.dimensions = Cartesian2D.prototype.dimensions;
=======
    Grid.dimensions = Cartesian2D.prototype.dimensions;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    require('../../CoordinateSystem').register('cartesian2d', Grid);

    return Grid;
});