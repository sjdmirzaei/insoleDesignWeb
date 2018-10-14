import extend from '../utils/extend';
import { createUTC } from './utc';
import getParsingFlags from '../create/parsing-flags';
import some from '../utils/some';

export function isValid(m) {
    if (m._isValid == null) {
        var flags = getParsingFlags(m);
        var parsedParts = some.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
<<<<<<< HEAD
        var isNowValid = !isNaN(m._d.getTime()) &&
=======
        m._isValid = !isNaN(m._d.getTime()) &&
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));

        if (m._strict) {
<<<<<<< HEAD
            isNowValid = isNowValid &&
=======
            m._isValid = m._isValid &&
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }
<<<<<<< HEAD

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    }
    return m._isValid;
}

export function createInvalid (flags) {
    var m = createUTC(NaN);
    if (flags != null) {
        extend(getParsingFlags(m), flags);
    }
    else {
        getParsingFlags(m).userInvalidated = true;
    }

    return m;
}
