define( [
	"../var/rnothtmlwhite"
], function( rnothtmlwhite ) {
	"use strict";

	// Strip and collapse whitespace according to HTML spec
<<<<<<< HEAD
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
=======
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
>>>>>>> a19e8138e71356fedaea15d0fd8425a142f87ede
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}

	return stripAndCollapse;
} );
