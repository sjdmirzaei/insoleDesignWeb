/**
 * @file Data zoom action
 */
define(function(require) {

    var zrUtil = require('zrender/core/util');
<<<<<<< HEAD
    var helper = require('./helper');
=======
    var modelUtil = require('../../util/model');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    var echarts = require('../../echarts');


    echarts.registerAction('dataZoom', function (payload, ecModel) {

<<<<<<< HEAD
        var linkedNodesFinder = helper.createLinkedNodesFinder(
            zrUtil.bind(ecModel.eachComponent, ecModel, 'dataZoom'),
            helper.eachAxisDim,
=======
        var linkedNodesFinder = modelUtil.createLinkedNodesFinder(
            zrUtil.bind(ecModel.eachComponent, ecModel, 'dataZoom'),
            modelUtil.eachAxisDim,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            function (model, dimNames) {
                return model.get(dimNames.axisIndex);
            }
        );

        var effectedModels = [];

        ecModel.eachComponent(
            {mainType: 'dataZoom', query: payload},
            function (model, index) {
                effectedModels.push.apply(
                    effectedModels, linkedNodesFinder(model).nodes
                );
            }
        );

        zrUtil.each(effectedModels, function (dataZoomModel, index) {
            dataZoomModel.setRawRange({
                start: payload.start,
                end: payload.end,
                startValue: payload.startValue,
                endValue: payload.endValue
            });
        });

    });

});