define( function() {
	"use strict";

	// Only count HTML whitespace
	// Other whitespace should count in values
<<<<<<< HEAD
	// https://infra.spec.whatwg.org/#ascii-whitespace
=======
	// https://html.spec.whatwg.org/multipage/infrastructure.html#space-character
>>>>>>> a19e8138e71356fedaea15d0fd8425a142f87ede
	return ( /[^\x20\t\r\n\f]+/g );
} );
