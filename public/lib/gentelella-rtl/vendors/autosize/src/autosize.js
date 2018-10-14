<<<<<<< HEAD
const map = (typeof Map === "function") ? new Map() : (function () {
	const keys = [];
	const values = [];

	return {
		has(key) {
			return keys.indexOf(key) > -1;
		},
		get(key) {
			return values[keys.indexOf(key)];
		},
		set(key, value) {
			if (keys.indexOf(key) === -1) {
				keys.push(key);
				values.push(value);
			}
		},
		delete(key) {
			const index = keys.indexOf(key);
			if (index > -1) {
				keys.splice(index, 1);
				values.splice(index, 1);
			}
=======
const set = (typeof Set === "function") ? new Set() : (function () {
	const list = [];

	return {
		has(key) {
			return Boolean(list.indexOf(key) > -1);
		},
		add(key) {
			list.push(key);
		},
		delete(key) {
			list.splice(list.indexOf(key), 1);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
		},
	}
})();

<<<<<<< HEAD
let createEvent = (name)=> new Event(name, {bubbles: true});
=======
let createEvent = (name)=> new Event(name);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
try {
	new Event('test');
} catch(e) {
	// IE does not support `new Event()`
	createEvent = (name)=> {
		const evt = document.createEvent('Event');
		evt.initEvent(name, true, false);
		return evt;
	};
}

<<<<<<< HEAD
function assign(ta) {
	if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || map.has(ta)) return;

	let heightOffset = null;
	let clientWidth = ta.clientWidth;
	let cachedHeight = null;
=======
function assign(ta, {setOverflowX = true, setOverflowY = true} = {}) {
	if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || set.has(ta)) return;

	let heightOffset = null;
	let overflowY = null;
	let clientWidth = ta.clientWidth;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

	function init() {
		const style = window.getComputedStyle(ta, null);

<<<<<<< HEAD
=======
		overflowY = style.overflowY;

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
		if (style.resize === 'vertical') {
			ta.style.resize = 'none';
		} else if (style.resize === 'both') {
			ta.style.resize = 'horizontal';
		}

		if (style.boxSizing === 'content-box') {
			heightOffset = -(parseFloat(style.paddingTop)+parseFloat(style.paddingBottom));
		} else {
			heightOffset = parseFloat(style.borderTopWidth)+parseFloat(style.borderBottomWidth);
		}
		// Fix when a textarea is not on document body and heightOffset is Not a Number
		if (isNaN(heightOffset)) {
			heightOffset = 0;
		}

		update();
	}

	function changeOverflow(value) {
		{
			// Chrome/Safari-specific fix:
			// When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
			// made available by removing the scrollbar. The following forces the necessary text reflow.
			const width = ta.style.width;
			ta.style.width = '0px';
			// Force reflow:
			/* jshint ignore:start */
			ta.offsetWidth;
			/* jshint ignore:end */
			ta.style.width = width;
		}

<<<<<<< HEAD
		ta.style.overflowY = value;
	}

	function getParentOverflows(el) {
		const arr = [];

		while (el && el.parentNode && el.parentNode instanceof Element) {
			if (el.parentNode.scrollTop) {
				arr.push({
					node: el.parentNode,
					scrollTop: el.parentNode.scrollTop,
				})
			}
			el = el.parentNode;
		}

		return arr;
	}

	function resize() {
		const originalHeight = ta.style.height;
		const overflows = getParentOverflows(ta);
		const docTop = document.documentElement && document.documentElement.scrollTop; // Needed for Mobile IE (ticket #240)
=======
		overflowY = value;

		if (setOverflowY) {
			ta.style.overflowY = value;
		}

		resize();
	}

	function resize() {
		const htmlTop = window.pageYOffset;
		const bodyTop = document.body.scrollTop;
		const originalHeight = ta.style.height;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

		ta.style.height = 'auto';

		let endHeight = ta.scrollHeight+heightOffset;

		if (ta.scrollHeight === 0) {
			// If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
			ta.style.height = originalHeight;
			return;
		}

		ta.style.height = endHeight+'px';

		// used to check if an update is actually necessary on window.resize
		clientWidth = ta.clientWidth;

		// prevents scroll-position jumping
<<<<<<< HEAD
		overflows.forEach(el => {
			el.node.scrollTop = el.scrollTop
		});

		if (docTop) {
			document.documentElement.scrollTop = docTop;
		}
	}

	function update() {
		resize();

		const styleHeight = Math.round(parseFloat(ta.style.height));
		const computed = window.getComputedStyle(ta, null);

		// Using offsetHeight as a replacement for computed.height in IE, because IE does not account use of border-box
		var actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(computed.height)) : ta.offsetHeight;

		// The actual height not matching the style height (set via the resize method) indicates that 
		// the max-height has been exceeded, in which case the overflow should be allowed.
		if (actualHeight !== styleHeight) {
			if (computed.overflowY === 'hidden') {
				changeOverflow('scroll');
				resize();
				actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
			}
		} else {
			// Normally keep overflow set to hidden, to avoid flash of scrollbar as the textarea expands.
			if (computed.overflowY !== 'hidden') {
				changeOverflow('hidden');
				resize();
				actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
			}
		}

		if (cachedHeight !== actualHeight) {
			cachedHeight = actualHeight;
			const evt = createEvent('autosize:resized');
			try {
				ta.dispatchEvent(evt);
			} catch (err) {
				// Firefox will throw an error on dispatchEvent for a detached element
				// https://bugzilla.mozilla.org/show_bug.cgi?id=889376
			}
=======
		document.documentElement.scrollTop = htmlTop;
		document.body.scrollTop = bodyTop;
	}

	function update() {
		const startHeight = ta.style.height;

		resize();

		const style = window.getComputedStyle(ta, null);

		if (style.height !== ta.style.height) {
			if (overflowY !== 'visible') {
				changeOverflow('visible');
			}
		} else {
			if (overflowY !== 'hidden') {
				changeOverflow('hidden');
			}
		}

		if (startHeight !== ta.style.height) {
			const evt = createEvent('autosize:resized');
			ta.dispatchEvent(evt);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
		}
	}

	const pageResize = () => {
		if (ta.clientWidth !== clientWidth) {
			update();
		}
	};

	const destroy = style => {
		window.removeEventListener('resize', pageResize, false);
		ta.removeEventListener('input', update, false);
		ta.removeEventListener('keyup', update, false);
		ta.removeEventListener('autosize:destroy', destroy, false);
		ta.removeEventListener('autosize:update', update, false);
<<<<<<< HEAD
=======
		set.delete(ta);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

		Object.keys(style).forEach(key => {
			ta.style[key] = style[key];
		});
<<<<<<< HEAD

		map.delete(ta);
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
	}.bind(ta, {
		height: ta.style.height,
		resize: ta.style.resize,
		overflowY: ta.style.overflowY,
		overflowX: ta.style.overflowX,
		wordWrap: ta.style.wordWrap,
	});

	ta.addEventListener('autosize:destroy', destroy, false);

	// IE9 does not fire onpropertychange or oninput for deletions,
	// so binding to onkeyup to catch most of those events.
	// There is no way that I know of to detect something like 'cut' in IE9.
	if ('onpropertychange' in ta && 'oninput' in ta) {
		ta.addEventListener('keyup', update, false);
	}

	window.addEventListener('resize', pageResize, false);
	ta.addEventListener('input', update, false);
	ta.addEventListener('autosize:update', update, false);
<<<<<<< HEAD
	ta.style.overflowX = 'hidden';
	ta.style.wordWrap = 'break-word';

	map.set(ta, {
		destroy,
		update,
	});
=======
	set.add(ta);

	if (setOverflowX) {
		ta.style.overflowX = 'hidden';
		ta.style.wordWrap = 'break-word';
	}
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

	init();
}

function destroy(ta) {
<<<<<<< HEAD
	const methods = map.get(ta);
	if (methods) {
		methods.destroy();
	}
}

function update(ta) {
	const methods = map.get(ta);
	if (methods) {
		methods.update();
	}
=======
	if (!(ta && ta.nodeName && ta.nodeName === 'TEXTAREA')) return;
	const evt = createEvent('autosize:destroy');
	ta.dispatchEvent(evt);
}

function update(ta) {
	if (!(ta && ta.nodeName && ta.nodeName === 'TEXTAREA')) return;
	const evt = createEvent('autosize:update');
	ta.dispatchEvent(evt);
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
}

let autosize = null;

// Do nothing in Node.js environment and IE8 (or lower)
if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
	autosize = el => el;
	autosize.destroy = el => el;
	autosize.update = el => el;
} else {
	autosize = (el, options) => {
		if (el) {
			Array.prototype.forEach.call(el.length ? el : [el], x => assign(x, options));
		}
		return el;
	};
	autosize.destroy = el => {
		if (el) {
			Array.prototype.forEach.call(el.length ? el : [el], destroy);
		}
		return el;
	};
	autosize.update = el => {
		if (el) {
			Array.prototype.forEach.call(el.length ? el : [el], update);
		}
		return el;
	};
}

export default autosize;
