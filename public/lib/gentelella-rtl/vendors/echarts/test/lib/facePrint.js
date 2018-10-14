// Just for temporarily mobile debug.

(function () {

    var infoDom;
    var msgs = [];

    var count = 0;

<<<<<<< HEAD
    /**
     * @param {string|Object|Array} msg
     */
    window.facePrint = function (msg) {
=======
    window.facePrint = function (msg, printObj) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        if (!infoDom) {
            infoDom = createInfoDom();
        }

<<<<<<< HEAD
        if (isObject(msg)) {
=======
        if (printObj && isObject(msg)) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            msg = window.facePrint.objToStr(msg);
        }

        msgs.push(encodeHTML(msg));
        count++;

        if (msgs.length > 30) {
            msgs.shift();
        }

        var str = '';
        // Make some change in view, otherwise user may
        // be not aware that log is still printing.
        for (var i = 0; i < msgs.length; i++) {
<<<<<<< HEAD
            str += '<span style="background:#555;margin: 0 3px;padding: 0 2px;color:yellow;">'
                + (count - msgs.length + i) + '</span>' + msgs[i];
=======
            str += msgs[i] + ' ' + (count - msgs.length + i) + ' ';
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        }
        infoDom.innerHTML = str;
    };

    window.facePrint.objToStr = function (obj) {
        var msgArr = [];
        for (var key in obj) {
            msgArr.push(key + '=' + obj[key]);
        }
        return msgArr.join(', ');
    };

    function createInfoDom() {
        var dom = document.createElement('div');

        dom.style.cssText = [
<<<<<<< HEAD
            'position: fixed',
            'top: 0',
            'width: 100%',
            'min-height: 14px',
            'line-height: 14px',
            'z-index: 2147483647',
            'color: #fff',
            'font-size: 9px',
            'background: #000',
            'word-break:break-all',
            'word-wrap:break-word'
        ].join(';') + ';';
=======
            'position: fixed;',
            'top: 0;',
            'width: 100%;',
            'border: 1px solid red;',
            'height: 20px;',
            'line-height: 20px;',
            'z-index: 2147483647'
        ].join('');
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

        document.body.appendChild(dom);

        return dom;
    }

    function encodeHTML(source) {
        return source == null
            ? ''
            : String(source)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
    }

    function isObject(value) {
        // Avoid a V8 JIT bug in Chrome 19-20.
        // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
        var type = typeof value;
        return type === 'function' || (!!value && type == 'object');
    }

})();