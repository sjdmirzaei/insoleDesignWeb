// FIXME Better way to pack data in graphic element
define(function (require) {

<<<<<<< HEAD
    require('./axisPointer');

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    require('./tooltip/TooltipModel');

    require('./tooltip/TooltipView');

<<<<<<< HEAD

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    // Show tip action
    /**
     * @action
     * @property {string} type
     * @property {number} seriesIndex
     * @property {number} dataIndex
     * @property {number} [x]
     * @property {number} [y]
     */
    require('../echarts').registerAction(
        {
            type: 'showTip',
            event: 'showTip',
<<<<<<< HEAD
            update: 'tooltip:manuallyShowTip'
=======
            update: 'none'
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },
        // noop
        function () {}
    );
    // Hide tip action
    require('../echarts').registerAction(
        {
            type: 'hideTip',
            event: 'hideTip',
<<<<<<< HEAD
            update: 'tooltip:manuallyHideTip'
=======
            update: 'none'
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },
        // noop
        function () {}
    );
});