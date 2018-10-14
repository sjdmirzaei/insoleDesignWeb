//! moment.js
<<<<<<< HEAD
//! version : 2.18.1
=======
//! version : 2.13.0
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

import { hooks as moment, setHookCallback } from './lib/utils/hooks';

<<<<<<< HEAD
moment.version = '2.18.1';
=======
moment.version = '2.13.0';
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

import {
    min,
    max,
    now,
    isMoment,
    momentPrototype as fn,
    createUTC       as utc,
    createUnix      as unix,
    createLocal     as local,
    createInvalid   as invalid,
    createInZone    as parseZone
} from './lib/moment/moment';

import {
<<<<<<< HEAD
    getCalendarFormat
} from './lib/moment/calendar';

import {
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    defineLocale,
    updateLocale,
    getSetGlobalLocale as locale,
    getLocale          as localeData,
    listLocales        as locales,
    listMonths         as months,
    listMonthsShort    as monthsShort,
    listWeekdays       as weekdays,
    listWeekdaysMin    as weekdaysMin,
    listWeekdaysShort  as weekdaysShort
} from './lib/locale/locale';

import {
    isDuration,
    createDuration as duration,
<<<<<<< HEAD
    getSetRelativeTimeRounding as relativeTimeRounding,
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    getSetRelativeTimeThreshold as relativeTimeThreshold
} from './lib/duration/duration';

import { normalizeUnits } from './lib/units/units';

import isDate from './lib/utils/is-date';

setHookCallback(local);

moment.fn                    = fn;
moment.min                   = min;
moment.max                   = max;
moment.now                   = now;
moment.utc                   = utc;
moment.unix                  = unix;
moment.months                = months;
moment.isDate                = isDate;
moment.locale                = locale;
moment.invalid               = invalid;
moment.duration              = duration;
moment.isMoment              = isMoment;
moment.weekdays              = weekdays;
moment.parseZone             = parseZone;
moment.localeData            = localeData;
moment.isDuration            = isDuration;
moment.monthsShort           = monthsShort;
moment.weekdaysMin           = weekdaysMin;
moment.defineLocale          = defineLocale;
moment.updateLocale          = updateLocale;
moment.locales               = locales;
moment.weekdaysShort         = weekdaysShort;
moment.normalizeUnits        = normalizeUnits;
<<<<<<< HEAD
moment.relativeTimeRounding = relativeTimeRounding;
moment.relativeTimeThreshold = relativeTimeThreshold;
moment.calendarFormat        = getCalendarFormat;
=======
moment.relativeTimeThreshold = relativeTimeThreshold;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
moment.prototype             = fn;

export default moment;
