define(function(require) {

    'use strict';

<<<<<<< HEAD
    var zrUtil = require('zrender/core/util');

=======
    // var zrUtil = require('zrender/core/util');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    var coordinateSystemCreators = {};

    function CoordinateSystemManager() {

        this._coordinateSystems = [];
    }

    CoordinateSystemManager.prototype = {

        constructor: CoordinateSystemManager,

        create: function (ecModel, api) {
            var coordinateSystems = [];
<<<<<<< HEAD
            zrUtil.each(coordinateSystemCreators, function (creater, type) {
                var list = creater.create(ecModel, api);
                coordinateSystems = coordinateSystems.concat(list || []);
            });
=======
            for (var type in coordinateSystemCreators) {
                var list = coordinateSystemCreators[type].create(ecModel, api);
                list && (coordinateSystems = coordinateSystems.concat(list));
            }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            this._coordinateSystems = coordinateSystems;
        },

        update: function (ecModel, api) {
<<<<<<< HEAD
            zrUtil.each(this._coordinateSystems, function (coordSys) {
                // FIXME MUST have
                coordSys.update && coordSys.update(ecModel, api);
            });
        },

        getCoordinateSystems: function () {
            return this._coordinateSystems.slice();
=======
            var coordinateSystems = this._coordinateSystems;
            for (var i = 0; i < coordinateSystems.length; i++) {
                // FIXME MUST have
                coordinateSystems[i].update && coordinateSystems[i].update(ecModel, api);
            }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        }
    };

    CoordinateSystemManager.register = function (type, coordinateSystemCreator) {
        coordinateSystemCreators[type] = coordinateSystemCreator;
    };

    CoordinateSystemManager.get = function (type) {
        return coordinateSystemCreators[type];
    };

    return CoordinateSystemManager;
});