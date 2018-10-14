/**
 * @file Timeilne action
 */
define(function(require) {

    var echarts = require('../../echarts');
<<<<<<< HEAD
    var zrUtil = require('zrender/core/util');
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    echarts.registerAction(

        {type: 'timelineChange', event: 'timelineChanged', update: 'prepareAndUpdate'},

        function (payload, ecModel) {

            var timelineModel = ecModel.getComponent('timeline');
            if (timelineModel && payload.currentIndex != null) {
                timelineModel.setCurrentIndex(payload.currentIndex);

                if (!timelineModel.get('loop', true) && timelineModel.isIndexMax()) {
                    timelineModel.setPlayState(false);
                }
            }

<<<<<<< HEAD
            // Set normalized currentIndex to payload.
            ecModel.resetOption('timeline');

            return zrUtil.defaults({
                currentIndex: timelineModel.option.currentIndex
            }, payload);
=======
            ecModel.resetOption('timeline');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        }
    );

    echarts.registerAction(

        {type: 'timelinePlayChange', event: 'timelinePlayChanged', update: 'update'},

        function (payload, ecModel) {
            var timelineModel = ecModel.getComponent('timeline');
            if (timelineModel && payload.playState != null) {
                timelineModel.setPlayState(payload.playState);
            }
        }
    );

});