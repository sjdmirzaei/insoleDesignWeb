define(function (require) {
    var circularLayoutHelper = require('./circularLayoutHelper');
<<<<<<< HEAD
    return function (ecModel) {
=======
    return function (ecModel, api) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        ecModel.eachSeriesByType('graph', function (seriesModel) {
            if (seriesModel.get('layout') === 'circular') {
                circularLayoutHelper(seriesModel);
            }
        });
    };
});