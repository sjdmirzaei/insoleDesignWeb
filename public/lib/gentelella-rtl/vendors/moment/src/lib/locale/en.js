import './prototype';
import { getSetGlobalLocale } from './locales';
import toInt from '../utils/to-int';

getSetGlobalLocale('en', {
<<<<<<< HEAD
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
=======
    ordinalParse: /\d{1,2}(th|st|nd|rd)/,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    ordinal : function (number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});
