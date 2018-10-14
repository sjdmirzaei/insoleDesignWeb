import { addFormatToken } from '../format/format';
import { addUnitAlias } from './aliases';
<<<<<<< HEAD
import { addUnitPriority } from './priorities';
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
import { addRegexToken, match1 } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { MONTH } from './constants';
import toInt from '../utils/to-int';

// FORMATTING

addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

addUnitAlias('quarter', 'Q');

<<<<<<< HEAD
// PRIORITY

addUnitPriority('quarter', 7);

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});

// MOMENTS

export function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}
