/**
 * @file Roam controller manager.
 */
define(function(require) {

    // Only create one roam controller for each coordinate system.
    // one roam controller might be refered by two inside data zoom
    // components (for example, one for x and one for y). When user
    // pan or zoom, only dispatch one action for those data zoom
    // components.

    var zrUtil = require('zrender/core/util');
    var RoamController = require('../../component/helper/RoamController');
    var throttle = require('../../util/throttle');
    var curry = zrUtil.curry;

    var ATTR = '\0_ec_dataZoom_roams';

    var roams = {

        /**
         * @public
         * @param {module:echarts/ExtensionAPI} api
         * @param {Object} dataZoomInfo
         * @param {string} dataZoomInfo.coordId
<<<<<<< HEAD
         * @param {Function} dataZoomInfo.containsPoint
=======
         * @param {Object} dataZoomInfo.coordinateSystem
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
         * @param {Array.<string>} dataZoomInfo.allCoordIds
         * @param {string} dataZoomInfo.dataZoomId
         * @param {number} dataZoomInfo.throttleRate
         * @param {Function} dataZoomInfo.panGetRange
         * @param {Function} dataZoomInfo.zoomGetRange
<<<<<<< HEAD
         * @param {boolean} [dataZoomInfo.zoomLock]
         * @param {boolean} [dataZoomInfo.disabled]
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
         */
        register: function (api, dataZoomInfo) {
            var store = giveStore(api);
            var theDataZoomId = dataZoomInfo.dataZoomId;
            var theCoordId = dataZoomInfo.coordId;

            // Do clean when a dataZoom changes its target coordnate system.
<<<<<<< HEAD
            // Avoid memory leak, dispose all not-used-registered.
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            zrUtil.each(store, function (record, coordId) {
                var dataZoomInfos = record.dataZoomInfos;
                if (dataZoomInfos[theDataZoomId]
                    && zrUtil.indexOf(dataZoomInfo.allCoordIds, theCoordId) < 0
                ) {
                    delete dataZoomInfos[theDataZoomId];
                    record.count--;
                }
            });

            cleanStore(store);

            var record = store[theCoordId];
<<<<<<< HEAD
=======

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            // Create if needed.
            if (!record) {
                record = store[theCoordId] = {
                    coordId: theCoordId,
                    dataZoomInfos: {},
                    count: 0
                };
<<<<<<< HEAD
                record.controller = createController(api, record);
                record.dispatchAction = zrUtil.curry(dispatchAction, api);
            }

            // Update reference of dataZoom.
            !(record.dataZoomInfos[theDataZoomId]) && record.count++;
            record.dataZoomInfos[theDataZoomId] = dataZoomInfo;

            var controllerParams = mergeControllerParams(record.dataZoomInfos);
            record.controller.enable(controllerParams.controlType, controllerParams.opt);

            // Consider resize, area should be always updated.
            record.controller.setPointerChecker(dataZoomInfo.containsPoint);
=======
                record.controller = createController(api, dataZoomInfo, record);
                record.dispatchAction = zrUtil.curry(dispatchAction, api);
            }

            // Consider resize, area should be always updated.
            var rect = dataZoomInfo.coordinateSystem.getRect().clone();
            record.controller.rectProvider = function () {
                return rect;
            };
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

            // Update throttle.
            throttle.createOrUpdate(
                record,
                'dispatchAction',
                dataZoomInfo.throttleRate,
                'fixRate'
            );
<<<<<<< HEAD
=======

            // Update reference of dataZoom.
            !(record.dataZoomInfos[theDataZoomId]) && record.count++;
            record.dataZoomInfos[theDataZoomId] = dataZoomInfo;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * @public
         * @param {module:echarts/ExtensionAPI} api
         * @param {string} dataZoomId
         */
        unregister: function (api, dataZoomId) {
            var store = giveStore(api);

            zrUtil.each(store, function (record) {
<<<<<<< HEAD
                record.controller.dispose();
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                var dataZoomInfos = record.dataZoomInfos;
                if (dataZoomInfos[dataZoomId]) {
                    delete dataZoomInfos[dataZoomId];
                    record.count--;
                }
            });

            cleanStore(store);
        },

        /**
         * @public
         */
        shouldRecordRange: function (payload, dataZoomId) {
            if (payload && payload.type === 'dataZoom' && payload.batch) {
                for (var i = 0, len = payload.batch.length; i < len; i++) {
                    if (payload.batch[i].dataZoomId === dataZoomId) {
                        return false;
                    }
                }
            }
            return true;
        },

        /**
         * @public
         */
        generateCoordId: function (coordModel) {
            return coordModel.type + '\0_' + coordModel.id;
        }
    };

    /**
     * Key: coordId, value: {dataZoomInfos: [], count, controller}
     * @type {Array.<Object>}
     */
    function giveStore(api) {
        // Mount store on zrender instance, so that we do not
        // need to worry about dispose.
        var zr = api.getZr();
        return zr[ATTR] || (zr[ATTR] = {});
    }

<<<<<<< HEAD
    function createController(api, newRecord) {
        var controller = new RoamController(api.getZr());
=======
    function createController(api, dataZoomInfo, newRecord) {
        var controller = new RoamController(api.getZr());
        controller.enable();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        controller.on('pan', curry(onPan, newRecord));
        controller.on('zoom', curry(onZoom, newRecord));

        return controller;
    }

    function cleanStore(store) {
        zrUtil.each(store, function (record, coordId) {
            if (!record.count) {
<<<<<<< HEAD
                record.controller.dispose();
=======
                record.controller.off('pan').off('zoom');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                delete store[coordId];
            }
        });
    }

<<<<<<< HEAD
    function onPan(record, dx, dy, oldX, oldY, newX, newY) {
        wrapAndDispatch(record, function (info) {
            return info.panGetRange(record.controller, dx, dy, oldX, oldY, newX, newY);
=======
    function onPan(record, dx, dy) {
        wrapAndDispatch(record, function (info) {
            return info.panGetRange(record.controller, dx, dy);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        });
    }

    function onZoom(record, scale, mouseX, mouseY) {
        wrapAndDispatch(record, function (info) {
            return info.zoomGetRange(record.controller, scale, mouseX, mouseY);
        });
    }

    function wrapAndDispatch(record, getRange) {
        var batch = [];

        zrUtil.each(record.dataZoomInfos, function (info) {
            var range = getRange(info);
<<<<<<< HEAD
            !info.disabled && range && batch.push({
=======
            range && batch.push({
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                dataZoomId: info.dataZoomId,
                start: range[0],
                end: range[1]
            });
        });

        record.dispatchAction(batch);
    }

    /**
     * This action will be throttled.
     */
    function dispatchAction(api, batch) {
        api.dispatchAction({
            type: 'dataZoom',
            batch: batch
        });
    }

<<<<<<< HEAD
    /**
     * Merge roamController settings when multiple dataZooms share one roamController.
     */
    function mergeControllerParams(dataZoomInfos) {
        var controlType;
        var opt = {};
        var typePriority = {
            'true': 2,
            'move': 1,
            'false': 0,
            'undefined': -1
        };
        zrUtil.each(dataZoomInfos, function (dataZoomInfo) {
            var oneType = dataZoomInfo.disabled ? false : dataZoomInfo.zoomLock ? 'move' : true;
            typePriority[oneType] > typePriority[controlType] && (controlType = oneType);
            // Do not support that different 'shift'/'ctrl'/'alt' setting used in one coord sys.
            zrUtil.extend(opt, dataZoomInfo.roamControllerOpt);
        });

        return {
            controlType: controlType,
            opt: opt
        };
    }

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    return roams;

});