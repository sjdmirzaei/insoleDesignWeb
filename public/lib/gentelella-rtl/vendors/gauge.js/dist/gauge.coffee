# Request Animation Frame Polyfill
# CoffeeScript version of http://paulirish.com/2011/requestanimationframe-for-smart-animating/
do () ->
	vendors = ['ms', 'moz', 'webkit', 'o']
	for vendor in vendors
		if window.requestAnimationFrame
			break
		window.requestAnimationFrame = window[vendor + 'RequestAnimationFrame']
		window.cancelAnimationFrame = window[vendor + 'CancelAnimationFrame'] or window[vendor + 'CancelRequestAnimationFrame']

	browserRequestAnimationFrame = null
	lastId = 0
	isCancelled = {}

	if not requestAnimationFrame
		window.requestAnimationFrame = (callback, element) ->
			currTime = new Date().getTime()
			timeToCall = Math.max(0, 16 - (currTime - lastTime))
			id = window.setTimeout(() ->
				callback(currTime + timeToCall)
			, timeToCall)
			lastTime = currTime + timeToCall
			return id
		# This implementation should only be used with the setTimeout()
		# version of window.requestAnimationFrame().
		window.cancelAnimationFrame = (id) ->
			clearTimeout(id)
	else if not window.cancelAnimationFrame
		browserRequestAnimationFrame = window.requestAnimationFrame
		window.requestAnimationFrame = (callback, element) ->
			myId = ++lastId
			browserRequestAnimationFrame(() ->
				if not isCancelled[myId]
					callback()
			, element)
			return myId
		window.cancelAnimationFrame = (id) ->
			isCancelled[id] = true

<<<<<<< HEAD
=======
String.prototype.hashCode = () ->
	hash = 0
	if this.length == 0
		return hash
	for i in [0...this.length]
		char = this.charCodeAt(i)
		hash = ((hash << 5) - hash) + char
		hash = hash & hash # Convert to 32bit integer
	return hash

>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
secondsToString = (sec) ->
	hr = Math.floor(sec / 3600)
	min = Math.floor((sec - (hr * 3600))/60)
	sec -= ((hr * 3600) + (min * 60))
<<<<<<< HEAD
	sec += ''
=======
	sec += '' 
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
	min += ''
	while min.length < 2
		min = '0' + min
	while sec.length < 2
		sec = '0' + sec
	hr = if hr then hr + ':' else ''
	return hr + min + ':' + sec

<<<<<<< HEAD
formatNumber = (num...) ->
	value = num[0]
	digits = 0 || num[1]
	return addCommas(value.toFixed(digits))
=======
formatNumber = (num) ->
		return addCommas(num.toFixed(0))

updateObjectValues = (obj1, obj2) ->
	for own key, val of obj2
		obj1[key] = val
	return obj1
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

mergeObjects = (obj1, obj2) ->
	out = {}
	for own key, val of obj1
		out[key] = val
	for own key, val of obj2
		out[key] = val
	return out

addCommas = (nStr) ->
	nStr += ''
	x = nStr.split('.')
	x1 = x[0]
	x2 = ''
	if x.length > 1
		x2 = '.' + x[1]
	rgx = /(\d+)(\d{3})/
	while rgx.test(x1)
		x1 = x1.replace(rgx, '$1' + ',' + '$2')
	return x1 + x2

cutHex = (nStr) ->
	if nStr.charAt(0) == "#"
		return nStr.substring(1,7)
	return nStr

class ValueUpdater
	animationSpeed: 32
	constructor: (addToAnimationQueue=true, @clear=true) ->
		if addToAnimationQueue
			AnimationUpdater.add(@)

	update: (force=false) ->
		if force or @displayedValue != @value
			if @ctx and @clear
				@ctx.clearRect(0, 0, @canvas.width, @canvas.height)
			diff = @value - @displayedValue
			if Math.abs(diff / @animationSpeed) <= 0.001
				@displayedValue = @value
			else
				@displayedValue = @displayedValue + diff / @animationSpeed
			@render()
			return true
		return false

class BaseGauge extends ValueUpdater
	displayScale: 1
<<<<<<< HEAD
	forceUpdate: true

	setTextField: (textField, fractionDigits) ->
		@textField = if textField instanceof TextRenderer then textField else new TextRenderer(textField, fractionDigits)
