define( [
<<<<<<< HEAD
	"../core",
	"../core/toType",
	"../var/isFunction"
], function( jQuery, toType, isFunction ) {
=======
	"../core"
], function( jQuery ) {
>>>>>>> a19e8138e71356fedaea15d0fd8425a142f87ede

"use strict";

// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
<<<<<<< HEAD
	if ( toType( key ) === "object" ) {
=======
	if ( jQuery.type( key ) === "object" ) {
>>>>>>> a19e8138e71356fedaea15d0fd8425a142f87ede
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

<<<<<<< HEAD
		if ( !isFunction( value ) ) {
=======
		if ( !jQuery.isFunction( value ) ) {
>>>>>>> a19e8138e71356fedaea15d0fd8425a142f87ede
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};

return access;

} );
