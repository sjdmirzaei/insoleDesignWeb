<<<<<<< HEAD
/**
 * @file Get initial data and define sankey view's series model
 * @author Deqing Li(annong035@gmail.com)
 */
define(function (require) {

    var SeriesModel = require('../../model/Series');
    var createGraphFromNodeEdge = require('../helper/createGraphFromNodeEdge');
    var encodeHTML = require('../../util/format').encodeHTML;
=======
define(function (require) {

    'use strict';

    var SeriesModel = require('../../model/Series');
    var createGraphFromNodeEdge = require('../helper/createGraphFromNodeEdge');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    var SankeySeries = SeriesModel.extend({

        type: 'series.sankey',

        layoutInfo: null,

<<<<<<< HEAD
        /**
         * Init a graph data structure from data in option series
         *
         * @param  {Object} option  the object used to config echarts view
         * @return {module:echarts/data/List} storage initial data
         */
        getInitialData: function (option) {
=======
        getInitialData: function (option, ecModel) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            var links = option.edges || option.links;
            var nodes = option.data || option.nodes;
            if (nodes && links) {
                var graph = createGraphFromNodeEdge(nodes, links, this, true);
                return graph.data;
            }
        },

        /**
<<<<<<< HEAD
         * Return the graphic data structure
         *
         * @return {module:echarts/data/Graph} graphic data structure
=======
         * @return {module:echarts/data/Graph}
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
         */
        getGraph: function () {
            return this.getData().graph;
        },

        /**
<<<<<<< HEAD
         * Get edge data of graphic data structure
         *
         * @return {module:echarts/data/List} data structure of list
         */
        getEdgeData: function () {
=======
         * return {module:echarts/data/List}
         */
        getEdgeData: function() {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            return this.getGraph().edgeData;
        },

        /**
         * @override
         */
        formatTooltip: function (dataIndex, multipleSeries, dataType) {
<<<<<<< HEAD
            // dataType === 'node' or empty do not show tooltip by default
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            if (dataType === 'edge') {
                var params = this.getDataParams(dataIndex, dataType);
                var rawDataOpt = params.data;
                var html = rawDataOpt.source + ' -- ' + rawDataOpt.target;
                if (params.value) {
                    html += ' : ' + params.value;
                }
<<<<<<< HEAD
                return encodeHTML(html);
            }

            return SankeySeries.superCall(this, 'formatTooltip', dataIndex, multipleSeries);
=======
                return html;
            }
            else {
                return SankeySeries.superCall(this, 'formatTooltip', dataIndex, multipleSeries);
            }
            // dataType === 'node' or empty do not show tooltip by default.
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        defaultOption: {
            zlevel: 0,
            z: 2,

            coordinateSystem: 'view',

<<<<<<< HEAD
            layout: null,
=======
            layout : null,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            // the position of the whole view
            left: '5%',
            top: '5%',
            right: '20%',
            bottom: '5%',

            // the dx of the node
            nodeWidth: 20,

<<<<<<< HEAD
            // the vertical distance between two nodes
=======
            // the distance between two nodes
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            nodeGap: 8,

            // the number of iterations to change the position of the node
            layoutIterations: 32,

            label: {
                normal: {
                    show: true,
                    position: 'right',
                    textStyle: {
                        color: '#000',
                        fontSize: 12
                    }
                },
                emphasis: {
                    show: true
                }
            },

            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: '#333'
                }
            },

            lineStyle: {
                normal: {
                    color: '#314656',
                    opacity: 0.2,
                    curveness: 0.5
                },
                emphasis: {
                    opacity: 0.6
                }
            },

            animationEasing: 'linear',

            animationDuration: 1000
        }

    });

    return SankeySeries;
<<<<<<< HEAD
});
=======
});
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
