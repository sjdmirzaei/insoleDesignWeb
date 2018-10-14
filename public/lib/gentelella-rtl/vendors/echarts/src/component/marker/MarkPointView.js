define(function (require) {

    var SymbolDraw = require('../../chart/helper/SymbolDraw');
    var zrUtil = require('zrender/core/util');
<<<<<<< HEAD
    var numberUtil = require('../../util/number');

=======
    var formatUtil = require('../../util/format');
    var modelUtil = require('../../util/model');
    var numberUtil = require('../../util/number');

    var addCommas = formatUtil.addCommas;
    var encodeHTML = formatUtil.encodeHTML;

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    var List = require('../../data/List');

    var markerHelper = require('./markerHelper');

    function updateMarkerLayout(mpData, seriesModel, api) {
        var coordSys = seriesModel.coordinateSystem;
        mpData.each(function (idx) {
            var itemModel = mpData.getItemModel(idx);
            var point;
<<<<<<< HEAD
            var xPx = numberUtil.parsePercent(itemModel.get('x'), api.getWidth());
            var yPx = numberUtil.parsePercent(itemModel.get('y'), api.getHeight());
            if (!isNaN(xPx) && !isNaN(yPx)) {
                point = [xPx, yPx];
=======
            var xPx = itemModel.getShallow('x');
            var yPx = itemModel.getShallow('y');
            if (xPx != null && yPx != null) {
                point = [
                    numberUtil.parsePercent(xPx, api.getWidth()),
                    numberUtil.parsePercent(yPx, api.getHeight())
                ];
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }
            // Chart like bar may have there own marker positioning logic
            else if (seriesModel.getMarkerPosition) {
                // Use the getMarkerPoisition
                point = seriesModel.getMarkerPosition(
                    mpData.getValues(mpData.dimensions, idx)
                );
            }
            else if (coordSys) {
                var x = mpData.get(coordSys.dimensions[0], idx);
                var y = mpData.get(coordSys.dimensions[1], idx);
                point = coordSys.dataToPoint([x, y]);
<<<<<<< HEAD

            }

            // Use x, y if has any
            if (!isNaN(xPx)) {
                point[0] = xPx;
            }
            if (!isNaN(yPx)) {
                point[1] = yPx;
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }

            mpData.setItemLayout(idx, point);
        });
    }

<<<<<<< HEAD
    require('./MarkerView').extend({

        type: 'markPoint',

=======
    // FIXME
    var markPointFormatMixin = {
        formatTooltip: function (dataIndex) {
            var data = this.getData();
            var value = this.getRawValue(dataIndex);
            var formattedValue = zrUtil.isArray(value)
                ? zrUtil.map(value, addCommas).join(', ') : addCommas(value);
            var name = data.getName(dataIndex);
            return this.name + '<br />'
                + ((name ? encodeHTML(name) + ' : ' : '') + formattedValue);
        },

        getData: function () {
            return this._data;
        },

        setData: function (data) {
            this._data = data;
        }
    };

    zrUtil.defaults(markPointFormatMixin, modelUtil.dataFormatMixin);

    require('../../echarts').extendComponentView({

        type: 'markPoint',

        init: function () {
            this._symbolDrawMap = {};
        },

        render: function (markPointModel, ecModel, api) {
            var symbolDrawMap = this._symbolDrawMap;
            for (var name in symbolDrawMap) {
                symbolDrawMap[name].__keep = false;
            }

            ecModel.eachSeries(function (seriesModel) {
                var mpModel = seriesModel.markPointModel;
                mpModel && this._renderSeriesMP(seriesModel, mpModel, api);
            }, this);

            for (var name in symbolDrawMap) {
                if (!symbolDrawMap[name].__keep) {
                    symbolDrawMap[name].remove();
                    this.group.remove(symbolDrawMap[name].group);
                }
            }
        },

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        updateLayout: function (markPointModel, ecModel, api) {
            ecModel.eachSeries(function (seriesModel) {
                var mpModel = seriesModel.markPointModel;
                if (mpModel) {
                    updateMarkerLayout(mpModel.getData(), seriesModel, api);
<<<<<<< HEAD
                    this.markerGroupMap.get(seriesModel.id).updateLayout(mpModel);
=======
                    this._symbolDrawMap[seriesModel.name].updateLayout(mpModel);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                }
            }, this);
        },

<<<<<<< HEAD
        renderSeries: function (seriesModel, mpModel, ecModel, api) {
            var coordSys = seriesModel.coordinateSystem;
            var seriesId = seriesModel.id;
            var seriesData = seriesModel.getData();

            var symbolDrawMap = this.markerGroupMap;
            var symbolDraw = symbolDrawMap.get(seriesId)
                || symbolDrawMap.set(seriesId, new SymbolDraw());
=======
        _renderSeriesMP: function (seriesModel, mpModel, api) {
            var coordSys = seriesModel.coordinateSystem;
            var seriesName = seriesModel.name;
            var seriesData = seriesModel.getData();

            var symbolDrawMap = this._symbolDrawMap;
            var symbolDraw = symbolDrawMap[seriesName];
            if (!symbolDraw) {
                symbolDraw = symbolDrawMap[seriesName] = new SymbolDraw();
            }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            var mpData = createList(coordSys, seriesModel, mpModel);

            // FIXME
<<<<<<< HEAD
=======
            zrUtil.mixin(mpModel, markPointFormatMixin);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            mpModel.setData(mpData);

            updateMarkerLayout(mpModel.getData(), seriesModel, api);

            mpData.each(function (idx) {
                var itemModel = mpData.getItemModel(idx);
                var symbolSize = itemModel.getShallow('symbolSize');
                if (typeof symbolSize === 'function') {
                    // FIXME 这里不兼容 ECharts 2.x，2.x 貌似参数是整个数据？
                    symbolSize = symbolSize(
                        mpModel.getRawValue(idx), mpModel.getDataParams(idx)
                    );
                }
                mpData.setItemVisual(idx, {
                    symbolSize: symbolSize,
                    color: itemModel.get('itemStyle.normal.color')
                        || seriesData.getVisual('color'),
                    symbol: itemModel.getShallow('symbol')
                });
            });

            // TODO Text are wrong
            symbolDraw.updateData(mpData);
            this.group.add(symbolDraw.group);

            // Set host model for tooltip
            // FIXME
            mpData.eachItemGraphicEl(function (el) {
                el.traverse(function (child) {
                    child.dataModel = mpModel;
                });
            });

            symbolDraw.__keep = true;
<<<<<<< HEAD

            symbolDraw.group.silent = mpModel.get('silent') || seriesModel.get('silent');
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        }
    });

    /**
     * @inner
     * @param {module:echarts/coord/*} [coordSys]
     * @param {module:echarts/model/Series} seriesModel
     * @param {module:echarts/model/Model} mpModel
     */
    function createList(coordSys, seriesModel, mpModel) {
        var coordDimsInfos;
        if (coordSys) {
            coordDimsInfos = zrUtil.map(coordSys && coordSys.dimensions, function (coordDim) {
                var info = seriesModel.getData().getDimensionInfo(
                    seriesModel.coordDimToDataDim(coordDim)[0]
                ) || {}; // In map series data don't have lng and lat dimension. Fallback to same with coordSys
                info.name = coordDim;
                return info;
            });
        }
        else {
            coordDimsInfos =[{
                name: 'value',
                type: 'float'
            }];
        }

        var mpData = new List(coordDimsInfos, mpModel);
        var dataOpt = zrUtil.map(mpModel.get('data'), zrUtil.curry(
                markerHelper.dataTransform, seriesModel
            ));
        if (coordSys) {
            dataOpt = zrUtil.filter(
                dataOpt, zrUtil.curry(markerHelper.dataFilter, coordSys)
            );
        }

        mpData.initData(dataOpt, null,
            coordSys ? markerHelper.dimValueGetter : function (item) {
                return item.value;
            }
        );
        return mpData;
    }

});