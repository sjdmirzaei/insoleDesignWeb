define(function(require) {

    'use strict';

    var zrUtil = require('zrender/core/util');
    var SeriesModel = require('../../model/Series');
    var whiskerBoxCommon = require('../helper/whiskerBoxCommon');
<<<<<<< HEAD
=======
    var formatUtil = require('../../util/format');
    var encodeHTML = formatUtil.encodeHTML;
    var addCommas = formatUtil.addCommas;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    var CandlestickSeries = SeriesModel.extend({

        type: 'series.candlestick',

        dependencies: ['xAxis', 'yAxis', 'grid'],

        /**
         * @readOnly
         */
<<<<<<< HEAD
        defaultValueDimensions: ['open', 'close', 'lowest', 'highest'],
=======
        valueDimensions: ['open', 'close', 'lowest', 'highest'],
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

        /**
         * @type {Array.<string>}
         * @readOnly
         */
        dimensions: null,

        /**
         * @override
         */
        defaultOption: {
            zlevel: 0,                  // 一级层叠
            z: 2,                       // 二级层叠
            coordinateSystem: 'cartesian2d',
            legendHoverLink: true,

            hoverAnimation: true,

<<<<<<< HEAD
            // xAxisIndex: 0,
            // yAxisIndex: 0,
=======
            xAxisIndex: 0,
            yAxisIndex: 0,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            layout: null, // 'horizontal' or 'vertical'

            itemStyle: {
                normal: {
                    color: '#c23531', // 阳线 positive
                    color0: '#314656', // 阴线 negative     '#c23531', '#314656'
                    borderWidth: 1,
                    // FIXME
                    // ec2中使用的是lineStyle.color 和 lineStyle.color0
                    borderColor: '#c23531',
                    borderColor0: '#314656'
                },
                emphasis: {
                    borderWidth: 2
                }
            },

<<<<<<< HEAD
            barMaxWidth: null,
            barMinWidth: null,
            barWidth: null,

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            animationUpdate: false,
            animationEasing: 'linear',
            animationDuration: 300
        },

        /**
         * Get dimension for shadow in dataZoom
         * @return {string} dimension name
         */
        getShadowDim: function () {
            return 'open';
        },

<<<<<<< HEAD
        brushSelector: function (dataIndex, data, selectors) {
            var itemLayout = data.getItemLayout(dataIndex);
            return selectors.rect(itemLayout.brushRect);
=======
        /**
         * @override
         */
        formatTooltip: function (dataIndex, mutipleSeries) {
            // It rearly use mutiple candlestick series in one cartesian,
            // so only consider one series in this default tooltip.
            var valueHTMLArr = zrUtil.map(this.valueDimensions, function (dim) {
                return dim + ': ' + addCommas(this._data.get(dim, dataIndex));
            }, this);

            return encodeHTML(this.name) + '<br />' + valueHTMLArr.join('<br />');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        }

    });

    zrUtil.mixin(CandlestickSeries, whiskerBoxCommon.seriesModelMixin, true);

    return CandlestickSeries;

});