import { normalizeUnits } from '../units/aliases';
import absFloor from '../utils/abs-floor';

export function get (units) {
    units = normalizeUnits(units);
<<<<<<< HEAD
    return this.isValid() ? this[units + 's']() : NaN;
=======
    return this[units + 's']();
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
}

function makeGetter(name) {
    return function () {
<<<<<<< HEAD
        return this.isValid() ? this._data[name] : NaN;
=======
        return this._data[name];
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    };
}

export var milliseconds = makeGetter('milliseconds');
export var seconds      = makeGetter('seconds');
export var minutes      = makeGetter('minutes');
export var hours        = makeGetter('hours');
export var days         = makeGetter('days');
export var months       = makeGetter('months');
export var years        = makeGetter('years');

export function weeks () {
    return absFloor(this.days() / 7);
}
