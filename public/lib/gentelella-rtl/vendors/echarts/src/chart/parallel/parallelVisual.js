define(function (require) {

<<<<<<< HEAD
    var opacityAccessPath = ['lineStyle', 'normal', 'opacity'];

    return function (ecModel) {
=======
    /**
     * @payload
     * @property {string} parallelAxisId
     * @property {Array.<number>} extent
     */
    return function (ecModel, payload) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

        ecModel.eachSeriesByType('parallel', function (seriesModel) {

            var itemStyleModel = seriesModel.getModel('itemStyle.normal');
<<<<<<< HEAD
            var lineStyleModel = seriesModel.getModel('lineStyle.normal');
            var globalColors = ecModel.get('color');

            var color = lineStyleModel.get('color')
                || itemStyleModel.get('color')
=======
            var globalColors = ecModel.get('color');

            var color = itemStyleModel.get('color')
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                || globalColors[seriesModel.seriesIndex % globalColors.length];
            var inactiveOpacity = seriesModel.get('inactiveOpacity');
            var activeOpacity = seriesModel.get('activeOpacity');
            var lineStyle = seriesModel.getModel('lineStyle.normal').getLineStyle();

            var coordSys = seriesModel.coordinateSystem;
            var data = seriesModel.getData();

            var opacityMap = {
                normal: lineStyle.opacity,
                active: activeOpacity,
                inactive: inactiveOpacity
            };

            coordSys.eachActiveState(data, function (activeState, dataIndex) {
<<<<<<< HEAD
                var itemModel = data.getItemModel(dataIndex);
                var opacity = opacityMap[activeState];
                if (activeState === 'normal') {
                    var itemOpacity = itemModel.get(opacityAccessPath, true);
                    itemOpacity != null && (opacity = itemOpacity);
                }
                data.setItemVisual(dataIndex, 'opacity', opacity);
=======
                data.setItemVisual(dataIndex, 'opacity', opacityMap[activeState]);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            });

            data.setVisual('color', color);
        });
    };
});