=======

	setTextField: (textField) ->
		@textField = if textField instanceof TextRenderer then textField else new TextRenderer(textField)
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

	setMinValue: (@minValue, updateStartValue=true) ->
		if updateStartValue
			@displayedValue = @minValue
			for gauge in @gp or []
				gauge.displayedValue = @minValue

	setOptions: (options=null) ->
		@options = mergeObjects(@options, options)
		if @textField
			@textField.el.style.fontSize = options.fontSize + 'px'

		if @options.angle > .5
<<<<<<< HEAD
			@options.angle = .5
=======
			@gauge.options.angle = .5
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
		@configDisplayScale()
		return @

	configDisplayScale: () ->
		prevDisplayScale = @displayScale

		if @options.highDpiSupport == false
			delete @displayScale
		else
			devicePixelRatio = window.devicePixelRatio or 1
			backingStorePixelRatio =
				@ctx.webkitBackingStorePixelRatio or
				@ctx.mozBackingStorePixelRatio or
				@ctx.msBackingStorePixelRatio or
				@ctx.oBackingStorePixelRatio or
				@ctx.backingStorePixelRatio or 1
			@displayScale = devicePixelRatio / backingStorePixelRatio

		if @displayScale != prevDisplayScale
			width = @canvas.G__width or @canvas.width
			height = @canvas.G__height or @canvas.height
			@canvas.width = width * @displayScale
			@canvas.height = height * @displayScale
			@canvas.style.width = "#{width}px"
			@canvas.style.height = "#{height}px"
			@canvas.G__width = width
			@canvas.G__height = height

		return @

<<<<<<< HEAD
	parseValue: (value) ->
		value =  parseFloat(value) || Number(value)
		return if isFinite(value) then value else 0

class TextRenderer
	constructor: (@el, @fractionDigits) ->

	# Default behaviour, override to customize rendering
	render: (gauge) ->
		@el.innerHTML = formatNumber(gauge.displayedValue, @fractionDigits)
=======
class TextRenderer
	constructor: (@el) ->

	# Default behaviour, override to customize rendering
	render: (gauge) ->
		@el.innerHTML = formatNumber(gauge.displayedValue)
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

class AnimatedText extends ValueUpdater
	displayedValue: 0
	value: 0

	setVal: (value) ->
		@value = 1 * value

	constructor: (@elem, @text=false) ->
		@value = 1 * @elem.innerHTML
		if @text
			@value = 0
	render: () ->
		if @text
			textVal = secondsToString(@displayedValue.toFixed(0))
		else
			textVal = addCommas(formatNumber(@displayedValue))
		@elem.innerHTML = textVal

AnimatedTextFactory =
	create: (objList) ->
		out = []
		for elem in objList
			out.push(new AnimatedText(elem))
		return out

class GaugePointer extends ValueUpdater
	displayedValue: 0
	value: 0
	options:
		strokeWidth: 0.035
		length: 0.1
		color: "#000000"
<<<<<<< HEAD
		iconPath: null
		iconScale: 1.0
		iconAngle: 0
	img: null
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

	constructor: (@gauge) ->
		@ctx = @gauge.ctx
		@canvas = @gauge.canvas
		super(false, false)
		@setOptions()

	setOptions: (options=null) ->
<<<<<<< HEAD
		@options = mergeObjects(@options, options)
		@length = 2*@gauge.radius * @gauge.options.radiusScale * @options.length
=======
		updateObjectValues(@options, options)
		@length = @canvas.height * @options.length
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
		@strokeWidth = @canvas.height * @options.strokeWidth
		@maxValue = @gauge.maxValue
		@minValue = @gauge.minValue
		@animationSpeed =  @gauge.animationSpeed
		@options.angle = @gauge.options.angle
<<<<<<< HEAD
		if @options.iconPath
			@img = new Image()
			@img.src = @options.iconPath

	render: () ->
		angle = @gauge.getAngle.call(@, @displayedValue)

		x = Math.round(@length * Math.cos(angle))
		y = Math.round(@length * Math.sin(angle))

		startX = Math.round(@strokeWidth * Math.cos(angle - Math.PI/2))
		startY = Math.round(@strokeWidth * Math.sin(angle - Math.PI/2))

		endX = Math.round(@strokeWidth * Math.cos(angle + Math.PI/2))
		endY = Math.round(@strokeWidth * Math.sin(angle + Math.PI/2))
