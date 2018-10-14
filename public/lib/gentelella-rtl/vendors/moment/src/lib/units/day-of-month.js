import { makeGetSet } from '../moment/get-set';
import { addFormatToken } from '../format/format';
import { addUnitAlias } from './aliases';
<<<<<<< HEAD
import { addUnitPriority } from './priorities';
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
import { addRegexToken, match1to2, match2 } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { DATE } from './constants';
import toInt from '../utils/to-int';

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

addUnitAlias('date', 'D');

<<<<<<< HEAD
// PRIOROITY
addUnitPriority('date', 9);

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
// PARSING

addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
<<<<<<< HEAD
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
=======
    return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0], 10);
});

// MOMENTS

export var getSetDayOfMonth = makeGetSet('Date', true);
