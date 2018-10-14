<<<<<<< HEAD
// TODO Batch by color

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
define(function (require) {

    var graphic = require('../../util/graphic');
    var symbolUtil = require('../../util/symbol');
<<<<<<< HEAD

    var LargeSymbolPath = graphic.extendShape({

=======
    var zrUtil = require('zrender/core/util');

    var LargeSymbolPath = graphic.extendShape({
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        shape: {
            points: null,
            sizes: null
        },

        symbolProxy: null,

        buildPath: function (path, shape) {
            var points = shape.points;
            var sizes = shape.sizes;

            var symbolProxy = this.symbolProxy;
            var symbolProxyShape = symbolProxy.shape;
            for (var i = 0; i < points.length; i++) {
                var pt = points[i];
<<<<<<< HEAD

                if (isNaN(pt[0]) || isNaN(pt[1])) {
                    continue;
                }

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                var size = sizes[i];
                if (size[0] < 4) {
                    // Optimize for small symbol
                    path.rect(
                        pt[0] - size[0] / 2, pt[1] - size[1] / 2,
                        size[0], size[1]
                    );
                }
                else {
                    symbolProxyShape.x = pt[0] - size[0] / 2;
                    symbolProxyShape.y = pt[1] - size[1] / 2;
                    symbolProxyShape.width = size[0];
                    symbolProxyShape.height = size[1];

<<<<<<< HEAD
                    symbolProxy.buildPath(path, symbolProxyShape, true);
                }
            }
        },

        findDataIndex: function (x, y) {
            var shape = this.shape;
            var points = shape.points;
            var sizes = shape.sizes;

            // Not consider transform
            // Treat each element as a rect
            // top down traverse
            for (var i = points.length - 1; i >= 0; i--) {
                var pt = points[i];
                var size = sizes[i];
                var x0 = pt[0] - size[0] / 2;
                var y0 = pt[1] - size[1] / 2;
                if (x >= x0 && y >= y0 && x <= x0 + size[0] && y <= y0 + size[1]) {
                    // i is dataIndex
                    return i;
                }
            }

            return -1;
=======
                    symbolProxy.buildPath(path, symbolProxyShape);
                }
            }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        }
    });

    function LargeSymbolDraw() {
        this.group = new graphic.Group();

        this._symbolEl = new LargeSymbolPath({
<<<<<<< HEAD
            // rectHover: true,
            // cursor: 'default'
=======
            silent: true
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        });
    }

    var largeSymbolProto = LargeSymbolDraw.prototype;

    /**
     * Update symbols draw by new data
     * @param {module:echarts/data/List} data
     */
    largeSymbolProto.updateData = function (data) {
        this.group.removeAll();

        var symbolEl = this._symbolEl;

        var seriesModel = data.hostModel;

        symbolEl.setShape({
            points: data.mapArray(data.getItemLayout),
            sizes: data.mapArray(
                function (idx) {
                    var size = data.getItemVisual(idx, 'symbolSize');
<<<<<<< HEAD
                    if (!(size instanceof Array)) {
=======
                    if (!zrUtil.isArray(size)) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                        size = [size, size];
                    }
                    return size;
                }
            )
        });

        // Create symbolProxy to build path for each data
        symbolEl.symbolProxy = symbolUtil.createSymbol(
            data.getVisual('symbol'), 0, 0, 0, 0
        );
        // Use symbolProxy setColor method
        symbolEl.setColor = symbolEl.symbolProxy.setColor;

        symbolEl.useStyle(
            seriesModel.getModel('itemStyle.normal').getItemStyle(['color'])
        );

        var visualColor = data.getVisual('color');
        if (visualColor) {
            symbolEl.setColor(visualColor);
        }

<<<<<<< HEAD
        // Enable tooltip
        // PENDING May have performance issue when path is extremely large
        symbolEl.seriesIndex = seriesModel.seriesIndex;
        symbolEl.on('mousemove', function (e) {
            symbolEl.dataIndex = null;
            var dataIndex = symbolEl.findDataIndex(e.offsetX, e.offsetY);
            if (dataIndex >= 0) {
                // Provide dataIndex for tooltip
                symbolEl.dataIndex = dataIndex;
            }
        });

        // Add back
        this.group.add(symbolEl);
=======
        // Add back
        this.group.add(this._symbolEl);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    };

    largeSymbolProto.updateLayout = function (seriesModel) {
        var data = seriesModel.getData();
        this._symbolEl.setShape({
            points: data.mapArray(data.getItemLayout)
        });
    };

    largeSymbolProto.remove = function () {
        this.group.removeAll();
    };

    return LargeSymbolDraw;
});