=======

	render: () ->
		angle = @gauge.getAngle.call(@, @displayedValue)
		centerX = @canvas.width / 2
		centerY = @canvas.height * 0.9

		x = Math.round(centerX + @length * Math.cos(angle))
		y = Math.round(centerY + @length * Math.sin(angle))

		startX = Math.round(centerX + @strokeWidth * Math.cos(angle - Math.PI/2))
		startY = Math.round(centerY + @strokeWidth * Math.sin(angle - Math.PI/2))

		endX = Math.round(centerX + @strokeWidth * Math.cos(angle + Math.PI/2))
		endY = Math.round(centerY + @strokeWidth * Math.sin(angle + Math.PI/2))
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

		@ctx.fillStyle = @options.color
		@ctx.beginPath()

<<<<<<< HEAD
		@ctx.arc(0, 0, @strokeWidth, 0, Math.PI*2, true)
=======
		@ctx.arc(centerX, centerY, @strokeWidth, 0, Math.PI*2, true)
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
		@ctx.fill()

		@ctx.beginPath()
		@ctx.moveTo(startX, startY)
		@ctx.lineTo(x, y)
		@ctx.lineTo(endX, endY)
		@ctx.fill()

<<<<<<< HEAD
		if @img
			imgX = Math.round(@img.width * @options.iconScale)
			imgY = Math.round(@img.height * @options.iconScale)
			@ctx.save()
			@ctx.translate(x, y)
			@ctx.rotate(angle + Math.PI/180.0*(90 + @options.iconAngle))
			@ctx.drawImage(@img, -imgX/2, -imgY/2, imgX, imgY)
			@ctx.restore()


=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
class Bar
	constructor: (@elem) ->
	updateValues: (arrValues) ->
		@value = arrValues[0]
		@maxValue = arrValues[1]
		@avgValue = arrValues[2]
		@render()

	render: () ->
		if @textField
			@textField.text(formatNumber(@value))

		if @maxValue == 0
			@maxValue = @avgValue * 2

		valPercent = (@value / @maxValue) * 100
		avgPercent = (@avgValue / @maxValue) * 100

		$(".bar-value", @elem).css({"width": valPercent + "%"})
		$(".typical-value", @elem).css({"width": avgPercent + "%"})

class Gauge extends BaseGauge
	elem: null
	value: [20] # we support multiple pointers
	maxValue: 80
	minValue: 0
	displayedAngle: 0
	displayedValue: 0
	lineWidth: 40
<<<<<<< HEAD
	paddingTop: 0.1
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
	paddingBottom: 0.1
	percentColors: null,
	options:
		colorStart: "#6fadcf"
		colorStop: undefined
		gradientType: 0       	# 0 : radial, 1 : linear
		strokeColor: "#e0e0e0"
		pointer:
			length: 0.8
			strokeWidth: 0.035
<<<<<<< HEAD
			iconScale: 1.0
		angle: 0.15
		lineWidth: 0.44
		radiusScale: 1.0
		fontSize: 40
		limitMax: false
		limitMin: false
=======
		angle: 0.15
		lineWidth: 0.44
		fontSize: 40
		limitMax: false
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

	constructor: (@canvas) ->
		super()
		@percentColors = null
		if typeof G_vmlCanvasManager != 'undefined'
			@canvas = window.G_vmlCanvasManager.initElement(@canvas)
		@ctx = @canvas.getContext('2d')
<<<<<<< HEAD
		# Set canvas size to parent size
		h = @canvas.clientHeight;
		w = @canvas.clientWidth;
		@canvas.height = h;
		@canvas.width = w;
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
		@gp = [new GaugePointer(@)]
		@setOptions()
		@render()

	setOptions: (options=null) ->
		super(options)
		@configPercentColors()
<<<<<<< HEAD
		@extraPadding = 0
		if @options.angle < 0
			phi = Math.PI*(1 + @options.angle)
			@extraPadding = Math.sin(phi)
		@availableHeight = @canvas.height * (1 - @paddingTop - @paddingBottom)
		@lineWidth = @availableHeight * @options.lineWidth # .2 - .7
		@radius = (@availableHeight - @lineWidth/2) / (1.0 + @extraPadding)
		@ctx.clearRect(0, 0, @canvas.width, @canvas.height)
		# @render()
=======
		@lineWidth = @canvas.height * (1 - @paddingBottom) * @options.lineWidth # .2 - .7
		@radius = @canvas.height * (1 - @paddingBottom) - @lineWidth
		@ctx.clearRect(0, 0, @canvas.width, @canvas.height)
		@render()
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
		for gauge in @gp
			gauge.setOptions(@options.pointer)
			gauge.render()
		return @

	configPercentColors: () ->
		@percentColors = null;
		if (@options.percentColors != undefined)
			@percentColors = new Array()
			for i in [0..(@options.percentColors.length-1)]
				rval = parseInt((cutHex(@options.percentColors[i][1])).substring(0,2),16)
				gval = parseInt((cutHex(@options.percentColors[i][1])).substring(2,4),16)
				bval = parseInt((cutHex(@options.percentColors[i][1])).substring(4,6),16)
				@percentColors[i] = { pct: @options.percentColors[i][0], color: { r: rval, g: gval, b: bval  } }

	set: (value) ->
