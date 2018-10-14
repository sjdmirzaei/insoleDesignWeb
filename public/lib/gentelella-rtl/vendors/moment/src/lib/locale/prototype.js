import { Locale } from './constructor';

var proto = Locale.prototype;

<<<<<<< HEAD
import { calendar } from './calendar';
import { longDateFormat } from './formats';
import { invalidDate } from './invalid';
import { ordinal } from './ordinal';
import { preParsePostFormat } from './pre-post-format';
import { relativeTime, pastFuture } from './relative';
import { set } from './set';

proto.calendar        = calendar;
proto.longDateFormat  = longDateFormat;
proto.invalidDate     = invalidDate;
proto.ordinal         = ordinal;
proto.preparse        = preParsePostFormat;
proto.postformat      = preParsePostFormat;
=======
import { defaultCalendar, calendar } from './calendar';
import { defaultLongDateFormat, longDateFormat } from './formats';
import { defaultInvalidDate, invalidDate } from './invalid';
import { defaultOrdinal, ordinal, defaultOrdinalParse } from './ordinal';
import { preParsePostFormat } from './pre-post-format';
import { defaultRelativeTime, relativeTime, pastFuture } from './relative';
import { set } from './set';

proto._calendar       = defaultCalendar;
proto.calendar        = calendar;
proto._longDateFormat = defaultLongDateFormat;
proto.longDateFormat  = longDateFormat;
proto._invalidDate    = defaultInvalidDate;
proto.invalidDate     = invalidDate;
proto._ordinal        = defaultOrdinal;
proto.ordinal         = ordinal;
proto._ordinalParse   = defaultOrdinalParse;
proto.preparse        = preParsePostFormat;
proto.postformat      = preParsePostFormat;
proto._relativeTime   = defaultRelativeTime;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
proto.relativeTime    = relativeTime;
proto.pastFuture      = pastFuture;
proto.set             = set;

// Month
import {
    localeMonthsParse,
<<<<<<< HEAD
    localeMonths,
    localeMonthsShort,
    monthsRegex,
    monthsShortRegex
} from '../units/month';

proto.months            =        localeMonths;
proto.monthsShort       =        localeMonthsShort;
proto.monthsParse       =        localeMonthsParse;
proto.monthsRegex       = monthsRegex;
proto.monthsShortRegex  = monthsShortRegex;

// Week
import { localeWeek, localeFirstDayOfYear, localeFirstDayOfWeek } from '../units/week';
proto.week = localeWeek;
=======
    defaultLocaleMonths,      localeMonths,
    defaultLocaleMonthsShort, localeMonthsShort,
    defaultMonthsRegex,       monthsRegex,
    defaultMonthsShortRegex,  monthsShortRegex
} from '../units/month';

proto.months            =        localeMonths;
proto._months           = defaultLocaleMonths;
proto.monthsShort       =        localeMonthsShort;
proto._monthsShort      = defaultLocaleMonthsShort;
proto.monthsParse       =        localeMonthsParse;
proto._monthsRegex      = defaultMonthsRegex;
proto.monthsRegex       = monthsRegex;
proto._monthsShortRegex = defaultMonthsShortRegex;
proto.monthsShortRegex  = monthsShortRegex;

// Week
import { localeWeek, defaultLocaleWeek, localeFirstDayOfYear, localeFirstDayOfWeek } from '../units/week';
proto.week = localeWeek;
proto._week = defaultLocaleWeek;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
proto.firstDayOfYear = localeFirstDayOfYear;
proto.firstDayOfWeek = localeFirstDayOfWeek;

// Day of Week
import {
    localeWeekdaysParse,
<<<<<<< HEAD
    localeWeekdays,
    localeWeekdaysMin,
    localeWeekdaysShort,

    weekdaysRegex,
    weekdaysShortRegex,
    weekdaysMinRegex
} from '../units/day-of-week';

proto.weekdays       =        localeWeekdays;
proto.weekdaysMin    =        localeWeekdaysMin;
proto.weekdaysShort  =        localeWeekdaysShort;
proto.weekdaysParse  =        localeWeekdaysParse;

proto.weekdaysRegex       =        weekdaysRegex;
proto.weekdaysShortRegex  =        weekdaysShortRegex;
proto.weekdaysMinRegex    =        weekdaysMinRegex;

// Hours
import { localeIsPM, localeMeridiem } from '../units/hour';

proto.isPM = localeIsPM;
=======
    defaultLocaleWeekdays,      localeWeekdays,
    defaultLocaleWeekdaysMin,   localeWeekdaysMin,
    defaultLocaleWeekdaysShort, localeWeekdaysShort,

    defaultWeekdaysRegex, weekdaysRegex,
    defaultWeekdaysShortRegex, weekdaysShortRegex,
    defaultWeekdaysMinRegex, weekdaysMinRegex
} from '../units/day-of-week';

proto.weekdays       =        localeWeekdays;
proto._weekdays      = defaultLocaleWeekdays;
proto.weekdaysMin    =        localeWeekdaysMin;
proto._weekdaysMin   = defaultLocaleWeekdaysMin;
proto.weekdaysShort  =        localeWeekdaysShort;
proto._weekdaysShort = defaultLocaleWeekdaysShort;
proto.weekdaysParse  =        localeWeekdaysParse;

proto._weekdaysRegex      = defaultWeekdaysRegex;
proto.weekdaysRegex       =        weekdaysRegex;
proto._weekdaysShortRegex = defaultWeekdaysShortRegex;
proto.weekdaysShortRegex  =        weekdaysShortRegex;
proto._weekdaysMinRegex   = defaultWeekdaysMinRegex;
proto.weekdaysMinRegex    =        weekdaysMinRegex;

// Hours
import { localeIsPM, defaultLocaleMeridiemParse, localeMeridiem } from '../units/hour';

proto.isPM = localeIsPM;
proto._meridiemParse = defaultLocaleMeridiemParse;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
proto.meridiem = localeMeridiem;
