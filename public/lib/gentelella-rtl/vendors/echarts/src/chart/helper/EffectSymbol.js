/**
 * Symbol with ripple effect
 * @module echarts/chart/helper/EffectSymbol
 */
define(function (require) {

    var zrUtil = require('zrender/core/util');
    var symbolUtil = require('../../util/symbol');
    var graphic = require('../../util/graphic');
    var numberUtil = require('../../util/number');
    var Symbol = require('./Symbol');
    var Group = graphic.Group;

    var EFFECT_RIPPLE_NUMBER = 3;

    function normalizeSymbolSize(symbolSize) {
        if (!zrUtil.isArray(symbolSize)) {
            symbolSize = [+symbolSize, +symbolSize];
        }
        return symbolSize;
    }
<<<<<<< HEAD

    function updateRipplePath(rippleGroup, effectCfg) {
        rippleGroup.eachChild(function (ripplePath) {
            ripplePath.attr({
                z: effectCfg.z,
                zlevel: effectCfg.zlevel,
                style: {
                    stroke: effectCfg.brushType === 'stroke' ? effectCfg.color : null,
                    fill: effectCfg.brushType === 'fill' ? effectCfg.color : null
                }
            });
        });
    }
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    /**
     * @constructor
     * @param {module:echarts/data/List} data
     * @param {number} idx
     * @extends {module:zrender/graphic/Group}
     */
    function EffectSymbol(data, idx) {
        Group.call(this);

        var symbol = new Symbol(data, idx);
        var rippleGroup = new Group();
        this.add(symbol);
        this.add(rippleGroup);

        rippleGroup.beforeUpdate = function () {
            this.attr(symbol.getScale());
        };
        this.updateData(data, idx);
    }

    var effectSymbolProto = EffectSymbol.prototype;

    effectSymbolProto.stopEffectAnimation = function () {
        this.childAt(1).removeAll();
    };

<<<<<<< HEAD
    effectSymbolProto.startEffectAnimation = function (effectCfg) {
        var symbolType = effectCfg.symbolType;
        var color = effectCfg.color;
        var rippleGroup = this.childAt(1);

        for (var i = 0; i < EFFECT_RIPPLE_NUMBER; i++) {
            // var ripplePath = symbolUtil.createSymbol(
            //     symbolType, -0.5, -0.5, 1, 1, color
            // );
            // If width/height are set too small (e.g., set to 1) on ios10
            // and macOS Sierra, a circle stroke become a rect, no matter what
            // the scale is set. So we set width/height as 2. See #4136.
            var ripplePath = symbolUtil.createSymbol(
                symbolType, -1, -1, 2, 2, color
            );
            ripplePath.attr({
                style: {
=======
    effectSymbolProto.startEffectAnimation = function (
        period, brushType, rippleScale, effectOffset, z, zlevel
    ) {
        var symbolType = this._symbolType;
        var color = this._color;

        var rippleGroup = this.childAt(1);

        for (var i = 0; i < EFFECT_RIPPLE_NUMBER; i++) {
            var ripplePath = symbolUtil.createSymbol(
                symbolType, -0.5, -0.5, 1, 1, color
            );
            ripplePath.attr({
                style: {
                    stroke: brushType === 'stroke' ? color : null,
                    fill: brushType === 'fill' ? color : null,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    strokeNoScale: true
                },
                z2: 99,
                silent: true,
<<<<<<< HEAD
                scale: [0.5, 0.5]
            });

            var delay = -i / EFFECT_RIPPLE_NUMBER * effectCfg.period + effectCfg.effectOffset;
            // TODO Configurable effectCfg.period
            ripplePath.animate('', true)
                .when(effectCfg.period, {
                    scale: [effectCfg.rippleScale / 2, effectCfg.rippleScale / 2]
=======
                scale: [1, 1],
                z: z,
                zlevel: zlevel
            });

            var delay = -i / EFFECT_RIPPLE_NUMBER * period + effectOffset;
            // TODO Configurable period
            ripplePath.animate('', true)
                .when(period, {
                    scale: [rippleScale, rippleScale]
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                })
                .delay(delay)
                .start();
            ripplePath.animateStyle(true)
<<<<<<< HEAD
                .when(effectCfg.period, {
=======
                .when(period, {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    opacity: 0
                })
                .delay(delay)
                .start();

            rippleGroup.add(ripplePath);
        }
<<<<<<< HEAD

        updateRipplePath(rippleGroup, effectCfg);
    };

    /**
     * Update effect symbol
     */
    effectSymbolProto.updateEffectAnimation = function (effectCfg) {
        var oldEffectCfg = this._effectCfg;
        var rippleGroup = this.childAt(1);

        // Must reinitialize effect if following configuration changed
        var DIFFICULT_PROPS = ['symbolType', 'period', 'rippleScale'];
        for (var i = 0; i < DIFFICULT_PROPS; i++) {
            var propName = DIFFICULT_PROPS[i];
            if (oldEffectCfg[propName] !== effectCfg[propName]) {
                this.stopEffectAnimation();
                this.startEffectAnimation(effectCfg);
                return;
            }
        }

        updateRipplePath(rippleGroup, effectCfg);
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    };

    /**
     * Highlight symbol
     */
    effectSymbolProto.highlight = function () {
        this.trigger('emphasis');
    };

    /**
     * Downplay symbol
     */
    effectSymbolProto.downplay = function () {
        this.trigger('normal');
    };

    /**
     * Update symbol properties
     * @param  {module:echarts/data/List} data
     * @param  {number} idx
     */
    effectSymbolProto.updateData = function (data, idx) {
        var seriesModel = data.hostModel;

        this.childAt(0).updateData(data, idx);

        var rippleGroup = this.childAt(1);
        var itemModel = data.getItemModel(idx);
        var symbolType = data.getItemVisual(idx, 'symbol');
        var symbolSize = normalizeSymbolSize(data.getItemVisual(idx, 'symbolSize'));
        var color = data.getItemVisual(idx, 'color');

        rippleGroup.attr('scale', symbolSize);

        rippleGroup.traverse(function (ripplePath) {
            ripplePath.attr({
                fill: color
            });
        });

        var symbolOffset = itemModel.getShallow('symbolOffset');
        if (symbolOffset) {
            var pos = rippleGroup.position;
            pos[0] = numberUtil.parsePercent(symbolOffset[0], symbolSize[0]);
            pos[1] = numberUtil.parsePercent(symbolOffset[1], symbolSize[1]);
        }
        rippleGroup.rotation = (itemModel.getShallow('symbolRotate') || 0) * Math.PI / 180 || 0;

<<<<<<< HEAD
        var effectCfg = {};

        effectCfg.showEffectOn = seriesModel.get('showEffectOn');
        effectCfg.rippleScale = itemModel.get('rippleEffect.scale');
        effectCfg.brushType = itemModel.get('rippleEffect.brushType');
        effectCfg.period = itemModel.get('rippleEffect.period') * 1000;
        effectCfg.effectOffset = idx / data.count();
        effectCfg.z = itemModel.getShallow('z') || 0;
        effectCfg.zlevel = itemModel.getShallow('zlevel') || 0;
        effectCfg.symbolType = symbolType;
        effectCfg.color = color;

        this.off('mouseover').off('mouseout').off('emphasis').off('normal');

        if (effectCfg.showEffectOn === 'render') {
            this._effectCfg
                ? this.updateEffectAnimation(effectCfg)
                : this.startEffectAnimation(effectCfg);

            this._effectCfg = effectCfg;
        }
        else {
            // Not keep old effect config
            this._effectCfg = null;

            this.stopEffectAnimation();
            var symbol = this.childAt(0);
            var onEmphasis = function () {
                symbol.trigger('emphasis');
                if (effectCfg.showEffectOn !== 'render') {
                    this.startEffectAnimation(effectCfg);
                }
            };
            var onNormal = function () {
                symbol.trigger('normal');
                if (effectCfg.showEffectOn !== 'render') {
                    this.stopEffectAnimation();
                }
            };
            this.on('mouseover', onEmphasis, this)
                .on('mouseout', onNormal, this)
                .on('emphasis', onEmphasis, this)
                .on('normal', onNormal, this);
        }

        this._effectCfg = effectCfg;
=======
        this._symbolType = symbolType;
        this._color = color;

        var showEffectOn = seriesModel.get('showEffectOn');
        var rippleScale = itemModel.get('rippleEffect.scale');
        var brushType = itemModel.get('rippleEffect.brushType');
        var effectPeriod = itemModel.get('rippleEffect.period') * 1000;
        var effectOffset = idx / data.count();
        var z = itemModel.getShallow('z') || 0;
        var zlevel = itemModel.getShallow('zlevel') || 0;

        this.stopEffectAnimation();
        if (showEffectOn === 'render') {
            this.startEffectAnimation(
                effectPeriod, brushType, rippleScale, effectOffset, z, zlevel
            );
        }
        var symbol = this.childAt(0);
        function onEmphasis() {
            symbol.trigger('emphasis');
            if (showEffectOn !== 'render') {
                this.startEffectAnimation(
                    effectPeriod, brushType, rippleScale, effectOffset, z, zlevel
                );
            }
        }
        function onNormal() {
            symbol.trigger('normal');
            if (showEffectOn !== 'render') {
                this.stopEffectAnimation();
            }
        }
        this.on('mouseover', onEmphasis, this)
            .on('mouseout', onNormal, this)
            .on('emphasis', onEmphasis, this)
            .on('normal', onNormal, this);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    };

    effectSymbolProto.fadeOut = function (cb) {
        this.off('mouseover').off('mouseout').off('emphasis').off('normal');
        cb && cb();
    };

    zrUtil.inherits(EffectSymbol, Group);

    return EffectSymbol;
});