<<<<<<< HEAD
		if not (value instanceof Array)
			value = [value]
		# Ensure values are OK
		for i in [0..(value.length-1)]
			value[i] = @parseValue(value[i])

=======

		if not (value instanceof Array)
			value = [value]
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
		# check if we have enough GaugePointers initialized
		# lazy initialization
		if value.length > @gp.length
			for i in [0...(value.length - @gp.length)]
<<<<<<< HEAD
				gp = new GaugePointer(@)
				gp.setOptions(@options.pointer)
				@gp.push(gp)
		else if value.length < @gp.length
			# Delete redundant GaugePointers
			@gp = @gp.slice(@gp.length-value.length)

		# get max value and update pointer(s)
		i = 0

		for val in value
			# Limit pointer within min and max?
			if val > @maxValue
				if @options.limitMax
					val = @maxValue
				else
					@maxValue = val + 1

			else if val < @minValue
				if @options.limitMin
					val = @minValue
				else
					@minValue = val - 1

			@gp[i].value = val
			@gp[i++].setOptions({minValue: @minValue, maxValue: @maxValue, angle: @options.angle})
		@value = Math.max(Math.min(value[value.length - 1], @maxValue), @minValue) # TODO: Span maybe??

		# Force first .set()
		AnimationUpdater.run(@forceUpdate)
		@forceUpdate = false
=======
				@gp.push(new GaugePointer(@))

		# get max value and update pointer(s)
		i = 0
		max_hit = false

		for val in value
			if val > @maxValue
					@maxValue = @value * 1.1
					max_hit = true
			@gp[i].value = val
			@gp[i++].setOptions({maxValue: @maxValue, angle: @options.angle})
		@value = value[value.length - 1] # TODO: Span maybe?? 

		if max_hit
			unless @options.limitMax
				AnimationUpdater.run()
		else
			AnimationUpdater.run()
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

	getAngle: (value) ->
		return (1 + @options.angle) * Math.PI + ((value - @minValue) / (@maxValue - @minValue)) * (1 - @options.angle * 2) * Math.PI

	getColorForPercentage: (pct, grad) ->
		if pct == 0
			color = @percentColors[0].color;
		else
			color = @percentColors[@percentColors.length - 1].color;
			for i in [0..(@percentColors.length - 1)]
				if (pct <= @percentColors[i].pct)
					if grad == true
						# Gradually change between colors
<<<<<<< HEAD
						startColor = @percentColors[i - 1] || @percentColors[0]
=======
						startColor = @percentColors[i - 1]
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
						endColor = @percentColors[i]
						rangePct = (pct - startColor.pct) / (endColor.pct - startColor.pct)  # How far between both colors
						color = {
							r: Math.floor(startColor.color.r * (1 - rangePct) + endColor.color.r * rangePct),
							g: Math.floor(startColor.color.g * (1 - rangePct) + endColor.color.g * rangePct),
							b: Math.floor(startColor.color.b * (1 - rangePct) + endColor.color.b * rangePct)
						}
					else
						color = @percentColors[i].color
					break
		return 'rgb(' + [color.r, color.g, color.b].join(',') + ')'
<<<<<<< HEAD

=======
    
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
	getColorForValue: (val, grad) ->
		pct = (val - @minValue) / (@maxValue - @minValue)
		return @getColorForPercentage(pct, grad);

<<<<<<< HEAD
	renderStaticLabels: (staticLabels, w, h, radius) ->
		@ctx.save()
		@ctx.translate(w, h)

		# Scale font size the hard way - assuming size comes first.
		font = staticLabels.font or "10px Times"
		re = /\d+\.?\d?/
		match = font.match(re)[0]
		rest = font.slice(match.length);
		fontsize = parseFloat(match) * this.displayScale;
		@ctx.font = fontsize + rest;
		@ctx.fillStyle = staticLabels.color || "#000000";

		@ctx.textBaseline = "bottom"
		@ctx.textAlign = "center"
		for value in staticLabels.labels
			# Draw labels depending on limitMin/Max
			if (not @options.limitMin or value >= @minValue) and (not @options.limitMax or value <= @maxValue)
				rotationAngle = @getAngle(value) - 3*Math.PI/2
				@ctx.rotate(rotationAngle)
				@ctx.fillText(formatNumber(value, staticLabels.fractionDigits), 0, -radius - @lineWidth/2)
				@ctx.rotate(-rotationAngle)
		@ctx.restore()

	render: () ->
		# Draw using canvas
		w = @canvas.width / 2
		h = @canvas.height*@paddingTop + @availableHeight - (@radius + @lineWidth/2)*@extraPadding
