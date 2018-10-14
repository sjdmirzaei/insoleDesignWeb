import { makeGetSet } from '../moment/get-set';
import { addFormatToken } from '../format/format';
import { addUnitAlias } from './aliases';
<<<<<<< HEAD
import { addUnitPriority } from './priorities';
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
import { addRegexToken, match1to2, match2 } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { MINUTE } from './constants';

// FORMATTING

addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

addUnitAlias('minute', 'm');

<<<<<<< HEAD
// PRIORITY

addUnitPriority('minute', 14);

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

export var getSetMinute = makeGetSet('Minutes', false);
