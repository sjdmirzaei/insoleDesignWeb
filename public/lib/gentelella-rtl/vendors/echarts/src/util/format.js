define(function (require) {

    var zrUtil = require('zrender/core/util');
    var numberUtil = require('./number');
<<<<<<< HEAD
    var textContain = require('zrender/contain/text');

    var formatUtil = {};

    /**
     * 每三位默认加,格式化
     * @param {string|number} x
     * @return {string}
     */
    formatUtil.addCommas = function (x) {
=======

    /**
     * 每三位默认加,格式化
     * @type {string|number} x
     */
    function addCommas(x) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        if (isNaN(x)) {
            return '-';
        }
        x = (x + '').split('.');
        return x[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,'$1,')
               + (x.length > 1 ? ('.' + x[1]) : '');
<<<<<<< HEAD
    };

    /**
     * @param {string} str
     * @param {boolean} [upperCaseFirst=false]
     * @return {string} str
     */
    formatUtil.toCamelCase = function (str, upperCaseFirst) {
        str = (str || '').toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });

        if (upperCaseFirst && str) {
            str = str.charAt(0).toUpperCase() + str.slice(1);
        }

        return str;
    };
=======
    }

    /**
     * @param {string} str
     * @return {string} str
     */
    function toCamelCase(str) {
        return str.toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    /**
     * Normalize css liked array configuration
     * e.g.
     *  3 => [3, 3, 3, 3]
     *  [4, 2] => [4, 2, 4, 2]
     *  [4, 3, 2] => [4, 3, 2, 3]
     * @param {number|Array.<number>} val
     */
<<<<<<< HEAD
    formatUtil.normalizeCssArray = function (val) {
=======
    function normalizeCssArray(val) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        var len = val.length;
        if (typeof (val) === 'number') {
            return [val, val, val, val];
        }
        else if (len === 2) {
            // vertical | horizontal
            return [val[0], val[1], val[0], val[1]];
        }
        else if (len === 3) {
            // top | horizontal | bottom
            return [val[0], val[1], val[2], val[1]];
        }
        return val;
<<<<<<< HEAD
    };

    var encodeHTML = formatUtil.encodeHTML = function (source) {
=======
    }

    function encodeHTML(source) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        return String(source)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
<<<<<<< HEAD
    };

    var TPL_VAR_ALIAS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

    var wrapVar = function (varName, seriesIdx) {
        return '{' + varName + (seriesIdx == null ? '' : seriesIdx) + '}';
    };

    /**
     * Template formatter
     * @param {string} tpl
     * @param {Array.<Object>|Object} paramsList
     * @param {boolean} [encode=false]
     * @return {string}
     */
    formatUtil.formatTpl = function (tpl, paramsList, encode) {
=======
    }

    var TPL_VAR_ALIAS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

    function wrapVar(varName, seriesIdx) {
        return '{' + varName + (seriesIdx == null ? '' : seriesIdx) + '}';
    }
    /**
     * Template formatter
     * @param  {string} tpl
     * @param  {Array.<Object>|Object} paramsList
     * @return {string}
     */
    function formatTpl(tpl, paramsList) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        if (!zrUtil.isArray(paramsList)) {
            paramsList = [paramsList];
        }
        var seriesLen = paramsList.length;
        if (!seriesLen) {
            return '';
        }

