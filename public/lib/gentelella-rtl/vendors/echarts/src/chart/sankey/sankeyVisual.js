<<<<<<< HEAD
/**
 * @file Visual encoding for sankey view
 * @author  Deqing Li(annong035@gmail.com)
 */
define(function (require) {

    var VisualMapping = require('../../visual/VisualMapping');
    var zrUtil = require('zrender/core/util');
=======
define(function (require) {

    var VisualMapping = require('../../visual/VisualMapping');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    return function (ecModel, payload) {
        ecModel.eachSeriesByType('sankey', function (seriesModel) {
            var graph = seriesModel.getGraph();
            var nodes = graph.nodes;

            nodes.sort(function (a, b) {
                return a.getLayout().value - b.getLayout().value;
            });

            var minValue = nodes[0].getLayout().value;
            var maxValue = nodes[nodes.length - 1].getLayout().value;

<<<<<<< HEAD
            zrUtil.each(nodes, function (node) {
=======
            nodes.forEach(function (node) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                var mapping = new VisualMapping({
                    type: 'color',
                    mappingMethod: 'linear',
                    dataExtent: [minValue, maxValue],
                    visual: seriesModel.get('color')
                });

                var mapValueToColor = mapping.mapValueToVisual(node.getLayout().value);
                node.setVisual('color', mapValueToColor);
                // If set itemStyle.normal.color
                var itemModel = node.getModel();
                var customColor = itemModel.get('itemStyle.normal.color');
                if (customColor != null) {
                    node.setVisual('color', customColor);
                }
            });

<<<<<<< HEAD
        });
    };
});
=======
        }) ;
    };
});
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
