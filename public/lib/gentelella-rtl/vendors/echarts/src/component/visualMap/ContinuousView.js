define(function(require) {

    var VisualMapView = require('./VisualMapView');
    var graphic = require('../../util/graphic');
    var zrUtil = require('zrender/core/util');
    var numberUtil = require('../../util/number');
    var sliderMove = require('../helper/sliderMove');
    var LinearGradient = require('zrender/graphic/LinearGradient');
    var helper = require('./helper');
<<<<<<< HEAD
    var modelUtil = require('../../util/model');
    var eventTool = require('zrender/core/event');

    var linearMap = numberUtil.linearMap;
=======

    var linearMap = numberUtil.linearMap;
    var convertDataIndicesToBatch = helper.convertDataIndicesToBatch;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    var each = zrUtil.each;
    var mathMin = Math.min;
    var mathMax = Math.max;

    // Arbitrary value
<<<<<<< HEAD
    var HOVER_LINK_SIZE = 12;
=======
    var HOVER_LINK_RANGE = 6;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    var HOVER_LINK_OUT = 6;

    // Notice:
    // Any "interval" should be by the order of [low, high].
    // "handle0" (handleIndex === 0) maps to
    // low data value: this._dataInterval[0] and has low coord.
    // "handle1" (handleIndex === 1) maps to
    // high data value: this._dataInterval[1] and has high coord.
    // The logic of transform is implemented in this._createBarGroup.

<<<<<<< HEAD
    var ContinuousView = VisualMapView.extend({
=======
    var ContinuousVisualMapView = VisualMapView.extend({
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

        type: 'visualMap.continuous',

        /**
         * @override
         */
        init: function () {

<<<<<<< HEAD
            ContinuousView.superApply(this, 'init', arguments);
=======
            VisualMapView.prototype.init.apply(this, arguments);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            /**
             * @private
             */
            this._shapes = {};

            /**
             * @private
             */
            this._dataInterval = [];

            /**
             * @private
             */
            this._handleEnds = [];

            /**
             * @private
             */
            this._orient;

            /**
             * @private
             */
            this._useHandle;

            /**
             * @private
             */
            this._hoverLinkDataIndices = [];
<<<<<<< HEAD

            /**
             * @private
             */
            this._dragging;

            /**
             * @private
             */
            this._hovering;
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * @protected
         * @override
         */
        doRender: function (visualMapModel, ecModel, api, payload) {
            if (!payload || payload.type !== 'selectDataRange' || payload.from !== this.uid) {
                this._buildView();
            }
<<<<<<< HEAD
=======
            else {
                this._updateView();
            }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * @private
         */
        _buildView: function () {
            this.group.removeAll();

            var visualMapModel = this.visualMapModel;
            var thisGroup = this.group;

            this._orient = visualMapModel.get('orient');
            this._useHandle = visualMapModel.get('calculable');

            this._resetInterval();

            this._renderBar(thisGroup);

            var dataRangeText = visualMapModel.get('text');
            this._renderEndsText(thisGroup, dataRangeText, 0);
            this._renderEndsText(thisGroup, dataRangeText, 1);

            // Do this for background size calculation.
            this._updateView(true);

            // After updating view, inner shapes is built completely,
            // and then background can be rendered.
            this.renderBackground(thisGroup);

            // Real update view
            this._updateView();

            this._enableHoverLinkToSeries();
            this._enableHoverLinkFromSeries();

            this.positionGroup(thisGroup);
        },

        /**
         * @private
         */
        _renderEndsText: function (group, dataRangeText, endsIndex) {
            if (!dataRangeText) {
                return;
            }

            // Compatible with ec2, text[0] map to high value, text[1] map low value.
            var text = dataRangeText[1 - endsIndex];
            text = text != null ? text + '' : '';

            var visualMapModel = this.visualMapModel;
            var textGap = visualMapModel.get('textGap');
            var itemSize = visualMapModel.itemSize;

            var barGroup = this._shapes.barGroup;
            var position = this._applyTransform(
                [
                    itemSize[0] / 2,
                    endsIndex === 0 ? -textGap : itemSize[1] + textGap
                ],
                barGroup
            );
            var align = this._applyTransform(
                endsIndex === 0 ? 'bottom' : 'top',
                barGroup
            );
            var orient = this._orient;
            var textStyleModel = this.visualMapModel.textStyleModel;

            this.group.add(new graphic.Text({
                style: {
                    x: position[0],
                    y: position[1],
                    textVerticalAlign: orient === 'horizontal' ? 'middle' : align,
                    textAlign: orient === 'horizontal' ? align : 'center',
                    text: text,
                    textFont: textStyleModel.getFont(),
                    fill: textStyleModel.getTextColor()
                }
            }));
        },

        /**
         * @private
         */
        _renderBar: function (targetGroup) {
            var visualMapModel = this.visualMapModel;
            var shapes = this._shapes;
            var itemSize = visualMapModel.itemSize;
            var orient = this._orient;
            var useHandle = this._useHandle;
            var itemAlign = helper.getItemAlign(visualMapModel, this.api, itemSize);
            var barGroup = shapes.barGroup = this._createBarGroup(itemAlign);

            // Bar
            barGroup.add(shapes.outOfRange = createPolygon());
            barGroup.add(shapes.inRange = createPolygon(
                null,
<<<<<<< HEAD
                useHandle ? 'move' : null,
                zrUtil.bind(this._dragHandle, this, 'all', false),
                zrUtil.bind(this._dragHandle, this, 'all', true)
            ));

            var textRect = visualMapModel.textStyleModel.getTextRect('国');
            var textSize = mathMax(textRect.width, textRect.height);
=======
                zrUtil.bind(this._modifyHandle, this, 'all'),
                useHandle ? 'move' : null
            ));

            var textRect = visualMapModel.textStyleModel.getTextRect('国');
            var textSize = Math.max(textRect.width, textRect.height);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            // Handle
            if (useHandle) {
                shapes.handleThumbs = [];
                shapes.handleLabels = [];
                shapes.handleLabelPoints = [];

                this._createHandle(barGroup, 0, itemSize, textSize, orient, itemAlign);
                this._createHandle(barGroup, 1, itemSize, textSize, orient, itemAlign);
            }

            this._createIndicator(barGroup, itemSize, textSize, orient);

            targetGroup.add(barGroup);
        },

        /**
         * @private
         */
        _createHandle: function (barGroup, handleIndex, itemSize, textSize, orient) {
<<<<<<< HEAD
            var onDrift = zrUtil.bind(this._dragHandle, this, handleIndex, false);
            var onDragEnd = zrUtil.bind(this._dragHandle, this, handleIndex, true);
            var handleThumb = createPolygon(
                createHandlePoints(handleIndex, textSize),
                'move',
                onDrift,
                onDragEnd
=======
            var modifyHandle = zrUtil.bind(this._modifyHandle, this, handleIndex);
            var handleThumb = createPolygon(
                createHandlePoints(handleIndex, textSize),
                modifyHandle,
                'move'
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            );
            handleThumb.position[0] = itemSize[0];
            barGroup.add(handleThumb);

            // Text is always horizontal layout but should not be effected by
            // transform (orient/inverse). So label is built separately but not
            // use zrender/graphic/helper/RectText, and is located based on view
            // group (according to handleLabelPoint) but not barGroup.
            var textStyleModel = this.visualMapModel.textStyleModel;
            var handleLabel = new graphic.Text({
                draggable: true,
<<<<<<< HEAD
                drift: onDrift,
                onmousemove: function (e) {
                    // Fot mobile devicem, prevent screen slider on the button.
                    eventTool.stop(e.event);
                },
                ondragend: onDragEnd,
=======
                drift: modifyHandle,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                style: {
                    x: 0, y: 0, text: '',
                    textFont: textStyleModel.getFont(),
                    fill: textStyleModel.getTextColor()
                }
            });
            this.group.add(handleLabel);

            var handleLabelPoint = [
                orient === 'horizontal'
                    ? textSize / 2
                    : textSize * 1.5,
                orient === 'horizontal'
                    ? (handleIndex === 0 ? -(textSize * 1.5) : (textSize * 1.5))
                    : (handleIndex === 0 ? -textSize / 2 : textSize / 2)
            ];

            var shapes = this._shapes;
            shapes.handleThumbs[handleIndex] = handleThumb;
            shapes.handleLabelPoints[handleIndex] = handleLabelPoint;
            shapes.handleLabels[handleIndex] = handleLabel;
        },

        /**
         * @private
         */
        _createIndicator: function (barGroup, itemSize, textSize, orient) {
<<<<<<< HEAD
            var indicator = createPolygon([[0, 0]], 'move');
=======
            var indicator = createPolygon([[0, 0]], null, 'move');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            indicator.position[0] = itemSize[0];
            indicator.attr({invisible: true, silent: true});
            barGroup.add(indicator);

            var textStyleModel = this.visualMapModel.textStyleModel;
            var indicatorLabel = new graphic.Text({
                silent: true,
                invisible: true,
                style: {
                    x: 0, y: 0, text: '',
                    textFont: textStyleModel.getFont(),
                    fill: textStyleModel.getTextColor()
                }
            });
            this.group.add(indicatorLabel);

            var indicatorLabelPoint = [
                orient === 'horizontal' ? textSize / 2 : HOVER_LINK_OUT + 3,
                0
            ];

            var shapes = this._shapes;
            shapes.indicator = indicator;
            shapes.indicatorLabel = indicatorLabel;
            shapes.indicatorLabelPoint = indicatorLabelPoint;
        },

        /**
         * @private
         */
<<<<<<< HEAD
        _dragHandle: function (handleIndex, isEnd, dx, dy) {
=======
        _modifyHandle: function (handleIndex, dx, dy) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            if (!this._useHandle) {
                return;
            }

<<<<<<< HEAD
            this._dragging = !isEnd;

            if (!isEnd) {
                // Transform dx, dy to bar coordination.
                var vertex = this._applyTransform([dx, dy], this._shapes.barGroup, true);
                this._updateInterval(handleIndex, vertex[1]);

                // Considering realtime, update view should be executed
                // before dispatch action.
                this._updateView();
            }

            // dragEnd do not dispatch action when realtime.
            if (isEnd === !this.visualMapModel.get('realtime')) { // jshint ignore:line
                this.api.dispatchAction({
                    type: 'selectDataRange',
                    from: this.uid,
                    visualMapId: this.visualMapModel.id,
                    selected: this._dataInterval.slice()
                });
            }

            if (isEnd) {
                !this._hovering && this._clearHoverLinkToSeries();
            }
            else if (useHoverLinkOnHandle(this.visualMapModel)) {
                this._doHoverLinkToSeries(this._handleEnds[handleIndex], false);
            }
=======
            // Transform dx, dy to bar coordination.
            var vertex = this._applyTransform([dx, dy], this._shapes.barGroup, true);
            this._updateInterval(handleIndex, vertex[1]);

            this.api.dispatchAction({
                type: 'selectDataRange',
                from: this.uid,
                visualMapId: this.visualMapModel.id,
                selected: this._dataInterval.slice()
            });
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * @private
         */
        _resetInterval: function () {
            var visualMapModel = this.visualMapModel;

            var dataInterval = this._dataInterval = visualMapModel.getSelected();
            var dataExtent = visualMapModel.getExtent();
            var sizeExtent = [0, visualMapModel.itemSize[1]];

            this._handleEnds = [
                linearMap(dataInterval[0], dataExtent, sizeExtent, true),
                linearMap(dataInterval[1], dataExtent, sizeExtent, true)
            ];
        },

        /**
         * @private
         * @param {(number|string)} handleIndex 0 or 1 or 'all'
         * @param {number} dx
         * @param {number} dy
         */
        _updateInterval: function (handleIndex, delta) {
            delta = delta || 0;
            var visualMapModel = this.visualMapModel;
            var handleEnds = this._handleEnds;
<<<<<<< HEAD
            var sizeExtent = [0, visualMapModel.itemSize[1]];
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            sliderMove(
                delta,
                handleEnds,
<<<<<<< HEAD
                sizeExtent,
                handleIndex,
                // cross is forbiden
                0
            );

            var dataExtent = visualMapModel.getExtent();
=======
                [0, visualMapModel.itemSize[1]],
                handleIndex === 'all' ? 'rigid' : 'push',
                handleIndex
            );
            var dataExtent = visualMapModel.getExtent();
            var sizeExtent = [0, visualMapModel.itemSize[1]];
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            // Update data interval.
            this._dataInterval = [
                linearMap(handleEnds[0], sizeExtent, dataExtent, true),
                linearMap(handleEnds[1], sizeExtent, dataExtent, true)
            ];
        },

        /**
         * @private
         */
        _updateView: function (forSketch) {
            var visualMapModel = this.visualMapModel;
            var dataExtent = visualMapModel.getExtent();
            var shapes = this._shapes;

            var outOfRangeHandleEnds = [0, visualMapModel.itemSize[1]];
            var inRangeHandleEnds = forSketch ? outOfRangeHandleEnds : this._handleEnds;

            var visualInRange = this._createBarVisual(
                this._dataInterval, dataExtent, inRangeHandleEnds, 'inRange'
            );
            var visualOutOfRange = this._createBarVisual(
                dataExtent, dataExtent, outOfRangeHandleEnds, 'outOfRange'
            );

            shapes.inRange
                .setStyle({
                    fill: visualInRange.barColor,
                    opacity: visualInRange.opacity
                })
                .setShape('points', visualInRange.barPoints);
            shapes.outOfRange
                .setStyle({
                    fill: visualOutOfRange.barColor,
                    opacity: visualOutOfRange.opacity
                })
                .setShape('points', visualOutOfRange.barPoints);

            this._updateHandle(inRangeHandleEnds, visualInRange);
        },

        /**
         * @private
         */
        _createBarVisual: function (dataInterval, dataExtent, handleEnds, forceState) {
            var opts = {
                forceState: forceState,
                convertOpacityToAlpha: true
            };
            var colorStops = this._makeColorGradient(dataInterval, opts);

            var symbolSizes = [
                this.getControllerVisual(dataInterval[0], 'symbolSize', opts),
                this.getControllerVisual(dataInterval[1], 'symbolSize', opts)
            ];
            var barPoints = this._createBarPoints(handleEnds, symbolSizes);

            return {
<<<<<<< HEAD
                barColor: new LinearGradient(0, 0, 0, 1, colorStops),
=======
                barColor: new LinearGradient(0, 0, 1, 1, colorStops),
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                barPoints: barPoints,
                handlesColor: [
                    colorStops[0].color,
                    colorStops[colorStops.length - 1].color
                ]
            };
        },

        /**
         * @private
         */
        _makeColorGradient: function (dataInterval, opts) {
            // Considering colorHue, which is not linear, so we have to sample
            // to calculate gradient color stops, but not only caculate head
            // and tail.
            var sampleNumber = 100; // Arbitrary value.
            var colorStops = [];
            var step = (dataInterval[1] - dataInterval[0]) / sampleNumber;

            colorStops.push({
                color: this.getControllerVisual(dataInterval[0], 'color', opts),
                offset: 0
            });

            for (var i = 1; i < sampleNumber; i++) {
                var currValue = dataInterval[0] + step * i;
                if (currValue > dataInterval[1]) {
                    break;
                }
                colorStops.push({
                    color: this.getControllerVisual(currValue, 'color', opts),
                    offset: i / sampleNumber
                });
            }

            colorStops.push({
                color: this.getControllerVisual(dataInterval[1], 'color', opts),
                offset: 1
            });

            return colorStops;
        },

        /**
         * @private
         */
        _createBarPoints: function (handleEnds, symbolSizes) {
            var itemSize = this.visualMapModel.itemSize;

            return [
                [itemSize[0] - symbolSizes[0], handleEnds[0]],
                [itemSize[0], handleEnds[0]],
                [itemSize[0], handleEnds[1]],
                [itemSize[0] - symbolSizes[1], handleEnds[1]]
            ];
        },

        /**
         * @private
         */
        _createBarGroup: function (itemAlign) {
            var orient = this._orient;
            var inverse = this.visualMapModel.get('inverse');

            return new graphic.Group(
                (orient === 'horizontal' && !inverse)
                ? {scale: itemAlign === 'bottom' ? [1, 1] : [-1, 1], rotation: Math.PI / 2}
                : (orient === 'horizontal' && inverse)
                ? {scale: itemAlign === 'bottom' ? [-1, 1] : [1, 1], rotation: -Math.PI / 2}
                : (orient === 'vertical' && !inverse)
                ? {scale: itemAlign === 'left' ? [1, -1] : [-1, -1]}
                : {scale: itemAlign === 'left' ? [1, 1] : [-1, 1]}
            );
        },

        /**
         * @private
         */
        _updateHandle: function (handleEnds, visualInRange) {
            if (!this._useHandle) {
                return;
            }

            var shapes = this._shapes;
            var visualMapModel = this.visualMapModel;
            var handleThumbs = shapes.handleThumbs;
            var handleLabels = shapes.handleLabels;

            each([0, 1], function (handleIndex) {
                var handleThumb = handleThumbs[handleIndex];
                handleThumb.setStyle('fill', visualInRange.handlesColor[handleIndex]);
                handleThumb.position[1] = handleEnds[handleIndex];

                // Update handle label position.
                var textPoint = graphic.applyTransform(
                    shapes.handleLabelPoints[handleIndex],
                    graphic.getTransform(handleThumb, this.group)
                );
                handleLabels[handleIndex].setStyle({
                    x: textPoint[0],
                    y: textPoint[1],
                    text: visualMapModel.formatValueText(this._dataInterval[handleIndex]),
                    textVerticalAlign: 'middle',
                    textAlign: this._applyTransform(
                        this._orient === 'horizontal'
                            ? (handleIndex === 0 ? 'bottom' : 'top')
                            : 'left',
                        shapes.barGroup
                    )
                });
            }, this);
        },

        /**
         * @private
<<<<<<< HEAD
         * @param {number} cursorValue
         * @param {number} textValue
         * @param {string} [rangeSymbol]
         * @param {number} [halfHoverLinkSize]
         */
        _showIndicator: function (cursorValue, textValue, rangeSymbol, halfHoverLinkSize) {
=======
         */
        _showIndicator: function (value, isRange) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            var visualMapModel = this.visualMapModel;
            var dataExtent = visualMapModel.getExtent();
            var itemSize = visualMapModel.itemSize;
            var sizeExtent = [0, itemSize[1]];
<<<<<<< HEAD
            var pos = linearMap(cursorValue, dataExtent, sizeExtent, true);
=======
            var pos = linearMap(value, dataExtent, sizeExtent, true);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            var shapes = this._shapes;
            var indicator = shapes.indicator;
            if (!indicator) {
                return;
            }

            indicator.position[1] = pos;
            indicator.attr('invisible', false);
<<<<<<< HEAD
            indicator.setShape('points', createIndicatorPoints(
                !!rangeSymbol, halfHoverLinkSize, pos, itemSize[1]
            ));

            var opts = {convertOpacityToAlpha: true};
            var color = this.getControllerVisual(cursorValue, 'color', opts);
=======
            indicator.setShape('points', createIndicatorPoints(isRange, pos, itemSize[1]));

            var opts = {convertOpacityToAlpha: true};
            var color = this.getControllerVisual(value, 'color', opts);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            indicator.setStyle('fill', color);

            // Update handle label position.
            var textPoint = graphic.applyTransform(
                shapes.indicatorLabelPoint,
                graphic.getTransform(indicator, this.group)
            );

            var indicatorLabel = shapes.indicatorLabel;
            indicatorLabel.attr('invisible', false);
            var align = this._applyTransform('left', shapes.barGroup);
            var orient = this._orient;
            indicatorLabel.setStyle({
<<<<<<< HEAD
                text: (rangeSymbol ? rangeSymbol : '') + visualMapModel.formatValueText(textValue),
=======
                text: (isRange ? '≈' : '') + visualMapModel.formatValueText(value),
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                textVerticalAlign: orient === 'horizontal' ? align : 'middle',
                textAlign: orient === 'horizontal' ? 'center' : align,
                x: textPoint[0],
                y: textPoint[1]
            });
        },

        /**
         * @private
         */
        _enableHoverLinkToSeries: function () {
<<<<<<< HEAD
            var self = this;
            this._shapes.barGroup

                .on('mousemove', function (e) {
                    self._hovering = true;

                    if (!self._dragging) {
                        var itemSize = self.visualMapModel.itemSize;
                        var pos = self._applyTransform(
                            [e.offsetX, e.offsetY], self._shapes.barGroup, true, true
                        );
                        // For hover link show when hover handle, which might be
                        // below or upper than sizeExtent.
                        pos[1] = mathMin(mathMax(0, pos[1]), itemSize[1]);

                        self._doHoverLinkToSeries(
                            pos[1],
                            0 <= pos[0] && pos[0] <= itemSize[0]
                        );
                    }
                })

                .on('mouseout', function () {
                    // When mouse is out of handle, hoverLink still need
                    // to be displayed when realtime is set as false.
                    self._hovering = false;
                    !self._dragging && self._clearHoverLinkToSeries();
                });
=======
            this._shapes.barGroup
                .on('mousemove', zrUtil.bind(onMouseOver, this))
                .on('mouseout', zrUtil.bind(this._clearHoverLinkToSeries, this));

            function onMouseOver(e) {
                var visualMapModel = this.visualMapModel;
                var itemSize = visualMapModel.itemSize;

                if (!visualMapModel.option.hoverLink) {
                    return;
                }

                var pos = this._applyTransform(
                    [e.offsetX, e.offsetY], this._shapes.barGroup, true, true
                );
                var hoverRange = [pos[1] - HOVER_LINK_RANGE / 2, pos[1] + HOVER_LINK_RANGE / 2];
                var sizeExtent = [0, itemSize[1]];
                var dataExtent = visualMapModel.getExtent();
                var valueRange = [
                    linearMap(hoverRange[0], sizeExtent, dataExtent, true),
                    linearMap(hoverRange[1], sizeExtent, dataExtent, true)
                ];

                // Do not show indicator when mouse is over handle,
                // otherwise labels overlap, especially when dragging.
                if (0 <= pos[0] && pos[0] <= itemSize[0]) {
                    this._showIndicator((valueRange[0] + valueRange[1]) / 2, true);
                }

                var oldBatch = convertDataIndicesToBatch(this._hoverLinkDataIndices);
                this._hoverLinkDataIndices = visualMapModel.findTargetDataIndices(valueRange);
                var newBatch = convertDataIndicesToBatch(this._hoverLinkDataIndices);
                var resultBatches = helper.removeDuplicateBatch(oldBatch, newBatch);

                this.api.dispatchAction({type: 'downplay', batch: resultBatches[0]});
                this.api.dispatchAction({type: 'highlight', batch: resultBatches[1]});
            }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * @private
         */
        _enableHoverLinkFromSeries: function () {
            var zr = this.api.getZr();

            if (this.visualMapModel.option.hoverLink) {
                zr.on('mouseover', this._hoverLinkFromSeriesMouseOver, this);
                zr.on('mouseout', this._hideIndicator, this);
            }
            else {
                this._clearHoverLinkFromSeries();
            }
        },

        /**
         * @private
         */
<<<<<<< HEAD
        _doHoverLinkToSeries: function (cursorPos, hoverOnBar) {
            var visualMapModel = this.visualMapModel;
            var itemSize = visualMapModel.itemSize;

            if (!visualMapModel.option.hoverLink) {
                return;
            }

            var sizeExtent = [0, itemSize[1]];
            var dataExtent = visualMapModel.getExtent();

            // For hover link show when hover handle, which might be below or upper than sizeExtent.
            cursorPos = mathMin(mathMax(sizeExtent[0], cursorPos), sizeExtent[1]);

            var halfHoverLinkSize = getHalfHoverLinkSize(visualMapModel, dataExtent, sizeExtent);
            var hoverRange = [cursorPos - halfHoverLinkSize, cursorPos + halfHoverLinkSize];
            var cursorValue = linearMap(cursorPos, sizeExtent, dataExtent, true);
            var valueRange = [
                linearMap(hoverRange[0], sizeExtent, dataExtent, true),
                linearMap(hoverRange[1], sizeExtent, dataExtent, true)
            ];
            // Consider data range is out of visualMap range, see test/visualMap-continuous.html,
            // where china and india has very large population.
            hoverRange[0] < sizeExtent[0] && (valueRange[0] = -Infinity);
            hoverRange[1] > sizeExtent[1] && (valueRange[1] = Infinity);

            // Do not show indicator when mouse is over handle,
            // otherwise labels overlap, especially when dragging.
            if (hoverOnBar) {
                if (valueRange[0] === -Infinity) {
                    this._showIndicator(cursorValue, valueRange[1], '< ', halfHoverLinkSize);
                }
                else if (valueRange[1] === Infinity) {
                    this._showIndicator(cursorValue, valueRange[0], '> ', halfHoverLinkSize);
                }
                else {
                    this._showIndicator(cursorValue, cursorValue, '≈ ', halfHoverLinkSize);
                }
            }

            // When realtime is set as false, handles, which are in barGroup,
            // also trigger hoverLink, which help user to realize where they
            // focus on when dragging. (see test/heatmap-large.html)
            // When realtime is set as true, highlight will not show when hover
            // handle, because the label on handle, which displays a exact value
            // but not range, might mislead users.
            var oldBatch = this._hoverLinkDataIndices;
            var newBatch = [];
            if (hoverOnBar || useHoverLinkOnHandle(visualMapModel)) {
                newBatch = this._hoverLinkDataIndices = visualMapModel.findTargetDataIndices(valueRange);
            }

            var resultBatches = modelUtil.compressBatches(oldBatch, newBatch);
            this._dispatchHighDown('downplay', helper.convertDataIndex(resultBatches[0]));
            this._dispatchHighDown('highlight', helper.convertDataIndex(resultBatches[1]));
        },

        /**
         * @private
         */
        _hoverLinkFromSeriesMouseOver: function (e) {
            var el = e.target;
            var visualMapModel = this.visualMapModel;
=======
        _hoverLinkFromSeriesMouseOver: function (e) {
            var el = e.target;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            if (!el || el.dataIndex == null) {
                return;
            }

<<<<<<< HEAD
            var dataModel = this.ecModel.getSeriesByIndex(el.seriesIndex);

            if (!visualMapModel.isTargetSeries(dataModel)) {
                return;
            }

            var data = dataModel.getData(el.dataType);
            var dim = data.getDimension(visualMapModel.getDataDimension(data));
            var value = data.get(dim, el.dataIndex, true);

            if (!isNaN(value)) {
                this._showIndicator(value, value);
            }
=======
            var dataModel = el.dataModel || this.ecModel.getSeriesByIndex(el.seriesIndex);
            var data = dataModel.getData(el.dataType);
            var dim = data.getDimension(this.visualMapModel.getDataDimension(data));
            var value = data.get(dim, el.dataIndex, true);

            this._showIndicator(value);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * @private
         */
        _hideIndicator: function () {
            var shapes = this._shapes;
            shapes.indicator && shapes.indicator.attr('invisible', true);
            shapes.indicatorLabel && shapes.indicatorLabel.attr('invisible', true);
        },

        /**
         * @private
         */
        _clearHoverLinkToSeries: function () {
            this._hideIndicator();

            var indices = this._hoverLinkDataIndices;

<<<<<<< HEAD
            this._dispatchHighDown('downplay', helper.convertDataIndex(indices));
=======
            this.api.dispatchAction({
                type: 'downplay',
                batch: convertDataIndicesToBatch(indices)
            });
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            indices.length = 0;
        },

        /**
         * @private
         */
        _clearHoverLinkFromSeries: function () {
            this._hideIndicator();

            var zr = this.api.getZr();
            zr.off('mouseover', this._hoverLinkFromSeriesMouseOver);
            zr.off('mouseout', this._hideIndicator);
        },

        /**
         * @private
         */
        _applyTransform: function (vertex, element, inverse, global) {
            var transform = graphic.getTransform(element, global ? null : this.group);

            return graphic[
                zrUtil.isArray(vertex) ? 'applyTransform' : 'transformDirection'
            ](vertex, transform, inverse);
        },

        /**
<<<<<<< HEAD
         * @private
         */
        _dispatchHighDown: function (type, batch) {
            batch && batch.length && this.api.dispatchAction({
                type: type,
                batch: batch
            });
        },

        /**
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
         * @override
         */
        dispose: function () {
            this._clearHoverLinkFromSeries();
            this._clearHoverLinkToSeries();
        },

        /**
         * @override
         */
        remove: function () {
            this._clearHoverLinkFromSeries();
            this._clearHoverLinkToSeries();
        }

    });

<<<<<<< HEAD
    function createPolygon(points, cursor, onDrift, onDragEnd) {
=======
    function createPolygon(points, onDrift, cursor) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        return new graphic.Polygon({
            shape: {points: points},
            draggable: !!onDrift,
            cursor: cursor,
<<<<<<< HEAD
            drift: onDrift,
            onmousemove: function (e) {
                // Fot mobile devicem, prevent screen slider on the button.
                eventTool.stop(e.event);
            },
            ondragend: onDragEnd
=======
            drift: onDrift
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        });
    }

    function createHandlePoints(handleIndex, textSize) {
        return handleIndex === 0
            ? [[0, 0], [textSize, 0], [textSize, -textSize]]
            : [[0, 0], [textSize, 0], [textSize, textSize]];
    }

<<<<<<< HEAD
    function createIndicatorPoints(isRange, halfHoverLinkSize, pos, extentMax) {
        return isRange
            ? [ // indicate range
                [0, -mathMin(halfHoverLinkSize, mathMax(pos, 0))],
                [HOVER_LINK_OUT, 0],
                [0, mathMin(halfHoverLinkSize, mathMax(extentMax - pos, 0))]
=======
    function createIndicatorPoints(isRange, pos, extentMax) {
        return isRange
            ? [ // indicate range
                [0, -mathMin(HOVER_LINK_RANGE, mathMax(pos, 0))],
                [HOVER_LINK_OUT, 0],
                [0, mathMin(HOVER_LINK_RANGE, mathMax(extentMax - pos, 0))]
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            ]
            : [ // indicate single value
                [0, 0], [5, -5], [5, 5]
            ];
    }

<<<<<<< HEAD
    function getHalfHoverLinkSize(visualMapModel, dataExtent, sizeExtent) {
        var halfHoverLinkSize = HOVER_LINK_SIZE / 2;
        var hoverLinkDataSize = visualMapModel.get('hoverLinkDataSize');
        if (hoverLinkDataSize) {
            halfHoverLinkSize = linearMap(hoverLinkDataSize, dataExtent, sizeExtent, true) / 2;
        }
        return halfHoverLinkSize;
    }

    function useHoverLinkOnHandle(visualMapModel) {
        return !visualMapModel.get('realtime') && visualMapModel.get('hoverLinkOnHandle');
    }

    return ContinuousView;
=======
    return ContinuousVisualMapView;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
});
