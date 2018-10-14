define(function (require) {

    var SymbolDraw = require('../helper/SymbolDraw');
    var EffectSymbol = require('../helper/EffectSymbol');

    require('../../echarts').extendChartView({

        type: 'effectScatter',

        init: function () {
            this._symbolDraw = new SymbolDraw(EffectSymbol);
        },

        render: function (seriesModel, ecModel, api) {
            var data = seriesModel.getData();
            var effectSymbolDraw = this._symbolDraw;
            effectSymbolDraw.updateData(data);
            this.group.add(effectSymbolDraw.group);
        },

        updateLayout: function () {
            this._symbolDraw.updateLayout();
        },

        remove: function (ecModel, api) {
            this._symbolDraw && this._symbolDraw.remove(api);
<<<<<<< HEAD
        },

        dispose: function () {}
=======
        }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    });
});