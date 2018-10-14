import { makeGetSet } from '../moment/get-set';
import { addFormatToken } from '../format/format';
import { addUnitAlias } from './aliases';
<<<<<<< HEAD
import { addUnitPriority } from './priorities';
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
import { addRegexToken, match1to2, match2 } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { SECOND } from './constants';

// FORMATTING

addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

addUnitAlias('second', 's');

<<<<<<< HEAD
// PRIORITY

addUnitPriority('second', 15);

=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);

// MOMENTS

export var getSetSecond = makeGetSet('Seconds', false);
