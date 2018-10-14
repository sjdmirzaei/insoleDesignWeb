/**
 * @module echarts/chart/helper/Symbol
 */
define(function (require) {

    var zrUtil = require('zrender/core/util');
    var symbolUtil = require('../../util/symbol');
    var graphic = require('../../util/graphic');
    var numberUtil = require('../../util/number');
<<<<<<< HEAD
    var labelHelper = require('./labelHelper');

    function getSymbolSize(data, idx) {
        var symbolSize = data.getItemVisual(idx, 'symbolSize');
        return symbolSize instanceof Array
            ? symbolSize.slice()
            : [+symbolSize, +symbolSize];
    }

    function getScale(symbolSize) {
        return [symbolSize[0] / 2, symbolSize[1] / 2];
=======

    function normalizeSymbolSize(symbolSize) {
        if (!zrUtil.isArray(symbolSize)) {
            symbolSize = [+symbolSize, +symbolSize];
        }
        return symbolSize;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    }

    /**
     * @constructor
     * @alias {module:echarts/chart/helper/Symbol}
     * @param {module:echarts/data/List} data
     * @param {number} idx
     * @extends {module:zrender/graphic/Group}
     */
<<<<<<< HEAD
    function Symbol(data, idx, seriesScope) {
        graphic.Group.call(this);

        this.updateData(data, idx, seriesScope);
=======
    function Symbol(data, idx) {
        graphic.Group.call(this);

        this.updateData(data, idx);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    }

    var symbolProto = Symbol.prototype;

    function driftSymbol(dx, dy) {
        this.parent.drift(dx, dy);
    }

<<<<<<< HEAD
    symbolProto._createSymbol = function (symbolType, data, idx, symbolSize) {
=======
    symbolProto._createSymbol = function (symbolType, data, idx) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        // Remove paths created before
        this.removeAll();

        var seriesModel = data.hostModel;
        var color = data.getItemVisual(idx, 'color');

<<<<<<< HEAD
        // var symbolPath = symbolUtil.createSymbol(
        //     symbolType, -0.5, -0.5, 1, 1, color
        // );
        // If width/height are set too small (e.g., set to 1) on ios10
        // and macOS Sierra, a circle stroke become a rect, no matter what
        // the scale is set. So we set width/height as 2. See #4150.
        var symbolPath = symbolUtil.createSymbol(
            symbolType, -1, -1, 2, 2, color
=======
        var symbolPath = symbolUtil.createSymbol(
            symbolType, -0.5, -0.5, 1, 1, color
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        );

        symbolPath.attr({
            z2: 100,
            culling: true,
            scale: [0, 0]
        });
        // Rewrite drift method
        symbolPath.drift = driftSymbol;

<<<<<<< HEAD
        graphic.initProps(symbolPath, {
            scale: getScale(symbolSize)
        }, seriesModel, idx);
=======
        var size = normalizeSymbolSize(data.getItemVisual(idx, 'symbolSize'));

        graphic.initProps(symbolPath, {
            scale: size
        }, seriesModel, idx);

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        this._symbolType = symbolType;

        this.add(symbolPath);
    };

    /**
     * Stop animation
     * @param {boolean} toLastFrame
     */
    symbolProto.stopSymbolAnimation = function (toLastFrame) {
        this.childAt(0).stopAnimation(toLastFrame);
    };

    /**
<<<<<<< HEAD
     * Get symbol path element
     */
    symbolProto.getSymbolPath = function () {
        return this.childAt(0);
    };

    /**
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
     * Get scale(aka, current symbol size).
     * Including the change caused by animation
     */
    symbolProto.getScale = function () {
        return this.childAt(0).scale;
    };

    /**
     * Highlight symbol
     */
    symbolProto.highlight = function () {
        this.childAt(0).trigger('emphasis');
    };

    /**
     * Downplay symbol
     */
    symbolProto.downplay = function () {
        this.childAt(0).trigger('normal');
    };

    /**
     * @param {number} zlevel
     * @param {number} z
     */
    symbolProto.setZ = function (zlevel, z) {
        var symbolPath = this.childAt(0);
        symbolPath.zlevel = zlevel;
        symbolPath.z = z;
    };

    symbolProto.setDraggable = function (draggable) {
        var symbolPath = this.childAt(0);
        symbolPath.draggable = draggable;
        symbolPath.cursor = draggable ? 'move' : 'pointer';
    };

    /**
     * Update symbol properties
     * @param  {module:echarts/data/List} data
     * @param  {number} idx
     */
<<<<<<< HEAD
    symbolProto.updateData = function (data, idx, seriesScope) {
        this.silent = false;

        var symbolType = data.getItemVisual(idx, 'symbol') || 'circle';
        var seriesModel = data.hostModel;
        var symbolSize = getSymbolSize(data, idx);

        if (symbolType !== this._symbolType) {
            this._createSymbol(symbolType, data, idx, symbolSize);
        }
        else {
            var symbolPath = this.childAt(0);
            symbolPath.silent = false;
            graphic.updateProps(symbolPath, {
                scale: getScale(symbolSize)
            }, seriesModel, idx);
        }
        this._updateCommon(data, idx, symbolSize, seriesScope);
=======
    symbolProto.updateData = function (data, idx) {
        var symbolType = data.getItemVisual(idx, 'symbol') || 'circle';
        var seriesModel = data.hostModel;
        var symbolSize = normalizeSymbolSize(data.getItemVisual(idx, 'symbolSize'));
        if (symbolType !== this._symbolType) {
            this._createSymbol(symbolType, data, idx);
        }
        else {
            var symbolPath = this.childAt(0);
            graphic.updateProps(symbolPath, {
                scale: symbolSize
            }, seriesModel, idx);
        }
        this._updateCommon(data, idx, symbolSize);

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        this._seriesModel = seriesModel;
    };

    // Update common properties
    var normalStyleAccessPath = ['itemStyle', 'normal'];
    var emphasisStyleAccessPath = ['itemStyle', 'emphasis'];
    var normalLabelAccessPath = ['label', 'normal'];
    var emphasisLabelAccessPath = ['label', 'emphasis'];

<<<<<<< HEAD
    symbolProto._updateCommon = function (data, idx, symbolSize, seriesScope) {
        var symbolPath = this.childAt(0);
        var seriesModel = data.hostModel;
=======
    symbolProto._updateCommon = function (data, idx, symbolSize) {
        var symbolPath = this.childAt(0);
        var seriesModel = data.hostModel;
        var itemModel = data.getItemModel(idx);
        var normalItemStyleModel = itemModel.getModel(normalStyleAccessPath);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        var color = data.getItemVisual(idx, 'color');

        // Reset style
        if (symbolPath.type !== 'image') {
            symbolPath.useStyle({
                strokeNoScale: true
            });
        }
<<<<<<< HEAD

        seriesScope = seriesScope || null;

        var itemStyle = seriesScope && seriesScope.itemStyle;
        var hoverItemStyle = seriesScope && seriesScope.hoverItemStyle;
        var symbolRotate = seriesScope && seriesScope.symbolRotate;
        var symbolOffset = seriesScope && seriesScope.symbolOffset;
        var labelModel = seriesScope && seriesScope.labelModel;
        var hoverLabelModel = seriesScope && seriesScope.hoverLabelModel;
        var hoverAnimation = seriesScope && seriesScope.hoverAnimation;
        var cursorStyle = seriesScope && seriesScope.cursorStyle;

        if (!seriesScope || data.hasItemOption) {
            var itemModel = data.getItemModel(idx);

            // Color must be excluded.
            // Because symbol provide setColor individually to set fill and stroke
            itemStyle = itemModel.getModel(normalStyleAccessPath).getItemStyle(['color']);
            hoverItemStyle = itemModel.getModel(emphasisStyleAccessPath).getItemStyle();

            symbolRotate = itemModel.getShallow('symbolRotate');
            symbolOffset = itemModel.getShallow('symbolOffset');

            labelModel = itemModel.getModel(normalLabelAccessPath);
            hoverLabelModel = itemModel.getModel(emphasisLabelAccessPath);
            hoverAnimation = itemModel.getShallow('hoverAnimation');
            cursorStyle = itemModel.getShallow('cursor');
        }
        else {
            hoverItemStyle = zrUtil.extend({}, hoverItemStyle);
        }

        var elStyle = symbolPath.style;

        symbolPath.attr('rotation', (symbolRotate || 0) * Math.PI / 180 || 0);

        if (symbolOffset) {
            symbolPath.attr('position', [
                numberUtil.parsePercent(symbolOffset[0], symbolSize[0]),
                numberUtil.parsePercent(symbolOffset[1], symbolSize[1])
            ]);
        }

        cursorStyle && symbolPath.attr('cursor', cursorStyle);

        // PENDING setColor before setStyle!!!
        symbolPath.setColor(color);

        symbolPath.setStyle(itemStyle);

        var opacity = data.getItemVisual(idx, 'opacity');
        if (opacity != null) {
            elStyle.opacity = opacity;
        }

        var valueDim = labelHelper.findLabelValueDim(data);
        labelHelper.setTextToStyle(
            data, idx, valueDim, elStyle, seriesModel, labelModel, color
        );
        labelHelper.setTextToStyle(
            data, idx, valueDim, hoverItemStyle, seriesModel, hoverLabelModel, color
        );
=======
        var elStyle = symbolPath.style;

        var hoverStyle = itemModel.getModel(emphasisStyleAccessPath).getItemStyle();

        symbolPath.rotation = (itemModel.getShallow('symbolRotate') || 0) * Math.PI / 180 || 0;

        var symbolOffset = itemModel.getShallow('symbolOffset');
        if (symbolOffset) {
            var pos = symbolPath.position;
            pos[0] = numberUtil.parsePercent(symbolOffset[0], symbolSize[0]);
            pos[1] = numberUtil.parsePercent(symbolOffset[1], symbolSize[1]);
        }

        symbolPath.setColor(color);

        zrUtil.extend(
            elStyle,
            // Color must be excluded.
            // Because symbol provide setColor individually to set fill and stroke
            normalItemStyleModel.getItemStyle(['color'])
        );

        var opacity = data.getItemVisual(idx, 'opacity');
        if (opacity != null) {
            elStyle.opacity = opacity;
        }

        var labelModel = itemModel.getModel(normalLabelAccessPath);
        var hoverLabelModel = itemModel.getModel(emphasisLabelAccessPath);

        // Get last value dim
        var dimensions = data.dimensions.slice();
        var valueDim;
        var dataType;
        while (dimensions.length && (
            valueDim = dimensions.pop(),
            dataType = data.getDimensionInfo(valueDim).type,
            dataType === 'ordinal' || dataType === 'time'
        )) {} // jshint ignore:line

        if (valueDim != null && labelModel.get('show')) {
            graphic.setText(elStyle, labelModel, color);
            elStyle.text = zrUtil.retrieve(
                seriesModel.getFormattedLabel(idx, 'normal'),
                data.get(valueDim, idx)
            );
        }
        else {
            elStyle.text = '';
        }

        if (valueDim != null && hoverLabelModel.getShallow('show')) {
            graphic.setText(hoverStyle, hoverLabelModel, color);
            hoverStyle.text = zrUtil.retrieve(
                seriesModel.getFormattedLabel(idx, 'emphasis'),
                data.get(valueDim, idx)
            );
        }
        else {
            hoverStyle.text = '';
        }

        var size = normalizeSymbolSize(data.getItemVisual(idx, 'symbolSize'));
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

        symbolPath.off('mouseover')
            .off('mouseout')
            .off('emphasis')
            .off('normal');

<<<<<<< HEAD
        symbolPath.hoverStyle = hoverItemStyle;

        graphic.setHoverStyle(symbolPath);

        var scale = getScale(symbolSize);

        if (hoverAnimation && seriesModel.isAnimationEnabled()) {
            var onEmphasis = function() {
                var ratio = scale[1] / scale[0];
                this.animateTo({
                    scale: [
                        Math.max(scale[0] * 1.1, scale[0] + 3),
                        Math.max(scale[1] * 1.1, scale[1] + 3 * ratio)
=======
        graphic.setHoverStyle(symbolPath, hoverStyle);

        if (itemModel.getShallow('hoverAnimation')) {
            var onEmphasis = function() {
                var ratio = size[1] / size[0];
                this.animateTo({
                    scale: [
                        Math.max(size[0] * 1.1, size[0] + 3),
                        Math.max(size[1] * 1.1, size[1] + 3 * ratio)
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    ]
                }, 400, 'elasticOut');
            };
            var onNormal = function() {
                this.animateTo({
<<<<<<< HEAD
                    scale: scale
=======
                    scale: size
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                }, 400, 'elasticOut');
            };
            symbolPath.on('mouseover', onEmphasis)
                .on('mouseout', onNormal)
                .on('emphasis', onEmphasis)
                .on('normal', onNormal);
        }
    };

    symbolProto.fadeOut = function (cb) {
        var symbolPath = this.childAt(0);
<<<<<<< HEAD
        // Avoid mistaken hover when fading out
        this.silent = symbolPath.silent = true;
=======
        // Avoid trigger hoverAnimation when fading
        symbolPath.off('mouseover')
            .off('mouseout')
            .off('emphasis')
            .off('normal');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        // Not show text when animating
        symbolPath.style.text = '';
        graphic.updateProps(symbolPath, {
            scale: [0, 0]
        }, this._seriesModel, this.dataIndex, cb);
    };

    zrUtil.inherits(Symbol, graphic.Group);

    return Symbol;
});