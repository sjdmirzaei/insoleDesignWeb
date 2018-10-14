export function createDate (y, m, d, h, M, s, ms) {
<<<<<<< HEAD
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date = new Date(y, m, d, h, M, s, ms);

    // the date constructor remaps years 0-99 to 1900-1999
=======
    //can't just apply() to create a date:
    //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
    var date = new Date(y, m, d, h, M, s, ms);

    //the date constructor remaps years 0-99 to 1900-1999
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

export function createUTCDate (y) {
    var date = new Date(Date.UTC.apply(null, arguments));

<<<<<<< HEAD
    // the Date.UTC function remaps years 0-99 to 1900-1999
=======
    //the Date.UTC function remaps years 0-99 to 1900-1999
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}
