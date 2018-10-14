/**
 * @file Data zoom model
 */
define(function(require) {

    return require('./DataZoomModel').extend({

        type: 'dataZoom.inside',

        /**
         * @protected
         */
        defaultOption: {
<<<<<<< HEAD
            disabled: false,   // Whether disable this inside zoom.
            zoomLock: false,   // Whether disable zoom but only pan.
            zoomOnMouseWheel: true, // Can be: true / false / 'shift' / 'ctrl' / 'alt'.
            moveOnMouseMove: true,   // Can be: true / false / 'shift' / 'ctrl' / 'alt'.
            preventDefaultMouseMove: true
=======
            zoomLock: false // Whether disable zoom but only pan.
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        }
    });
});