=======
	render: () ->
		# Draw using canvas
		w = @canvas.width / 2
		h = @canvas.height * (1 - @paddingBottom)
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
		displayedAngle = @getAngle(@displayedValue)
		if @textField
			@textField.render(@)

		@ctx.lineCap = "butt"
<<<<<<< HEAD

		radius = @radius * @options.radiusScale
		if (@options.staticLabels)
			@renderStaticLabels(@options.staticLabels, w, h, radius)

		if (@options.staticZones)
			@ctx.save()
			@ctx.translate(w, h)
			@ctx.lineWidth = @lineWidth
			for zone in @options.staticZones
				# Draw zones depending on limitMin/Max
				min = zone.min
				if @options.limitMin and min < @minValue
					min = @minValue
				max = zone.max
				if @options.limitMax and max > @maxValue
					max = @maxValue
				@ctx.strokeStyle = zone.strokeStyle
				@ctx.beginPath()
				@ctx.arc(0, 0, radius, @getAngle(min), @getAngle(max), false)
				@ctx.stroke()
			@ctx.restore()

		else
			if @options.customFillStyle != undefined
				fillStyle = @options.customFillStyle(@)
			else if @percentColors != null
				fillStyle = @getColorForValue(@displayedValue, true)
			else if @options.colorStop != undefined
				if @options.gradientType == 0
					fillStyle = this.ctx.createRadialGradient(w, h, 9, w, h, 70);
				else
					fillStyle = this.ctx.createLinearGradient(0, 0, w, 0);
				fillStyle.addColorStop(0, @options.colorStart)
				fillStyle.addColorStop(1, @options.colorStop)
			else
				fillStyle = @options.colorStart
			@ctx.strokeStyle = fillStyle

			@ctx.beginPath()
			@ctx.arc(w, h, radius, (1 + @options.angle) * Math.PI, displayedAngle, false)
			@ctx.lineWidth = @lineWidth
			@ctx.stroke()

			@ctx.strokeStyle = @options.strokeColor
			@ctx.beginPath()
			@ctx.arc(w, h, radius, displayedAngle, (2 - @options.angle) * Math.PI, false)
			@ctx.stroke()


		# Draw pointers from (w, h)
		@ctx.translate(w, h)
		for gauge in @gp
			gauge.update(true)
		@ctx.translate(-w, -h)
=======
		if @options.customFillStyle != undefined
			fillStyle = @options.customFillStyle(@)
		else if @percentColors != null
			fillStyle = @getColorForValue(@displayedValue, true)
		else if @options.colorStop != undefined
			if @options.gradientType == 0
				fillStyle = this.ctx.createRadialGradient(w, h, 9, w, h, 70);
			else
				fillStyle = this.ctx.createLinearGradient(0, 0, w, 0);
			fillStyle.addColorStop(0, @options.colorStart)
			fillStyle.addColorStop(1, @options.colorStop)
		else
			fillStyle = @options.colorStart
		@ctx.strokeStyle = fillStyle

		@ctx.beginPath()
		@ctx.arc(w, h, @radius, (1 + @options.angle) * Math.PI, displayedAngle, false)
		@ctx.lineWidth = @lineWidth
		@ctx.stroke()

		@ctx.strokeStyle = @options.strokeColor
		@ctx.beginPath()
		@ctx.arc(w, h, @radius, displayedAngle, (2 - @options.angle) * Math.PI, false)
		@ctx.stroke()
		for gauge in @gp
			gauge.update(true)
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27


class BaseDonut extends BaseGauge
	lineWidth: 15
	displayedValue: 0
	value: 33
	maxValue: 80
	minValue: 0

	options:
		lineWidth: 0.10
		colorStart: "#6f6ea0"
		colorStop: "#c0c0db"
		strokeColor: "#eeeeee"
		shadowColor: "#d5d5d5"
		angle: 0.35
