define(function (require) {

<<<<<<< HEAD
    return require('./MarkerModel').extend({

        type: 'markPoint',

=======
    var modelUtil = require('../../util/model');
    var zrUtil = require('zrender/core/util');

    function fillLabel(opt) {
        modelUtil.defaultEmphasis(
            opt.label,
            modelUtil.LABEL_OPTIONS
        );
    }
    var MarkPointModel = require('../../echarts').extendComponentModel({

        type: 'markPoint',

        dependencies: ['series', 'grid', 'polar'],
        /**
         * @overrite
         */
        init: function (option, parentModel, ecModel, extraOpt) {
            this.mergeDefaultAndTheme(option, ecModel);
            this.mergeOption(option, ecModel, extraOpt.createdBySelf, true);
        },

        mergeOption: function (newOpt, ecModel, createdBySelf, isInit) {
            if (!createdBySelf) {
                ecModel.eachSeries(function (seriesModel) {
                    var markPointOpt = seriesModel.get('markPoint');
                    var mpModel = seriesModel.markPointModel;
                    if (!markPointOpt || !markPointOpt.data) {
                        seriesModel.markPointModel = null;
                        return;
                    }
                    if (!mpModel) {
                        if (isInit) {
                            // Default label emphasis `position` and `show`
                            fillLabel(markPointOpt);
                        }
                        zrUtil.each(markPointOpt.data, fillLabel);
                        var opt = {
                            mainType: 'markPoint',
                            // Use the same series index and name
                            seriesIndex: seriesModel.seriesIndex,
                            name: seriesModel.name,
                            createdBySelf: true
                        };
                        mpModel = new MarkPointModel(
                            markPointOpt, this, ecModel, opt
                        );
                    }
                    else {
                        mpModel.mergeOption(markPointOpt, ecModel, true);
                    }
                    seriesModel.markPointModel = mpModel;
                }, this);
            }
        },

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        defaultOption: {
            zlevel: 0,
            z: 5,
            symbol: 'pin',
            symbolSize: 50,
            //symbolRotate: 0,
            //symbolOffset: [0, 0]
            tooltip: {
                trigger: 'item'
            },
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 2
                }
            }
        }
    });
<<<<<<< HEAD
=======

    return MarkPointModel;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
});