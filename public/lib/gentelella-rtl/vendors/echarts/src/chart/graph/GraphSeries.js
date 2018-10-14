define(function (require) {

    'use strict';

    var List = require('../../data/List');
    var zrUtil = require('zrender/core/util');
    var modelUtil = require('../../util/model');
    var Model = require('../../model/Model');
<<<<<<< HEAD
    var formatUtil = require('../../util/format');
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    var createGraphFromNodeEdge = require('../helper/createGraphFromNodeEdge');

    var GraphSeries = require('../../echarts').extendSeriesModel({

        type: 'series.graph',

        init: function (option) {
            GraphSeries.superApply(this, 'init', arguments);

            // Provide data for legend select
            this.legendDataProvider = function () {
                return this._categoriesData;
            };

            this.fillDataTextStyle(option.edges || option.links);

            this._updateCategoriesData();
        },

        mergeOption: function (option) {
            GraphSeries.superApply(this, 'mergeOption', arguments);

            this.fillDataTextStyle(option.edges || option.links);

            this._updateCategoriesData();
        },

        mergeDefaultAndTheme: function (option) {
            GraphSeries.superApply(this, 'mergeDefaultAndTheme', arguments);
            modelUtil.defaultEmphasis(option.edgeLabel, modelUtil.LABEL_OPTIONS);
        },

        getInitialData: function (option, ecModel) {
            var edges = option.edges || option.links || [];
            var nodes = option.data || option.nodes || [];
            var self = this;

            if (nodes && edges) {
                return createGraphFromNodeEdge(nodes, edges, this, true, beforeLink).data;
            }

            function beforeLink(nodeData, edgeData) {
                // Overwrite nodeData.getItemModel to
                nodeData.wrapMethod('getItemModel', function (model) {
                    var categoriesModels = self._categoriesModels;
                    var categoryIdx = model.getShallow('category');
                    var categoryModel = categoriesModels[categoryIdx];
                    if (categoryModel) {
                        categoryModel.parentModel = model.parentModel;
                        model.parentModel = categoryModel;
                    }
                    return model;
                });

                var edgeLabelModel = self.getModel('edgeLabel');
<<<<<<< HEAD
                // For option `edgeLabel` can be found by label.xxx.xxx on item mode.
                var fakeSeriesModel = new Model(
                    {label: edgeLabelModel.option},
                    edgeLabelModel.parentModel,
                    ecModel
                );

                edgeData.wrapMethod('getItemModel', function (model) {
                    model.customizeGetParent(edgeGetParent);
                    return model;
                });

                function edgeGetParent(path) {
                    path = this.parsePath(path);
                    return (path && path[0] === 'label')
                        ? fakeSeriesModel
                        : this.parentModel;
                }
=======
                var wrappedGetEdgeModel = function (path, parentModel) {
                    var pathArr = (path || '').split('.');
                    if (pathArr[0] === 'label') {
                        parentModel = parentModel
                            || edgeLabelModel.getModel(pathArr.slice(1));
                    }
                    var model = Model.prototype.getModel.call(this, pathArr, parentModel);
                    model.getModel = wrappedGetEdgeModel;
                    return model;
                };
                edgeData.wrapMethod('getItemModel', function (model) {
                    // FIXME Wrap get method ?
                    model.getModel = wrappedGetEdgeModel;
                    return model;
                });
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }
        },

        /**
         * @return {module:echarts/data/Graph}
         */
        getGraph: function () {
            return this.getData().graph;
        },

        /**
         * @return {module:echarts/data/List}
         */
        getEdgeData: function () {
            return this.getGraph().edgeData;
        },

        /**
         * @return {module:echarts/data/List}
         */
        getCategoriesData: function () {
            return this._categoriesData;
        },

        /**
         * @override
         */
        formatTooltip: function (dataIndex, multipleSeries, dataType) {
            if (dataType === 'edge') {
                var nodeData = this.getData();
                var params = this.getDataParams(dataIndex, dataType);
                var edge = nodeData.graph.getEdgeByIndex(dataIndex);
                var sourceName = nodeData.getName(edge.node1.dataIndex);
                var targetName = nodeData.getName(edge.node2.dataIndex);
<<<<<<< HEAD

                var html = [];
                sourceName != null && html.push(sourceName);
                targetName != null && html.push(targetName);
                html = formatUtil.encodeHTML(html.join(' > '));

                if (params.value) {
                    html += ' : ' + formatUtil.encodeHTML(params.value);
=======
                var html = sourceName + ' > ' + targetName;
                if (params.value) {
                    html += ' : ' + params.value;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                }
                return html;
            }
            else { // dataType === 'node' or empty
                return GraphSeries.superApply(this, 'formatTooltip', arguments);
            }
        },

        _updateCategoriesData: function () {
            var categories = zrUtil.map(this.option.categories || [], function (category) {
                // Data must has value
                return category.value != null ? category : zrUtil.extend({
                    value: 0
                }, category);
            });
            var categoriesData = new List(['value'], this);
            categoriesData.initData(categories);

            this._categoriesData = categoriesData;

            this._categoriesModels = categoriesData.mapArray(function (idx) {
                return categoriesData.getItemModel(idx, true);
            });
        },

        setZoom: function (zoom) {
            this.option.zoom = zoom;
        },

        setCenter: function (center) {
            this.option.center = center;
        },

<<<<<<< HEAD
        isAnimationEnabled: function () {
            return GraphSeries.superCall(this, 'isAnimationEnabled')
                // Not enable animation when do force layout
                && !(this.get('layout') === 'force' && this.get('force.layoutAnimation'));
        },

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        defaultOption: {
            zlevel: 0,
            z: 2,

<<<<<<< HEAD
            coordinateSystem: 'view',

            // Default option for all coordinate systems
            // xAxisIndex: 0,
            // yAxisIndex: 0,
            // polarIndex: 0,
            // geoIndex: 0,
=======
            color: ['#61a0a8', '#d14a61', '#fd9c35', '#675bba', '#fec42c',
                    '#dd4444', '#fd9c35', '#cd4870'],

            coordinateSystem: 'view',

            // Default option for all coordinate systems
            xAxisIndex: 0,
            yAxisIndex: 0,
            polarIndex: 0,
            geoIndex: 0,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            legendHoverLink: true,

            hoverAnimation: true,

            layout: null,

<<<<<<< HEAD
            focusNodeAdjacency: false,

            // Configuration of circular layout
            circular: {
                rotateLabel: false
            },
            // Configuration of force directed layout
            force: {
                initLayout: null,
                // Node repulsion. Can be an array to represent range.
                repulsion: [0, 50],
                gravity: 0.1,

                // Edge length. Can be an array to represent range.
=======
            // Configuration of force
            force: {
                initLayout: null,
                repulsion: 50,
                gravity: 0.1,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                edgeLength: 30,

                layoutAnimation: true
            },

            left: 'center',
            top: 'center',
            // right: null,
            // bottom: null,
            // width: '80%',
            // height: '80%',

            symbol: 'circle',
            symbolSize: 10,

            edgeSymbol: ['none', 'none'],
            edgeSymbolSize: 10,
            edgeLabel: {
                normal: {
                    position: 'middle'
                },
                emphasis: {}
            },

            draggable: false,

            roam: false,

            // Default on center of graph
            center: null,

            zoom: 1,
            // Symbol size scale ratio in roam
            nodeScaleRatio: 0.6,
<<<<<<< HEAD
            // cursor: null,
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            // categories: [],

            // data: []
            // Or
            // nodes: []
            //
            // links: []
            // Or
            // edges: []

            label: {
                normal: {
                    show: false,
                    formatter: '{b}'
                },
                emphasis: {
                    show: true
                }
            },

            itemStyle: {
                normal: {},
                emphasis: {}
            },

            lineStyle: {
                normal: {
                    color: '#aaa',
                    width: 1,
                    curveness: 0,
                    opacity: 0.5
                },
                emphasis: {}
            }
        }
    });

    return GraphSeries;
});