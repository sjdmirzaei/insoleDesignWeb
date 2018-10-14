define( [
	"../var/document"
], function( document ) {
	"use strict";

<<<<<<< HEAD
	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
=======
	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
>>>>>>> a19e8138e71356fedaea15d0fd8425a142f87ede
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}

	return DOMEval;
} );
