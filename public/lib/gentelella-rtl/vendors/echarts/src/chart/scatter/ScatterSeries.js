define(function (require) {

    'use strict';

    var createListFromArray = require('../helper/createListFromArray');
    var SeriesModel = require('../../model/Series');

    return SeriesModel.extend({

        type: 'series.scatter',

<<<<<<< HEAD
        dependencies: ['grid', 'polar', 'geo', 'singleAxis', 'calendar'],

        getInitialData: function (option, ecModel) {
            return createListFromArray(option.data, this, ecModel);
        },

        brushSelector: 'point',

=======
        dependencies: ['grid', 'polar'],

        getInitialData: function (option, ecModel) {
            var list = createListFromArray(option.data, this, ecModel);
            return list;
        },

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        defaultOption: {
            coordinateSystem: 'cartesian2d',
            zlevel: 0,
            z: 2,
            legendHoverLink: true,

            hoverAnimation: true,
            // Cartesian coordinate system
<<<<<<< HEAD
            // xAxisIndex: 0,
            // yAxisIndex: 0,

            // Polar coordinate system
            // polarIndex: 0,

            // Geo coordinate system
            // geoIndex: 0,
=======
            xAxisIndex: 0,
            yAxisIndex: 0,

            // Polar coordinate system
            polarIndex: 0,

            // Geo coordinate system
            geoIndex: 0,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            // symbol: null,        // 图形类型
            symbolSize: 10,          // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
            // symbolRotate: null,  // 图形旋转控制

            large: false,
            // Available when large is true
            largeThreshold: 2000,
<<<<<<< HEAD
            // cursor: null,
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            // label: {
                // normal: {
                    // show: false
                    // distance: 5,
                    // formatter: 标签文本格式器，同Tooltip.formatter，不支持异步回调
                    // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                    //           'inside'|'left'|'right'|'top'|'bottom'
                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
            //     }
            // },
            itemStyle: {
                normal: {
                    opacity: 0.8
                    // color: 各异
                }
            }
        }
<<<<<<< HEAD

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    });
});