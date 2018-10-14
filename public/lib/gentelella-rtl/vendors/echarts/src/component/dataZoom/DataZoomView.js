define(function (require) {

    var ComponentView = require('../../view/Component');

    return ComponentView.extend({

        type: 'dataZoom',

        render: function (dataZoomModel, ecModel, api, payload) {
            this.dataZoomModel = dataZoomModel;
            this.ecModel = ecModel;
            this.api = api;
        },

        /**
         * Find the first target coordinate system.
         *
         * @protected
         * @return {Object} {
<<<<<<< HEAD
         *                   grid: [
=======
         *                   cartesians: [
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
         *                       {model: coord0, axisModels: [axis1, axis3], coordIndex: 1},
         *                       {model: coord1, axisModels: [axis0, axis2], coordIndex: 0},
         *                       ...
         *                   ],  // cartesians must not be null/undefined.
<<<<<<< HEAD
         *                   polar: [
         *                       {model: coord0, axisModels: [axis4], coordIndex: 0},
         *                       ...
         *                   ],  // polars must not be null/undefined.
         *                   singleAxis: [
         *                       {model: coord0, axisModels: [], coordIndex: 0}
         *                   ]
         */
        getTargetCoordInfo: function () {
            var dataZoomModel = this.dataZoomModel;
            var ecModel = this.ecModel;
            var coordSysLists = {};
=======
         *                   polars: [
         *                       {model: coord0, axisModels: [axis4], coordIndex: 0},
         *                       ...
         *                   ],  // polars must not be null/undefined.
         *                   axisModels: [axis0, axis1, axis2, axis3, axis4]
         *                       // axisModels must not be null/undefined.
         *                  }
         */
        getTargetInfo: function () {
            var dataZoomModel = this.dataZoomModel;
            var ecModel = this.ecModel;
            var cartesians = [];
            var polars = [];
            var axisModels = [];
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            dataZoomModel.eachTargetAxis(function (dimNames, axisIndex) {
                var axisModel = ecModel.getComponent(dimNames.axis, axisIndex);
                if (axisModel) {
<<<<<<< HEAD
                    var coordModel = axisModel.getCoordSysModel();
                    coordModel && save(
                        coordModel,
                        axisModel,
                        coordSysLists[coordModel.mainType] || (coordSysLists[coordModel.mainType] = []),
                        coordModel.componentIndex
                    );
=======
                    axisModels.push(axisModel);

                    var gridIndex = axisModel.get('gridIndex');
                    var polarIndex = axisModel.get('polarIndex');

                    if (gridIndex != null) {
                        var coordModel = ecModel.getComponent('grid', gridIndex);
                        save(coordModel, axisModel, cartesians, gridIndex);
                    }
                    else if (polarIndex != null) {
                        var coordModel = ecModel.getComponent('polar', polarIndex);
                        save(coordModel, axisModel, polars, polarIndex);
                    }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                }
            }, this);

            function save(coordModel, axisModel, store, coordIndex) {
                var item;
                for (var i = 0; i < store.length; i++) {
                    if (store[i].model === coordModel) {
                        item = store[i];
                        break;
                    }
                }
                if (!item) {
                    store.push(item = {
                        model: coordModel, axisModels: [], coordIndex: coordIndex
                    });
                }
                item.axisModels.push(axisModel);
            }

<<<<<<< HEAD
            return coordSysLists;
=======
            return {
                cartesians: cartesians,
                polars: polars,
                axisModels: axisModels
            };
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        }

    });

});