define( [
	"./core",
<<<<<<< HEAD
	"./var/isFunction",
	"./core/init",
	"./manipulation", // clone
	"./traversing" // parent, contents
], function( jQuery, isFunction ) {
=======
	"./core/init",
	"./manipulation", // clone
	"./traversing" // parent, contents
], function( jQuery ) {
>>>>>>> a19e8138e71356fedaea15d0fd8425a142f87ede

"use strict";

jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
<<<<<<< HEAD
			if ( isFunction( html ) ) {
=======
			if ( jQuery.isFunction( html ) ) {
>>>>>>> a19e8138e71356fedaea15d0fd8425a142f87ede
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
<<<<<<< HEAD
		if ( isFunction( html ) ) {
=======
		if ( jQuery.isFunction( html ) ) {
>>>>>>> a19e8138e71356fedaea15d0fd8425a142f87ede
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
<<<<<<< HEAD
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
=======
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
>>>>>>> a19e8138e71356fedaea15d0fd8425a142f87ede
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );

return jQuery;
} );
