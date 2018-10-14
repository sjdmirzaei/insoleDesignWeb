define(function (require) {

    var zrUtil = require('zrender/core/util');
    var AxisBuilder = require('./AxisBuilder');
<<<<<<< HEAD
    var BrushController = require('../helper/BrushController');
    var brushHelper = require('../helper/brushHelper');
    var graphic = require('../../util/graphic');
=======
    var SelectController = require('../helper/SelectController');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    var elementList = ['axisLine', 'axisLabel', 'axisTick', 'axisName'];

    var AxisView = require('../../echarts').extendComponentView({

        type: 'parallelAxis',

        /**
<<<<<<< HEAD
         * @override
         */
        init: function (ecModel, api) {
            AxisView.superApply(this, 'init', arguments);

            /**
             * @type {module:echarts/component/helper/BrushController}
             */
            (this._brushController = new BrushController(api.getZr()))
                .on('brush', zrUtil.bind(this._onBrush, this));
        },
=======
         * @type {module:echarts/component/helper/SelectController}
         */
        _selectController: null,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

        /**
         * @override
         */
        render: function (axisModel, ecModel, api, payload) {
            if (fromAxisAreaSelect(axisModel, ecModel, payload)) {
                return;
            }

            this.axisModel = axisModel;
            this.api = api;

            this.group.removeAll();

<<<<<<< HEAD
            var oldAxisGroup = this._axisGroup;
            this._axisGroup = new graphic.Group();
            this.group.add(this._axisGroup);

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            if (!axisModel.get('show')) {
                return;
            }

<<<<<<< HEAD
            var coordSysModel = getCoordSysModel(axisModel, ecModel);
            var coordSys = coordSysModel.coordinateSystem;
=======
            var coordSys = ecModel.getComponent(
                'parallel', axisModel.get('parallelIndex')
            ).coordinateSystem;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            var areaSelectStyle = axisModel.getAreaSelectStyle();
            var areaWidth = areaSelectStyle.width;

<<<<<<< HEAD
            var dim = axisModel.axis.dim;
            var axisLayout = coordSys.getAxisLayout(dim);

            var builderOpt = zrUtil.extend(
                {strokeContainThreshold: areaWidth},
=======
            var axisLayout = coordSys.getAxisLayout(axisModel.axis.dim);
            var builderOpt = zrUtil.extend(
                {
                    strokeContainThreshold: areaWidth,
                    // lineWidth === 0 or no value.
                    axisLineSilent: !(areaWidth > 0) // jshint ignore:line
                },
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                axisLayout
            );

            var axisBuilder = new AxisBuilder(axisModel, builderOpt);

            zrUtil.each(elementList, axisBuilder.add, axisBuilder);

<<<<<<< HEAD
            this._axisGroup.add(axisBuilder.getGroup());

            this._refreshBrushController(
                builderOpt, areaSelectStyle, axisModel, coordSysModel, areaWidth, api
            );

            var animationModel = (payload && payload.animation === false) ? null : axisModel;
            graphic.groupTransition(oldAxisGroup, this._axisGroup, animationModel);
        },

        /**
         * @override
         */
        updateVisual: function (axisModel, ecModel, api, payload) {
            this._brushController && this._brushController
                .updateCovers(getCoverInfoList(axisModel));
        },

        _refreshBrushController: function (
            builderOpt, areaSelectStyle, axisModel, coordSysModel, areaWidth, api
        ) {
            // After filtering, axis may change, select area needs to be update.
            var extent = axisModel.axis.getExtent();
            var extentLen = extent[1] - extent[0];
            var extra = Math.min(30, Math.abs(extentLen) * 0.1); // Arbitrary value.

            // width/height might be negative, which will be
            // normalized in BoundingRect.
            var rect = graphic.BoundingRect.create({
                x: extent[0],
                y: -areaWidth / 2,
                width: extentLen,
                height: areaWidth
            });
            rect.x -= extra;
            rect.width += 2 * extra;

            this._brushController
                .mount({
                    enableGlobalPan: true,
                    rotation: builderOpt.rotation,
                    position: builderOpt.position
                })
                .setPanels([{
                    panelId: 'pl',
                    clipPath: brushHelper.makeRectPanelClipPath(rect),
                    isTargetByCursor: brushHelper.makeRectIsTargetByCursor(rect, api, coordSysModel),
                    getLinearBrushOtherExtent: brushHelper.makeLinearBrushOtherExtent(rect, 0)
                }])
                .enableBrush({
                    brushType: 'lineX',
                    brushStyle: areaSelectStyle,
                    removeOnClick: true
                })
                .updateCovers(getCoverInfoList(axisModel));
        },

        _onBrush: function (coverInfoList, opt) {
            // Do not cache these object, because the mey be changed.
            var axisModel = this.axisModel;
            var axis = axisModel.axis;
            var intervals = zrUtil.map(coverInfoList, function (coverInfo) {
                return [
                    axis.coordToData(coverInfo.range[0], true),
                    axis.coordToData(coverInfo.range[1], true)
                ];
            });

            // If realtime is true, action is not dispatched on drag end, because
            // the drag end emits the same params with the last drag move event,
            // and may have some delay when using touch pad.
            if (!axisModel.option.realtime === opt.isEnd || opt.removeOnClick) { // jshint ignore:line
                this.api.dispatchAction({
                    type: 'axisAreaSelect',
                    parallelAxisId: axisModel.id,
                    intervals: intervals
                });
            }
=======
            var axisGroup = axisBuilder.getGroup();

            this.group.add(axisGroup);

            this._buildSelectController(
                axisGroup, areaSelectStyle, axisModel, api
            );
        },

        _buildSelectController: function (axisGroup, areaSelectStyle, axisModel, api) {

            var axis = axisModel.axis;
            var selectController = this._selectController;

            if (!selectController) {
                selectController = this._selectController = new SelectController(
                    'line',
                    api.getZr(),
                    areaSelectStyle
                );

                selectController.on('selected', zrUtil.bind(this._onSelected, this));
            }

            selectController.enable(axisGroup);

            // After filtering, axis may change, select area needs to be update.
            var ranges = zrUtil.map(axisModel.activeIntervals, function (interval) {
                return [
                    axis.dataToCoord(interval[0], true),
                    axis.dataToCoord(interval[1], true)
                ];
            });
            selectController.update(ranges);
        },

        _onSelected: function (ranges) {
            // Do not cache these object, because the mey be changed.
            var axisModel = this.axisModel;
            var axis = axisModel.axis;

            var intervals = zrUtil.map(ranges, function (range) {
                return [
                    axis.coordToData(range[0], true),
                    axis.coordToData(range[1], true)
                ];
            });
            this.api.dispatchAction({
                type: 'axisAreaSelect',
                parallelAxisId: axisModel.id,
                intervals: intervals
            });
        },

        /**
         * @override
         */
        remove: function () {
            this._selectController && this._selectController.disable();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * @override
         */
        dispose: function () {
<<<<<<< HEAD
            this._brushController.dispose();
=======
            if (this._selectController) {
                this._selectController.dispose();
                this._selectController = null;
            }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        }
    });

    function fromAxisAreaSelect(axisModel, ecModel, payload) {
        return payload
            && payload.type === 'axisAreaSelect'
            && ecModel.findComponents(
                {mainType: 'parallelAxis', query: payload}
            )[0] === axisModel;
    }

<<<<<<< HEAD
    function getCoverInfoList(axisModel) {
        var axis = axisModel.axis;
        return zrUtil.map(axisModel.activeIntervals, function (interval) {
            return {
                brushType: 'lineX',
                panelId: 'pl',
                range: [
                    axis.dataToCoord(interval[0], true),
                    axis.dataToCoord(interval[1], true)
                ]
            };
        });
    }

    function getCoordSysModel(axisModel, ecModel) {
        return ecModel.getComponent(
            'parallel', axisModel.get('parallelIndex')
        );
    }

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    return AxisView;
});