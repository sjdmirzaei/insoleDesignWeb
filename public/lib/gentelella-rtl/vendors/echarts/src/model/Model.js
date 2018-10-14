/**
 * @module echarts/model/Model
 */
define(function (require) {

    var zrUtil = require('zrender/core/util');
    var clazzUtil = require('../util/clazz');
<<<<<<< HEAD
    var env = require('zrender/core/env');
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

    /**
     * @alias module:echarts/model/Model
     * @constructor
     * @param {Object} option
     * @param {module:echarts/model/Model} [parentModel]
     * @param {module:echarts/model/Global} [ecModel]
<<<<<<< HEAD
     */
    function Model(option, parentModel, ecModel) {
=======
     * @param {Object} extraOpt
     */
    function Model(option, parentModel, ecModel, extraOpt) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        /**
         * @type {module:echarts/model/Model}
         * @readOnly
         */
        this.parentModel = parentModel;

        /**
         * @type {module:echarts/model/Global}
         * @readOnly
         */
        this.ecModel = ecModel;

        /**
         * @type {Object}
         * @protected
         */
        this.option = option;

        // Simple optimization
<<<<<<< HEAD
        // if (this.init) {
        //     if (arguments.length <= 4) {
        //         this.init(option, parentModel, ecModel, extraOpt);
        //     }
        //     else {
        //         this.init.apply(this, arguments);
        //     }
        // }
=======
        if (this.init) {
            if (arguments.length <= 4) {
                this.init(option, parentModel, ecModel, extraOpt);
            }
            else {
                this.init.apply(this, arguments);
            }
        }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    }

    Model.prototype = {

        constructor: Model,

        /**
         * Model 的初始化函数
         * @param {Object} option
         */
        init: null,

        /**
         * 从新的 Option merge
         */
        mergeOption: function (option) {
            zrUtil.merge(this.option, option, true);
        },

        /**
<<<<<<< HEAD
         * @param {string|Array.<string>} path
=======
         * @param {string} path
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
         * @param {boolean} [ignoreParent=false]
         * @return {*}
         */
        get: function (path, ignoreParent) {
<<<<<<< HEAD
            if (path == null) {
                return this.option;
            }

            return doGet(
                this.option,
                this.parsePath(path),
                !ignoreParent && getParent(this, path)
            );
=======
            if (!path) {
                return this.option;
            }

            if (typeof path === 'string') {
                path = path.split('.');
            }

            var obj = this.option;
            var parentModel = this.parentModel;
            for (var i = 0; i < path.length; i++) {
                // Ignore empty
                if (!path[i]) {
                    continue;
                }
                // obj could be number/string/... (like 0)
                obj = (obj && typeof obj === 'object') ? obj[path[i]] : null;
                if (obj == null) {
                    break;
                }
            }
            if (obj == null && parentModel && !ignoreParent) {
                obj = parentModel.get(path);
            }
            return obj;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * @param {string} key
         * @param {boolean} [ignoreParent=false]
         * @return {*}
         */
        getShallow: function (key, ignoreParent) {
            var option = this.option;
<<<<<<< HEAD

            var val = option == null ? option : option[key];
            var parentModel = !ignoreParent && getParent(this, key);
            if (val == null && parentModel) {
=======
            var val = option && option[key];
            var parentModel = this.parentModel;
            if (val == null && parentModel && !ignoreParent) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                val = parentModel.getShallow(key);
            }
            return val;
        },

        /**
<<<<<<< HEAD
         * @param {string|Array.<string>} [path]
=======
         * @param {string} path
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
         * @param {module:echarts/model/Model} [parentModel]
         * @return {module:echarts/model/Model}
         */
        getModel: function (path, parentModel) {
<<<<<<< HEAD
            var obj = path == null
                ? this.option
                : doGet(this.option, path = this.parsePath(path));

            var thisParentModel;
            parentModel = parentModel || (
                (thisParentModel = getParent(this, path))
                    && thisParentModel.getModel(path)
            );

            return new Model(obj, parentModel, this.ecModel);
=======
            var obj = this.get(path, true);
            var thisParentModel = this.parentModel;
            var model = new Model(
                obj, parentModel || (thisParentModel && thisParentModel.getModel(path)),
                this.ecModel
            );
            return model;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },

        /**
         * If model has option
         */
        isEmpty: function () {
            return this.option == null;
        },

        restoreData: function () {},

        // Pending
        clone: function () {
            var Ctor = this.constructor;
            return new Ctor(zrUtil.clone(this.option));
        },

        setReadOnly: function (properties) {
            clazzUtil.setReadOnly(this, properties);
<<<<<<< HEAD
        },

        // If path is null/undefined, return null/undefined.
        parsePath: function(path) {
            if (typeof path === 'string') {
                path = path.split('.');
            }
            return path;
        },

        /**
         * @param {Function} getParentMethod
         *        param {Array.<string>|string} path
         *        return {module:echarts/model/Model}
         */
        customizeGetParent: function (getParentMethod) {
            clazzUtil.set(this, 'getParent', getParentMethod);
        },

        isAnimationEnabled: function () {
            if (!env.node) {
                if (this.option.animation != null) {
                    return !!this.option.animation;
                }
                else if (this.parentModel) {
                    return this.parentModel.isAnimationEnabled();
                }
            }
        }
    };

    function doGet(obj, pathArr, parentModel) {
        for (var i = 0; i < pathArr.length; i++) {
            // Ignore empty
            if (!pathArr[i]) {
                continue;
            }
            // obj could be number/string/... (like 0)
            obj = (obj && typeof obj === 'object') ? obj[pathArr[i]] : null;
            if (obj == null) {
                break;
            }
        }
        if (obj == null && parentModel) {
            obj = parentModel.get(pathArr);
        }
        return obj;
    }

    // `path` can be null/undefined
    function getParent(model, path) {
        var getParentMethod = clazzUtil.get(model, 'getParent');
        return getParentMethod ? getParentMethod.call(model, path) : model.parentModel;
    }

=======
        }
    };

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    // Enable Model.extend.
    clazzUtil.enableClassExtend(Model);

    var mixin = zrUtil.mixin;
    mixin(Model, require('./mixin/lineStyle'));
    mixin(Model, require('./mixin/areaStyle'));
    mixin(Model, require('./mixin/textStyle'));
    mixin(Model, require('./mixin/itemStyle'));

    return Model;
});