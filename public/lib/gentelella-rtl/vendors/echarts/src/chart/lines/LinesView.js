define(function (require) {

    var LineDraw = require('../helper/LineDraw');
    var EffectLine = require('../helper/EffectLine');
    var Line = require('../helper/Line');
<<<<<<< HEAD
    var Polyline = require('../helper/Polyline');
    var EffectPolyline = require('../helper/EffectPolyline');
    var LargeLineDraw = require('../helper/LargeLineDraw');
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    require('../../echarts').extendChartView({

        type: 'lines',

        init: function () {},

        render: function (seriesModel, ecModel, api) {
            var data = seriesModel.getData();
            var lineDraw = this._lineDraw;

            var hasEffect = seriesModel.get('effect.show');
<<<<<<< HEAD
            var isPolyline = seriesModel.get('polyline');
            var isLarge = seriesModel.get('large') && data.count() >= seriesModel.get('largeThreshold');

            if (__DEV__) {
                if (hasEffect && isLarge) {
                    console.warn('Large lines not support effect');
                }
            }
            if (hasEffect !== this._hasEffet || isPolyline !== this._isPolyline || isLarge !== this._isLarge) {
                if (lineDraw) {
                    lineDraw.remove();
                }
                lineDraw = this._lineDraw = isLarge
                    ? new LargeLineDraw()
                    : new LineDraw(
                        isPolyline
                            ? (hasEffect ? EffectPolyline : Polyline)
                            : (hasEffect ? EffectLine : Line)
                    );
                this._hasEffet = hasEffect;
                this._isPolyline = isPolyline;
                this._isLarge = isLarge;
=======
            if (hasEffect !== this._hasEffet) {
                if (lineDraw) {
                    lineDraw.remove();
                }
                lineDraw = this._lineDraw = new LineDraw(
                    hasEffect ? EffectLine : Line
                );
                this._hasEffet = hasEffect;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            }

            var zlevel = seriesModel.get('zlevel');
            var trailLength = seriesModel.get('effect.trailLength');

            var zr = api.getZr();
            // Avoid the drag cause ghost shadow
            // FIXME Better way ?
            zr.painter.getLayer(zlevel).clear(true);
            // Config layer with motion blur
            if (this._lastZlevel != null) {
                zr.configLayer(this._lastZlevel, {
                    motionBlur: false
                });
            }
            if (hasEffect && trailLength) {
<<<<<<< HEAD
                if (__DEV__) {
                    var notInIndividual = false;
                    ecModel.eachSeries(function (otherSeriesModel) {
                        if (otherSeriesModel !== seriesModel && otherSeriesModel.get('zlevel') === zlevel) {
                            notInIndividual = true;
                        }
                    });
                    notInIndividual && console.warn('Lines with trail effect should have an individual zlevel');
                }

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                zr.configLayer(zlevel, {
                    motionBlur: true,
                    lastFrameAlpha: Math.max(Math.min(trailLength / 10 + 0.9, 1), 0)
                });
            }

            this.group.add(lineDraw.group);

            lineDraw.updateData(data);

            this._lastZlevel = zlevel;
        },

        updateLayout: function (seriesModel, ecModel, api) {
<<<<<<< HEAD
            this._lineDraw.updateLayout(seriesModel);
=======
            this._lineDraw.updateLayout();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            // Not use motion when dragging or zooming
            var zr = api.getZr();
            zr.painter.getLayer(this._lastZlevel).clear(true);
        },

        remove: function (ecModel, api) {
            this._lineDraw && this._lineDraw.remove(api, true);
<<<<<<< HEAD
        },

        dispose: function () {}
=======
        }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    });
});