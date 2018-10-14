/**
 * Data selectable mixin for chart series.
 * To eanble data select, option of series must have `selectedMode`.
 * And each data item will use `selected` to toggle itself selected status
 *
 * @module echarts/chart/helper/DataSelectable
 */
define(function (require) {

    var zrUtil = require('zrender/core/util');

    return {

        updateSelectedMap: function (targetList) {
            this._selectTargetMap = zrUtil.reduce(targetList || [], function (targetMap, target) {
<<<<<<< HEAD
                targetMap.set(target.name, target);
                return targetMap;
            }, zrUtil.createHashMap());
=======
                targetMap[target.name] = target;
                return targetMap;
            }, {});
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        },
        /**
         * @param {string} name
         */
        // PENGING If selectedMode is null ?
        select: function (name) {
            var targetMap = this._selectTargetMap;
<<<<<<< HEAD
            var target = targetMap.get(name);
            var selectedMode = this.get('selectedMode');
            if (selectedMode === 'single') {
                targetMap.each(function (target) {
=======
            var target = targetMap[name];
            var selectedMode = this.get('selectedMode');
            if (selectedMode === 'single') {
                zrUtil.each(targetMap, function (target) {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    target.selected = false;
                });
            }
            target && (target.selected = true);
        },

        /**
         * @param {string} name
         */
        unSelect: function (name) {
<<<<<<< HEAD
            var target = this._selectTargetMap.get(name);
=======
            var target = this._selectTargetMap[name];
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            // var selectedMode = this.get('selectedMode');
            // selectedMode !== 'single' && target && (target.selected = false);
            target && (target.selected = false);
        },

        /**
         * @param {string} name
         */
        toggleSelected: function (name) {
<<<<<<< HEAD
            var target = this._selectTargetMap.get(name);
=======
            var target = this._selectTargetMap[name];
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            if (target != null) {
                this[target.selected ? 'unSelect' : 'select'](name);
                return target.selected;
            }
        },

        /**
         * @param {string} name
         */
        isSelected: function (name) {
<<<<<<< HEAD
            var target = this._selectTargetMap.get(name);
=======
            var target = this._selectTargetMap[name];
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            return target && target.selected;
        }
    };
});