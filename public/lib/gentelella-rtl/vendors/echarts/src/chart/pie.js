define(function (require) {

    var zrUtil = require('zrender/core/util');
    var echarts = require('../echarts');

    require('./pie/PieSeries');
    require('./pie/PieView');

    require('../action/createDataSelectAction')('pie', [{
        type: 'pieToggleSelect',
        event: 'pieselectchanged',
        method: 'toggleSelected'
    }, {
        type: 'pieSelect',
        event: 'pieselected',
        method: 'select'
    }, {
        type: 'pieUnSelect',
        event: 'pieunselected',
        method: 'unSelect'
    }]);

<<<<<<< HEAD
    echarts.registerVisual(zrUtil.curry(require('../visual/dataColor'), 'pie'));
=======
    echarts.registerVisualCoding(
        'chart',  zrUtil.curry(require('../visual/dataColor'), 'pie')
    );
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    echarts.registerLayout(zrUtil.curry(
        require('./pie/pieLayout'), 'pie'
    ));

<<<<<<< HEAD
    echarts.registerProcessor(zrUtil.curry(require('../processor/dataFilter'), 'pie'));
=======
    echarts.registerProcessor(
        'filter', zrUtil.curry(require('../processor/dataFilter'), 'pie')
    );
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
});