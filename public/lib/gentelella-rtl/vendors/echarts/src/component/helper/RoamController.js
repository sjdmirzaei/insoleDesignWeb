/**
 * @module echarts/component/helper/RoamController
 */
<<<<<<< HEAD
=======

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
define(function (require) {

    var Eventful = require('zrender/mixin/Eventful');
    var zrUtil = require('zrender/core/util');
    var eventTool = require('zrender/core/event');
    var interactionMutex = require('./interactionMutex');

<<<<<<< HEAD
=======
    function mousedown(e) {
        if (e.target && e.target.draggable) {
            return;
        }

        var x = e.offsetX;
        var y = e.offsetY;
        var rect = this.rectProvider && this.rectProvider();
        if (rect && rect.contain(x, y)) {
            this._x = x;
            this._y = y;
            this._dragging = true;
        }
    }

    function mousemove(e) {
        if (!this._dragging) {
            return;
        }

        eventTool.stop(e.event);

        if (e.gestureEvent !== 'pinch') {

            if (interactionMutex.isTaken('globalPan', this._zr)) {
                return;
            }

            var x = e.offsetX;
            var y = e.offsetY;

            var dx = x - this._x;
            var dy = y - this._y;

            this._x = x;
            this._y = y;

            var target = this.target;

            if (target) {
                var pos = target.position;
                pos[0] += dx;
                pos[1] += dy;
                target.dirty();
            }

            eventTool.stop(e.event);
            this.trigger('pan', dx, dy);
        }
    }

    function mouseup(e) {
        this._dragging = false;
    }

    function mousewheel(e) {
        // Convenience:
        // Mac and VM Windows on Mac: scroll up: zoom out.
        // Windows: scroll up: zoom in.
        var zoomDelta = e.wheelDelta > 0 ? 1.1 : 1 / 1.1;
        zoom.call(this, e, zoomDelta, e.offsetX, e.offsetY);
    }

    function pinch(e) {
        if (interactionMutex.isTaken('globalPan', this._zr)) {
            return;
        }

        var zoomDelta = e.pinchScale > 1 ? 1.1 : 1 / 1.1;
        zoom.call(this, e, zoomDelta, e.pinchX, e.pinchY);
    }

    function zoom(e, zoomDelta, zoomX, zoomY) {
        var rect = this.rectProvider && this.rectProvider();

        if (rect && rect.contain(zoomX, zoomY)) {
            // When mouse is out of roamController rect,
            // default befavoius should be be disabled, otherwise
            // page sliding is disabled, contrary to expectation.
            eventTool.stop(e.event);

            var target = this.target;
            var zoomLimit = this.zoomLimit;

            if (target) {
                var pos = target.position;
                var scale = target.scale;

                var newZoom = this.zoom = this.zoom || 1;
                newZoom *= zoomDelta;
                if (zoomLimit) {
                    var zoomMin = zoomLimit.min || 0;
                    var zoomMax = zoomLimit.max || Infinity;
                    newZoom = Math.max(
                        Math.min(zoomMax, newZoom),
                        zoomMin
                    );
                }
                var zoomScale = newZoom / this.zoom;
                this.zoom = newZoom;
                // Keep the mouse center when scaling
                pos[0] -= (zoomX - pos[0]) * (zoomScale - 1);
                pos[1] -= (zoomY - pos[1]) * (zoomScale - 1);
                scale[0] *= zoomScale;
                scale[1] *= zoomScale;

                target.dirty();
            }

            this.trigger('zoom', zoomDelta, zoomX, zoomY);
        }
    }

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    /**
     * @alias module:echarts/component/helper/RoamController
     * @constructor
     * @mixin {module:zrender/mixin/Eventful}
     *
     * @param {module:zrender/zrender~ZRender} zr
<<<<<<< HEAD
     */
    function RoamController(zr) {

        /**
         * @type {Function}
         */
        this.pointerChecker;

        /**
         * @type {module:zrender}
         */
        this._zr = zr;

        /**
         * @type {Object}
         */
        this._opt = {};
=======
     * @param {module:zrender/Element} target
     * @param {Function} rectProvider
     */
    function RoamController(zr, target, rectProvider) {

        /**
         * @type {module:zrender/Element}
         */
        this.target = target;

        /**
         * @type {Function}
         */
        this.rectProvider = rectProvider;

        /**
         * { min: 1, max: 2 }
         * @type {Object}
         */
        this.zoomLimit;

        /**
         * @type {number}
         */
        this.zoom;
        /**
         * @type {module:zrender}
         */
        this._zr = zr;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

        // Avoid two roamController bind the same handler
        var bind = zrUtil.bind;
        var mousedownHandler = bind(mousedown, this);
        var mousemoveHandler = bind(mousemove, this);
        var mouseupHandler = bind(mouseup, this);
        var mousewheelHandler = bind(mousewheel, this);
        var pinchHandler = bind(pinch, this);

        Eventful.call(this);

        /**
<<<<<<< HEAD
         * @param {Function} pointerChecker
         *                   input: x, y
         *                   output: boolean
         */
        this.setPointerChecker = function (pointerChecker) {
            this.pointerChecker = pointerChecker;
        };

        /**
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
         * Notice: only enable needed types. For example, if 'zoom'
         * is not needed, 'zoom' should not be enabled, otherwise
         * default mousewheel behaviour (scroll page) will be disabled.
         *
         * @param  {boolean|string} [controlType=true] Specify the control type,
         *                          which can be null/undefined or true/false
         *                          or 'pan/move' or 'zoom'/'scale'
<<<<<<< HEAD
         * @param {Object} [opt]
         * @param {Object} [opt.zoomOnMouseWheel=true]
         * @param {Object} [opt.moveOnMouseMove=true]
         * @param {Object} [opt.preventDefaultMouseMove=true] When pan.
         */
        this.enable = function (controlType, opt) {

            // Disable previous first
            this.disable();

            this._opt = zrUtil.defaults(zrUtil.clone(opt) || {}, {
                zoomOnMouseWheel: true,
                moveOnMouseMove: true,
                preventDefaultMouseMove: true
            });

=======
         */
        this.enable = function (controlType) {
            // Disable previous first
            this.disable();

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            if (controlType == null) {
                controlType = true;
            }

            if (controlType === true || (controlType === 'move' || controlType === 'pan')) {
                zr.on('mousedown', mousedownHandler);
                zr.on('mousemove', mousemoveHandler);
                zr.on('mouseup', mouseupHandler);
            }
            if (controlType === true || (controlType === 'scale' || controlType === 'zoom')) {
                zr.on('mousewheel', mousewheelHandler);
                zr.on('pinch', pinchHandler);
            }
        };

        this.disable = function () {
            zr.off('mousedown', mousedownHandler);
            zr.off('mousemove', mousemoveHandler);
            zr.off('mouseup', mouseupHandler);
            zr.off('mousewheel', mousewheelHandler);
            zr.off('pinch', pinchHandler);
        };

        this.dispose = this.disable;

        this.isDragging = function () {
            return this._dragging;
        };

        this.isPinching = function () {
            return this._pinching;
        };
    }

    zrUtil.mixin(RoamController, Eventful);

<<<<<<< HEAD

    function mousedown(e) {
        if (e.target && e.target.draggable) {
            return;
        }

        var x = e.offsetX;
        var y = e.offsetY;

        // Only check on mosedown, but not mousemove.
        // Mouse can be out of target when mouse moving.
        if (this.pointerChecker && this.pointerChecker(e, x, y)) {
            this._x = x;
            this._y = y;
            this._dragging = true;
        }
    }

    function mousemove(e) {
        if (!checkKeyBinding(this, 'moveOnMouseMove', e) || !this._dragging) {
            return;
        }

        if (e.gestureEvent === 'pinch') {
            return;
        }

        if (interactionMutex.isTaken(this._zr, 'globalPan')) {
            return;
        }

        var x = e.offsetX;
        var y = e.offsetY;

        var oldX = this._x;
        var oldY = this._y;

        var dx = x - oldX;
        var dy = y - oldY;

        this._x = x;
        this._y = y;

        this._opt.preventDefaultMouseMove && eventTool.stop(e.event);

        this.trigger('pan', dx, dy, oldX, oldY, x, y);
    }

    function mouseup(e) {
        this._dragging = false;
    }

    function mousewheel(e) {
        // wheelDelta maybe -0 in chrome mac.
        if (!checkKeyBinding(this, 'zoomOnMouseWheel', e) || e.wheelDelta === 0) {
            return;
        }

        // Convenience:
        // Mac and VM Windows on Mac: scroll up: zoom out.
        // Windows: scroll up: zoom in.
        var zoomDelta = e.wheelDelta > 0 ? 1.1 : 1 / 1.1;
        zoom.call(this, e, zoomDelta, e.offsetX, e.offsetY);
    }

    function pinch(e) {
        if (interactionMutex.isTaken(this._zr, 'globalPan')) {
            return;
        }
        var zoomDelta = e.pinchScale > 1 ? 1.1 : 1 / 1.1;
        zoom.call(this, e, zoomDelta, e.pinchX, e.pinchY);
    }

    function zoom(e, zoomDelta, zoomX, zoomY) {
        if (this.pointerChecker && this.pointerChecker(e, zoomX, zoomY)) {
            // When mouse is out of roamController rect,
            // default befavoius should not be be disabled, otherwise
            // page sliding is disabled, contrary to expectation.
            eventTool.stop(e.event);

            this.trigger('zoom', zoomDelta, zoomX, zoomY);
        }
    }

    function checkKeyBinding(roamController, prop, e) {
        var setting = roamController._opt[prop];
        return setting
            && (!zrUtil.isString(setting) || e.event[setting + 'Key']);
    }

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    return RoamController;
});