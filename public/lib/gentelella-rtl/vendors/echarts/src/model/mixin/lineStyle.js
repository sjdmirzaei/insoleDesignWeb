define(function (require) {
    var getLineStyle = require('./makeStyleMapper')(
        [
            ['lineWidth', 'width'],
            ['stroke', 'color'],
            ['opacity'],
            ['shadowBlur'],
            ['shadowOffsetX'],
            ['shadowOffsetY'],
            ['shadowColor']
        ]
    );
    return {
        getLineStyle: function (excludes) {
            var style = getLineStyle.call(this, excludes);
<<<<<<< HEAD
            var lineDash = this.getLineDash(style.lineWidth);
=======
            var lineDash = this.getLineDash();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            lineDash && (style.lineDash = lineDash);
            return style;
        },

<<<<<<< HEAD
        getLineDash: function (lineWidth) {
            if (lineWidth == null) {
                lineWidth = 1;
            }
            var lineType = this.get('type');
            var dotSize = Math.max(lineWidth, 2);
            var dashSize = lineWidth * 4;
            return (lineType === 'solid' || lineType == null) ? null
                : (lineType === 'dashed' ? [dashSize, dashSize] : [dotSize, dotSize]);
=======
        getLineDash: function () {
            var lineType = this.get('type');
            return (lineType === 'solid' || lineType == null) ? null
                : (lineType === 'dashed' ? [5, 5] : [1, 1]);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        }
    };
});