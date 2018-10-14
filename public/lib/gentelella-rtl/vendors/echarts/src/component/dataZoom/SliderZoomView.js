define(function (require) {

    var zrUtil = require('zrender/core/util');
    var graphic = require('../../util/graphic');
    var throttle = require('../../util/throttle');
    var DataZoomView = require('./DataZoomView');
    var Rect = graphic.Rect;
    var numberUtil = require('../../util/number');
    var linearMap = numberUtil.linearMap;
    var layout = require('../../util/layout');
    var sliderMove = require('../helper/sliderMove');
<<<<<<< HEAD
    var eventTool = require('zrender/core/event');

    var asc = numberUtil.asc;
    var bind = zrUtil.bind;
    // var mathMax = Math.max;
=======
    var asc = numberUtil.asc;
    var bind = zrUtil.bind;
    var mathRound = Math.round;
    var mathMax = Math.max;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    var each = zrUtil.each;

    // Constants
    var DEFAULT_LOCATION_EDGE_GAP = 7;
    var DEFAULT_FRAME_BORDER_WIDTH = 1;
    var DEFAULT_FILLER_SIZE = 30;
    var HORIZONTAL = 'horizontal';
    var VERTICAL = 'vertical';
    var LABEL_GAP = 5;
    var SHOW_DATA_SHADOW_SERIES_TYPE = ['line', 'bar', 'candlestick', 'scatter'];

    var SliderZoomView = DataZoomView.extend({

        type: 'dataZoom.slider',

        init: function (ecModel, api) {

            /**
             * @private
             * @type {Object}
             */
            this._displayables = {};

            /**
             * @private
             * @type {string}
             */
            this._orient;

            /**
             * [0, 100]
             * @private
             */
            this._range;

            /**
             * [coord of the first handle, coord of the second handle]
             * @private
             */
            this._handleEnds;

            /**
             * [length, thick]
             * @private
             * @type {Array.<number>}
             */
            this._size;

            /**
             * @private
             * @type {number}
             */
<<<<<<< HEAD
            this._handleWidth;

            /**
             * @private
             * @type {number}
             */
            this._handleHeight;
=======
            this._halfHandleSize;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            /**
             * @private
             */
            this._location;

            /**
             * @private
             */
            this._dragging;

            /**
             * @private
             */
            this._dataShadowInfo;

            this.api = api;
        },

        /**
         * @override
         */
        render: function (dataZoomModel, ecModel, api, payload) {
            SliderZoomView.superApply(this, 'render', arguments);

            throttle.createOrUpdate(
                this,
                '_dispatchZoomAction',
                this.dataZoomModel.get('throttle'),
                'fixRate'
            );

            this._orient = dataZoomModel.get('orient');
<<<<<<< HEAD
=======
            this._halfHandleSize = mathRound(dataZoomModel.get('handleSize') / 2);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            if (this.dataZoomModel.get('show') === false) {
                this.group.removeAll();
                return;
            }

            // Notice: this._resetInterval() should not be executed when payload.type
            // is 'dataZoom', origin this._range should be maintained, otherwise 'pan'
            // or 'zoom' info will be missed because of 'throttle' of this.dispatchAction,
            if (!payload || payload.type !== 'dataZoom' || payload.from !== this.uid) {
                this._buildView();
            }

            this._updateView();
        },

        /**
         * @override
         */
        remove: function () {
            SliderZoomView.superApply(this, 'remove', arguments);
            throttle.clear(this, '_dispatchZoomAction');
        },

        /**
         * @override
         */
        dispose: function () {
            SliderZoomView.superApply(this, 'dispose', arguments);
            throttle.clear(this, '_dispatchZoomAction');
        },

        _buildView: function () {
            var thisGroup = this.group;

            thisGroup.removeAll();

            this._resetLocation();
            this._resetInterval();

            var barGroup = this._displayables.barGroup = new graphic.Group();

            this._renderBackground();
<<<<<<< HEAD

            this._renderHandle();

            this._renderDataShadow();
=======
            this._renderDataShadow();
            this._renderHandle();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            thisGroup.add(barGroup);

            this._positionGroup();
        },

        /**
         * @private
         */
        _resetLocation: function () {
            var dataZoomModel = this.dataZoomModel;
            var api = this.api;

            // If some of x/y/width/height are not specified,
            // auto-adapt according to target grid.
            var coordRect = this._findCoordRect();
            var ecSize = {width: api.getWidth(), height: api.getHeight()};
            // Default align by coordinate system rect.
            var positionInfo = this._orient === HORIZONTAL
                ? {
                    // Why using 'right', because right should be used in vertical,
                    // and it is better to be consistent for dealing with position param merge.
                    right: ecSize.width - coordRect.x - coordRect.width,
                    top: (ecSize.height - DEFAULT_FILLER_SIZE - DEFAULT_LOCATION_EDGE_GAP),
                    width: coordRect.width,
                    height: DEFAULT_FILLER_SIZE
                }
                : { // vertical
                    right: DEFAULT_LOCATION_EDGE_GAP,
                    top: coordRect.y,
                    width: DEFAULT_FILLER_SIZE,
                    height: coordRect.height
                };

            // Do not write back to option and replace value 'ph', because
            // the 'ph' value should be recalculated when resize.
            var layoutParams = layout.getLayoutParams(dataZoomModel.option);

            // Replace the placeholder value.
            zrUtil.each(['right', 'top', 'width', 'height'], function (name) {
                if (layoutParams[name] === 'ph') {
                    layoutParams[name] = positionInfo[name];
                }
            });

            var layoutRect = layout.getLayoutRect(
                layoutParams,
                ecSize,
                dataZoomModel.padding
            );

            this._location = {x: layoutRect.x, y: layoutRect.y};
            this._size = [layoutRect.width, layoutRect.height];
            this._orient === VERTICAL && this._size.reverse();
        },

        /**
         * @private
         */
        _positionGroup: function () {
            var thisGroup = this.group;
            var location = this._location;
            var orient = this._orient;

            // Just use the first axis to determine mapping.
            var targetAxisModel = this.dataZoomModel.getFirstTargetAxisModel();
            var inverse = targetAxisModel && targetAxisModel.get('inverse');

            var barGroup = this._displayables.barGroup;
            var otherAxisInverse = (this._dataShadowInfo || {}).otherAxisInverse;

            // Transform barGroup.
            barGroup.attr(
                (orient === HORIZONTAL && !inverse)
                ? {scale: otherAxisInverse ? [1, 1] : [1, -1]}
                : (orient === HORIZONTAL && inverse)
                ? {scale: otherAxisInverse ? [-1, 1] : [-1, -1]}
                : (orient === VERTICAL && !inverse)
                ? {scale: otherAxisInverse ? [1, -1] : [1, 1], rotation: Math.PI / 2}
                // Dont use Math.PI, considering shadow direction.
                : {scale: otherAxisInverse ? [-1, -1] : [-1, 1], rotation: Math.PI / 2}
            );

            // Position barGroup
            var rect = thisGroup.getBoundingRect([barGroup]);
<<<<<<< HEAD
            thisGroup.attr('position', [location.x - rect.x, location.y - rect.y]);
=======
            thisGroup.position[0] = location.x - rect.x;
            thisGroup.position[1] = location.y - rect.y;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * @private
         */
        _getViewExtent: function () {
<<<<<<< HEAD
            return [0, this._size[0]];
        },

        _renderBackground: function () {
            var dataZoomModel = this.dataZoomModel;
            var size = this._size;
            var barGroup = this._displayables.barGroup;

            barGroup.add(new Rect({
=======
            // View total length.
            var halfHandleSize = this._halfHandleSize;
            var totalLength = mathMax(this._size[0], halfHandleSize * 4);
            var extent = [halfHandleSize, totalLength - halfHandleSize];

            return extent;
        },

        _renderBackground : function () {
            var dataZoomModel = this.dataZoomModel;
            var size = this._size;

            this._displayables.barGroup.add(new Rect({
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                silent: true,
                shape: {
                    x: 0, y: 0, width: size[0], height: size[1]
                },
                style: {
                    fill: dataZoomModel.get('backgroundColor')
<<<<<<< HEAD
                },
                z2: -40
            }));

            // Click panel, over shadow, below handles.
            barGroup.add(new Rect({
                shape: {
                    x: 0, y: 0, width: size[0], height: size[1]
                },
                style: {
                    fill: 'transparent'
                },
                z2: 0,
                onclick: zrUtil.bind(this._onClickPanelClick, this)
=======
                }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }));
        },

        _renderDataShadow: function () {
            var info = this._dataShadowInfo = this._prepareDataShadowInfo();

            if (!info) {
                return;
            }

            var size = this._size;
            var seriesModel = info.series;
            var data = seriesModel.getRawData();
            var otherDim = seriesModel.getShadowDim
                ? seriesModel.getShadowDim() // @see candlestick
                : info.otherDim;

<<<<<<< HEAD
            if (otherDim == null) {
                return;
            }

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            var otherDataExtent = data.getDataExtent(otherDim);
            // Nice extent.
            var otherOffset = (otherDataExtent[1] - otherDataExtent[0]) * 0.3;
            otherDataExtent = [
                otherDataExtent[0] - otherOffset,
                otherDataExtent[1] + otherOffset
            ];
            var otherShadowExtent = [0, size[1]];

            var thisShadowExtent = [0, size[0]];

<<<<<<< HEAD
            var areaPoints = [[size[0], 0], [0, 0]];
            var linePoints = [];
=======
            var points = [[size[0], 0], [0, 0]];
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            var step = thisShadowExtent[1] / (data.count() - 1);
            var thisCoord = 0;

            // Optimize for large data shadow
            var stride = Math.round(data.count() / size[0]);
<<<<<<< HEAD
            var lastIsEmpty;
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            data.each([otherDim], function (value, index) {
                if (stride > 0 && (index % stride)) {
                    thisCoord += step;
                    return;
                }
<<<<<<< HEAD

                // FIXME
                // Should consider axis.min/axis.max when drawing dataShadow.

                // FIXME
                // 应该使用统一的空判断？还是在list里进行空判断？
                var isEmpty = value == null || isNaN(value) || value === '';
                // See #4235.
                var otherCoord = isEmpty
                    ? 0 : linearMap(value, otherDataExtent, otherShadowExtent, true);

                // Attempt to draw data shadow precisely when there are empty value.
                if (isEmpty && !lastIsEmpty && index) {
                    areaPoints.push([areaPoints[areaPoints.length - 1][0], 0]);
                    linePoints.push([linePoints[linePoints.length - 1][0], 0]);
                }
                else if (!isEmpty && lastIsEmpty) {
                    areaPoints.push([thisCoord, 0]);
                    linePoints.push([thisCoord, 0]);
                }

                areaPoints.push([thisCoord, otherCoord]);
                linePoints.push([thisCoord, otherCoord]);

                thisCoord += step;
                lastIsEmpty = isEmpty;
            });

            var dataZoomModel = this.dataZoomModel;
            // var dataBackgroundModel = dataZoomModel.getModel('dataBackground');
            this._displayables.barGroup.add(new graphic.Polygon({
                shape: {points: areaPoints},
                style: zrUtil.defaults(
                    {fill: dataZoomModel.get('dataBackgroundColor')},
                    dataZoomModel.getModel('dataBackground.areaStyle').getAreaStyle()
                ),
                silent: true,
                z2: -20
            }));
            this._displayables.barGroup.add(new graphic.Polyline({
                shape: {points: linePoints},
                style: dataZoomModel.getModel('dataBackground.lineStyle').getLineStyle(),
                silent: true,
                z2: -19
=======
                // FIXME
                // 应该使用统计的空判断？还是在list里进行空判断？
                var otherCoord = (value == null || isNaN(value) || value === '')
                    ? null
                    : linearMap(value, otherDataExtent, otherShadowExtent, true);
                otherCoord != null && points.push([thisCoord, otherCoord]);

                thisCoord += step;
            });

            this._displayables.barGroup.add(new graphic.Polyline({
                shape: {points: points},
                style: {fill: this.dataZoomModel.get('dataBackgroundColor'), lineWidth: 0},
                silent: true,
                z2: -20
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }));
        },

        _prepareDataShadowInfo: function () {
            var dataZoomModel = this.dataZoomModel;
            var showDataShadow = dataZoomModel.get('showDataShadow');

            if (showDataShadow === false) {
                return;
            }

            // Find a representative series.
            var result;
            var ecModel = this.ecModel;

            dataZoomModel.eachTargetAxis(function (dimNames, axisIndex) {
                var seriesModels = dataZoomModel
                    .getAxisProxy(dimNames.name, axisIndex)
                    .getTargetSeriesModels();

                zrUtil.each(seriesModels, function (seriesModel) {
                    if (result) {
                        return;
                    }

                    if (showDataShadow !== true && zrUtil.indexOf(
                            SHOW_DATA_SHADOW_SERIES_TYPE, seriesModel.get('type')
                        ) < 0
                    ) {
                        return;
                    }

<<<<<<< HEAD
                    var thisAxis = ecModel.getComponent(dimNames.axis, axisIndex).axis;
                    var otherDim = getOtherDim(dimNames.name);
                    var otherAxisInverse;
                    var coordSys = seriesModel.coordinateSystem;
                    if (otherDim != null && coordSys.getOtherAxis) {
                        otherAxisInverse = coordSys.getOtherAxis(thisAxis).inverse;
                    }
=======
                    var otherDim = getOtherDim(dimNames.name);

                    var thisAxis = ecModel.getComponent(dimNames.axis, axisIndex).axis;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

                    result = {
                        thisAxis: thisAxis,
                        series: seriesModel,
                        thisDim: dimNames.name,
                        otherDim: otherDim,
<<<<<<< HEAD
                        otherAxisInverse: otherAxisInverse
=======
                        otherAxisInverse: seriesModel
                            .coordinateSystem.getOtherAxis(thisAxis).inverse
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    };

                }, this);

            }, this);

            return result;
        },

        _renderHandle: function () {
            var displaybles = this._displayables;
            var handles = displaybles.handles = [];
            var handleLabels = displaybles.handleLabels = [];
            var barGroup = this._displayables.barGroup;
            var size = this._size;
<<<<<<< HEAD
            var dataZoomModel = this.dataZoomModel;
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            barGroup.add(displaybles.filler = new Rect({
                draggable: true,
                cursor: 'move',
                drift: bind(this._onDragMove, this, 'all'),
<<<<<<< HEAD
                onmousemove: function (e) {
                    // Fot mobile devicem, prevent screen slider on the button.
                    eventTool.stop(e.event);
                },
                ondragstart: bind(this._showDataInfo, this, true),
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                ondragend: bind(this._onDragEnd, this),
                onmouseover: bind(this._showDataInfo, this, true),
                onmouseout: bind(this._showDataInfo, this, false),
                style: {
<<<<<<< HEAD
                    fill: dataZoomModel.get('fillerColor'),
=======
                    fill: this.dataZoomModel.get('fillerColor'),
                    // text: ':::',
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    textPosition : 'inside'
                }
            }));

            // Frame border.
            barGroup.add(new Rect(graphic.subPixelOptimizeRect({
                silent: true,
                shape: {
                    x: 0,
                    y: 0,
                    width: size[0],
                    height: size[1]
                },
                style: {
<<<<<<< HEAD
                    stroke: dataZoomModel.get('dataBackgroundColor')
                        || dataZoomModel.get('borderColor'),
=======
                    stroke: this.dataZoomModel.get('dataBackgroundColor'),
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    lineWidth: DEFAULT_FRAME_BORDER_WIDTH,
                    fill: 'rgba(0,0,0,0)'
                }
            })));

<<<<<<< HEAD
            var iconStr = dataZoomModel.get('handleIcon');
            each([0, 1], function (handleIndex) {
                var iconOpt = {
                    style: {
                        strokeNoScale: true
                    },
                    rectHover: true,
                    cursor: this._orient === 'vertical' ? 'ns-resize' : 'ew-resize',
                    draggable: true,
                    drift: bind(this._onDragMove, this, handleIndex),
                    onmousemove: function (e) {
                        // Fot mobile devicem, prevent screen slider on the button.
                        eventTool.stop(e.event);
                    },
                    ondragend: bind(this._onDragEnd, this),
                    onmouseover: bind(this._showDataInfo, this, true),
                    onmouseout: bind(this._showDataInfo, this, false)
                };
                var iconStyle = {x: -1, y: 0, width: 2, height: 2};

                var path = iconStr.indexOf('image://') === 0
                    ? (
                        iconStyle.image = iconStr.slice(8),
                        iconOpt.style = iconStyle,
                        new graphic.Image(iconOpt)
                    )
                    : graphic.makePath(
                        iconStr.replace('path://', ''),
                        iconOpt,
                        iconStyle,
                        'center'
                    );

                var bRect = path.getBoundingRect();
                this._handleHeight = numberUtil.parsePercent(dataZoomModel.get('handleSize'), this._size[1]);
                this._handleWidth = bRect.width / bRect.height * this._handleHeight;

                path.setStyle(dataZoomModel.getModel('handleStyle').getItemStyle());
                var handleColor = dataZoomModel.get('handleColor');
                // Compatitable with previous version
                if (handleColor != null) {
                    path.style.fill = handleColor;
                }

                barGroup.add(handles[handleIndex] = path);

                var textStyleModel = dataZoomModel.textStyleModel;
=======
            each([0, 1], function (handleIndex) {

                barGroup.add(handles[handleIndex] = new Rect({
                    style: {
                        fill: this.dataZoomModel.get('handleColor')
                    },
                    cursor: 'move',
                    draggable: true,
                    drift: bind(this._onDragMove, this, handleIndex),
                    ondragend: bind(this._onDragEnd, this),
                    onmouseover: bind(this._showDataInfo, this, true),
                    onmouseout: bind(this._showDataInfo, this, false)
                }));

                var textStyleModel = this.dataZoomModel.textStyleModel;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

                this.group.add(
                    handleLabels[handleIndex] = new graphic.Text({
                    silent: true,
                    invisible: true,
                    style: {
                        x: 0, y: 0, text: '',
                        textVerticalAlign: 'middle',
                        textAlign: 'center',
                        fill: textStyleModel.getTextColor(),
                        textFont: textStyleModel.getFont()
<<<<<<< HEAD
                    },
                    z2: 10
=======
                    }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                }));

            }, this);
        },

        /**
         * @private
         */
        _resetInterval: function () {
            var range = this._range = this.dataZoomModel.getPercentRange();
            var viewExtent = this._getViewExtent();

            this._handleEnds = [
                linearMap(range[0], [0, 100], viewExtent, true),
                linearMap(range[1], [0, 100], viewExtent, true)
            ];
        },

        /**
         * @private
         * @param {(number|string)} handleIndex 0 or 1 or 'all'
<<<<<<< HEAD
         * @param {number} delta
         */
        _updateInterval: function (handleIndex, delta) {
            var dataZoomModel = this.dataZoomModel;
            var handleEnds = this._handleEnds;
            var viewExtend = this._getViewExtent();
            var minMaxSpan = dataZoomModel.findRepresentativeAxisProxy().getMinMaxSpan();
            var percentExtent = [0, 100];
=======
         * @param {number} dx
         * @param {number} dy
         */
        _updateInterval: function (handleIndex, delta) {
            var handleEnds = this._handleEnds;
            var viewExtend = this._getViewExtent();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            sliderMove(
                delta,
                handleEnds,
                viewExtend,
<<<<<<< HEAD
                dataZoomModel.get('zoomLock') ? 'all' : handleIndex,
                minMaxSpan.minSpan != null
                    ? linearMap(minMaxSpan.minSpan, percentExtent, viewExtend, true) : null,
                minMaxSpan.maxSpan != null
                    ? linearMap(minMaxSpan.maxSpan, percentExtent, viewExtend, true) : null
            );

            this._range = asc([
                linearMap(handleEnds[0], viewExtend, percentExtent, true),
                linearMap(handleEnds[1], viewExtend, percentExtent, true)
=======
                (handleIndex === 'all' || this.dataZoomModel.get('zoomLock'))
                    ? 'rigid' : 'cross',
                handleIndex
            );

            this._range = asc([
                linearMap(handleEnds[0], viewExtend, [0, 100], true),
                linearMap(handleEnds[1], viewExtend, [0, 100], true)
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            ]);
        },

        /**
         * @private
         */
<<<<<<< HEAD
        _updateView: function (nonRealtime) {
=======
        _updateView: function () {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            var displaybles = this._displayables;
            var handleEnds = this._handleEnds;
            var handleInterval = asc(handleEnds.slice());
            var size = this._size;
<<<<<<< HEAD

            each([0, 1], function (handleIndex) {
                // Handles
                var handle = displaybles.handles[handleIndex];
                var handleHeight = this._handleHeight;
                handle.attr({
                    scale: [handleHeight / 2, handleHeight / 2],
                    position: [handleEnds[handleIndex], size[1] / 2 - handleHeight / 2]
                });
=======
            var halfHandleSize = this._halfHandleSize;

            each([0, 1], function (handleIndex) {

                // Handles
                var handle = displaybles.handles[handleIndex];
                handle.setShape({
                    x: handleEnds[handleIndex] - halfHandleSize,
                    y: -1,
                    width: halfHandleSize * 2,
                    height: size[1] + 2,
                    r: 1
                });

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }, this);

            // Filler
            displaybles.filler.setShape({
                x: handleInterval[0],
                y: 0,
                width: handleInterval[1] - handleInterval[0],
<<<<<<< HEAD
                height: size[1]
            });

            this._updateDataInfo(nonRealtime);
=======
                height: this._size[1]
            });

            this._updateDataInfo();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * @private
         */
<<<<<<< HEAD
        _updateDataInfo: function (nonRealtime) {
=======
        _updateDataInfo: function () {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            var dataZoomModel = this.dataZoomModel;
            var displaybles = this._displayables;
            var handleLabels = displaybles.handleLabels;
            var orient = this._orient;
            var labelTexts = ['', ''];

            // FIXME
            // date型，支持formatter，autoformatter（ec2 date.getAutoFormatter）
            if (dataZoomModel.get('showDetail')) {
<<<<<<< HEAD
                var axisProxy = dataZoomModel.findRepresentativeAxisProxy();

                if (axisProxy) {
                    var axis = axisProxy.getAxisModel().axis;
                    var range = this._range;

                    var dataInterval = nonRealtime
                        // See #4434, data and axis are not processed and reset yet in non-realtime mode.
                        ? axisProxy.calculateDataWindow({
                            start: range[0], end: range[1]
                        }).valueWindow
                        : axisProxy.getDataValueWindow();

=======
                var dataInterval;
                var axis;
                dataZoomModel.eachTargetAxis(function (dimNames, axisIndex) {
                    // Using dataInterval of the first axis.
                    if (!dataInterval) {
                        dataInterval = dataZoomModel
                            .getAxisProxy(dimNames.name, axisIndex)
                            .getDataValueWindow();
                        axis = this.ecModel.getComponent(dimNames.axis, axisIndex).axis;
                    }
                }, this);

                if (dataInterval) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    labelTexts = [
                        this._formatLabel(dataInterval[0], axis),
                        this._formatLabel(dataInterval[1], axis)
                    ];
                }
            }

            var orderedHandleEnds = asc(this._handleEnds.slice());

            setLabel.call(this, 0);
            setLabel.call(this, 1);

            function setLabel(handleIndex) {
                // Label
                // Text should not transform by barGroup.
<<<<<<< HEAD
                // Ignore handlers transform
                var barTransform = graphic.getTransform(
                    displaybles.handles[handleIndex].parent, this.group
=======
                var barTransform = graphic.getTransform(
                    displaybles.handles[handleIndex], this.group
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                );
                var direction = graphic.transformDirection(
                    handleIndex === 0 ? 'right' : 'left', barTransform
                );
<<<<<<< HEAD
                var offset = this._handleWidth / 2 + LABEL_GAP;
=======
                var offset = this._halfHandleSize + LABEL_GAP;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                var textPoint = graphic.applyTransform(
                    [
                        orderedHandleEnds[handleIndex] + (handleIndex === 0 ? -offset : offset),
                        this._size[1] / 2
                    ],
                    barTransform
                );
                handleLabels[handleIndex].setStyle({
                    x: textPoint[0],
                    y: textPoint[1],
                    textVerticalAlign: orient === HORIZONTAL ? 'middle' : direction,
                    textAlign: orient === HORIZONTAL ? direction : 'center',
                    text: labelTexts[handleIndex]
                });
            }
        },

        /**
         * @private
         */
        _formatLabel: function (value, axis) {
            var dataZoomModel = this.dataZoomModel;
            var labelFormatter = dataZoomModel.get('labelFormatter');
<<<<<<< HEAD
=======
            if (zrUtil.isFunction(labelFormatter)) {
                return labelFormatter(value);
            }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            var labelPrecision = dataZoomModel.get('labelPrecision');
            if (labelPrecision == null || labelPrecision === 'auto') {
                labelPrecision = axis.getPixelPrecision();
            }

<<<<<<< HEAD
            var valueStr = (value == null || isNaN(value))
=======
            value = (value == null && isNaN(value))
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                ? ''
                // FIXME Glue code
                : (axis.type === 'category' || axis.type === 'time')
                    ? axis.scale.getLabel(Math.round(value))
                    // param of toFixed should less then 20.
                    : value.toFixed(Math.min(labelPrecision, 20));

<<<<<<< HEAD
            return zrUtil.isFunction(labelFormatter)
                ? labelFormatter(value, valueStr)
                : zrUtil.isString(labelFormatter)
                ? labelFormatter.replace('{value}', valueStr)
                : valueStr;
=======
            if (zrUtil.isString(labelFormatter)) {
                value = labelFormatter.replace('{value}', value);
            }

            return value;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * @private
         * @param {boolean} showOrHide true: show, false: hide
         */
        _showDataInfo: function (showOrHide) {
            // Always show when drgging.
            showOrHide = this._dragging || showOrHide;

            var handleLabels = this._displayables.handleLabels;
            handleLabels[0].attr('invisible', !showOrHide);
            handleLabels[1].attr('invisible', !showOrHide);
        },

        _onDragMove: function (handleIndex, dx, dy) {
            this._dragging = true;

            // Transform dx, dy to bar coordination.
<<<<<<< HEAD
            var barTransform = this._displayables.barGroup.getLocalTransform();
            var vertex = graphic.applyTransform([dx, dy], barTransform, true);

            this._updateInterval(handleIndex, vertex[0]);

            var realtime = this.dataZoomModel.get('realtime');

            this._updateView(!realtime);

            if (realtime) {
                realtime && this._dispatchZoomAction();
=======
            var vertex = this._applyBarTransform([dx, dy], true);

            this._updateInterval(handleIndex, vertex[0]);
            this._updateView();

            if (this.dataZoomModel.get('realtime')) {
                this._dispatchZoomAction();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }
        },

        _onDragEnd: function () {
            this._dragging = false;
            this._showDataInfo(false);
            this._dispatchZoomAction();
        },

<<<<<<< HEAD
        _onClickPanelClick: function (e) {
            var size = this._size;
            var localPoint = this._displayables.barGroup.transformCoordToLocal(e.offsetX, e.offsetY);

            if (localPoint[0] < 0 || localPoint[0] > size[0]
                || localPoint[1] < 0 || localPoint[1] > size[1]
            ) {
                return;
            }

            var handleEnds = this._handleEnds;
            var center = (handleEnds[0] + handleEnds[1]) / 2;

            this._updateInterval('all', localPoint[0] - center);
            this._updateView();
            this._dispatchZoomAction();
        },

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        /**
         * This action will be throttled.
         * @private
         */
        _dispatchZoomAction: function () {
            var range = this._range;

            this.api.dispatchAction({
                type: 'dataZoom',
                from: this.uid,
                dataZoomId: this.dataZoomModel.id,
                start: range[0],
                end: range[1]
            });
        },

        /**
         * @private
         */
<<<<<<< HEAD
        _findCoordRect: function () {
            // Find the grid coresponding to the first axis referred by dataZoom.
            var rect;
            each(this.getTargetCoordInfo(), function (coordInfoList) {
                if (!rect && coordInfoList.length) {
                    var coordSys = coordInfoList[0].model.coordinateSystem;
                    rect = coordSys.getRect && coordSys.getRect();
                }
            });
            if (!rect) {
=======
        _applyBarTransform: function (vertex, inverse) {
            var barTransform = this._displayables.barGroup.getLocalTransform();
            return graphic.applyTransform(vertex, barTransform, inverse);
        },

        /**
         * @private
         */
        _findCoordRect: function () {
            // Find the grid coresponding to the first axis referred by dataZoom.
            var targetInfo = this.getTargetInfo();

            // FIXME
            // 判断是catesian还是polar
            var rect;
            if (targetInfo.cartesians.length) {
                rect = targetInfo.cartesians[0].model.coordinateSystem.getRect();
            }
            else { // Polar
                // FIXME
                // 暂时随便写的
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                var width = this.api.getWidth();
                var height = this.api.getHeight();
                rect = {
                    x: width * 0.2,
                    y: height * 0.2,
                    width: width * 0.6,
                    height: height * 0.6
                };
            }

            return rect;
        }

    });

    function getOtherDim(thisDim) {
        // FIXME
        // 这个逻辑和getOtherAxis里一致，但是写在这里是否不好
<<<<<<< HEAD
        var map = {x: 'y', y: 'x', radius: 'angle', angle: 'radius'};
        return map[thisDim];
=======
        return thisDim === 'x' ? 'y' : 'x';
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    }

    return SliderZoomView;

});