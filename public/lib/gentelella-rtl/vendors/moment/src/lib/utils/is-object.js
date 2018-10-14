export default function isObject(input) {
<<<<<<< HEAD
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
=======
    return Object.prototype.toString.call(input) === '[object Object]';
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
}
