define(function (require) {

    var graphic = require('../../util/graphic');
    var zrUtil = require('zrender/core/util');

<<<<<<< HEAD
    var SMOOTH = 0.3;

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    var ParallelView = require('../../view/Chart').extend({

        type: 'parallel',

        init: function () {

            /**
             * @type {module:zrender/container/Group}
             * @private
             */
            this._dataGroup = new graphic.Group();

            this.group.add(this._dataGroup);
<<<<<<< HEAD

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            /**
             * @type {module:echarts/data/List}
             */
            this._data;
        },

        /**
         * @override
         */
        render: function (seriesModel, ecModel, api, payload) {
<<<<<<< HEAD
            this._renderForNormal(seriesModel, payload);
            // this[
            //     seriesModel.option.progressive
            //         ? '_renderForProgressive'
            //         : '_renderForNormal'
            // ](seriesModel);
        },

        dispose: function () {},

        /**
         * @private
         */
        _renderForNormal: function (seriesModel, payload) {
=======

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            var dataGroup = this._dataGroup;
            var data = seriesModel.getData();
            var oldData = this._data;
            var coordSys = seriesModel.coordinateSystem;
            var dimensions = coordSys.dimensions;
<<<<<<< HEAD
            var option = seriesModel.option;
            var smooth = option.smooth ? SMOOTH : null;

            // Consider switch between progressive and not.
            // oldData && oldData.__plProgressive && dataGroup.removeAll();
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            data.diff(oldData)
                .add(add)
                .update(update)
                .remove(remove)
                .execute();

            // Update style
<<<<<<< HEAD
            updateElCommon(data, smooth);

            // First create
            if (!this._data) {
                var clipPath = createGridClipShape(
                    coordSys, seriesModel, function () {
                        // Callback will be invoked immediately if there is no animation
                        setTimeout(function () {
                            dataGroup.removeClipPath();
                        });
                    }
                );
                dataGroup.setClipPath(clipPath);
=======
            data.eachItemGraphicEl(function (elGroup, idx) {
                var itemModel = data.getItemModel(idx);
                var lineStyleModel = itemModel.getModel('lineStyle.normal');
                elGroup.eachChild(function (child) {
                    child.useStyle(zrUtil.extend(
                        lineStyleModel.getLineStyle(),
                        {
                            fill: null,
                            stroke: data.getItemVisual(idx, 'color'),
                            opacity: data.getItemVisual(idx, 'opacity')
                        }
                    ));
                });
            });

            // First create
            if (!this._data) {
                dataGroup.setClipPath(createGridClipShape(
                    coordSys, seriesModel, function () {
                        dataGroup.removeClipPath();
                    }
                ));
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }

            this._data = data;

            function add(newDataIndex) {
<<<<<<< HEAD
                addEl(data, dataGroup, newDataIndex, dimensions, coordSys, null, smooth);
            }

            function update(newDataIndex, oldDataIndex) {
                var line = oldData.getItemGraphicEl(oldDataIndex);
                var points = createLinePoints(data, newDataIndex, dimensions, coordSys);
                data.setItemGraphicEl(newDataIndex, line);
                var animationModel = (payload && payload.animation === false) ? null : seriesModel;
                graphic.updateProps(line, {shape: {points: points}}, animationModel, newDataIndex);
            }

            function remove(oldDataIndex) {
                var line = oldData.getItemGraphicEl(oldDataIndex);
                dataGroup.remove(line);
            }

        },

        /**
         * @private
         */
        // _renderForProgressive: function (seriesModel) {
        //     var dataGroup = this._dataGroup;
        //     var data = seriesModel.getData();
        //     var oldData = this._data;
        //     var coordSys = seriesModel.coordinateSystem;
        //     var dimensions = coordSys.dimensions;
        //     var option = seriesModel.option;
        //     var progressive = option.progressive;
        //     var smooth = option.smooth ? SMOOTH : null;

        //     // In progressive animation is disabled, so use simple data diff,
        //     // which effects performance less.
        //     // (Typically performance for data with length 7000+ like:
        //     // simpleDiff: 60ms, addEl: 184ms,
        //     // in RMBP 2.4GHz intel i7, OSX 10.9 chrome 50.0.2661.102 (64-bit))
        //     if (simpleDiff(oldData, data, dimensions)) {
        //         dataGroup.removeAll();
        //         data.each(function (dataIndex) {
        //             addEl(data, dataGroup, dataIndex, dimensions, coordSys);
        //         });
        //     }

        //     updateElCommon(data, progressive, smooth);

        //     // Consider switch between progressive and not.
        //     data.__plProgressive = true;
        //     this._data = data;
        // },

        /**
=======
                var values = data.getValues(dimensions, newDataIndex);
                var elGroup = new graphic.Group();
                dataGroup.add(elGroup);

                eachAxisPair(
                    values, dimensions, coordSys,
                    function (pointPair, pairIndex) {
                        // FIXME
                        // init animation
                        if (pointPair) {
                            elGroup.add(createEl(pointPair));
                        }
                    }
                );

                data.setItemGraphicEl(newDataIndex, elGroup);
            }

            function update(newDataIndex, oldDataIndex) {
                var values = data.getValues(dimensions, newDataIndex);
                var elGroup = oldData.getItemGraphicEl(oldDataIndex);
                var newEls = [];
                var elGroupIndex = 0;

                eachAxisPair(
                    values, dimensions, coordSys,
                    function (pointPair, pairIndex) {
                        var el = elGroup.childAt(elGroupIndex++);

                        if (pointPair && !el) {
                            newEls.push(createEl(pointPair));
                        }
                        else if (pointPair) {
                            graphic.updateProps(el, {
                                shape: {
                                    points: pointPair
                                }
                            }, seriesModel, newDataIndex);
                        }
                    }
                );

                // Remove redundent els
                for (var i = elGroup.childCount() - 1; i >= elGroupIndex; i--) {
                    elGroup.remove(elGroup.childAt(i));
                }

                // Add new els
                for (var i = 0, len = newEls.length; i < len; i++) {
                    elGroup.add(newEls[i]);
                }

                data.setItemGraphicEl(newDataIndex, elGroup);
            }

            function remove(oldDataIndex) {
                var elGroup = oldData.getItemGraphicEl(oldDataIndex);
                dataGroup.remove(elGroup);
            }
        },

        /**
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
         * @override
         */
        remove: function () {
            this._dataGroup && this._dataGroup.removeAll();
            this._data = null;
        }
    });

    function createGridClipShape(coordSys, seriesModel, cb) {
        var parallelModel = coordSys.model;
        var rect = coordSys.getRect();
        var rectEl = new graphic.Rect({
            shape: {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height
            }
        });
<<<<<<< HEAD

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        var dim = parallelModel.get('layout') === 'horizontal' ? 'width' : 'height';
        rectEl.setShape(dim, 0);
        graphic.initProps(rectEl, {
            shape: {
                width: rect.width,
                height: rect.height
            }
        }, seriesModel, cb);
        return rectEl;
    }

<<<<<<< HEAD
    function createLinePoints(data, dataIndex, dimensions, coordSys) {
        var points = [];
        for (var i = 0; i < dimensions.length; i++) {
            var dimName = dimensions[i];
            var value = data.get(dimName, dataIndex);
            if (!isEmptyValue(value, coordSys.getAxis(dimName).type)) {
                points.push(coordSys.dataToPoint(value, dimName));
            }
        }
        return points;
    }

    function addEl(data, dataGroup, dataIndex, dimensions, coordSys) {
        var points = createLinePoints(data, dataIndex, dimensions, coordSys);
        var line = new graphic.Polyline({
            shape: {points: points},
            silent: true,
            z2: 10
        });
        dataGroup.add(line);
        data.setItemGraphicEl(dataIndex, line);
    }

    function updateElCommon(data, smooth) {
        var seriesStyleModel = data.hostModel.getModel('lineStyle.normal');
        var lineStyle = seriesStyleModel.getLineStyle();
        data.eachItemGraphicEl(function (line, dataIndex) {
            if (data.hasItemOption) {
                var itemModel = data.getItemModel(dataIndex);
                var lineStyleModel = itemModel.getModel('lineStyle.normal', seriesStyleModel);
                lineStyle = lineStyleModel.getLineStyle(['color', 'stroke']);
            }

            line.useStyle(zrUtil.extend(lineStyle, {
                fill: null,
                // lineStyle.color have been set to itemVisual in module:echarts/visual/seriesColor.
                stroke: data.getItemVisual(dataIndex, 'color'),
                // lineStyle.opacity have been set to itemVisual in parallelVisual.
                opacity: data.getItemVisual(dataIndex, 'opacity')
            }));

            line.shape.smooth = smooth;
        });
    }

    // function simpleDiff(oldData, newData, dimensions) {
    //     var oldLen;
    //     if (!oldData
    //         || !oldData.__plProgressive
    //         || (oldLen = oldData.count()) !== newData.count()
    //     ) {
    //         return true;
    //     }

    //     var dimLen = dimensions.length;
    //     for (var i = 0; i < oldLen; i++) {
    //         for (var j = 0; j < dimLen; j++) {
    //             if (oldData.get(dimensions[j], i) !== newData.get(dimensions[j], i)) {
    //                 return true;
    //             }
    //         }
    //     }

    //     return false;
    // }
=======
    function eachAxisPair(values, dimensions, coordSys, cb) {
        for (var i = 0, len = dimensions.length - 1; i < len; i++) {
            var dimA = dimensions[i];
            var dimB = dimensions[i + 1];
            var valueA = values[i];
            var valueB = values[i + 1];

            cb(
                (isEmptyValue(valueA, coordSys.getAxis(dimA).type)
                    || isEmptyValue(valueB, coordSys.getAxis(dimB).type)
                )
                    ? null
                    : [
                        coordSys.dataToPoint(valueA, dimA),
                        coordSys.dataToPoint(valueB, dimB)
                    ],
                i
            );
        }
    }

    function createEl(pointPair) {
        return new graphic.Polyline({
            shape: {points: pointPair},
            silent: true
        });
    }

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    // FIXME
    // 公用方法?
    function isEmptyValue(val, axisType) {
        return axisType === 'category'
            ? val == null
            : (val == null || isNaN(val)); // axisType === 'value'
    }

    return ParallelView;
});