define(function (require) {

    var echarts = require('../../echarts');

<<<<<<< HEAD
    /**
     * @payload
     * @property {string} parallelAxisId
     * @property {Array.<Array.<number>>} intervals
     */
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    var actionInfo = {
        type: 'axisAreaSelect',
        event: 'axisAreaSelected',
        update: 'updateVisual'
    };
<<<<<<< HEAD
    echarts.registerAction(actionInfo, function (payload, ecModel) {
        ecModel.eachComponent(
            {mainType: 'parallelAxis', query: payload},
            function (parallelAxisModel) {
                parallelAxisModel.axis.model.setActiveIntervals(payload.intervals);
            }
        );
    });

    /**
     * @payload
     */
    echarts.registerAction('parallelAxisExpand', function (payload, ecModel) {
        ecModel.eachComponent(
            {mainType: 'parallel', query: payload},
            function (parallelModel) {
                parallelModel.setAxisExpand(payload);
=======

    /**
     * @payload
     * @property {string} parallelAxisId
     * @property {Array.<Array.<number>>} intervals
     */
    echarts.registerAction(actionInfo, function (payload, ecModel) {
        ecModel.eachComponent(
            {mainType: 'parallelAxis', query: payload},
            function (parallelAxisModel) {
                parallelAxisModel.axis.model.setActiveIntervals(payload.intervals);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }
        );

    });
});