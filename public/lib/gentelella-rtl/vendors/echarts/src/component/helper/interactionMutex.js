define(function (require) {

    var ATTR = '\0_ec_interaction_mutex';

    var interactionMutex = {

<<<<<<< HEAD
        take: function (zr, resourceKey, userKey) {
            var store = getStore(zr);
            store[resourceKey] = userKey;
        },

        release: function (zr, resourceKey, userKey) {
            var store = getStore(zr);
            var uKey = store[resourceKey];

            if (uKey === userKey) {
                store[resourceKey] = null;
            }
        },

        isTaken: function (zr, resourceKey) {
            return !!getStore(zr)[resourceKey];
=======
        take: function (key, zr) {
            getStore(zr)[key] = true;
        },

        release: function (key, zr) {
            getStore(zr)[key] = false;
        },

        isTaken: function (key, zr) {
            return !!getStore(zr)[key];
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        }
    };

    function getStore(zr) {
        return zr[ATTR] || (zr[ATTR] = {});
    }

<<<<<<< HEAD
    /**
     * payload: {
     *     type: 'takeGlobalCursor',
     *     key: 'dataZoomSelect', or 'brush', or ...,
     *         If no userKey, release global cursor.
     * }
     */
    require('../../echarts').registerAction(
        {type: 'takeGlobalCursor', event: 'globalCursorTaken', update: 'update'},
        function () {}
    );

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    return interactionMutex;
});