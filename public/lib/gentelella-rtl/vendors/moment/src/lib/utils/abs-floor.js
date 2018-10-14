export default function absFloor (number) {
    if (number < 0) {
<<<<<<< HEAD
        // -0 -> 0
        return Math.ceil(number) || 0;
=======
        return Math.ceil(number);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    } else {
        return Math.floor(number);
    }
}
