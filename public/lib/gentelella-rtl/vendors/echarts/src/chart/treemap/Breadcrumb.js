 define(function(require) {

    var graphic = require('../../util/graphic');
    var layout = require('../../util/layout');
    var zrUtil = require('zrender/core/util');
<<<<<<< HEAD
    var helper = require('./helper');
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    var TEXT_PADDING = 8;
    var ITEM_GAP = 8;
    var ARRAY_LENGTH = 5;

<<<<<<< HEAD
    function Breadcrumb(containerGroup) {
=======
    function Breadcrumb(containerGroup, onSelect) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        /**
         * @private
         * @type {module:zrender/container/Group}
         */
        this.group = new graphic.Group();

        containerGroup.add(this.group);
<<<<<<< HEAD
=======

        /**
         * @private
         * @type {Function}
         */
        this._onSelect = onSelect || zrUtil.noop;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    }

    Breadcrumb.prototype = {

        constructor: Breadcrumb,

<<<<<<< HEAD
        render: function (seriesModel, api, targetNode, onSelect) {
=======
        render: function (seriesModel, api, targetNode) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            var model = seriesModel.getModel('breadcrumb');
            var thisGroup = this.group;

            thisGroup.removeAll();

            if (!model.get('show') || !targetNode) {
                return;
            }

            var normalStyleModel = model.getModel('itemStyle.normal');
            // var emphasisStyleModel = model.getModel('itemStyle.emphasis');
            var textStyleModel = normalStyleModel.getModel('textStyle');

            var layoutParam = {
                pos: {
                    left: model.get('left'),
                    right: model.get('right'),
                    top: model.get('top'),
                    bottom: model.get('bottom')
                },
                box: {
                    width: api.getWidth(),
                    height: api.getHeight()
                },
                emptyItemWidth: model.get('emptyItemWidth'),
                totalWidth: 0,
                renderList: []
            };

<<<<<<< HEAD
            this._prepare(targetNode, layoutParam, textStyleModel);
            this._renderContent(seriesModel, layoutParam, normalStyleModel, textStyleModel, onSelect);

            layout.positionElement(thisGroup, layoutParam.pos, layoutParam.box);
=======
            this._prepare(
                model, targetNode, layoutParam, textStyleModel
            );
            this._renderContent(
                model, targetNode, layoutParam, normalStyleModel, textStyleModel
            );

            layout.positionGroup(thisGroup, layoutParam.pos, layoutParam.box);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * Prepare render list and total width
         * @private
         */
<<<<<<< HEAD
        _prepare: function (targetNode, layoutParam, textStyleModel) {
=======
        _prepare: function (model, targetNode, layoutParam, textStyleModel) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            for (var node = targetNode; node; node = node.parentNode) {
                var text = node.getModel().get('name');
                var textRect = textStyleModel.getTextRect(text);
                var itemWidth = Math.max(
                    textRect.width + TEXT_PADDING * 2,
                    layoutParam.emptyItemWidth
                );
                layoutParam.totalWidth += itemWidth + ITEM_GAP;
                layoutParam.renderList.push({node: node, text: text, width: itemWidth});
            }
        },

        /**
         * @private
         */
        _renderContent: function (
<<<<<<< HEAD
            seriesModel, layoutParam, normalStyleModel, textStyleModel, onSelect
=======
            model, targetNode, layoutParam, normalStyleModel, textStyleModel
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        ) {
            // Start rendering.
            var lastX = 0;
            var emptyItemWidth = layoutParam.emptyItemWidth;
<<<<<<< HEAD
            var height = seriesModel.get('breadcrumb.height');
=======
            var height = model.get('height');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            var availableSize = layout.getAvailableSize(layoutParam.pos, layoutParam.box);
            var totalWidth = layoutParam.totalWidth;
            var renderList = layoutParam.renderList;

            for (var i = renderList.length - 1; i >= 0; i--) {
                var item = renderList[i];
<<<<<<< HEAD
                var itemNode = item.node;
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                var itemWidth = item.width;
                var text = item.text;

                // Hdie text and shorten width if necessary.
                if (totalWidth > availableSize.width) {
                    totalWidth -= itemWidth - emptyItemWidth;
                    itemWidth = emptyItemWidth;
                    text = '';
                }

<<<<<<< HEAD
                var el = new graphic.Polygon({
=======
                this.group.add(new graphic.Polygon({
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    shape: {
                        points: makeItemPoints(
                            lastX, 0, itemWidth, height,
                            i === renderList.length - 1, i === 0
                        )
                    },
                    style: zrUtil.defaults(
                        normalStyleModel.getItemStyle(),
                        {
                            lineJoin: 'bevel',
                            text: text,
                            textFill: textStyleModel.getTextColor(),
                            textFont: textStyleModel.getFont()
                        }
                    ),
                    z: 10,
<<<<<<< HEAD
                    onclick: zrUtil.curry(onSelect, itemNode)
                });
                this.group.add(el);

                packEventData(el, seriesModel, itemNode);
=======
                    onclick: zrUtil.bind(this._onSelect, this, item.node)
                }));
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

                lastX += itemWidth + ITEM_GAP;
            }
        },

        /**
         * @override
         */
        remove: function () {
            this.group.removeAll();
        }
    };

    function makeItemPoints(x, y, itemWidth, itemHeight, head, tail) {
        var points = [
            [head ? x : x - ARRAY_LENGTH, y],
            [x + itemWidth, y],
            [x + itemWidth, y + itemHeight],
            [head ? x : x - ARRAY_LENGTH, y + itemHeight]
        ];
        !tail && points.splice(2, 0, [x + itemWidth + ARRAY_LENGTH, y + itemHeight / 2]);
        !head && points.push([x, y + itemHeight / 2]);
        return points;
    }

<<<<<<< HEAD
    // Package custom mouse event.
    function packEventData(el, seriesModel, itemNode) {
        el.eventData = {
            componentType: 'series',
            componentSubType: 'treemap',
            seriesIndex: seriesModel.componentIndex,
            seriesName: seriesModel.name,
            seriesType: 'treemap',
            selfType: 'breadcrumb', // Distinguish with click event on treemap node.
            nodeData: {
                dataIndex: itemNode && itemNode.dataIndex,
                name: itemNode && itemNode.name
            },
            treePathInfo: itemNode && helper.wrapTreePathInfo(itemNode, seriesModel)
        };
    }

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    return Breadcrumb;
});