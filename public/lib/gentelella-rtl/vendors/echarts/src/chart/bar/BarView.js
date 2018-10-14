define(function (require) {

    'use strict';

    var zrUtil = require('zrender/core/util');
    var graphic = require('../../util/graphic');
<<<<<<< HEAD
    var helper = require('./helper');

    var BAR_BORDER_WIDTH_QUERY = ['itemStyle', 'normal', 'barBorderWidth'];

    // FIXME
    // Just for compatible with ec2.
    zrUtil.extend(require('../../model/Model').prototype, require('./barItemStyle'));

    var BarView = require('../../echarts').extendChartView({
=======

    zrUtil.extend(require('../../model/Model').prototype, require('./barItemStyle'));

    function fixLayoutWithLineWidth(layout, lineWidth) {
        var signX = layout.width > 0 ? 1 : -1;
        var signY = layout.height > 0 ? 1 : -1;
        // In case width or height are too small.
        lineWidth = Math.min(lineWidth, Math.abs(layout.width), Math.abs(layout.height));
        layout.x += signX * lineWidth / 2;
        layout.y += signY * lineWidth / 2;
        layout.width -= signX * lineWidth;
        layout.height -= signY * lineWidth;
    }

    return require('../../echarts').extendChartView({
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

        type: 'bar',

        render: function (seriesModel, ecModel, api) {
            var coordinateSystemType = seriesModel.get('coordinateSystem');

<<<<<<< HEAD
            if (coordinateSystemType === 'cartesian2d'
                || coordinateSystemType === 'polar'
            ) {
                this._render(seriesModel, ecModel, api);
            }
            else if (__DEV__) {
                console.warn('Only cartesian2d and polar supported for bar.');
=======
            if (coordinateSystemType === 'cartesian2d') {
                this._renderOnCartesian(seriesModel, ecModel, api);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }

            return this.group;
        },

<<<<<<< HEAD
        dispose: zrUtil.noop,

        _render: function (seriesModel, ecModel, api) {
=======
        _renderOnCartesian: function (seriesModel, ecModel, api) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            var group = this.group;
            var data = seriesModel.getData();
            var oldData = this._data;

<<<<<<< HEAD
            var coord = seriesModel.coordinateSystem;
            var baseAxis = coord.getBaseAxis();
            var isHorizontalOrRadial;

            if (coord.type === 'cartesian2d') {
                isHorizontalOrRadial = baseAxis.isHorizontal();
            }
            else if (coord.type === 'polar') {
                isHorizontalOrRadial = baseAxis.dim === 'angle';
            }

            var animationModel = seriesModel.isAnimationEnabled() ? seriesModel : null;

            data.diff(oldData)
                .add(function (dataIndex) {
=======
            var cartesian = seriesModel.coordinateSystem;
            var baseAxis = cartesian.getBaseAxis();
            var isHorizontal = baseAxis.isHorizontal();

            var enableAnimation = seriesModel.get('animation');

            var barBorderWidthQuery = ['itemStyle', 'normal', 'barBorderWidth'];

            function createRect(dataIndex, isUpdate) {
                var layout = data.getItemLayout(dataIndex);
                var lineWidth = data.getItemModel(dataIndex).get(barBorderWidthQuery) || 0;
                fixLayoutWithLineWidth(layout, lineWidth);

                var rect = new graphic.Rect({
                    shape: zrUtil.extend({}, layout)
                });
                // Animation
                if (enableAnimation) {
                    var rectShape = rect.shape;
                    var animateProperty = isHorizontal ? 'height' : 'width';
                    var animateTarget = {};
                    rectShape[animateProperty] = 0;
                    animateTarget[animateProperty] = layout[animateProperty];
                    graphic[isUpdate? 'updateProps' : 'initProps'](rect, {
                        shape: animateTarget
                    }, seriesModel, dataIndex);
                }
                return rect;
            }
            data.diff(oldData)
                .add(function (dataIndex) {
                    // 空数据
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    if (!data.hasValue(dataIndex)) {
                        return;
                    }

<<<<<<< HEAD
                    var itemModel = data.getItemModel(dataIndex);
                    var layout = getLayout[coord.type](data, dataIndex, itemModel);
                    var el = elementCreator[coord.type](
                        data, dataIndex, itemModel, layout, isHorizontalOrRadial, animationModel
                    );
                    data.setItemGraphicEl(dataIndex, el);
                    group.add(el);

                    updateStyle(
                        el, data, dataIndex, itemModel, layout,
                        seriesModel, isHorizontalOrRadial, coord.type === 'polar'
                    );
                })
                .update(function (newIndex, oldIndex) {
                    var el = oldData.getItemGraphicEl(oldIndex);

                    if (!data.hasValue(newIndex)) {
                        group.remove(el);
                        return;
                    }

                    var itemModel = data.getItemModel(newIndex);
                    var layout = getLayout[coord.type](data, newIndex, itemModel);

                    if (el) {
                        graphic.updateProps(el, {shape: layout}, animationModel, newIndex);
                    }
                    else {
                        el = elementCreator[coord.type](
                            data, newIndex, itemModel, layout, isHorizontalOrRadial, animationModel, true
                        );
                    }

                    data.setItemGraphicEl(newIndex, el);
                    // Add back
                    group.add(el);

                    updateStyle(
                        el, data, newIndex, itemModel, layout,
                        seriesModel, isHorizontalOrRadial, coord.type === 'polar'
                    );
                })
                .remove(function (dataIndex) {
                    var el = oldData.getItemGraphicEl(dataIndex);
                    if (coord.type === 'cartesian2d') {
                        el && removeRect(dataIndex, animationModel, el);
                    }
                    else {
                        el && removeSector(dataIndex, animationModel, el);
=======
                    var rect = createRect(dataIndex);

                    data.setItemGraphicEl(dataIndex, rect);

                    group.add(rect);

                })
                .update(function (newIndex, oldIndex) {
                    var rect = oldData.getItemGraphicEl(oldIndex);
                    // 空数据
                    if (!data.hasValue(newIndex)) {
                        group.remove(rect);
                        return;
                    }
                    if (!rect) {
                        rect = createRect(newIndex, true);
                    }

                    var layout = data.getItemLayout(newIndex);
                    var lineWidth = data.getItemModel(newIndex).get(barBorderWidthQuery) || 0;
                    fixLayoutWithLineWidth(layout, lineWidth);

                    graphic.updateProps(rect, {
                        shape: layout
                    }, seriesModel, newIndex);

                    data.setItemGraphicEl(newIndex, rect);

                    // Add back
                    group.add(rect);
                })
                .remove(function (idx) {
                    var rect = oldData.getItemGraphicEl(idx);
                    if (rect) {
                        // Not show text when animating
                        rect.style.text = '';
                        graphic.updateProps(rect, {
                            shape: {
                                width: 0
                            }
                        }, seriesModel, idx, function () {
                            group.remove(rect);
                        });
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    }
                })
                .execute();

<<<<<<< HEAD
            this._data = data;
        },

        remove: function (ecModel, api) {
            var group = this.group;
            var data = this._data;
            if (ecModel.get('animation')) {
                if (data) {
                    data.eachItemGraphicEl(function (el) {
                        if (el.type === 'sector') {
                            removeSector(el.dataIndex, ecModel, el);
                        }
                        else {
                            removeRect(el.dataIndex, ecModel, el);
                        }
=======
            this._updateStyle(seriesModel, data, isHorizontal);

            this._data = data;
        },

        _updateStyle: function (seriesModel, data, isHorizontal) {
            function setLabel(style, model, color, labelText, labelPositionOutside) {
                graphic.setText(style, model, color);
                style.text = labelText;
                if (style.textPosition === 'outside') {
                    style.textPosition = labelPositionOutside;
                }
            }

            data.eachItemGraphicEl(function (rect, idx) {
                var itemModel = data.getItemModel(idx);
                var color = data.getItemVisual(idx, 'color');
                var opacity = data.getItemVisual(idx, 'opacity');
                var layout = data.getItemLayout(idx);
                var itemStyleModel = itemModel.getModel('itemStyle.normal');

                var hoverStyle = itemModel.getModel('itemStyle.emphasis').getBarItemStyle();

                rect.setShape('r', itemStyleModel.get('barBorderRadius') || 0);

                rect.useStyle(zrUtil.defaults(
                    {
                        fill: color,
                        opacity: opacity
                    },
                    itemStyleModel.getBarItemStyle()
                ));

                var labelPositionOutside = isHorizontal
                    ? (layout.height > 0 ? 'bottom' : 'top')
                    : (layout.width > 0 ? 'left' : 'right');

                var labelModel = itemModel.getModel('label.normal');
                var hoverLabelModel = itemModel.getModel('label.emphasis');
                var rectStyle = rect.style;
                if (labelModel.get('show')) {
                    setLabel(
                        rectStyle, labelModel, color,
                        zrUtil.retrieve(
                            seriesModel.getFormattedLabel(idx, 'normal'),
                            seriesModel.getRawValue(idx)
                        ),
                        labelPositionOutside
                    );
                }
                else {
                    rectStyle.text = '';
                }
                if (hoverLabelModel.get('show')) {
                    setLabel(
                        hoverStyle, hoverLabelModel, color,
                        zrUtil.retrieve(
                            seriesModel.getFormattedLabel(idx, 'emphasis'),
                            seriesModel.getRawValue(idx)
                        ),
                        labelPositionOutside
                    );
                }
                else {
                    hoverStyle.text = '';
                }
                graphic.setHoverStyle(rect, hoverStyle);
            });
        },

        remove: function (ecModel, api) {
            var group = this.group;
            if (ecModel.get('animation')) {
                if (this._data) {
                    this._data.eachItemGraphicEl(function (el) {
                        // Not show text when animating
                        el.style.text = '';
                        graphic.updateProps(el, {
                            shape: {
                                width: 0
                            }
                        }, ecModel, el.dataIndex, function () {
                            group.remove(el);
                        });
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    });
                }
            }
            else {
                group.removeAll();
            }
        }
    });
<<<<<<< HEAD

    var elementCreator = {

        cartesian2d: function (
            data, dataIndex, itemModel, layout, isHorizontal,
            animationModel, isUpdate
        ) {
            var rect = new graphic.Rect({shape: zrUtil.extend({}, layout)});

            // Animation
            if (animationModel) {
                var rectShape = rect.shape;
                var animateProperty = isHorizontal ? 'height' : 'width';
                var animateTarget = {};
                rectShape[animateProperty] = 0;
                animateTarget[animateProperty] = layout[animateProperty];
                graphic[isUpdate ? 'updateProps' : 'initProps'](rect, {
                    shape: animateTarget
                }, animationModel, dataIndex);
            }

            return rect;
        },

        polar: function (
            data, dataIndex, itemModel, layout, isRadial,
            animationModel, isUpdate
        ) {
            var sector = new graphic.Sector({shape: zrUtil.extend({}, layout)});

            // Animation
            if (animationModel) {
                var sectorShape = sector.shape;
                var animateProperty = isRadial ? 'r' : 'endAngle';
                var animateTarget = {};
                sectorShape[animateProperty] = isRadial ? 0 : layout.startAngle;
                animateTarget[animateProperty] = layout[animateProperty];
                graphic[isUpdate ? 'updateProps' : 'initProps'](sector, {
                    shape: animateTarget
                }, animationModel, dataIndex);
            }

            return sector;
        }
    };

    function removeRect(dataIndex, animationModel, el) {
        // Not show text when animating
        el.style.text = '';
        graphic.updateProps(el, {
            shape: {
                width: 0
            }
        }, animationModel, dataIndex, function () {
            el.parent && el.parent.remove(el);
        });
    }

    function removeSector(dataIndex, animationModel, el) {
        // Not show text when animating
        el.style.text = '';
        graphic.updateProps(el, {
            shape: {
                r: el.shape.r0
            }
        }, animationModel, dataIndex, function () {
            el.parent && el.parent.remove(el);
        });
    }

    var getLayout = {
        cartesian2d: function (data, dataIndex, itemModel) {
            var layout = data.getItemLayout(dataIndex);
            var fixedLineWidth = getLineWidth(itemModel, layout);

            // fix layout with lineWidth
            var signX = layout.width > 0 ? 1 : -1;
            var signY = layout.height > 0 ? 1 : -1;
            return {
                x: layout.x + signX * fixedLineWidth / 2,
                y: layout.y + signY * fixedLineWidth / 2,
                width: layout.width - signX * fixedLineWidth,
                height: layout.height - signY * fixedLineWidth
            };
        },

        polar: function (data, dataIndex, itemModel) {
            var layout = data.getItemLayout(dataIndex);
            return {
                cx: layout.cx,
                cy: layout.cy,
                r0: layout.r0,
                r: layout.r,
                startAngle: layout.startAngle,
                endAngle: layout.endAngle
            };
        }
    };

    function updateStyle(
        el, data, dataIndex, itemModel, layout, seriesModel, isHorizontal, isPolar
    ) {
        var color = data.getItemVisual(dataIndex, 'color');
        var opacity = data.getItemVisual(dataIndex, 'opacity');
        var itemStyleModel = itemModel.getModel('itemStyle.normal');
        var hoverStyle = itemModel.getModel('itemStyle.emphasis').getBarItemStyle();

        if (!isPolar) {
            el.setShape('r', itemStyleModel.get('barBorderRadius') || 0);
        }

        el.useStyle(zrUtil.defaults(
            {
                fill: color,
                opacity: opacity
            },
            itemStyleModel.getBarItemStyle()
        ));

        var cursorStyle = itemModel.getShallow('cursor');
        cursorStyle && el.attr('cursor', cursorStyle);

        var labelPositionOutside = isHorizontal
            ? (layout.height > 0 ? 'bottom' : 'top')
            : (layout.width > 0 ? 'left' : 'right');

        if (!isPolar) {
            helper.setLabel(
                el.style, hoverStyle, itemModel, color,
                seriesModel, dataIndex, labelPositionOutside
            );
        }

        graphic.setHoverStyle(el, hoverStyle);
    }

    // In case width or height are too small.
    function getLineWidth(itemModel, rawLayout) {
        var lineWidth = itemModel.get(BAR_BORDER_WIDTH_QUERY) || 0;
        return Math.min(lineWidth, Math.abs(rawLayout.width), Math.abs(rawLayout.height));
    }

    return BarView;
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
});