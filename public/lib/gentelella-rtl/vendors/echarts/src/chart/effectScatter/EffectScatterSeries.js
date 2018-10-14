define(function (require) {

    'use strict';

    var createListFromArray = require('../helper/createListFromArray');
    var SeriesModel = require('../../model/Series');

    return SeriesModel.extend({

        type: 'series.effectScatter',

        dependencies: ['grid', 'polar'],

        getInitialData: function (option, ecModel) {
            var list = createListFromArray(option.data, this, ecModel);
            return list;
        },

<<<<<<< HEAD
        brushSelector: 'point',

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        defaultOption: {
            coordinateSystem: 'cartesian2d',
            zlevel: 0,
            z: 2,
            legendHoverLink: true,

            effectType: 'ripple',

<<<<<<< HEAD
            progressive: 0,

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            // When to show the effect, option: 'render'|'emphasis'
            showEffectOn: 'render',

            // Ripple effect config
            rippleEffect: {
                period: 4,
                // Scale of ripple
                scale: 2.5,
                // Brush type can be fill or stroke
                brushType: 'fill'
            },

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
            symbolSize: 10          // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
            // symbolRotate: null,  // 图形旋转控制

            // large: false,
            // Available when large is true
            // largeThreshold: 2000,

            // itemStyle: {
            //     normal: {
            //         opacity: 1
            //     }
            // }
        }
<<<<<<< HEAD

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    });
});