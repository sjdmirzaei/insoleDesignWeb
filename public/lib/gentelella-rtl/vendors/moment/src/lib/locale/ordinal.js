export var defaultOrdinal = '%d';
<<<<<<< HEAD
export var defaultDayOfMonthOrdinalParse = /\d{1,2}/;
=======
export var defaultOrdinalParse = /\d{1,2}/;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

export function ordinal (number) {
    return this._ordinal.replace('%d', number);
}

