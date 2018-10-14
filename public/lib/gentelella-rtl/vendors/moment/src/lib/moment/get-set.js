<<<<<<< HEAD
import { normalizeUnits, normalizeObjectUnits } from '../units/aliases';
import { getPrioritizedUnits } from '../units/priorities';
import { hooks } from '../utils/hooks';
import isFunction from '../utils/is-function';


=======
import { normalizeUnits } from '../units/aliases';
import { hooks } from '../utils/hooks';
import isFunction from '../utils/is-function';

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
export function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

export function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

export function set (mom, unit, value) {
    if (mom.isValid()) {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
    }
}

// MOMENTS

<<<<<<< HEAD
export function stringGet (units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}


export function stringSet (units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
=======
export function getSet (units, value) {
    var unit;
    if (typeof units === 'object') {
        for (unit in units) {
            this.set(unit, units[unit]);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}
