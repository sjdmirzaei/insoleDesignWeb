define(function (require) {

    var TooltipContent = require('./TooltipContent');
<<<<<<< HEAD
    var zrUtil = require('zrender/core/util');
    var formatUtil = require('../../util/format');
    var numberUtil = require('../../util/number');
    var graphic = require('../../util/graphic');
    var findPointFromSeries = require('../axisPointer/findPointFromSeries');
    var layoutUtil = require('../../util/layout');
    var env = require('zrender/core/env');
    var Model = require('../../model/Model');
    var globalListener = require('../axisPointer/globalListener');
    var axisHelper = require('../../coord/axisHelper');
    var axisPointerViewHelper = require('../axisPointer/viewHelper');

    var bind = zrUtil.bind;
    var each = zrUtil.each;
    var parsePercent = numberUtil.parsePercent;


    var proxyRect = new graphic.Rect({
        shape: {x: -1, y: -1, width: 2, height: 2}
    });
=======
    var graphic = require('../../util/graphic');
    var zrUtil = require('zrender/core/util');
    var formatUtil = require('../../util/format');
    var numberUtil = require('../../util/number');
    var parsePercent = numberUtil.parsePercent;
    var env = require('zrender/core/env');

    function dataEqual(a, b) {
        if (!a || !b) {
            return false;
        }
        var round = numberUtil.round;
        return round(a[0]) === round(b[0])
            && round(a[1]) === round(b[1]);
    }
    /**
     * @inner
     */
    function makeLineShape(x1, y1, x2, y2) {
        return {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        };
    }

    /**
     * @inner
     */
    function makeRectShape(x, y, width, height) {
        return {
            x: x,
            y: y,
            width: width,
            height: height
        };
    }

    /**
     * @inner
     */
    function makeSectorShape(cx, cy, r0, r, startAngle, endAngle) {
        return {
            cx: cx,
            cy: cy,
            r0: r0,
            r: r,
            startAngle: startAngle,
            endAngle: endAngle,
            clockwise: true
        };
    }

    function refixTooltipPosition(x, y, el, viewWidth, viewHeight) {
        var width = el.clientWidth;
        var height = el.clientHeight;
        var gap = 20;

        if (x + width + gap > viewWidth) {
            x -= width + gap;
        }
        else {
            x += gap;
        }
        if (y + height + gap > viewHeight) {
            y -= height + gap;
        }
        else {
            y += gap;
        }
        return [x, y];
    }

    function calcTooltipPosition(position, rect, dom) {
        var domWidth = dom.clientWidth;
        var domHeight = dom.clientHeight;
        var gap = 5;
        var x = 0;
        var y = 0;
        var rectWidth = rect.width;
        var rectHeight = rect.height;
        switch (position) {
            case 'inside':
                x = rect.x + rectWidth / 2 - domWidth / 2;
                y = rect.y + rectHeight / 2 - domHeight / 2;
                break;
            case 'top':
                x = rect.x + rectWidth / 2 - domWidth / 2;
                y = rect.y - domHeight - gap;
                break;
            case 'bottom':
                x = rect.x + rectWidth / 2 - domWidth / 2;
                y = rect.y + rectHeight + gap;
                break;
            case 'left':
                x = rect.x - domWidth - gap;
                y = rect.y + rectHeight / 2 - domHeight / 2;
                break;
            case 'right':
                x = rect.x + rectWidth + gap;
                y = rect.y + rectHeight / 2 - domHeight / 2;
        }
        return [x, y];
    }

    /**
     * @param  {string|Function|Array.<number>} positionExpr
     * @param  {number} x Mouse x
     * @param  {number} y Mouse y
     * @param  {module:echarts/component/tooltip/TooltipContent} content
     * @param  {Object|<Array.<Object>} params
     * @param  {module:zrender/Element} el target element
     * @param  {module:echarts/ExtensionAPI} api
     * @return {Array.<number>}
     */
    function updatePosition(positionExpr, x, y, content, params, el, api) {
        var viewWidth = api.getWidth();
        var viewHeight = api.getHeight();

        var rect = el && el.getBoundingRect().clone();
        el && rect.applyTransform(el.transform);
        if (typeof positionExpr === 'function') {
            // Callback of position can be an array or a string specify the position
            positionExpr = positionExpr([x, y], params, content.el, rect);
        }

        if (zrUtil.isArray(positionExpr)) {
            x = parsePercent(positionExpr[0], viewWidth);
            y = parsePercent(positionExpr[1], viewHeight);
        }
        // Specify tooltip position by string 'top' 'bottom' 'left' 'right' around graphic element
        else if (typeof positionExpr === 'string' && el) {
            var pos = calcTooltipPosition(
                positionExpr, rect, content.el
            );
            x = pos[0];
            y = pos[1];
        }
        else {
            var pos = refixTooltipPosition(
                x, y, content.el, viewWidth, viewHeight
            );
            x = pos[0];
            y = pos[1];
        }

        content.moveTo(x, y);
    }

    function ifSeriesSupportAxisTrigger(seriesModel) {
        var coordSys = seriesModel.coordinateSystem;
        var trigger = seriesModel.get('tooltip.trigger', true);
        // Ignore series use item tooltip trigger and series coordinate system is not cartesian or
        return !(!coordSys
            || (coordSys.type !== 'cartesian2d' && coordSys.type !== 'polar' && coordSys.type !== 'single')
            || trigger === 'item');
    }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    require('../../echarts').extendComponentView({

        type: 'tooltip',

<<<<<<< HEAD
=======
        _axisPointers: {},

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        init: function (ecModel, api) {
            if (env.node) {
                return;
            }
            var tooltipContent = new TooltipContent(api.getDom(), api);
            this._tooltipContent = tooltipContent;
<<<<<<< HEAD
=======

            api.on('showTip', this._manuallyShowTip, this);
            api.on('hideTip', this._manuallyHideTip, this);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        render: function (tooltipModel, ecModel, api) {
            if (env.node) {
                return;
            }

            // Reset
            this.group.removeAll();

            /**
<<<<<<< HEAD
=======
             * @type {Object}
             * @private
             */
            this._axisPointers = {};

            /**
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
             * @private
             * @type {module:echarts/component/tooltip/TooltipModel}
             */
            this._tooltipModel = tooltipModel;

            /**
             * @private
             * @type {module:echarts/model/Global}
             */
            this._ecModel = ecModel;

            /**
             * @private
             * @type {module:echarts/ExtensionAPI}
             */
            this._api = api;

            /**
<<<<<<< HEAD
             * Should be cleaned when render.
             * @private
             * @type {Array.<Array.<Object>>}
             */
            this._lastDataByCoordSys = null;

            /**
             * @private
             * @type {boolean}
             */
            this._alwaysShowContent = tooltipModel.get('alwaysShowContent');

            var tooltipContent = this._tooltipContent;
            tooltipContent.update();
            tooltipContent.setEnterable(tooltipModel.get('enterable'));

            this._initGlobalListener();

            this._keepShow();
        },

        _initGlobalListener: function () {
            var tooltipModel = this._tooltipModel;
            var triggerOn = tooltipModel.get('triggerOn');

            globalListener.register(
                'itemTooltip',
                this._api,
                bind(function (currTrigger, e, dispatchAction) {
                    // If 'none', it is not controlled by mouse totally.
                    if (triggerOn !== 'none') {
                        if (triggerOn.indexOf(currTrigger) >= 0) {
                            this._tryShow(e, dispatchAction);
                        }
                        else if (currTrigger === 'leave') {
                            this._hide(dispatchAction);
                        }
                    }
                }, this)
            );
        },

        _keepShow: function () {
            var tooltipModel = this._tooltipModel;
            var ecModel = this._ecModel;
            var api = this._api;

            // Try to keep the tooltip show when refreshing
            if (this._lastX != null
                && this._lastY != null
                // When user is willing to control tooltip totally using API,
                // self.manuallyShowTip({x, y}) might cause tooltip hide,
                // which is not expected.
                && tooltipModel.get('triggerOn') !== 'none'
            ) {
=======
             * @type {Object}
             * @private
             */
            this._lastHover = {
                // data
                // payloadBatch
            };

            var tooltipContent = this._tooltipContent;
            tooltipContent.update();
            tooltipContent.enterable = tooltipModel.get('enterable');
            this._alwaysShowContent = tooltipModel.get('alwaysShowContent');

            /**
             * @type {Object.<string, Array>}
             */
            this._seriesGroupByAxis = this._prepareAxisTriggerData(
                tooltipModel, ecModel
            );

            var crossText = this._crossText;
            if (crossText) {
                this.group.add(crossText);
            }

            // Try to keep the tooltip show when refreshing
            if (this._lastX != null && this._lastY != null) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                var self = this;
                clearTimeout(this._refreshUpdateTimeout);
                this._refreshUpdateTimeout = setTimeout(function () {
                    // Show tip next tick after other charts are rendered
                    // In case highlight action has wrong result
                    // FIXME
<<<<<<< HEAD
                    self.manuallyShowTip(tooltipModel, ecModel, api, {
=======
                    self._manuallyShowTip({
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                        x: self._lastX,
                        y: self._lastY
                    });
                });
            }
<<<<<<< HEAD
=======

            var zr = this._api.getZr();
            zr.off('click', this._tryShow);
            zr.off('mousemove', this._mousemove);
            zr.off('mouseout', this._hide);
            zr.off('globalout', this._hide);
            if (tooltipModel.get('triggerOn') === 'click') {
                zr.on('click', this._tryShow, this);
            }
            else {
                zr.on('mousemove', this._mousemove, this);
                zr.on('mouseout', this._hide, this);
                zr.on('globalout', this._hide, this);
            }
        },

        _mousemove: function (e) {
            var showDelay = this._tooltipModel.get('showDelay');
            var self = this;
            clearTimeout(this._showTimeout);
            if (showDelay > 0) {
                this._showTimeout = setTimeout(function () {
                    self._tryShow(e);
                }, showDelay);
            }
            else {
                this._tryShow(e);
            }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * Show tip manually by
<<<<<<< HEAD
         * dispatchAction({
         *     type: 'showTip',
         *     x: 10,
         *     y: 10
         * });
         * Or
         * dispatchAction({
         *      type: 'showTip',
         *      seriesIndex: 0,
         *      dataIndex or dataIndexInside or name
         * });
         *
         *  TODO Batch
         */
        manuallyShowTip: function (tooltipModel, ecModel, api, payload) {
            if (payload.from === this.uid || env.node) {
                return;
            }

            var dispatchAction = makeDispatchAction(payload, api);

            // Reset ticket
            this._ticket = '';

            // When triggered from axisPointer.
            var dataByCoordSys = payload.dataByCoordSys;

            if (payload.tooltip && payload.x != null && payload.y != null) {
                var el = proxyRect;
                el.position = [payload.x, payload.y];
                el.update();
                el.tooltip = payload.tooltip;
                // Manually show tooltip while view is not using zrender elements.
                this._tryShow({
                    offsetX: payload.x,
                    offsetY: payload.y,
                    target: el
                }, dispatchAction);
            }
            else if (dataByCoordSys) {
                this._tryShow({
                    offsetX: payload.x,
                    offsetY: payload.y,
                    position: payload.position,
                    event: {},
                    dataByCoordSys: payload.dataByCoordSys,
                    tooltipOption: payload.tooltipOption
                }, dispatchAction);
            }
            else if (payload.seriesIndex != null) {

                if (this._manuallyAxisShowTip(tooltipModel, ecModel, api, payload)) {
                    return;
                }

                var pointInfo = findPointFromSeries(payload, ecModel);
                var cx = pointInfo.point[0];
                var cy = pointInfo.point[1];
                if (cx != null && cy != null) {
                    this._tryShow({
                        offsetX: cx,
                        offsetY: cy,
                        position: payload.position,
                        target: pointInfo.el,
                        event: {}
                    }, dispatchAction);
                }
            }
            else if (payload.x != null && payload.y != null) {
                // FIXME
                // should wrap dispatchAction like `axisPointer/globalListener` ?
                api.dispatchAction({
                    type: 'updateAxisPointer',
                    x: payload.x,
                    y: payload.y
                });

                this._tryShow({
                    offsetX: payload.x,
                    offsetY: payload.y,
                    position: payload.position,
                    target: api.getZr().findHover(payload.x, payload.y).target,
                    event: {}
                }, dispatchAction);
            }
        },

        manuallyHideTip: function (tooltipModel, ecModel, api, payload) {
            var tooltipContent = this._tooltipContent;

            if (!this._alwaysShowContent) {
                tooltipContent.hideLater(this._tooltipModel.get('hideDelay'));
            }

            this._lastX = this._lastY = null;

            if (payload.from !== this.uid) {
                this._hide(makeDispatchAction(payload, api));
            }
        },

        // Be compatible with previous design, that is, when tooltip.type is 'axis' and
        // dispatchAction 'showTip' with seriesIndex and dataIndex will trigger axis pointer
        // and tooltip.
        _manuallyAxisShowTip: function (tooltipModel, ecModel, api, payload) {
            var seriesIndex = payload.seriesIndex;
            var dataIndex = payload.dataIndex;
            var coordSysAxesInfo = ecModel.getComponent('axisPointer').coordSysAxesInfo;

            if (seriesIndex == null || dataIndex == null || coordSysAxesInfo == null) {
                return;
            }

            var seriesModel = ecModel.getSeriesByIndex(seriesIndex);
            if (!seriesModel) {
                return;
            }

            var data = seriesModel.getData();
            var tooltipModel = buildTooltipModel([
                data.getItemModel(dataIndex),
                seriesModel,
                (seriesModel.coordinateSystem || {}).model,
                tooltipModel
            ]);

            if (tooltipModel.get('trigger') !== 'axis') {
                return;
            }

            api.dispatchAction({
                type: 'updateAxisPointer',
                seriesIndex: seriesIndex,
                dataIndex: dataIndex,
                position: payload.position
            });

            return true;
        },

        _tryShow: function (e, dispatchAction) {
            var el = e.target;
            var tooltipModel = this._tooltipModel;
=======
         *  dispatchAction({
         *      type: 'showTip',
         *      x: 10,
         *      y: 10
         *  });
         * Or
         *  dispatchAction({
         *      type: 'showTip',
         *      seriesIndex: 0,
         *      dataIndex: 1
         *  });
         *
         *  TODO Batch
         */
        _manuallyShowTip: function (event) {
            // From self
            if (event.from === this.uid) {
                return;
            }

            var ecModel = this._ecModel;
            var seriesIndex = event.seriesIndex;
            var dataIndex = event.dataIndex;
            var seriesModel = ecModel.getSeriesByIndex(seriesIndex);
            var api = this._api;

            if (event.x == null || event.y == null) {
                if (!seriesModel) {
                    // Find the first series can use axis trigger
                    ecModel.eachSeries(function (_series) {
                        if (ifSeriesSupportAxisTrigger(_series) && !seriesModel) {
                            seriesModel = _series;
                        }
                    });
                }
                if (seriesModel) {
                    var data = seriesModel.getData();
                    if (dataIndex == null) {
                        dataIndex = data.indexOfName(event.name);
                    }
                    var el = data.getItemGraphicEl(dataIndex);
                    var cx, cy;
                    // Try to get the point in coordinate system
                    var coordSys = seriesModel.coordinateSystem;
                    if (coordSys && coordSys.dataToPoint) {
                        var point = coordSys.dataToPoint(
                            data.getValues(
                                zrUtil.map(coordSys.dimensions, function (dim) {
                                    return seriesModel.coordDimToDataDim(dim)[0];
                                }), dataIndex, true
                            )
                        );
                        cx = point && point[0];
                        cy = point && point[1];
                    }
                    else if (el) {
                        // Use graphic bounding rect
                        var rect = el.getBoundingRect().clone();
                        rect.applyTransform(el.transform);
                        cx = rect.x + rect.width / 2;
                        cy = rect.y + rect.height / 2;
                    }
                    if (cx != null && cy != null) {
                        this._tryShow({
                            offsetX: cx,
                            offsetY: cy,
                            target: el,
                            event: {}
                        });
                    }
                }
            }
            else {
                var el = api.getZr().handler.findHover(event.x, event.y);
                this._tryShow({
                    offsetX: event.x,
                    offsetY: event.y,
                    target: el,
                    event: {}
                });
            }
        },

        _manuallyHideTip: function (e) {
            if (e.from === this.uid) {
                return;
            }

            this._hide();
        },

        _prepareAxisTriggerData: function (tooltipModel, ecModel) {
            // Prepare data for axis trigger
            var seriesGroupByAxis = {};
            ecModel.eachSeries(function (seriesModel) {
                if (ifSeriesSupportAxisTrigger(seriesModel)) {
                    var coordSys = seriesModel.coordinateSystem;
                    var baseAxis;
                    var key;

                    // Only cartesian2d, polar and single support axis trigger
                    if (coordSys.type === 'cartesian2d') {
                        // FIXME `axisPointer.axis` is not baseAxis
                        baseAxis = coordSys.getBaseAxis();
                        key = baseAxis.dim + baseAxis.index;
                    }
                    else if (coordSys.type === 'single') {
                        baseAxis = coordSys.getAxis();
                        key = baseAxis.dim + baseAxis.type;
                    }
                    else {
                        baseAxis = coordSys.getBaseAxis();
                        key = baseAxis.dim + coordSys.name;
                    }

                    seriesGroupByAxis[key] = seriesGroupByAxis[key] || {
                        coordSys: [],
                        series: []
                    };
                    seriesGroupByAxis[key].coordSys.push(coordSys);
                    seriesGroupByAxis[key].series.push(seriesModel);
                }
            }, this);

            return seriesGroupByAxis;
        },

        /**
         * mousemove handler
         * @param {Object} e
         * @private
         */
        _tryShow: function (e) {
            var el = e.target;
            var tooltipModel = this._tooltipModel;
            var globalTrigger = tooltipModel.get('trigger');
            var ecModel = this._ecModel;
            var api = this._api;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            if (!tooltipModel) {
                return;
            }

            // Save mouse x, mouse y. So we can try to keep showing the tip if chart is refreshed
            this._lastX = e.offsetX;
            this._lastY = e.offsetY;

<<<<<<< HEAD
            var dataByCoordSys = e.dataByCoordSys;
            if (dataByCoordSys && dataByCoordSys.length) {
                this._showAxisTooltip(dataByCoordSys, e);
            }
            // Always show item tooltip if mouse is on the element with dataIndex
            else if (el && el.dataIndex != null) {
                this._lastDataByCoordSys = null;
                this._showSeriesItemTooltip(e, el, dispatchAction);
            }
            // Tooltip provided directly. Like legend.
            else if (el && el.tooltip) {
                this._lastDataByCoordSys = null;
                this._showComponentItemTooltip(e, el, dispatchAction);
            }
            else {
                this._lastDataByCoordSys = null;
                this._hide(dispatchAction);
            }
        },

        _showOrMove: function (tooltipModel, cb) {
            // showDelay is used in this case: tooltip.enterable is set
            // as true. User intent to move mouse into tooltip and click
            // something. `showDelay` makes it easyer to enter the content
            // but tooltip do not move immediately.
            var delay = tooltipModel.get('showDelay');
            cb = zrUtil.bind(cb, this);
            clearTimeout(this._showTimout);
            delay > 0
                ? (this._showTimout = setTimeout(cb, delay))
                : cb();
        },

        _showAxisTooltip: function (dataByCoordSys, e) {
            var ecModel = this._ecModel;
            var globalTooltipModel = this._tooltipModel;
            var point = [e.offsetX, e.offsetY];
            var singleDefaultHTML = [];
            var singleParamsList = [];
            var singleTooltipModel = buildTooltipModel([
                e.tooltipOption,
                globalTooltipModel
            ]);

            each(dataByCoordSys, function (itemCoordSys) {
                // var coordParamList = [];
                // var coordDefaultHTML = [];
                // var coordTooltipModel = buildTooltipModel([
                //     e.tooltipOption,
                //     itemCoordSys.tooltipOption,
                //     ecModel.getComponent(itemCoordSys.coordSysMainType, itemCoordSys.coordSysIndex),
                //     globalTooltipModel
                // ]);
                // var displayMode = coordTooltipModel.get('displayMode');
                // var paramsList = displayMode === 'single' ? singleParamsList : [];

                each(itemCoordSys.dataByAxis, function (item) {
                    var axisModel = ecModel.getComponent(item.axisDim + 'Axis', item.axisIndex);
                    var axisValue = item.value;
                    var seriesDefaultHTML = [];

                    if (!axisModel || axisValue == null) {
                        return;
                    }

                    var valueLabel = axisPointerViewHelper.getValueLabel(
                        axisValue, axisModel.axis, ecModel,
                        item.seriesDataIndices,
                        item.valueLabelOpt
                    );

                    zrUtil.each(item.seriesDataIndices, function (idxItem) {
                        var series = ecModel.getSeriesByIndex(idxItem.seriesIndex);
                        var dataIndex = idxItem.dataIndexInside;
                        var dataParams = series && series.getDataParams(dataIndex);
                        dataParams.axisDim = item.axisDim;
                        dataParams.axisIndex = item.axisIndex;
                        dataParams.axisType = item.axisType;
                        dataParams.axisId = item.axisId;
                        dataParams.axisValue = axisHelper.getAxisRawValue(axisModel.axis, axisValue);
                        dataParams.axisValueLabel = valueLabel;

                        if (dataParams) {
                            singleParamsList.push(dataParams);
                            seriesDefaultHTML.push(series.formatTooltip(dataIndex, true));
                        }
                    });

                    // Default tooltip content
                    // FIXME
                    // (1) shold be the first data which has name?
                    // (2) themeRiver, firstDataIndex is array, and first line is unnecessary.
                    var firstLine = valueLabel;
                    singleDefaultHTML.push(
                        (firstLine ? formatUtil.encodeHTML(firstLine) + '<br />' : '')
                        + seriesDefaultHTML.join('<br />')
                    );
                });
            }, this);

            // In most case, the second axis is shown upper than the first one.
            singleDefaultHTML.reverse();
            singleDefaultHTML = singleDefaultHTML.join('<br /><br />');

            var positionExpr = e.position;
            this._showOrMove(singleTooltipModel, function () {
                if (this._updateContentNotChangedOnAxis(dataByCoordSys)) {
                    this._updatePosition(
                        singleTooltipModel,
                        positionExpr,
                        point[0], point[1],
                        this._tooltipContent,
                        singleParamsList
                    );
                }
                else {
                    this._showTooltipContent(
                        singleTooltipModel, singleDefaultHTML, singleParamsList, Math.random(),
                        point[0], point[1], positionExpr
                    );
                }
            });

            // Do not trigger events here, because this branch only be entered
            // from dispatchAction.
        },

        _showSeriesItemTooltip: function (e, el, dispatchAction) {
            var ecModel = this._ecModel;
            // Use dataModel in element if possible
            // Used when mouseover on a element like markPoint or edge
            // In which case, the data is not main data in series.
            var seriesIndex = el.seriesIndex;
            var seriesModel = ecModel.getSeriesByIndex(seriesIndex);

            // For example, graph link.
            var dataModel = el.dataModel || seriesModel;
            var dataIndex = el.dataIndex;
            var dataType = el.dataType;
            var data = dataModel.getData();

            var tooltipModel = buildTooltipModel([
                data.getItemModel(dataIndex),
                dataModel,
                seriesModel && (seriesModel.coordinateSystem || {}).model,
                this._tooltipModel
            ]);

            var tooltipTrigger = tooltipModel.get('trigger');
            if (tooltipTrigger != null && tooltipTrigger !== 'item') {
                return;
            }

            var params = dataModel.getDataParams(dataIndex, dataType);
            var defaultHtml = dataModel.formatTooltip(dataIndex, false, dataType);
            var asyncTicket = 'item_' + dataModel.name + '_' + dataIndex;

            this._showOrMove(tooltipModel, function () {
                this._showTooltipContent(
                    tooltipModel, defaultHtml, params, asyncTicket,
                    e.offsetX, e.offsetY, e.position, e.target
                );
            });

            // FIXME
            // duplicated showtip if manuallyShowTip is called from dispatchAction.
            dispatchAction({
                type: 'showTip',
                dataIndexInside: dataIndex,
                dataIndex: data.getRawIndex(dataIndex),
                seriesIndex: seriesIndex,
                from: this.uid
            });
        },

        _showComponentItemTooltip: function (e, el, dispatchAction) {
            var tooltipOpt = el.tooltip;
            if (typeof tooltipOpt === 'string') {
                var content = tooltipOpt;
                tooltipOpt = {
                    content: content,
                    // Fixed formatter
                    formatter: content
                };
            }
            var subTooltipModel = new Model(tooltipOpt, this._tooltipModel, this._ecModel);
            var defaultHtml = subTooltipModel.get('content');
            var asyncTicket = Math.random();

            // Do not check whether `trigger` is 'none' here, because `trigger`
            // only works on cooridinate system. In fact, we have not found case
            // that requires setting `trigger` nothing on component yet.

            this._showOrMove(subTooltipModel, function () {
                this._showTooltipContent(
                    subTooltipModel, defaultHtml, subTooltipModel.get('formatterParams') || {},
                    asyncTicket, e.offsetX, e.offsetY, e.position, el
                );
            });

            // If not dispatch showTip, tip may be hide triggered by axis.
            dispatchAction({
                type: 'showTip',
                from: this.uid
            });
        },

        _showTooltipContent: function (
            tooltipModel, defaultHtml, params, asyncTicket, x, y, positionExpr, el
        ) {
            // Reset ticket
            this._ticket = '';

            if (!tooltipModel.get('showContent') || !tooltipModel.get('show')) {
                return;
            }

            var tooltipContent = this._tooltipContent;

            var formatter = tooltipModel.get('formatter');
            positionExpr = positionExpr || tooltipModel.get('position');
            var html = defaultHtml;

            if (formatter && typeof formatter === 'string') {
                html = formatUtil.formatTpl(formatter, params, true);
            }
            else if (typeof formatter === 'function') {
                var callback = bind(function (cbTicket, html) {
                    if (cbTicket === this._ticket) {
                        tooltipContent.setContent(html);
                        this._updatePosition(
                            tooltipModel, positionExpr, x, y, tooltipContent, params, el
                        );
                    }
                }, this);
                this._ticket = asyncTicket;
                html = formatter(params, asyncTicket, callback);
            }

            tooltipContent.setContent(html);
            tooltipContent.show(tooltipModel);

            this._updatePosition(
                tooltipModel, positionExpr, x, y, tooltipContent, params, el
            );
        },

        /**
         * @param  {string|Function|Array.<number>} positionExpr
         * @param  {number} x Mouse x
         * @param  {number} y Mouse y
         * @param  {boolean} confine Whether confine tooltip content in view rect.
         * @param  {Object|<Array.<Object>} params
         * @param  {module:zrender/Element} el target element
         * @param  {module:echarts/ExtensionAPI} api
         * @return {Array.<number>}
         */
        _updatePosition: function (tooltipModel, positionExpr, x, y, content, params, el) {
            var viewWidth = this._api.getWidth();
            var viewHeight = this._api.getHeight();
            positionExpr = positionExpr || tooltipModel.get('position');

            var contentSize = content.getSize();
            var align = tooltipModel.get('align');
            var vAlign = tooltipModel.get('verticalAlign');
            var rect = el && el.getBoundingRect().clone();
            el && rect.applyTransform(el.transform);

            if (typeof positionExpr === 'function') {
                // Callback of position can be an array or a string specify the position
                positionExpr = positionExpr([x, y], params, content.el, rect, {
                    viewSize: [viewWidth, viewHeight],
                    contentSize: contentSize.slice()
                });
            }

            if (zrUtil.isArray(positionExpr)) {
                x = parsePercent(positionExpr[0], viewWidth);
                y = parsePercent(positionExpr[1], viewHeight);
            }
            else if (zrUtil.isObject(positionExpr)) {
                positionExpr.width = contentSize[0];
                positionExpr.height = contentSize[1];
                var layoutRect = layoutUtil.getLayoutRect(
                    positionExpr, {width: viewWidth, height: viewHeight}
                );
                x = layoutRect.x;
                y = layoutRect.y;
                align = null;
                // When positionExpr is left/top/right/bottom,
                // align and verticalAlign will not work.
                vAlign = null;
            }
            // Specify tooltip position by string 'top' 'bottom' 'left' 'right' around graphic element
            else if (typeof positionExpr === 'string' && el) {
                var pos = calcTooltipPosition(
                    positionExpr, rect, contentSize
                );
                x = pos[0];
                y = pos[1];
            }
            else {
                var pos = refixTooltipPosition(
                    x, y, content.el, viewWidth, viewHeight, align ? null : 20, vAlign ? null : 20
                );
                x = pos[0];
                y = pos[1];
            }

            align && (x -= isCenterAlign(align) ? contentSize[0] / 2 : align === 'right' ? contentSize[0] : 0);
            vAlign && (y -= isCenterAlign(vAlign) ? contentSize[1] / 2 : vAlign === 'bottom' ? contentSize[1] : 0);

            if (tooltipModel.get('confine')) {
                var pos = confineTooltipPosition(
                    x, y, content.el, viewWidth, viewHeight
                );
                x = pos[0];
                y = pos[1];
            }

            content.moveTo(x, y);
        },

        // FIXME
        // Should we remove this but leave this to user?
        _updateContentNotChangedOnAxis: function (dataByCoordSys) {
            var lastCoordSys = this._lastDataByCoordSys;
            var contentNotChanged = !!lastCoordSys
                && lastCoordSys.length === dataByCoordSys.length;

            contentNotChanged && each(lastCoordSys, function (lastItemCoordSys, indexCoordSys) {
                var lastDataByAxis = lastItemCoordSys.dataByAxis || {};
                var thisItemCoordSys = dataByCoordSys[indexCoordSys] || {};
                var thisDataByAxis = thisItemCoordSys.dataByAxis || [];
                contentNotChanged &= lastDataByAxis.length === thisDataByAxis.length;

                contentNotChanged && each(lastDataByAxis, function (lastItem, indexAxis) {
                    var thisItem = thisDataByAxis[indexAxis] || {};
                    var lastIndices = lastItem.seriesDataIndices || [];
                    var newIndices = thisItem.seriesDataIndices || [];

                    contentNotChanged &=
                        lastItem.value === thisItem.value
                        && lastItem.axisType === thisItem.axisType
                        && lastItem.axisId === thisItem.axisId
                        && lastIndices.length === newIndices.length;

                    contentNotChanged && each(lastIndices, function (lastIdxItem, j) {
                        var newIdxItem = newIndices[j];
                        contentNotChanged &=
                            lastIdxItem.seriesIndex === newIdxItem.seriesIndex
                            && lastIdxItem.dataIndex === newIdxItem.dataIndex;
                    });
                });
            });

            this._lastDataByCoordSys = dataByCoordSys;

            return !!contentNotChanged;
        },

        _hide: function (dispatchAction) {
            // Do not directly hideLater here, because this behavior may be prevented
            // in dispatchAction when showTip is dispatched.

            // FIXME
            // duplicated hideTip if manuallyHideTip is called from dispatchAction.
            this._lastDataByCoordSys = null;
            dispatchAction({
                type: 'hideTip',
                from: this.uid
            });
        },

        dispose: function (ecModel, api) {
            if (env.node) {
                return;
            }
            this._tooltipContent.hide();
            globalListener.unregister('itemTooltip', api);
        }
    });


    /**
     * @param {Array.<Object|module:echarts/model/Model>} modelCascade
     * From top to bottom. (the last one should be globalTooltipModel);
     */
    function buildTooltipModel(modelCascade) {
        var resultModel = modelCascade.pop();
        while (modelCascade.length) {
            var tooltipOpt = modelCascade.pop();
            if (tooltipOpt) {
                if (tooltipOpt instanceof Model) {
                    tooltipOpt = tooltipOpt.get('tooltip', true);
                }
                // In each data item tooltip can be simply write:
                // {
                //  value: 10,
                //  tooltip: 'Something you need to know'
                // }
                if (typeof tooltipOpt === 'string') {
                    tooltipOpt = {formatter: tooltipOpt};
                }
                resultModel = new Model(tooltipOpt, resultModel, resultModel.ecModel);
            }
        }
        return resultModel;
    }

    function makeDispatchAction(payload, api) {
        return payload.dispatchAction || zrUtil.bind(api.dispatchAction, api);
    }

    function refixTooltipPosition(x, y, el, viewWidth, viewHeight, gapH, gapV) {
        var width = el.clientWidth;
        var height = el.clientHeight;

        if (gapH != null) {
            if (x + width + gapH > viewWidth) {
                x -= width + gapH;
            }
            else {
                x += gapH;
            }
        }
        if (gapV != null) {
            if (y + height + gapV > viewHeight) {
                y -= height + gapV;
            }
            else {
                y += gapV;
            }
        }
        return [x, y];
    }

    function confineTooltipPosition(x, y, el, viewWidth, viewHeight) {
        var width = el.clientWidth;
        var height = el.clientHeight;

        x = Math.min(x + width, viewWidth) - width;
        y = Math.min(y + height, viewHeight) - height;
        x = Math.max(x, 0);
        y = Math.max(y, 0);

        return [x, y];
    }

    function calcTooltipPosition(position, rect, contentSize) {
        var domWidth = contentSize[0];
        var domHeight = contentSize[1];
        var gap = 5;
        var x = 0;
        var y = 0;
        var rectWidth = rect.width;
        var rectHeight = rect.height;
        switch (position) {
            case 'inside':
                x = rect.x + rectWidth / 2 - domWidth / 2;
                y = rect.y + rectHeight / 2 - domHeight / 2;
                break;
            case 'top':
                x = rect.x + rectWidth / 2 - domWidth / 2;
                y = rect.y - domHeight - gap;
                break;
            case 'bottom':
                x = rect.x + rectWidth / 2 - domWidth / 2;
                y = rect.y + rectHeight + gap;
                break;
            case 'left':
                x = rect.x - domWidth - gap;
                y = rect.y + rectHeight / 2 - domHeight / 2;
                break;
            case 'right':
                x = rect.x + rectWidth + gap;
                y = rect.y + rectHeight / 2 - domHeight / 2;
        }
        return [x, y];
    }

    function isCenterAlign(align) {
        return align === 'center' || align === 'middle';
    }

=======
            // Always show item tooltip if mouse is on the element with dataIndex
            if (el && el.dataIndex != null) {
                // Use dataModel in element if possible
                // Used when mouseover on a element like markPoint or edge
                // In which case, the data is not main data in series.
                var dataModel = el.dataModel || ecModel.getSeriesByIndex(el.seriesIndex);
                var dataIndex = el.dataIndex;
                var itemModel = dataModel.getData().getItemModel(dataIndex);
                // Series or single data may use item trigger when global is axis trigger
                if ((itemModel.get('tooltip.trigger') || globalTrigger) === 'axis') {
                    this._showAxisTooltip(tooltipModel, ecModel, e);
                }
                else {
                    // Reset ticket
                    this._ticket = '';
                    // If either single data or series use item trigger
                    this._hideAxisPointer();
                    // Reset last hover and dispatch downplay action
                    this._resetLastHover();

                    this._showItemTooltipContent(dataModel, dataIndex, el.dataType, e);
                }

                api.dispatchAction({
                    type: 'showTip',
                    from: this.uid,
                    dataIndex: el.dataIndex,
                    seriesIndex: el.seriesIndex
                });
            }
            else {
                if (globalTrigger === 'item') {
                    this._hide();
                }
                else {
                    // Try show axis tooltip
                    this._showAxisTooltip(tooltipModel, ecModel, e);
                }

                // Action of cross pointer
                // other pointer types will trigger action in _dispatchAndShowSeriesTooltipContent method
                if (tooltipModel.get('axisPointer.type') === 'cross') {
                    api.dispatchAction({
                        type: 'showTip',
                        from: this.uid,
                        x: e.offsetX,
                        y: e.offsetY
                    });
                }
            }
        },

        /**
         * Show tooltip on axis
         * @param {module:echarts/component/tooltip/TooltipModel} tooltipModel
         * @param {module:echarts/model/Global} ecModel
         * @param {Object} e
         * @private
         */
        _showAxisTooltip: function (tooltipModel, ecModel, e) {
            var axisPointerModel = tooltipModel.getModel('axisPointer');
            var axisPointerType = axisPointerModel.get('type');

            if (axisPointerType === 'cross') {
                var el = e.target;
                if (el && el.dataIndex != null) {
                    var seriesModel = ecModel.getSeriesByIndex(el.seriesIndex);
                    var dataIndex = el.dataIndex;
                    this._showItemTooltipContent(seriesModel, dataIndex, el.dataType, e);
                }
            }

            this._showAxisPointer();
            var allNotShow = true;
            zrUtil.each(this._seriesGroupByAxis, function (seriesCoordSysSameAxis) {
                // Try show the axis pointer
                var allCoordSys = seriesCoordSysSameAxis.coordSys;
                var coordSys = allCoordSys[0];

                // If mouse position is not in the grid or polar
                var point = [e.offsetX, e.offsetY];

                if (!coordSys.containPoint(point)) {
                    // Hide axis pointer
                    this._hideAxisPointer(coordSys.name);
                    return;
                }

                allNotShow = false;
                // Make sure point is discrete on cateogry axis
                var dimensions = coordSys.dimensions;
                var value = coordSys.pointToData(point, true);
                point = coordSys.dataToPoint(value);
                var baseAxis = coordSys.getBaseAxis();
                var axisType = axisPointerModel.get('axis');
                if (axisType === 'auto') {
                    axisType = baseAxis.dim;
                }

                var contentNotChange = false;
                var lastHover = this._lastHover;
                if (axisPointerType === 'cross') {
                    // If hover data not changed
                    // Possible when two axes are all category
                    if (dataEqual(lastHover.data, value)) {
                        contentNotChange = true;
                    }
                    lastHover.data = value;
                }
                else {
                    var valIndex = zrUtil.indexOf(dimensions, axisType);

                    // If hover data not changed on the axis dimension
                    if (lastHover.data === value[valIndex]) {
                        contentNotChange = true;
                    }
                    lastHover.data = value[valIndex];
                }

                if (coordSys.type === 'cartesian2d' && !contentNotChange) {
                    this._showCartesianPointer(
                        axisPointerModel, coordSys, axisType, point
                    );
                }
                else if (coordSys.type === 'polar' && !contentNotChange) {
                    this._showPolarPointer(
                        axisPointerModel, coordSys, axisType, point
                    );
                }
                else if (coordSys.type === 'single' && !contentNotChange) {
                    this._showSinglePointer(
                        axisPointerModel, coordSys, axisType, point
                    );
                }

                if (axisPointerType !== 'cross') {
                    this._dispatchAndShowSeriesTooltipContent(
                        coordSys, seriesCoordSysSameAxis.series, point, value, contentNotChange
                    );
                }
            }, this);

            if (!this._tooltipModel.get('show')) {
                this._hideAxisPointer();
            }

            if (allNotShow) {
                this._hide();
            }
        },

        /**
         * Show tooltip on axis of cartesian coordinate
         * @param {module:echarts/model/Model} axisPointerModel
         * @param {module:echarts/coord/cartesian/Cartesian2D} cartesians
         * @param {string} axisType
         * @param {Array.<number>} point
         * @private
         */
        _showCartesianPointer: function (axisPointerModel, cartesian, axisType, point) {
            var self = this;

            var axisPointerType = axisPointerModel.get('type');
            var moveAnimation = axisPointerType !== 'cross';

            if (axisPointerType === 'cross') {
                moveGridLine('x', point, cartesian.getAxis('y').getGlobalExtent());
                moveGridLine('y', point, cartesian.getAxis('x').getGlobalExtent());

                this._updateCrossText(cartesian, point, axisPointerModel);
            }
            else {
                var otherAxis = cartesian.getAxis(axisType === 'x' ? 'y' : 'x');
                var otherExtent = otherAxis.getGlobalExtent();

                if (cartesian.type === 'cartesian2d') {
                    (axisPointerType === 'line' ? moveGridLine : moveGridShadow)(
                        axisType, point, otherExtent
                    );
                }
            }

            /**
             * @inner
             */
            function moveGridLine(axisType, point, otherExtent) {
                var targetShape = axisType === 'x'
                    ? makeLineShape(point[0], otherExtent[0], point[0], otherExtent[1])
                    : makeLineShape(otherExtent[0], point[1], otherExtent[1], point[1]);

                var pointerEl = self._getPointerElement(
                    cartesian, axisPointerModel, axisType, targetShape
                );
                moveAnimation
                    ? graphic.updateProps(pointerEl, {
                        shape: targetShape
                    }, axisPointerModel)
                    :  pointerEl.attr({
                        shape: targetShape
                    });
            }

            /**
             * @inner
             */
            function moveGridShadow(axisType, point, otherExtent) {
                var axis = cartesian.getAxis(axisType);
                var bandWidth = axis.getBandWidth();
                var span = otherExtent[1] - otherExtent[0];
                var targetShape = axisType === 'x'
                    ? makeRectShape(point[0] - bandWidth / 2, otherExtent[0], bandWidth, span)
                    : makeRectShape(otherExtent[0], point[1] - bandWidth / 2, span, bandWidth);

                var pointerEl = self._getPointerElement(
                    cartesian, axisPointerModel, axisType, targetShape
                );
                moveAnimation
                    ? graphic.updateProps(pointerEl, {
                        shape: targetShape
                    }, axisPointerModel)
                    :  pointerEl.attr({
                        shape: targetShape
                    });
            }
        },

        _showSinglePointer: function (axisPointerModel, single, axisType, point) {
            var self = this;
            var axisPointerType = axisPointerModel.get('type');
            var moveAnimation = axisPointerType !== 'cross';
            var rect = single.getRect();
            var otherExtent = [rect.y, rect.y + rect.height];

            moveSingleLine(axisType, point, otherExtent);

            /**
             * @inner
             */
            function moveSingleLine(axisType, point, otherExtent) {
                var axis = single.getAxis();
                var orient = axis.orient;

                var targetShape = orient === 'horizontal'
                    ? makeLineShape(point[0], otherExtent[0], point[0], otherExtent[1])
                    : makeLineShape(otherExtent[0], point[1], otherExtent[1], point[1]);

                var pointerEl = self._getPointerElement(
                    single, axisPointerModel, axisType, targetShape
                );
                moveAnimation
                    ? graphic.updateProps(pointerEl, {
                        shape: targetShape
                    }, axisPointerModel)
                    :  pointerEl.attr({
                        shape: targetShape
                    });
            }

        },

        /**
         * Show tooltip on axis of polar coordinate
         * @param {module:echarts/model/Model} axisPointerModel
         * @param {Array.<module:echarts/coord/polar/Polar>} polar
         * @param {string} axisType
         * @param {Array.<number>} point
         */
        _showPolarPointer: function (axisPointerModel, polar, axisType, point) {
            var self = this;

            var axisPointerType = axisPointerModel.get('type');

            var angleAxis = polar.getAngleAxis();
            var radiusAxis = polar.getRadiusAxis();

            var moveAnimation = axisPointerType !== 'cross';

            if (axisPointerType === 'cross') {
                movePolarLine('angle', point, radiusAxis.getExtent());
                movePolarLine('radius', point, angleAxis.getExtent());

                this._updateCrossText(polar, point, axisPointerModel);
            }
            else {
                var otherAxis = polar.getAxis(axisType === 'radius' ? 'angle' : 'radius');
                var otherExtent = otherAxis.getExtent();

                (axisPointerType === 'line' ? movePolarLine : movePolarShadow)(
                    axisType, point, otherExtent
                );
            }
            /**
             * @inner
             */
            function movePolarLine(axisType, point, otherExtent) {
                var mouseCoord = polar.pointToCoord(point);

                var targetShape;

                if (axisType === 'angle') {
                    var p1 = polar.coordToPoint([otherExtent[0], mouseCoord[1]]);
                    var p2 = polar.coordToPoint([otherExtent[1], mouseCoord[1]]);
                    targetShape = makeLineShape(p1[0], p1[1], p2[0], p2[1]);
                }
                else {
                    targetShape = {
                        cx: polar.cx,
                        cy: polar.cy,
                        r: mouseCoord[0]
                    };
                }

                var pointerEl = self._getPointerElement(
                    polar, axisPointerModel, axisType, targetShape
                );

                moveAnimation
                    ? graphic.updateProps(pointerEl, {
                        shape: targetShape
                    }, axisPointerModel)
                    :  pointerEl.attr({
                        shape: targetShape
                    });
            }

            /**
             * @inner
             */
            function movePolarShadow(axisType, point, otherExtent) {
                var axis = polar.getAxis(axisType);
                var bandWidth = axis.getBandWidth();

                var mouseCoord = polar.pointToCoord(point);

                var targetShape;

                var radian = Math.PI / 180;

                if (axisType === 'angle') {
                    targetShape = makeSectorShape(
                        polar.cx, polar.cy,
                        otherExtent[0], otherExtent[1],
                        // In ECharts y is negative if angle is positive
                        (-mouseCoord[1] - bandWidth / 2) * radian,
                        (-mouseCoord[1] + bandWidth / 2) * radian
                    );
                }
                else {
                    targetShape = makeSectorShape(
                        polar.cx, polar.cy,
                        mouseCoord[0] - bandWidth / 2,
                        mouseCoord[0] + bandWidth / 2,
                        0, Math.PI * 2
                    );
                }

                var pointerEl = self._getPointerElement(
                    polar, axisPointerModel, axisType, targetShape
                );
                moveAnimation
                    ? graphic.updateProps(pointerEl, {
                        shape: targetShape
                    }, axisPointerModel)
                    :  pointerEl.attr({
                        shape: targetShape
                    });
            }
        },

        _updateCrossText: function (coordSys, point, axisPointerModel) {
            var crossStyleModel = axisPointerModel.getModel('crossStyle');
            var textStyleModel = crossStyleModel.getModel('textStyle');

            var tooltipModel = this._tooltipModel;

            var text = this._crossText;
            if (!text) {
                text = this._crossText = new graphic.Text({
                    style: {
                        textAlign: 'left',
                        textVerticalAlign: 'bottom'
                    }
                });
                this.group.add(text);
            }

            var value = coordSys.pointToData(point);

            var dims = coordSys.dimensions;
            value = zrUtil.map(value, function (val, idx) {
                var axis = coordSys.getAxis(dims[idx]);
                if (axis.type === 'category' || axis.type === 'time') {
                    val = axis.scale.getLabel(val);
                }
                else {
                    val = formatUtil.addCommas(
                        val.toFixed(axis.getPixelPrecision())
                    );
                }
                return val;
            });

            text.setStyle({
                fill: textStyleModel.getTextColor() || crossStyleModel.get('color'),
                textFont: textStyleModel.getFont(),
                text: value.join(', '),
                x: point[0] + 5,
                y: point[1] - 5
            });
            text.z = tooltipModel.get('z');
            text.zlevel = tooltipModel.get('zlevel');
        },

        _getPointerElement: function (coordSys, pointerModel, axisType, initShape) {
            var tooltipModel = this._tooltipModel;
            var z = tooltipModel.get('z');
            var zlevel = tooltipModel.get('zlevel');
            var axisPointers = this._axisPointers;
            var coordSysName = coordSys.name;
            axisPointers[coordSysName] = axisPointers[coordSysName] || {};
            if (axisPointers[coordSysName][axisType]) {
                return axisPointers[coordSysName][axisType];
            }

            // Create if not exists
            var pointerType = pointerModel.get('type');
            var styleModel = pointerModel.getModel(pointerType + 'Style');
            var isShadow = pointerType === 'shadow';
            var style = styleModel[isShadow ? 'getAreaStyle' : 'getLineStyle']();

            var elementType = coordSys.type === 'polar'
                ? (isShadow ? 'Sector' : (axisType === 'radius' ? 'Circle' : 'Line'))
                : (isShadow ? 'Rect' : 'Line');

            isShadow ? (style.stroke = null) : (style.fill = null);

            var el = axisPointers[coordSysName][axisType] = new graphic[elementType]({
                style: style,
                z: z,
                zlevel: zlevel,
                silent: true,
                shape: initShape
            });

            this.group.add(el);
            return el;
        },

        /**
         * Dispatch actions and show tooltip on series
         * @param {Array.<module:echarts/model/Series>} seriesList
         * @param {Array.<number>} point
         * @param {Array.<number>} value
         * @param {boolean} contentNotChange
         * @param {Object} e
         */
        _dispatchAndShowSeriesTooltipContent: function (
            coordSys, seriesList, point, value, contentNotChange
        ) {

            var rootTooltipModel = this._tooltipModel;
            var tooltipContent = this._tooltipContent;

            var baseAxis = coordSys.getBaseAxis();

            var payloadBatch = zrUtil.map(seriesList, function (series) {
                return {
                    seriesIndex: series.seriesIndex,
                    dataIndex: series.getAxisTooltipDataIndex
                        ? series.getAxisTooltipDataIndex(series.coordDimToDataDim(baseAxis.dim), value, baseAxis)
                        : series.getData().indexOfNearest(
                            series.coordDimToDataDim(baseAxis.dim)[0],
                            value[baseAxis.dim === 'x' || baseAxis.dim === 'radius' ? 0 : 1]
                        )
                };
            });

            var lastHover = this._lastHover;
            var api = this._api;
            // Dispatch downplay action
            if (lastHover.payloadBatch && !contentNotChange) {
                api.dispatchAction({
                    type: 'downplay',
                    batch: lastHover.payloadBatch
                });
            }
            // Dispatch highlight action
            if (!contentNotChange) {
                api.dispatchAction({
                    type: 'highlight',
                    batch: payloadBatch
                });
                lastHover.payloadBatch = payloadBatch;
            }
            // Dispatch showTip action
            api.dispatchAction({
                type: 'showTip',
                dataIndex: payloadBatch[0].dataIndex,
                seriesIndex: payloadBatch[0].seriesIndex,
                from: this.uid
            });

            if (baseAxis && rootTooltipModel.get('showContent') && rootTooltipModel.get('show')) {

                var formatter = rootTooltipModel.get('formatter');
                var positionExpr = rootTooltipModel.get('position');
                var html;

                var paramsList = zrUtil.map(seriesList, function (series, index) {
                    return series.getDataParams(payloadBatch[index].dataIndex);
                });
                // If only one series
                // FIXME
                // if (paramsList.length === 1) {
                //     paramsList = paramsList[0];
                // }

                tooltipContent.show(rootTooltipModel);

                // Update html content
                var firstDataIndex = payloadBatch[0].dataIndex;
                if (!contentNotChange) {
                    // Reset ticket
                    this._ticket = '';
                    if (!formatter) {
                        // Default tooltip content
                        // FIXME
                        // (1) shold be the first data which has name?
                        // (2) themeRiver, firstDataIndex is array, and first line is unnecessary.
                        var firstLine = seriesList[0].getData().getName(firstDataIndex);
                        html = (firstLine ? firstLine + '<br />' : '')
                            + zrUtil.map(seriesList, function (series, index) {
                                return series.formatTooltip(payloadBatch[index].dataIndex, true);
                            }).join('<br />');
                    }
                    else {
                        if (typeof formatter === 'string') {
                            html = formatUtil.formatTpl(formatter, paramsList);
                        }
                        else if (typeof formatter === 'function') {
                            var self = this;
                            var ticket = 'axis_' + coordSys.name + '_' + firstDataIndex;
                            var callback = function (cbTicket, html) {
                                if (cbTicket === self._ticket) {
                                    tooltipContent.setContent(html);

                                    updatePosition(
                                        positionExpr, point[0], point[1],
                                        tooltipContent, paramsList, null, api
                                    );
                                }
                            };
                            self._ticket = ticket;
                            html = formatter(paramsList, ticket, callback);
                        }
                    }

                    tooltipContent.setContent(html);
                }

                updatePosition(
                    positionExpr, point[0], point[1],
                    tooltipContent, paramsList, null, api
                );
            }
        },

        /**
         * Show tooltip on item
         * @param {module:echarts/model/Series} seriesModel
         * @param {number} dataIndex
         * @param {string} dataType
         * @param {Object} e
         */
        _showItemTooltipContent: function (seriesModel, dataIndex, dataType, e) {
            // FIXME Graph data
            var api = this._api;
            var data = seriesModel.getData(dataType);
            var itemModel = data.getItemModel(dataIndex);

            var rootTooltipModel = this._tooltipModel;

            var tooltipContent = this._tooltipContent;

            var tooltipModel = itemModel.getModel('tooltip');

            // If series model
            if (tooltipModel.parentModel) {
                tooltipModel.parentModel.parentModel = rootTooltipModel;
            }
            else {
                tooltipModel.parentModel = this._tooltipModel;
            }

            if (tooltipModel.get('showContent') && tooltipModel.get('show')) {
                var formatter = tooltipModel.get('formatter');
                var positionExpr = tooltipModel.get('position');
                var params = seriesModel.getDataParams(dataIndex, dataType);
                var html;
                if (!formatter) {
                    html = seriesModel.formatTooltip(dataIndex, false, dataType);
                }
                else {
                    if (typeof formatter === 'string') {
                        html = formatUtil.formatTpl(formatter, params);
                    }
                    else if (typeof formatter === 'function') {
                        var self = this;
                        var ticket = 'item_' + seriesModel.name + '_' + dataIndex;
                        var callback = function (cbTicket, html) {
                            if (cbTicket === self._ticket) {
                                tooltipContent.setContent(html);

                                updatePosition(
                                    positionExpr, e.offsetX, e.offsetY,
                                    tooltipContent, params, e.target, api
                                );
                            }
                        };
                        self._ticket = ticket;
                        html = formatter(params, ticket, callback);
                    }
                }

                tooltipContent.show(tooltipModel);
                tooltipContent.setContent(html);

                updatePosition(
                    positionExpr, e.offsetX, e.offsetY,
                    tooltipContent, params, e.target, api
                );
            }
        },

        /**
         * Show axis pointer
         * @param {string} [coordSysName]
         */
        _showAxisPointer: function (coordSysName) {
            if (coordSysName) {
                var axisPointers = this._axisPointers[coordSysName];
                axisPointers && zrUtil.each(axisPointers, function (el) {
                    el.show();
                });
            }
            else {
                this.group.eachChild(function (child) {
                    child.show();
                });
                this.group.show();
            }
        },

        _resetLastHover: function () {
            var lastHover = this._lastHover;
            if (lastHover.payloadBatch) {
                this._api.dispatchAction({
                    type: 'downplay',
                    batch: lastHover.payloadBatch
                });
            }
            // Reset lastHover
            this._lastHover = {};
        },
        /**
         * Hide axis pointer
         * @param {string} [coordSysName]
         */
        _hideAxisPointer: function (coordSysName) {
            if (coordSysName) {
                var axisPointers = this._axisPointers[coordSysName];
                axisPointers && zrUtil.each(axisPointers, function (el) {
                    el.hide();
                });
            }
            else {
                this.group.hide();
            }
        },

        _hide: function () {
            clearTimeout(this._showTimeout);

            this._hideAxisPointer();
            this._resetLastHover();
            if (!this._alwaysShowContent) {
                this._tooltipContent.hideLater(this._tooltipModel.get('hideDelay'));
            }

            this._api.dispatchAction({
                type: 'hideTip',
                from: this.uid
            });

            this._lastX = this._lastY = null;
        },

        dispose: function (ecModel, api) {
            if (env.node) {
                return;
            }
            var zr = api.getZr();
            this._tooltipContent.hide();

            zr.off('click', this._tryShow);
            zr.off('mousemove', this._mousemove);
            zr.off('mouseout', this._hide);
            zr.off('globalout', this._hide);

            api.off('showTip', this._manuallyShowTip);
            api.off('hideTip', this._manuallyHideTip);
        }
    });
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
});