<<<<<<< HEAD
        var $vars = paramsList[0].$vars || [];
        for (var i = 0; i < $vars.length; i++) {
            var alias = TPL_VAR_ALIAS[i];
            var val = wrapVar(alias, 0);
            tpl = tpl.replace(wrapVar(alias), encode ? encodeHTML(val) : val);
        }
        for (var seriesIdx = 0; seriesIdx < seriesLen; seriesIdx++) {
            for (var k = 0; k < $vars.length; k++) {
                var val = paramsList[seriesIdx][$vars[k]];
                tpl = tpl.replace(
                    wrapVar(TPL_VAR_ALIAS[k], seriesIdx),
                    encode ? encodeHTML(val) : val
=======
        var $vars = paramsList[0].$vars;
        for (var i = 0; i < $vars.length; i++) {
            var alias = TPL_VAR_ALIAS[i];
            tpl = tpl.replace(wrapVar(alias),  wrapVar(alias, 0));
        }
        for (var seriesIdx = 0; seriesIdx < seriesLen; seriesIdx++) {
            for (var k = 0; k < $vars.length; k++) {
                tpl = tpl.replace(
                    wrapVar(TPL_VAR_ALIAS[k], seriesIdx),
                    paramsList[seriesIdx][$vars[k]]
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                );
            }
        }

        return tpl;
<<<<<<< HEAD
    };

    /**
     * simple Template formatter
     *
     * @param {string} tpl
     * @param {Object} param
     * @param {boolean} [encode=false]
     * @return {string}
     */
    formatUtil.formatTplSimple = function (tpl, param, encode) {
        zrUtil.each(param, function (value, key) {
            tpl = tpl.replace(
                '{' + key + '}',
                encode ? encodeHTML(value) : value
            );
        });
        return tpl;
    };

    /**
     * @param {string} color
     * @param {string} [extraCssText]
     * @return {string}
     */
    formatUtil.getTooltipMarker = function (color, extraCssText) {
        return color
            ? '<span style="display:inline-block;margin-right:5px;'
                + 'border-radius:10px;width:9px;height:9px;background-color:'
                + formatUtil.encodeHTML(color) + ';' + (extraCssText || '') + '"></span>'
            : '';
    };

    /**
     * @param {string} str
     * @return {string}
     * @inner
     */
    var s2d = function (str) {
        return str < 10 ? ('0' + str) : str;
    };
=======
    }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    /**
     * ISO Date format
     * @param {string} tpl
     * @param {number} value
<<<<<<< HEAD
     * @param {boolean} [isUTC=false] Default in local time.
     *           see `module:echarts/scale/Time`
     *           and `module:echarts/util/number#parseDate`.
     * @inner
     */
    formatUtil.formatTime = function (tpl, value, isUTC) {
=======
     * @inner
     */
    function formatTime(tpl, value) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        if (tpl === 'week'
            || tpl === 'month'
            || tpl === 'quarter'
            || tpl === 'half-year'
            || tpl === 'year'
        ) {
            tpl = 'MM-dd\nyyyy';
        }

        var date = numberUtil.parseDate(value);
<<<<<<< HEAD
        var utc = isUTC ? 'UTC' : '';
        var y = date['get' + utc + 'FullYear']();
        var M = date['get' + utc + 'Month']() + 1;
        var d = date['get' + utc + 'Date']();
        var h = date['get' + utc + 'Hours']();
        var m = date['get' + utc + 'Minutes']();
        var s = date['get' + utc + 'Seconds']();
=======
        var y = date.getFullYear();
        var M = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

        tpl = tpl.replace('MM', s2d(M))
            .toLowerCase()
            .replace('yyyy', y)
            .replace('yy', y % 100)
            .replace('dd', s2d(d))
            .replace('d', d)
            .replace('hh', s2d(h))
            .replace('h', h)
            .replace('mm', s2d(m))
            .replace('m', m)
            .replace('ss', s2d(s))
            .replace('s', s);

        return tpl;
<<<<<<< HEAD
    };

    /**
     * Capital first
     * @param {string} str
     * @return {string}
     */
    formatUtil.capitalFirst = function (str) {
        return str ? str.charAt(0).toUpperCase() + str.substr(1) : str;
    };

    formatUtil.truncateText = textContain.truncateText;

    return formatUtil;
});
=======
    }

    /**
     * @param {string} str
     * @return {string}
     * @inner
     */
    function s2d(str) {
        return str < 10 ? ('0' + str) : str;
    }

    return {

        normalizeCssArray: normalizeCssArray,

        addCommas: addCommas,

        toCamelCase: toCamelCase,

        encodeHTML: encodeHTML,

        formatTpl: formatTpl,

        formatTime: formatTime
    };
});
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
