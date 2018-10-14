/**
 * @module echarts/component/tooltip/TooltipContent
 */
define(function (require) {

    var zrUtil = require('zrender/core/util');
    var zrColor = require('zrender/tool/color');
    var eventUtil = require('zrender/core/event');
    var formatUtil = require('../../util/format');
    var each = zrUtil.each;
    var toCamelCase = formatUtil.toCamelCase;
    var env = require('zrender/core/env');

    var vendors = ['', '-webkit-', '-moz-', '-o-'];

    var gCssText = 'position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;';

    /**
     * @param {number} duration
     * @return {string}
     * @inner
     */
    function assembleTransition(duration) {
        var transitionCurve = 'cubic-bezier(0.23, 1, 0.32, 1)';
        var transitionText = 'left ' + duration + 's ' + transitionCurve + ','
                            + 'top ' + duration + 's ' + transitionCurve;
        return zrUtil.map(vendors, function (vendorPrefix) {
            return vendorPrefix + 'transition:' + transitionText;
        }).join(';');
    }

    /**
     * @param {Object} textStyle
     * @return {string}
     * @inner
     */
    function assembleFont(textStyleModel) {
        var cssText = [];

        var fontSize = textStyleModel.get('fontSize');
        var color = textStyleModel.getTextColor();

        color && cssText.push('color:' + color);

        cssText.push('font:' + textStyleModel.getFont());

        fontSize &&
            cssText.push('line-height:' + Math.round(fontSize * 3 / 2) + 'px');

        each(['decoration', 'align'], function (name) {
            var val = textStyleModel.get(name);
            val && cssText.push('text-' + name + ':' + val);
        });

        return cssText.join(';');
    }

    /**
     * @param {Object} tooltipModel
     * @return {string}
     * @inner
     */
    function assembleCssText(tooltipModel) {

<<<<<<< HEAD
=======
        tooltipModel = tooltipModel;

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        var cssText = [];

        var transitionDuration = tooltipModel.get('transitionDuration');
        var backgroundColor = tooltipModel.get('backgroundColor');
        var textStyleModel = tooltipModel.getModel('textStyle');
        var padding = tooltipModel.get('padding');

<<<<<<< HEAD
        // Animation transition. Do not animate when transitionDuration is 0.
=======
        // Animation transition
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        transitionDuration &&
            cssText.push(assembleTransition(transitionDuration));

        if (backgroundColor) {
            if (env.canvasSupported) {
                cssText.push('background-Color:' + backgroundColor);
            }
            else {
                // for ie
                cssText.push(
                    'background-Color:#' + zrColor.toHex(backgroundColor)
                );
                cssText.push('filter:alpha(opacity=70)');
            }
        }

        // Border style
        each(['width', 'color', 'radius'], function (name) {
            var borderName = 'border-' + name;
            var camelCase = toCamelCase(borderName);
            var val = tooltipModel.get(camelCase);
            val != null &&
                cssText.push(borderName + ':' + val + (name === 'color' ? '' : 'px'));
        });

        // Text style
        cssText.push(assembleFont(textStyleModel));

        // Padding
        if (padding != null) {
            cssText.push('padding:' + formatUtil.normalizeCssArray(padding).join('px ') + 'px');
        }

        return cssText.join(';') + ';';
    }

    /**
     * @alias module:echarts/component/tooltip/TooltipContent
     * @constructor
     */
    function TooltipContent(container, api) {
        var el = document.createElement('div');
<<<<<<< HEAD
        var zr = this._zr = api.getZr();
=======
        var zr = api.getZr();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

        this.el = el;

        this._x = api.getWidth() / 2;
        this._y = api.getHeight() / 2;

        container.appendChild(el);

        this._container = container;

        this._show = false;

        /**
         * @private
         */
        this._hideTimeout;

        var self = this;
        el.onmouseenter = function () {
            // clear the timeout in hideLater and keep showing tooltip
<<<<<<< HEAD
            if (self._enterable) {
=======
            if (self.enterable) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                clearTimeout(self._hideTimeout);
                self._show = true;
            }
            self._inContent = true;
        };
        el.onmousemove = function (e) {
<<<<<<< HEAD
            e = e || window.event;
            if (!self._enterable) {
                // Try trigger zrender event to avoid mouse
                // in and out shape too frequently
                var handler = zr.handler;
                eventUtil.normalizeEvent(container, e, true);
=======
            if (!self.enterable) {
                // Try trigger zrender event to avoid mouse
                // in and out shape too frequently
                var handler = zr.handler;
                eventUtil.normalizeEvent(container, e);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                handler.dispatch('mousemove', e);
            }
        };
        el.onmouseleave = function () {
<<<<<<< HEAD
            if (self._enterable) {
=======
            if (self.enterable) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                if (self._show) {
                    self.hideLater(self._hideDelay);
                }
            }
            self._inContent = false;
        };
<<<<<<< HEAD
=======

        compromiseMobile(el, container);
    }

    function compromiseMobile(tooltipContentEl, container) {
        // Prevent default behavior on mobile. For example,
        // default pinch gesture will cause browser zoom.
        // We do not preventing event on tooltip contnet el,
        // because user may need customization in tooltip el.
        eventUtil.addEventListener(container, 'touchstart', preventDefault);
        eventUtil.addEventListener(container, 'touchmove', preventDefault);
        eventUtil.addEventListener(container, 'touchend', preventDefault);

        function preventDefault(e) {
            if (contains(e.target)) {
                e.preventDefault();
            }
        }

        function contains(targetEl) {
            while (targetEl && targetEl !== container) {
                if (targetEl === tooltipContentEl) {
                    return true;
                }
                targetEl = targetEl.parentNode;
            }
        }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    }

    TooltipContent.prototype = {

        constructor: TooltipContent,

<<<<<<< HEAD
        /**
         * @private
         * @type {boolean}
         */
        _enterable: true,
=======
        enterable: true,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

        /**
         * Update when tooltip is rendered
         */
        update: function () {
<<<<<<< HEAD
            // FIXME
            // Move this logic to ec main?
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            var container = this._container;
            var stl = container.currentStyle
                || document.defaultView.getComputedStyle(container);
            var domStyle = container.style;
            if (domStyle.position !== 'absolute' && stl.position !== 'absolute') {
                domStyle.position = 'relative';
            }
            // Hide the tooltip
            // PENDING
            // this.hide();
        },

        show: function (tooltipModel) {
            clearTimeout(this._hideTimeout);
<<<<<<< HEAD
            var el = this.el;

            el.style.cssText = gCssText + assembleCssText(tooltipModel)
=======

            this.el.style.cssText = gCssText + assembleCssText(tooltipModel)
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                // http://stackoverflow.com/questions/21125587/css3-transition-not-working-in-chrome-anymore
                + ';left:' + this._x + 'px;top:' + this._y + 'px;'
                + (tooltipModel.get('extraCssText') || '');

<<<<<<< HEAD
            el.style.display = el.innerHTML ?  'block' : 'none';

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            this._show = true;
        },

        setContent: function (content) {
<<<<<<< HEAD
            this.el.innerHTML = content == null ? '' : content;
        },

        setEnterable: function (enterable) {
            this._enterable = enterable;
        },

        getSize: function () {
            var el = this.el;
            return [el.clientWidth, el.clientHeight];
        },

        moveTo: function (x, y) {
            // xy should be based on canvas root. But tooltipContent is
            // the sibling of canvas root. So padding of ec container
            // should be considered here.
            var zr = this._zr;
            var viewportRoot;
            if (zr && zr.painter && (viewportRoot = zr.painter.getViewportRoot())) {
                x += viewportRoot.offsetLeft || 0;
                y += viewportRoot.offsetTop || 0;
            }

=======
            var el = this.el;
            el.innerHTML = content;
            el.style.display = content ? 'block' : 'none';
        },

        moveTo: function (x, y) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            var style = this.el.style;
            style.left = x + 'px';
            style.top = y + 'px';

            this._x = x;
            this._y = y;
        },

        hide: function () {
            this.el.style.display = 'none';
            this._show = false;
        },

<<<<<<< HEAD
        hideLater: function (time) {
            if (this._show && !(this._inContent && this._enterable)) {
=======
        // showLater: function ()

        hideLater: function (time) {
            if (this._show && !(this._inContent && this.enterable)) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                if (time) {
                    this._hideDelay = time;
                    // Set show false to avoid invoke hideLater mutiple times
                    this._show = false;
                    this._hideTimeout = setTimeout(zrUtil.bind(this.hide, this), time);
                }
                else {
                    this.hide();
                }
            }
        },

        isShow: function () {
            return this._show;
        }
    };

    return TooltipContent;
});