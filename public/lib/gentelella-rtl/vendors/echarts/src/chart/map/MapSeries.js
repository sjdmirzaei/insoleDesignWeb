define(function (require) {

    var List = require('../../data/List');
    var SeriesModel = require('../../model/Series');
    var zrUtil = require('zrender/core/util');
    var completeDimensions = require('../../data/helper/completeDimensions');

    var formatUtil = require('../../util/format');
    var encodeHTML = formatUtil.encodeHTML;
    var addCommas = formatUtil.addCommas;

    var dataSelectableMixin = require('../../component/helper/selectableMixin');

    var geoCreator = require('../../coord/geo/geoCreator');

    var MapSeries = SeriesModel.extend({

        type: 'series.map',

<<<<<<< HEAD
        dependencies: ['geo'],

        layoutMode: 'box',

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        /**
         * Only first map series of same mapType will drawMap
         * @type {boolean}
         */
        needsDrawMap: false,

        /**
         * Group of all map series with same mapType
         * @type {boolean}
         */
        seriesGroup: [],

        init: function (option) {

<<<<<<< HEAD
            option = this._fillOption(option, this.getMapType());
=======
            option = this._fillOption(option, option.map);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            this.option = option;

            MapSeries.superApply(this, 'init', arguments);

            this.updateSelectedMap(option.data);
        },

        getInitialData: function (option) {
            var dimensions = completeDimensions(['value'], option.data || []);

            var list = new List(dimensions, this);

            list.initData(option.data);

            return list;
        },

        mergeOption: function (newOption) {
            if (newOption.data) {
<<<<<<< HEAD
                newOption = this._fillOption(newOption, this.getMapType());
=======
                newOption = this._fillOption(newOption, this.option.map);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }

            MapSeries.superCall(this, 'mergeOption', newOption);

            this.updateSelectedMap(this.option.data);
        },

<<<<<<< HEAD
        /**
         * If no host geo model, return null, which means using a
         * inner exclusive geo model.
         */
        getHostGeoModel: function () {
            var geoIndex = this.option.geoIndex;
            return geoIndex != null
                ? this.dependentModels.geo[geoIndex]
                : null;
        },

        getMapType: function () {
            return (this.getHostGeoModel() || this).option.map;
        },

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        _fillOption: function (option, mapName) {
            // Shallow clone
            option = zrUtil.extend({}, option);

            option.data = geoCreator.getFilledRegions(option.data, mapName);

            return option;
        },

        getRawValue: function (dataIndex) {
            // Use value stored in data instead because it is calculated from multiple series
            // FIXME Provide all value of multiple series ?
<<<<<<< HEAD
            return this.getData().get('value', dataIndex);
=======
            return this._data.get('value', dataIndex);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * Get model of region
         * @param  {string} name
         * @return {module:echarts/model/Model}
         */
        getRegionModel: function (regionName) {
            var data = this.getData();
            return data.getItemModel(data.indexOfName(regionName));
        },

        /**
         * Map tooltip formatter
         *
         * @param {number} dataIndex
         */
        formatTooltip: function (dataIndex) {
<<<<<<< HEAD
            // FIXME orignalData and data is a bit confusing
            var data = this.getData();
=======
            var data = this._data;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            var formattedValue = addCommas(this.getRawValue(dataIndex));
            var name = data.getName(dataIndex);

            var seriesGroup = this.seriesGroup;
            var seriesNames = [];
            for (var i = 0; i < seriesGroup.length; i++) {
<<<<<<< HEAD
                var otherIndex = seriesGroup[i].originalData.indexOfName(name);
                if (!isNaN(seriesGroup[i].originalData.get('value', otherIndex))) {
=======
                if (!isNaN(seriesGroup[i].getRawValue(dataIndex))) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    seriesNames.push(
                        encodeHTML(seriesGroup[i].name)
                    );
                }
            }

            return seriesNames.join(', ') + '<br />'
<<<<<<< HEAD
                + encodeHTML(name + ' : ' + formattedValue);
        },

        /**
         * @implement
         */
        getTooltipPosition: function (dataIndex) {
            if (dataIndex != null) {
                var name = this.getData().getName(dataIndex);
                var geo = this.coordinateSystem;
                var region = geo.getRegion(name);

                return region && geo.dataToPoint(region.center);
            }
        },

        setZoom: function (zoom) {
            this.option.zoom = zoom;
        },

        setCenter: function (center) {
            this.option.center = center;
=======
                + name + ' : ' + formattedValue;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        defaultOption: {
            // 一级层叠
            zlevel: 0,
            // 二级层叠
            z: 2,
<<<<<<< HEAD

            coordinateSystem: 'geo',

            // map should be explicitly specified since ec3.
            map: '',

            // If `geoIndex` is not specified, a exclusive geo will be
            // created. Otherwise use the specified geo component, and
            // `map` and `mapType` are ignored.
            // geoIndex: 0,
=======
            coordinateSystem: 'geo',
            // 各省的 map 暂时都用中文
            map: 'china',
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            // 'center' | 'left' | 'right' | 'x%' | {number}
            left: 'center',
            // 'center' | 'top' | 'bottom' | 'x%' | {number}
            top: 'center',
            // right
            // bottom
            // width:
<<<<<<< HEAD
            // height

            // Aspect is width / height. Inited to be geoJson bbox aspect
            // This parameter is used for scale this aspect
            aspectScale: 0.75,

            ///// Layout with center and size
            // If you wan't to put map in a fixed size box with right aspect ratio
            // This two properties may more conveninet
            // layoutCenter: [50%, 50%]
            // layoutSize: 100

=======
            // height   // 自适应
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            // 数值合并方式，默认加和，可选为：
            // 'sum' | 'average' | 'max' | 'min'
            // mapValueCalculation: 'sum',
            // 地图数值计算结果小数精度
            // mapValuePrecision: 0,
<<<<<<< HEAD


=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            // 显示图例颜色标识（系列标识的小圆点），图例开启时有效
            showLegendSymbol: true,
            // 选择模式，默认关闭，可选single，multiple
            // selectedMode: false,
            dataRangeHoverLink: true,
            // 是否开启缩放及漫游模式
            // roam: false,

<<<<<<< HEAD
            // Define left-top, right-bottom coords to control view
            // For example, [ [180, 90], [-180, -90] ],
            // higher priority than center and zoom
            boundingCoords: null,

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            // Default on center of map
            center: null,

            zoom: 1,

            scaleLimit: null,

            label: {
                normal: {
                    show: false,
                    textStyle: {
                        color: '#000'
                    }
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        color: 'rgb(100,0,0)'
                    }
                }
            },
            // scaleLimit: null,
            itemStyle: {
                normal: {
                    // color: 各异,
                    borderWidth: 0.5,
                    borderColor: '#444',
                    areaColor: '#eee'
                },
                // 也是选中样式
                emphasis: {
<<<<<<< HEAD
                    areaColor: 'rgba(255,215,0,0.8)'
                }
            }
        }

=======
                    areaColor: 'rgba(255,215, 0, 0.8)'
                }
            }
        },

        setZoom: function (zoom) {
            this.option.zoom = zoom;
        },

        setCenter: function (center) {
            this.option.center = center;
        }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    });

    zrUtil.mixin(MapSeries, dataSelectableMixin);

    return MapSeries;
});