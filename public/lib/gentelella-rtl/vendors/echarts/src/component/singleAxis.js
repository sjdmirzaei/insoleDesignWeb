define(function (require) {

    require('../coord/single/singleCreator');
    require('./axis/SingleAxisView');
    require('../coord/single/AxisModel');
<<<<<<< HEAD
    require('./axisPointer');

    require('./axisPointer/SingleAxisPointer');

    var echarts = require('../echarts');

    echarts.extendComponentView({
        type: 'single'
    });
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

});