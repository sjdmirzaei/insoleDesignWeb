export var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};

import isFunction from '../utils/is-function';

export function calendar (key, mom, now) {
<<<<<<< HEAD
    var output = this._calendar[key] || this._calendar['sameElse'];
=======
    var output = this._calendar[key];
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    return isFunction(output) ? output.call(mom, now) : output;
}
