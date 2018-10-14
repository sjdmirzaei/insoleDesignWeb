/**
 * @module echarts/chart/helper/LineDraw
 */
define(function (require) {

    var graphic = require('../../util/graphic');
    var LineGroup = require('./Line');


    function isPointNaN(pt) {
        return isNaN(pt[0]) || isNaN(pt[1]);
    }
    function lineNeedsDraw(pts) {
        return !isPointNaN(pts[0]) && !isPointNaN(pts[1]);
    }
    /**
     * @alias module:echarts/component/marker/LineDraw
     * @constructor
     */
    function LineDraw(ctor) {
        this._ctor = ctor || LineGroup;
        this.group = new graphic.Group();
    }

    var lineDrawProto = LineDraw.prototype;

    /**
     * @param {module:echarts/data/List} lineData
     */
    lineDrawProto.updateData = function (lineData) {

        var oldLineData = this._lineData;
        var group = this.group;
        var LineCtor = this._ctor;

<<<<<<< HEAD
        var hostModel = lineData.hostModel;

        var seriesScope = {
            lineStyle: hostModel.getModel('lineStyle.normal').getLineStyle(),
            hoverLineStyle: hostModel.getModel('lineStyle.emphasis').getLineStyle(),
            labelModel: hostModel.getModel('label.normal'),
            hoverLabelModel: hostModel.getModel('label.emphasis')
        };

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        lineData.diff(oldLineData)
            .add(function (idx) {
                if (!lineNeedsDraw(lineData.getItemLayout(idx))) {
                    return;
                }
<<<<<<< HEAD
                var lineGroup = new LineCtor(lineData, idx, seriesScope);
=======
                var lineGroup = new LineCtor(lineData, idx);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

                lineData.setItemGraphicEl(idx, lineGroup);

                group.add(lineGroup);
            })
            .update(function (newIdx, oldIdx) {
                var lineGroup = oldLineData.getItemGraphicEl(oldIdx);
                if (!lineNeedsDraw(lineData.getItemLayout(newIdx))) {
                    group.remove(lineGroup);
                    return;
                }

                if (!lineGroup) {
<<<<<<< HEAD
                    lineGroup = new LineCtor(lineData, newIdx, seriesScope);
                }
                else {
                    lineGroup.updateData(lineData, newIdx, seriesScope);
=======
                    lineGroup = new LineCtor(lineData, newIdx);
                }
                else {
                    lineGroup.updateData(lineData, newIdx);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                }

                lineData.setItemGraphicEl(newIdx, lineGroup);

                group.add(lineGroup);
            })
            .remove(function (idx) {
                group.remove(oldLineData.getItemGraphicEl(idx));
            })
            .execute();

        this._lineData = lineData;
    };

    lineDrawProto.updateLayout = function () {
        var lineData = this._lineData;
        lineData.eachItemGraphicEl(function (el, idx) {
            el.updateLayout(lineData, idx);
        }, this);
    };

    lineDrawProto.remove = function () {
        this.group.removeAll();
    };

    return LineDraw;
});