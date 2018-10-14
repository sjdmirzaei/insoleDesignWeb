define(function (require) {

<<<<<<< HEAD
    var axisPointerModelHelper = require('../axisPointer/modelHelper');

    /**
     * Base class of AxisView.
     */
=======
    var zrUtil = require('zrender/core/util');
    var graphic = require('../../util/graphic');
    var AxisBuilder = require('./AxisBuilder');
    var ifIgnoreOnTick = AxisBuilder.ifIgnoreOnTick;
    var getInterval = AxisBuilder.getInterval;

    var axisBuilderAttrs = [
        'axisLine', 'axisLabel', 'axisTick', 'axisName'
    ];
    var selfBuilderAttrs = [
        'splitLine', 'splitArea'
    ];

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    var AxisView = require('../../echarts').extendComponentView({

        type: 'axis',

<<<<<<< HEAD
        /**
         * @private
         */
        _axisPointer: null,

        /**
         * @protected
         * @type {string}
         */
        axisPointerClass: null,

        /**
         * @override
         */
        render: function (axisModel, ecModel, api, payload) {
            // FIXME
            // This process should proformed after coordinate systems updated
            // (axis scale updated), and should be performed each time update.
            // So put it here temporarily, although it is not appropriate to
            // put a model-writing procedure in `view`.
            this.axisPointerClass && axisPointerModelHelper.fixValue(axisModel);

            AxisView.superApply(this, 'render', arguments);

            updateAxisPointer(this, axisModel, ecModel, api, payload, true);
        },

        /**
         * Action handler.
         * @public
         * @param {module:echarts/coord/cartesian/AxisModel} axisModel
         * @param {module:echarts/model/Global} ecModel
         * @param {module:echarts/ExtensionAPI} api
         * @param {Object} payload
         */
        updateAxisPointer: function (axisModel, ecModel, api, payload, force) {
            updateAxisPointer(this, axisModel, ecModel, api, payload, false);
        },

        /**
         * @override
         */
        remove: function (ecModel, api) {
            var axisPointer = this._axisPointer;
            axisPointer && axisPointer.remove(api);
            AxisView.superApply(this, 'remove', arguments);
        },

        /**
         * @override
         */
        dispose: function (ecModel, api) {
            disposeAxisPointer(this, api);
            AxisView.superApply(this, 'dispose', arguments);
        }

    });

    function updateAxisPointer(axisView, axisModel, ecModel, api, payload, forceRender) {
        var Clazz = AxisView.getAxisPointerClass(axisView.axisPointerClass);
        if (!Clazz) {
            return;
        }
        var axisPointerModel = axisPointerModelHelper.getAxisPointerModel(axisModel);
        axisPointerModel
            ? (axisView._axisPointer || (axisView._axisPointer = new Clazz()))
                .render(axisModel, axisPointerModel, api, forceRender)
            : disposeAxisPointer(axisView, api);
    }

    function disposeAxisPointer(axisView, ecModel, api) {
        var axisPointer = axisView._axisPointer;
        axisPointer && axisPointer.dispose(ecModel, api);
        axisView._axisPointer = null;
    }

    var axisPointerClazz = [];

    AxisView.registerAxisPointerClass = function (type, clazz) {
        if (__DEV__) {
            if (axisPointerClazz[type]) {
                throw new Error('axisPointer ' + type + ' exists');
            }
        }
        axisPointerClazz[type] = clazz;
    };

    AxisView.getAxisPointerClass = function (type) {
        return type && axisPointerClazz[type];
    };

    return AxisView;
=======
        render: function (axisModel, ecModel) {

            this.group.removeAll();

            if (!axisModel.get('show')) {
                return;
            }

            var gridModel = ecModel.getComponent('grid', axisModel.get('gridIndex'));

            var layout = layoutAxis(gridModel, axisModel);

            var axisBuilder = new AxisBuilder(axisModel, layout);

            zrUtil.each(axisBuilderAttrs, axisBuilder.add, axisBuilder);

            this.group.add(axisBuilder.getGroup());

            zrUtil.each(selfBuilderAttrs, function (name) {
                if (axisModel.get(name +'.show')) {
                    this['_' + name](axisModel, gridModel, layout.labelInterval);
                }
            }, this);
        },

        /**
         * @param {module:echarts/coord/cartesian/AxisModel} axisModel
         * @param {module:echarts/coord/cartesian/GridModel} gridModel
         * @param {number|Function} labelInterval
         * @private
         */
        _splitLine: function (axisModel, gridModel, labelInterval) {
            var axis = axisModel.axis;

            var splitLineModel = axisModel.getModel('splitLine');
            var lineStyleModel = splitLineModel.getModel('lineStyle');
            var lineWidth = lineStyleModel.get('width');
            var lineColors = lineStyleModel.get('color');

            var lineInterval = getInterval(splitLineModel, labelInterval);

            lineColors = zrUtil.isArray(lineColors) ? lineColors : [lineColors];

            var gridRect = gridModel.coordinateSystem.getRect();
            var isHorizontal = axis.isHorizontal();

            var splitLines = [];
            var lineCount = 0;

            var ticksCoords = axis.getTicksCoords();

            var p1 = [];
            var p2 = [];
            for (var i = 0; i < ticksCoords.length; i++) {
                if (ifIgnoreOnTick(axis, i, lineInterval)) {
                    continue;
                }

                var tickCoord = axis.toGlobalCoord(ticksCoords[i]);

                if (isHorizontal) {
                    p1[0] = tickCoord;
                    p1[1] = gridRect.y;
                    p2[0] = tickCoord;
                    p2[1] = gridRect.y + gridRect.height;
                }
                else {
                    p1[0] = gridRect.x;
                    p1[1] = tickCoord;
                    p2[0] = gridRect.x + gridRect.width;
                    p2[1] = tickCoord;
                }

                var colorIndex = (lineCount++) % lineColors.length;
                splitLines[colorIndex] = splitLines[colorIndex] || [];
                splitLines[colorIndex].push(new graphic.Line(graphic.subPixelOptimizeLine({
                    shape: {
                        x1: p1[0],
                        y1: p1[1],
                        x2: p2[0],
                        y2: p2[1]
                    },
                    style: {
                        lineWidth: lineWidth
                    },
                    silent: true
                })));
            }

            // Simple optimization
            // Batching the lines if color are the same
            var lineStyle = lineStyleModel.getLineStyle();
            for (var i = 0; i < splitLines.length; i++) {
                this.group.add(graphic.mergePath(splitLines[i], {
                    style: zrUtil.defaults({
                        stroke: lineColors[i % lineColors.length]
                    }, lineStyle),
                    silent: true
                }));
            }
        },

        /**
         * @param {module:echarts/coord/cartesian/AxisModel} axisModel
         * @param {module:echarts/coord/cartesian/GridModel} gridModel
         * @param {number|Function} labelInterval
         * @private
         */
        _splitArea: function (axisModel, gridModel, labelInterval) {
            var axis = axisModel.axis;

            var splitAreaModel = axisModel.getModel('splitArea');
            var areaStyleModel = splitAreaModel.getModel('areaStyle');
            var areaColors = areaStyleModel.get('color');

            var gridRect = gridModel.coordinateSystem.getRect();
            var ticksCoords = axis.getTicksCoords();

            var prevX = axis.toGlobalCoord(ticksCoords[0]);
            var prevY = axis.toGlobalCoord(ticksCoords[0]);

            var splitAreaRects = [];
            var count = 0;

            var areaInterval = getInterval(splitAreaModel, labelInterval);

            areaColors = zrUtil.isArray(areaColors) ? areaColors : [areaColors];

            for (var i = 1; i < ticksCoords.length; i++) {
                if (ifIgnoreOnTick(axis, i, areaInterval)) {
                    continue;
                }

                var tickCoord = axis.toGlobalCoord(ticksCoords[i]);

                var x;
                var y;
                var width;
                var height;
                if (axis.isHorizontal()) {
                    x = prevX;
                    y = gridRect.y;
                    width = tickCoord - x;
                    height = gridRect.height;
                }
                else {
                    x = gridRect.x;
                    y = prevY;
                    width = gridRect.width;
                    height = tickCoord - y;
                }

                var colorIndex = (count++) % areaColors.length;
                splitAreaRects[colorIndex] = splitAreaRects[colorIndex] || [];
                splitAreaRects[colorIndex].push(new graphic.Rect({
                    shape: {
                        x: x,
                        y: y,
                        width: width,
                        height: height
                    },
                    silent: true
                }));

                prevX = x + width;
                prevY = y + height;
            }

            // Simple optimization
            // Batching the rects if color are the same
            var areaStyle = areaStyleModel.getAreaStyle();
            for (var i = 0; i < splitAreaRects.length; i++) {
                this.group.add(graphic.mergePath(splitAreaRects[i], {
                    style: zrUtil.defaults({
                        fill: areaColors[i % areaColors.length]
                    }, areaStyle),
                    silent: true
                }));
            }
        }
    });

    AxisView.extend({
        type: 'xAxis'
    });
    AxisView.extend({
        type: 'yAxis'
    });

    /**
     * @inner
     */
    function layoutAxis(gridModel, axisModel) {
        var grid = gridModel.coordinateSystem;
        var axis = axisModel.axis;
        var layout = {};

        var rawAxisPosition = axis.position;
        var axisPosition = axis.onZero ? 'onZero' : rawAxisPosition;
        var axisDim = axis.dim;

        // [left, right, top, bottom]
        var rect = grid.getRect();
        var rectBound = [rect.x, rect.x + rect.width, rect.y, rect.y + rect.height];

        var posMap = {
            x: {top: rectBound[2], bottom: rectBound[3]},
            y: {left: rectBound[0], right: rectBound[1]}
        };
        posMap.x.onZero = Math.max(Math.min(getZero('y'), posMap.x.bottom), posMap.x.top);
        posMap.y.onZero = Math.max(Math.min(getZero('x'), posMap.y.right), posMap.y.left);

        function getZero(dim, val) {
            var theAxis = grid.getAxis(dim);
            return theAxis.toGlobalCoord(theAxis.dataToCoord(0));
        }

        // Axis position
        layout.position = [
            axisDim === 'y' ? posMap.y[axisPosition] : rectBound[0],
            axisDim === 'x' ? posMap.x[axisPosition] : rectBound[3]
        ];

        // Axis rotation
        var r = {x: 0, y: 1};
        layout.rotation = Math.PI / 2 * r[axisDim];

        // Tick and label direction, x y is axisDim
        var dirMap = {top: -1, bottom: 1, left: -1, right: 1};

        layout.labelDirection = layout.tickDirection = layout.nameDirection = dirMap[rawAxisPosition];
        if (axis.onZero) {
            layout.labelOffset = posMap[axisDim][rawAxisPosition] - posMap[axisDim].onZero;
        }

        if (axisModel.getModel('axisTick').get('inside')) {
            layout.tickDirection = -layout.tickDirection;
        }
        if (axisModel.getModel('axisLabel').get('inside')) {
            layout.labelDirection = -layout.labelDirection;
        }

        // Special label rotation
        var labelRotation = axisModel.getModel('axisLabel').get('rotate');
        layout.labelRotation = axisPosition === 'top' ? -labelRotation : labelRotation;

        // label interval when auto mode.
        layout.labelInterval = axis.getLabelInterval();

        // Over splitLine and splitArea
        layout.z2 = 1;

        return layout;
    }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
});