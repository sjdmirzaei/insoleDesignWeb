define(function(require) {

    'use strict';

    var SeriesModel = require('../../model/Series');
    var List = require('../../data/List');
    var completeDimensions = require('../../data/helper/completeDimensions');
    var zrUtil = require('zrender/core/util');
<<<<<<< HEAD
    var encodeHTML = require('../../util/format').encodeHTML;
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    var RadarSeries = SeriesModel.extend({

        type: 'series.radar',

        dependencies: ['radar'],


        // Overwrite
        init: function (option) {
            RadarSeries.superApply(this, 'init', arguments);

            // Enable legend selection for each data item
            // Use a function instead of direct access because data reference may changed
            this.legendDataProvider = function () {
<<<<<<< HEAD
                return this.getRawData();
=======
                return this._dataBeforeProcessed;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            };
        },

        getInitialData: function (option, ecModel) {
            var data = option.data || [];
            var dimensions = completeDimensions(
<<<<<<< HEAD
                [], data, {extraPrefix: 'indicator_', extraFromZero: true}
=======
                [], data, [], 'indicator_'
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            );
            var list = new List(dimensions, this);
            list.initData(data);
            return list;
        },

        formatTooltip: function (dataIndex) {
            var value = this.getRawValue(dataIndex);
            var coordSys = this.coordinateSystem;
            var indicatorAxes = coordSys.getIndicatorAxes();
<<<<<<< HEAD
            var name = this.getData().getName(dataIndex);
            return encodeHTML(name === '' ? this.name : name) + '<br/>'
                + zrUtil.map(indicatorAxes, function (axis, idx) {
                    return encodeHTML(axis.name + ' : ' + value[idx]);
=======
            return this._data.getName(dataIndex) + '<br />'
                + zrUtil.map(indicatorAxes, function (axis, idx) {
                    return axis.name + ' : ' + value[idx];
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                }).join('<br />');
        },

        defaultOption: {
            zlevel: 0,
            z: 2,
            coordinateSystem: 'radar',
            legendHoverLink: true,
            radarIndex: 0,
            lineStyle: {
                normal: {
                    width: 2,
                    type: 'solid'
                }
            },
            label: {
                normal: {
                    position: 'top'
                }
            },
            // areaStyle: {
            // },
            // itemStyle: {}
            symbol: 'emptyCircle',
            symbolSize: 4
            // symbolRotate: null
        }
    });

    return RadarSeries;
});