import { normalizeUnits } from '../units/aliases';

export function startOf (units) {
    units = normalizeUnits(units);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
<<<<<<< HEAD
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
=======
    case 'year':
        this.month(0);
        /* falls through */
    case 'quarter':
    case 'month':
        this.date(1);
        /* falls through */
    case 'week':
    case 'isoWeek':
    case 'day':
    case 'date':
        this.hours(0);
        /* falls through */
    case 'hour':
        this.minutes(0);
        /* falls through */
    case 'minute':
        this.seconds(0);
        /* falls through */
    case 'second':
        this.milliseconds(0);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    }

    // weeks are a special case
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }

    return this;
}

export function endOf (units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}
