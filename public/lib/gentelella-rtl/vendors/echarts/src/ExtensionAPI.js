define(function(require) {

    'use strict';

    var zrUtil = require('zrender/core/util');

    var echartsAPIList = [
<<<<<<< HEAD
        'getDom', 'getZr', 'getWidth', 'getHeight', 'getDevicePixelRatio', 'dispatchAction', 'isDisposed',
        'on', 'off', 'getDataURL', 'getConnectedDataURL', 'getModel', 'getOption',
        'getViewOfComponentModel', 'getViewOfSeriesModel'
    ];
    // And `getCoordinateSystems` and `getComponentByElement` will be injected in echarts.js
=======
        'getDom', 'getZr', 'getWidth', 'getHeight', 'dispatchAction',
        'on', 'off', 'getDataURL', 'getConnectedDataURL', 'getModel', 'getOption'
    ];
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    function ExtensionAPI(chartInstance) {
        zrUtil.each(echartsAPIList, function (name) {
            this[name] = zrUtil.bind(chartInstance[name], chartInstance);
        }, this);
    }

    return ExtensionAPI;
});