<<<<<<< HEAD
		radiusScale: 1.0
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

	constructor: (@canvas) ->
		super()
		if typeof G_vmlCanvasManager != 'undefined'
			@canvas = window.G_vmlCanvasManager.initElement(@canvas)
		@ctx = @canvas.getContext('2d')
		@setOptions()
		@render()

	getAngle: (value) ->
		return (1 - @options.angle) * Math.PI + ((value - @minValue) / (@maxValue - @minValue)) * ((2 + @options.angle) - (1 - @options.angle)) * Math.PI

	setOptions: (options=null) ->
		super(options)
		@lineWidth = @canvas.height * @options.lineWidth
<<<<<<< HEAD
		@radius = @options.radiusScale * (@canvas.height / 2 - @lineWidth/2)
		return @

	set: (value) ->
		@value = @parseValue(value)
		if @value > @maxValue
			if @options.limitMax
				@value = @maxValue
			else
				@maxValue = @value
		else if @value < @minValue
			if @options.limitMin
				@value = @minValue
			else
				@minValue = @value

		AnimationUpdater.run(@forceUpdate)
		@forceUpdate = false
=======
		@radius = @canvas.height / 2 - @lineWidth/2
		return @

	set: (value) ->
		@value = value
		if @value > @maxValue
			@maxValue = @value * 1.1
		AnimationUpdater.run()
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27

	render: () ->
		displayedAngle = @getAngle(@displayedValue)
		w = @canvas.width / 2
		h = @canvas.height / 2

		if @textField
			@textField.render(@)

		grdFill = @ctx.createRadialGradient(w, h, 39, w, h, 70)
		grdFill.addColorStop(0, @options.colorStart)
		grdFill.addColorStop(1, @options.colorStop)

		start = @radius - @lineWidth / 2
		stop = @radius + @lineWidth / 2

		@ctx.strokeStyle = @options.strokeColor
		@ctx.beginPath()
		@ctx.arc(w, h, @radius, (1 - @options.angle) * Math.PI, (2 + @options.angle) * Math.PI, false)
		@ctx.lineWidth = @lineWidth
		@ctx.lineCap = "round"
		@ctx.stroke()

		@ctx.strokeStyle = grdFill
		@ctx.beginPath()
		@ctx.arc(w, h, @radius, (1 - @options.angle) * Math.PI, displayedAngle, false)
		@ctx.stroke()


class Donut extends BaseDonut
	strokeGradient: (w, h, start, stop) ->
		grd = @ctx.createRadialGradient(w, h, start, w, h, stop)
		grd.addColorStop(0, @options.shadowColor)
		grd.addColorStop(0.12, @options._orgStrokeColor)
		grd.addColorStop(0.88, @options._orgStrokeColor)
		grd.addColorStop(1, @options.shadowColor)
		return grd

	setOptions: (options=null) ->
		super(options)
		w = @canvas.width / 2
		h = @canvas.height / 2
		start = @radius - @lineWidth / 2
		stop = @radius + @lineWidth / 2
		@options._orgStrokeColor = @options.strokeColor
		@options.strokeColor = @strokeGradient(w, h, start, stop)
		return @

window.AnimationUpdater =
	elements: []
	animId: null

	addAll: (list) ->
		for elem in list
			AnimationUpdater.elements.push(elem)

	add: (object) ->
		AnimationUpdater.elements.push(object)

<<<<<<< HEAD
	run: (force=false) ->
		animationFinished = true
		for elem in AnimationUpdater.elements
			if elem.update(force is true)
=======
	run: () ->
		animationFinished = true
		for elem in AnimationUpdater.elements
			if elem.update()
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
				animationFinished = false
		if not animationFinished
			AnimationUpdater.animId = requestAnimationFrame(AnimationUpdater.run)
		else
			cancelAnimationFrame(AnimationUpdater.animId)

<<<<<<< HEAD
if typeof window.define == 'function' && window.define.amd?
	define(() ->
		{
			Gauge: Gauge,
			Donut: Donut,
			BaseDonut: BaseDonut,
			TextRenderer: TextRenderer
		}
	)
else if typeof module != 'undefined' && module.exports?
	module.exports = {
		Gauge: Gauge,
		Donut: Donut,
		BaseDonut: BaseDonut,
		TextRenderer: TextRenderer
	}
else
	window.Gauge = Gauge
	window.Donut = Donut
	window.BaseDonut = BaseDonut
	window.TextRenderer = TextRenderer
=======
window.Gauge = Gauge
window.Donut = Donut
window.BaseDonut = BaseDonut
window.TextRenderer = TextRenderer
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
