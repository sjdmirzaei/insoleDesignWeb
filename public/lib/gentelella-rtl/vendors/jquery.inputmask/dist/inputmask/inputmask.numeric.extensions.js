/*!
* inputmask.numeric.extensions.js
<<<<<<< HEAD
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2017 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.7
*/

!function(factory) {
    "function" == typeof define && define.amd ? define([ "./dependencyLibs/inputmask.dependencyLib", "./inputmask" ], factory) : "object" == typeof exports ? module.exports = factory(require("./dependencyLibs/inputmask.dependencyLib"), require("./inputmask")) : factory(window.dependencyLib || jQuery, window.Inputmask);
}(function($, Inputmask, undefined) {
    function autoEscape(txt, opts) {
        for (var escapedTxt = "", i = 0; i < txt.length; i++) Inputmask.prototype.definitions[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker.start === txt.charAt(i) || opts.optionalmarker.end === txt.charAt(i) || opts.quantifiermarker.start === txt.charAt(i) || opts.quantifiermarker.end === txt.charAt(i) || opts.groupmarker.start === txt.charAt(i) || opts.groupmarker.end === txt.charAt(i) || opts.alternatormarker === txt.charAt(i) ? escapedTxt += "\\" + txt.charAt(i) : escapedTxt += txt.charAt(i);
        return escapedTxt;
    }
    return Inputmask.extendAliases({
        numeric: {
            mask: function(opts) {
                if (0 !== opts.repeat && isNaN(opts.integerDigits) && (opts.integerDigits = opts.repeat), 
                opts.repeat = 0, opts.groupSeparator === opts.radixPoint && ("." === opts.radixPoint ? opts.groupSeparator = "," : "," === opts.radixPoint ? opts.groupSeparator = "." : opts.groupSeparator = ""), 
                " " === opts.groupSeparator && (opts.skipOptionalPartCharacter = undefined), opts.autoGroup = opts.autoGroup && "" !== opts.groupSeparator, 
=======
* https://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2016 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.1
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "inputmask.dependencyLib", "inputmask" ], factory) : "object" == typeof exports ? module.exports = factory(require("./inputmask.dependencyLib.jquery"), require("./inputmask")) : factory(window.dependencyLib || jQuery, window.Inputmask);
}(function($, Inputmask) {
    return Inputmask.extendAliases({
        numeric: {
            mask: function(opts) {
                function autoEscape(txt) {
                    for (var escapedTxt = "", i = 0; i < txt.length; i++) escapedTxt += opts.definitions[txt.charAt(i)] || opts.optionalmarker.start === txt.charAt(i) || opts.optionalmarker.end === txt.charAt(i) || opts.quantifiermarker.start === txt.charAt(i) || opts.quantifiermarker.end === txt.charAt(i) || opts.groupmarker.start === txt.charAt(i) || opts.groupmarker.end === txt.charAt(i) || opts.alternatormarker === txt.charAt(i) ? "\\" + txt.charAt(i) : txt.charAt(i);
                    return escapedTxt;
                }
                if (0 !== opts.repeat && isNaN(opts.integerDigits) && (opts.integerDigits = opts.repeat), 
                opts.repeat = 0, opts.groupSeparator === opts.radixPoint && ("." === opts.radixPoint ? opts.groupSeparator = "," : "," === opts.radixPoint ? opts.groupSeparator = "." : opts.groupSeparator = ""), 
                " " === opts.groupSeparator && (opts.skipOptionalPartCharacter = void 0), opts.autoGroup = opts.autoGroup && "" !== opts.groupSeparator, 
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                opts.autoGroup && ("string" == typeof opts.groupSize && isFinite(opts.groupSize) && (opts.groupSize = parseInt(opts.groupSize)), 
                isFinite(opts.integerDigits))) {
                    var seps = Math.floor(opts.integerDigits / opts.groupSize), mod = opts.integerDigits % opts.groupSize;
                    opts.integerDigits = parseInt(opts.integerDigits) + (0 === mod ? seps - 1 : seps), 
                    opts.integerDigits < 1 && (opts.integerDigits = "*");
                }
                opts.placeholder.length > 1 && (opts.placeholder = opts.placeholder.charAt(0)), 
<<<<<<< HEAD
                "radixFocus" === opts.positionCaretOnClick && "" === opts.placeholder && !1 === opts.integerOptional && (opts.positionCaretOnClick = "lvp"), 
                opts.definitions[";"] = opts.definitions["~"], opts.definitions[";"].definitionSymbol = "~", 
                !0 === opts.numericInput && (opts.positionCaretOnClick = "radixFocus" === opts.positionCaretOnClick ? "lvp" : opts.positionCaretOnClick, 
                opts.digitsOptional = !1, isNaN(opts.digits) && (opts.digits = 2), opts.decimalProtect = !1);
                var mask = "[+]";
                if (mask += autoEscape(opts.prefix, opts), !0 === opts.integerOptional ? mask += "~{1," + opts.integerDigits + "}" : mask += "~{" + opts.integerDigits + "}", 
                opts.digits !== undefined) {
                    opts.radixPointDefinitionSymbol = opts.decimalProtect ? ":" : opts.radixPoint;
                    var dq = opts.digits.toString().split(",");
                    isFinite(dq[0] && dq[1] && isFinite(dq[1])) ? mask += opts.radixPointDefinitionSymbol + ";{" + opts.digits + "}" : (isNaN(opts.digits) || parseInt(opts.digits) > 0) && (opts.digitsOptional ? mask += "[" + opts.radixPointDefinitionSymbol + ";{1," + opts.digits + "}]" : mask += opts.radixPointDefinitionSymbol + ";{" + opts.digits + "}");
                }
                return mask += autoEscape(opts.suffix, opts), mask += "[-]", opts.greedy = !1, mask;
=======
                opts.radixFocus = opts.radixFocus && "" !== opts.placeholder && opts.integerOptional === !0, 
                opts.definitions[";"] = opts.definitions["~"], opts.definitions[";"].definitionSymbol = "~", 
                opts.numericInput === !0 && (opts.radixFocus = !1, opts.digitsOptional = !1, isNaN(opts.digits) && (opts.digits = 2), 
                opts.decimalProtect = !1);
                var mask = autoEscape(opts.prefix);
                return mask += "[+]", mask += opts.integerOptional === !0 ? "~{1," + opts.integerDigits + "}" : "~{" + opts.integerDigits + "}", 
                void 0 !== opts.digits && (isNaN(opts.digits) || parseInt(opts.digits) > 0) && (opts.decimalProtect && (opts.radixPointDefinitionSymbol = ":"), 
                mask += opts.digitsOptional ? "[" + (opts.decimalProtect ? ":" : opts.radixPoint) + ";{1," + opts.digits + "}]" : (opts.decimalProtect ? ":" : opts.radixPoint) + ";{" + opts.digits + "}"), 
                mask += "[-]", mask += autoEscape(opts.suffix), opts.greedy = !1, null !== opts.min && (opts.min = opts.min.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                "," === opts.radixPoint && (opts.min = opts.min.replace(opts.radixPoint, "."))), 
                null !== opts.max && (opts.max = opts.max.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                "," === opts.radixPoint && (opts.max = opts.max.replace(opts.radixPoint, "."))), 
                mask;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            },
            placeholder: "",
            greedy: !1,
            digits: "*",
            digitsOptional: !0,
<<<<<<< HEAD
            enforceDigitsOnBlur: !1,
            radixPoint: ".",
            positionCaretOnClick: "radixFocus",
            groupSize: 3,
            groupSeparator: "",
            autoGroup: !1,
=======
            radixPoint: ".",
            radixFocus: !0,
            groupSize: 3,
            groupSeparator: "",
            autoGroup: !1,
            allowPlus: !0,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            allowMinus: !0,
            negationSymbol: {
                front: "-",
                back: ""
            },
            integerDigits: "+",
            integerOptional: !0,
            prefix: "",
            suffix: "",
            rightAlign: !0,
            decimalProtect: !0,
            min: null,
            max: null,
            step: 1,
            insertMode: !0,
            autoUnmask: !1,
            unmaskAsNumber: !1,
<<<<<<< HEAD
            inputmode: "numeric",
            preValidation: function(buffer, pos, c, isSelection, opts) {
                if ("-" === c || c == opts.negationSymbol.front) return !0 === opts.allowMinus && (opts.isNegative = opts.isNegative === undefined || !opts.isNegative, 
                "" === buffer.join("") || {
                    caret: pos,
                    dopost: !0
                });
                if (!1 === isSelection && c === opts.radixPoint && opts.digits !== undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0)) {
                    var radixPos = $.inArray(opts.radixPoint, buffer);
                    if (-1 !== radixPos) return !0 === opts.numericInput ? pos === radixPos : {
                        caret: radixPos + 1
                    };
                }
                return !0;
            },
            postValidation: function(buffer, currentResult, opts) {
                var suffix = opts.suffix.split(""), prefix = opts.prefix.split("");
                if (currentResult.pos == undefined && currentResult.caret !== undefined && !0 !== currentResult.dopost) return currentResult;
                var caretPos = currentResult.caret != undefined ? currentResult.caret : currentResult.pos, maskedValue = buffer.slice();
                opts.numericInput && (caretPos = maskedValue.length - caretPos - 1, maskedValue = maskedValue.reverse());
                var charAtPos = maskedValue[caretPos];
                if (charAtPos === opts.groupSeparator && (caretPos += 1, charAtPos = maskedValue[caretPos]), 
                caretPos == maskedValue.length - opts.suffix.length - 1 && charAtPos === opts.radixPoint) return currentResult;
                charAtPos !== undefined && charAtPos !== opts.radixPoint && charAtPos !== opts.negationSymbol.front && charAtPos !== opts.negationSymbol.back && (maskedValue[caretPos] = "?", 
                opts.prefix.length > 0 && caretPos >= (!1 === opts.isNegative ? 1 : 0) && caretPos < opts.prefix.length - 1 + (!1 === opts.isNegative ? 1 : 0) ? prefix[caretPos - (!1 === opts.isNegative ? 1 : 0)] = "?" : opts.suffix.length > 0 && caretPos >= maskedValue.length - opts.suffix.length - (!1 === opts.isNegative ? 1 : 0) && (suffix[caretPos - (maskedValue.length - opts.suffix.length - (!1 === opts.isNegative ? 1 : 0))] = "?")), 
                prefix = prefix.join(""), suffix = suffix.join("");
                var processValue = maskedValue.join("").replace(prefix, "");
                if (processValue = processValue.replace(suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                processValue = processValue.replace(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"), ""), 
                processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), 
                isNaN(opts.placeholder) && (processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.placeholder), "g"), "")), 
                processValue.length > 1 && 1 !== processValue.indexOf(opts.radixPoint) && ("0" == charAtPos && (processValue = processValue.replace(/^\?/g, "")), 
                processValue = processValue.replace(/^0/g, "")), processValue.charAt(0) === opts.radixPoint && "" !== opts.radixPoint && !0 !== opts.numericInput && (processValue = "0" + processValue), 
                "" !== processValue) {
                    if (processValue = processValue.split(""), (!opts.digitsOptional || opts.enforceDigitsOnBlur && "blur" === currentResult.event) && isFinite(opts.digits)) {
                        var radixPosition = $.inArray(opts.radixPoint, processValue), rpb = $.inArray(opts.radixPoint, maskedValue);
                        -1 === radixPosition && (processValue.push(opts.radixPoint), radixPosition = processValue.length - 1);
                        for (var i = 1; i <= opts.digits; i++) opts.digitsOptional && (!opts.enforceDigitsOnBlur || "blur" !== currentResult.event) || processValue[radixPosition + i] !== undefined && processValue[radixPosition + i] !== opts.placeholder.charAt(0) ? -1 !== rpb && maskedValue[rpb + i] !== undefined && (processValue[radixPosition + i] = processValue[radixPosition + i] || maskedValue[rpb + i]) : processValue[radixPosition + i] = currentResult.placeholder || opts.placeholder.charAt(0);
                    }
                    !0 !== opts.autoGroup || "" === opts.groupSeparator || charAtPos === opts.radixPoint && currentResult.pos === undefined && !currentResult.dopost ? processValue = processValue.join("") : (processValue = Inputmask(function(buffer, opts) {
                        var postMask = "";
                        if (postMask += "(" + opts.groupSeparator + "*{" + opts.groupSize + "}){*}", "" !== opts.radixPoint) {
                            var radixSplit = buffer.join("").split(opts.radixPoint);
                            radixSplit[1] && (postMask += opts.radixPoint + "*{" + radixSplit[1].match(/^\d*\??\d*/)[0].length + "}");
                        }
                        return postMask;
                    }(processValue, opts), {
                        numericInput: !0,
                        jitMasking: !0,
                        definitions: {
                            "*": {
                                validator: "[0-9?]",
                                cardinality: 1
                            }
                        }
                    }).format(processValue.join("")), processValue.charAt(0) === opts.groupSeparator && processValue.substr(1));
                }
                if (opts.isNegative && "blur" === currentResult.event && (opts.isNegative = "0" !== processValue), 
                processValue = prefix + processValue, processValue += suffix, opts.isNegative && (processValue = opts.negationSymbol.front + processValue, 
                processValue += opts.negationSymbol.back), processValue = processValue.split(""), 
                charAtPos !== undefined) if (charAtPos !== opts.radixPoint && charAtPos !== opts.negationSymbol.front && charAtPos !== opts.negationSymbol.back) caretPos = $.inArray("?", processValue), 
                caretPos > -1 ? processValue[caretPos] = charAtPos : caretPos = currentResult.caret || 0; else if (charAtPos === opts.radixPoint || charAtPos === opts.negationSymbol.front || charAtPos === opts.negationSymbol.back) {
                    var newCaretPos = $.inArray(charAtPos, processValue);
                    -1 !== newCaretPos && (caretPos = newCaretPos);
                }
                opts.numericInput && (caretPos = processValue.length - caretPos - 1, processValue = processValue.reverse());
                var rslt = {
                    caret: charAtPos === undefined || currentResult.pos !== undefined ? caretPos + (opts.numericInput ? -1 : 1) : caretPos,
                    buffer: processValue,
                    refreshFromBuffer: currentResult.dopost || buffer.join("") !== processValue.join("")
                };
                return rslt.refreshFromBuffer ? rslt : currentResult;
            },
            onBeforeWrite: function(e, buffer, caretPos, opts) {
                if (e) switch (e.type) {
                  case "keydown":
                    return opts.postValidation(buffer, {
                        caret: caretPos,
                        dopost: !0
                    }, opts);

                  case "blur":
                  case "checkval":
                    var unmasked;
                    if (function(opts) {
                        opts.parseMinMaxOptions === undefined && (null !== opts.min && (opts.min = opts.min.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                        "," === opts.radixPoint && (opts.min = opts.min.replace(opts.radixPoint, ".")), 
                        opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN, isNaN(opts.min) && (opts.min = Number.MIN_VALUE)), 
                        null !== opts.max && (opts.max = opts.max.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                        "," === opts.radixPoint && (opts.max = opts.max.replace(opts.radixPoint, ".")), 
                        opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN, isNaN(opts.max) && (opts.max = Number.MAX_VALUE)), 
                        opts.parseMinMaxOptions = "done");
                    }(opts), null !== opts.min || null !== opts.max) {
                        if (unmasked = opts.onUnMask(buffer.join(""), undefined, $.extend({}, opts, {
                            unmaskAsNumber: !0
                        })), null !== opts.min && unmasked < opts.min) return opts.isNegative = opts.min < 0, 
                        opts.postValidation(opts.min.toString().replace(".", opts.radixPoint).split(""), {
                            caret: caretPos,
                            dopost: !0,
                            placeholder: "0"
                        }, opts);
                        if (null !== opts.max && unmasked > opts.max) return opts.isNegative = opts.max < 0, 
                        opts.postValidation(opts.max.toString().replace(".", opts.radixPoint).split(""), {
                            caret: caretPos,
                            dopost: !0,
                            placeholder: "0"
                        }, opts);
                    }
                    return opts.postValidation(buffer, {
                        caret: caretPos,
                        dopost: !0,
                        placeholder: "0",
                        event: "blur"
                    }, opts);

                  case "_checkval":
                    return {
                        caret: caretPos
                    };
                }
            },
            regex: {
                integerPart: function(opts, emptyCheck) {
                    return emptyCheck ? new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "+]?") : new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "+]?\\d+");
=======
            postFormat: function(buffer, pos, opts) {
                opts.numericInput === !0 && (buffer = buffer.reverse(), isFinite(pos) && (pos = buffer.join("").length - pos - 1));
                var i, l, suffixStripped = !1;
                buffer.length >= opts.suffix.length && buffer.join("").indexOf(opts.suffix) === buffer.length - opts.suffix.length && (buffer.length = buffer.length - opts.suffix.length, 
                suffixStripped = !0), pos = pos >= buffer.length ? buffer.length - 1 : pos < opts.prefix.length ? opts.prefix.length : pos;
                var needsRefresh = !1, charAtPos = buffer[pos], cbuf = buffer.slice();
                charAtPos === opts.groupSeparator && (cbuf.splice(pos--, 1), charAtPos = cbuf[pos]), 
                charAtPos !== opts.radixPoint && charAtPos !== opts.negationSymbol.front && charAtPos !== opts.negationSymbol.back && (cbuf[pos] = "?");
                var bufVal = cbuf.join(""), bufValOrigin = bufVal;
                if (bufVal.length > 0 && opts.autoGroup || -1 !== bufVal.indexOf(opts.groupSeparator)) {
                    var escapedGroupSeparator = Inputmask.escapeRegex(opts.groupSeparator);
                    needsRefresh = 0 === bufVal.indexOf(opts.groupSeparator), bufVal = bufVal.replace(new RegExp(escapedGroupSeparator, "g"), "");
                    var radixSplit = bufVal.split(opts.radixPoint);
                    if (bufVal = "" === opts.radixPoint ? bufVal : radixSplit[0], bufVal !== opts.prefix + "?0" && bufVal.length >= opts.groupSize + opts.prefix.length) for (var reg = new RegExp("([-+]?[\\d?]+)([\\d?]{" + opts.groupSize + "})"); reg.test(bufVal) && "" !== opts.groupSeparator; ) bufVal = bufVal.replace(reg, "$1" + opts.groupSeparator + "$2"), 
                    bufVal = bufVal.replace(opts.groupSeparator + opts.groupSeparator, opts.groupSeparator);
                    "" !== opts.radixPoint && radixSplit.length > 1 && (bufVal += opts.radixPoint + radixSplit[1]);
                }
                for (needsRefresh = bufValOrigin !== bufVal, buffer.length = bufVal.length, i = 0, 
                l = bufVal.length; l > i; i++) buffer[i] = bufVal.charAt(i);
                var newPos = $.inArray("?", buffer);
                if (-1 === newPos && (newPos = $.inArray(charAtPos, buffer)), buffer[newPos] = charAtPos, 
                !needsRefresh && suffixStripped) for (i = 0, l = opts.suffix.length; l > i; i++) buffer.push(opts.suffix.charAt(i));
                return newPos = opts.numericInput && isFinite(pos) ? buffer.join("").length - newPos - 1 : newPos, 
                opts.numericInput && (buffer = buffer.reverse(), $.inArray(opts.radixPoint, buffer) < newPos && buffer.join("").length - opts.suffix.length !== newPos && (newPos -= 1)), 
                {
                    pos: newPos,
                    refreshFromBuffer: needsRefresh,
                    buffer: buffer
                };
            },
            onBeforeWrite: function(e, buffer, caretPos, opts) {
                var rslt;
                if (e && ("blur" === e.type || "checkval" === e.type || "keydown" === e.type)) {
                    var maskedValue = opts.numericInput ? buffer.slice().reverse().join("") : buffer.join(""), processValue = maskedValue.replace(opts.prefix, "");
                    processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                    "," === opts.radixPoint && (processValue = processValue.replace(opts.radixPoint, "."));
                    var isNegative = processValue.match(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"));
                    if (isNegative = null !== isNegative && 1 === isNegative.length, processValue = processValue.replace(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"), ""), 
                    processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), 
                    isNaN(opts.placeholder) && (processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.placeholder), "g"), "")), 
                    processValue = processValue === opts.negationSymbol.front ? processValue + "0" : processValue, 
                    "" !== processValue && isFinite(processValue)) {
                        var floatValue = parseFloat(processValue), signedFloatValue = isNegative ? -1 * floatValue : floatValue;
                        if (null !== opts.min && isFinite(opts.min) && signedFloatValue < parseFloat(opts.min) ? (floatValue = Math.abs(opts.min), 
                        isNegative = opts.min < 0, maskedValue = void 0) : null !== opts.max && isFinite(opts.max) && signedFloatValue > parseFloat(opts.max) && (floatValue = Math.abs(opts.max), 
                        isNegative = opts.max < 0, maskedValue = void 0), processValue = floatValue.toString().replace(".", opts.radixPoint).split(""), 
                        isFinite(opts.digits)) {
                            var radixPosition = $.inArray(opts.radixPoint, processValue), rpb = $.inArray(opts.radixPoint, maskedValue);
                            -1 === radixPosition && (processValue.push(opts.radixPoint), radixPosition = processValue.length - 1);
                            for (var i = 1; i <= opts.digits; i++) opts.digitsOptional || void 0 !== processValue[radixPosition + i] && processValue[radixPosition + i] !== opts.placeholder.charAt(0) ? -1 !== rpb && void 0 !== maskedValue[rpb + i] && (processValue[radixPosition + i] = processValue[radixPosition + i] || maskedValue[rpb + i]) : processValue[radixPosition + i] = "0";
                            processValue[processValue.length - 1] === opts.radixPoint && delete processValue[processValue.length - 1];
                        }
                        if (floatValue.toString() !== processValue && floatValue.toString() + "." !== processValue || isNegative) return !isNegative || 0 === floatValue && "blur" === e.type || (processValue.unshift(opts.negationSymbol.front), 
                        processValue.push(opts.negationSymbol.back)), processValue = (opts.prefix + processValue.join("")).split(""), 
                        opts.numericInput && (processValue = processValue.reverse()), rslt = opts.postFormat(processValue, opts.numericInput ? caretPos : caretPos - 1, opts), 
                        rslt.buffer && (rslt.refreshFromBuffer = rslt.buffer.join("") !== buffer.join("")), 
                        rslt;
                    }
                }
                return opts.autoGroup ? (rslt = opts.postFormat(buffer, opts.numericInput ? caretPos : caretPos - 1, opts), 
                rslt.caret = caretPos <= opts.prefix.length ? rslt.pos : rslt.pos + 1, rslt) : void 0;
            },
            regex: {
                integerPart: function(opts) {
                    return new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "+]?\\d+");
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                },
                integerNPart: function(opts) {
                    return new RegExp("[\\d" + Inputmask.escapeRegex(opts.groupSeparator) + Inputmask.escapeRegex(opts.placeholder.charAt(0)) + "]+");
                }
            },
<<<<<<< HEAD
            definitions: {
                "~": {
                    validator: function(chrs, maskset, pos, strict, opts, isSelection) {
                        var isValid = strict ? new RegExp("[0-9" + Inputmask.escapeRegex(opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs);
                        if (!0 === isValid) {
                            if (!0 !== opts.numericInput && maskset.validPositions[pos] !== undefined && "~" === maskset.validPositions[pos].match.def && !isSelection) {
                                var processValue = maskset.buffer.join("");
                                processValue = processValue.replace(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"), ""), 
                                processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
                                var pvRadixSplit = processValue.split(opts.radixPoint);
                                pvRadixSplit.length > 1 && (pvRadixSplit[1] = pvRadixSplit[1].replace(/0/g, opts.placeholder.charAt(0))), 
                                "0" === pvRadixSplit[0] && (pvRadixSplit[0] = pvRadixSplit[0].replace(/0/g, opts.placeholder.charAt(0))), 
                                processValue = pvRadixSplit[0] + opts.radixPoint + pvRadixSplit[1] || "";
                                var bufferTemplate = maskset._buffer.join("");
                                for (processValue === opts.radixPoint && (processValue = bufferTemplate); null === processValue.match(Inputmask.escapeRegex(bufferTemplate) + "$"); ) bufferTemplate = bufferTemplate.slice(1);
                                processValue = processValue.replace(bufferTemplate, ""), processValue = processValue.split(""), 
                                isValid = processValue[pos] === undefined ? {
                                    pos: pos,
                                    remove: pos
                                } : {
                                    pos: pos
                                };
                            }
                        } else strict || chrs !== opts.radixPoint || maskset.validPositions[pos - 1] !== undefined || (maskset.buffer[pos] = "0", 
                        isValid = {
                            pos: pos + 1
                        });
=======
            signHandler: function(chrs, maskset, pos, strict, opts) {
                if (!strict && opts.allowMinus && "-" === chrs || opts.allowPlus && "+" === chrs) {
                    var matchRslt = maskset.buffer.join("").match(opts.regex.integerPart(opts));
                    if (matchRslt && matchRslt[0].length > 0) return maskset.buffer[matchRslt.index] === ("-" === chrs ? "+" : opts.negationSymbol.front) ? "-" === chrs ? "" !== opts.negationSymbol.back ? {
                        pos: matchRslt.index,
                        c: opts.negationSymbol.front,
                        remove: matchRslt.index,
                        caret: pos,
                        insert: {
                            pos: maskset.buffer.length - opts.suffix.length - 1,
                            c: opts.negationSymbol.back
                        }
                    } : {
                        pos: matchRslt.index,
                        c: opts.negationSymbol.front,
                        remove: matchRslt.index,
                        caret: pos
                    } : "" !== opts.negationSymbol.back ? {
                        pos: matchRslt.index,
                        c: "+",
                        remove: [ matchRslt.index, maskset.buffer.length - opts.suffix.length - 1 ],
                        caret: pos
                    } : {
                        pos: matchRslt.index,
                        c: "+",
                        remove: matchRslt.index,
                        caret: pos
                    } : maskset.buffer[matchRslt.index] === ("-" === chrs ? opts.negationSymbol.front : "+") ? "-" === chrs && "" !== opts.negationSymbol.back ? {
                        remove: [ matchRslt.index, maskset.buffer.length - opts.suffix.length - 1 ],
                        caret: pos - 1
                    } : {
                        remove: matchRslt.index,
                        caret: pos - 1
                    } : "-" === chrs ? "" !== opts.negationSymbol.back ? {
                        pos: matchRslt.index,
                        c: opts.negationSymbol.front,
                        caret: pos + 1,
                        insert: {
                            pos: maskset.buffer.length - opts.suffix.length,
                            c: opts.negationSymbol.back
                        }
                    } : {
                        pos: matchRslt.index,
                        c: opts.negationSymbol.front,
                        caret: pos + 1
                    } : {
                        pos: matchRslt.index,
                        c: chrs,
                        caret: pos + 1
                    };
                }
                return !1;
            },
            radixHandler: function(chrs, maskset, pos, strict, opts) {
                if (!strict && opts.numericInput !== !0 && chrs === opts.radixPoint && void 0 !== opts.digits && (isNaN(opts.digits) || parseInt(opts.digits) > 0)) {
                    var radixPos = $.inArray(opts.radixPoint, maskset.buffer), integerValue = maskset.buffer.join("").match(opts.regex.integerPart(opts));
                    if (-1 !== radixPos && maskset.validPositions[radixPos]) return maskset.validPositions[radixPos - 1] ? {
                        caret: radixPos + 1
                    } : {
                        pos: integerValue.index,
                        c: integerValue[0],
                        caret: radixPos + 1
                    };
                    if (!integerValue || "0" === integerValue[0] && integerValue.index + 1 !== pos) return maskset.buffer[integerValue ? integerValue.index : pos] = "0", 
                    {
                        pos: (integerValue ? integerValue.index : pos) + 1,
                        c: opts.radixPoint
                    };
                }
                return !1;
            },
            leadingZeroHandler: function(chrs, maskset, pos, strict, opts, isSelection) {
                if (!strict) if (opts.numericInput === !0) {
                    var buffer = maskset.buffer.slice("").reverse(), char = buffer[opts.prefix.length];
                    if ("0" === char && void 0 === maskset.validPositions[pos - 1]) return {
                        pos: pos,
                        remove: buffer.length - opts.prefix.length - 1
                    };
                } else {
                    var radixPosition = $.inArray(opts.radixPoint, maskset.buffer), matchRslt = maskset.buffer.slice(0, -1 !== radixPosition ? radixPosition : void 0).join("").match(opts.regex.integerNPart(opts));
                    if (matchRslt && (-1 === radixPosition || radixPosition >= pos)) {
                        var decimalPart = -1 === radixPosition ? 0 : parseInt(maskset.buffer.slice(radixPosition + 1).join(""));
                        if (0 === matchRslt[0].indexOf("" !== opts.placeholder ? opts.placeholder.charAt(0) : "0") && (matchRslt.index + 1 === pos || isSelection !== !0 && 0 === decimalPart)) return maskset.buffer.splice(matchRslt.index, 1), 
                        {
                            pos: matchRslt.index,
                            remove: matchRslt.index
                        };
                        if ("0" === chrs && pos <= matchRslt.index && matchRslt[0] !== opts.groupSeparator) return !1;
                    }
                }
                return !0;
            },
            definitions: {
                "~": {
                    validator: function(chrs, maskset, pos, strict, opts, isSelection) {
                        var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
                        if (!isValid && (isValid = opts.radixHandler(chrs, maskset, pos, strict, opts), 
                        !isValid && (isValid = strict ? new RegExp("[0-9" + Inputmask.escapeRegex(opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs), 
                        isValid === !0 && (isValid = opts.leadingZeroHandler(chrs, maskset, pos, strict, opts, isSelection), 
                        isValid === !0)))) {
                            var radixPosition = $.inArray(opts.radixPoint, maskset.buffer);
                            isValid = -1 !== radixPosition && (opts.digitsOptional === !1 || maskset.validPositions[pos]) && opts.numericInput !== !0 && pos > radixPosition && !strict ? {
                                pos: pos,
                                remove: pos
                            } : {
                                pos: pos
                            };
                        }
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                        return isValid;
                    },
                    cardinality: 1
                },
                "+": {
                    validator: function(chrs, maskset, pos, strict, opts) {
<<<<<<< HEAD
                        return opts.allowMinus && ("-" === chrs || chrs === opts.negationSymbol.front);
=======
                        var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
                        return !isValid && (strict && opts.allowMinus && chrs === opts.negationSymbol.front || opts.allowMinus && "-" === chrs || opts.allowPlus && "+" === chrs) && (isValid = strict || "-" !== chrs ? !0 : "" !== opts.negationSymbol.back ? {
                            pos: pos,
                            c: "-" === chrs ? opts.negationSymbol.front : "+",
                            caret: pos + 1,
                            insert: {
                                pos: maskset.buffer.length,
                                c: opts.negationSymbol.back
                            }
                        } : {
                            pos: pos,
                            c: "-" === chrs ? opts.negationSymbol.front : "+",
                            caret: pos + 1
                        }), isValid;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    },
                    cardinality: 1,
                    placeholder: ""
                },
                "-": {
                    validator: function(chrs, maskset, pos, strict, opts) {
<<<<<<< HEAD
                        return opts.allowMinus && chrs === opts.negationSymbol.back;
=======
                        var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
                        return !isValid && strict && opts.allowMinus && chrs === opts.negationSymbol.back && (isValid = !0), 
                        isValid;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    },
                    cardinality: 1,
                    placeholder: ""
                },
                ":": {
                    validator: function(chrs, maskset, pos, strict, opts) {
<<<<<<< HEAD
                        var radix = "[" + Inputmask.escapeRegex(opts.radixPoint) + "]", isValid = new RegExp(radix).test(chrs);
                        return isValid && maskset.validPositions[pos] && maskset.validPositions[pos].match.placeholder === opts.radixPoint && (isValid = {
                            caret: pos + 1
                        }), isValid;
=======
                        var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
                        if (!isValid) {
                            var radix = "[" + Inputmask.escapeRegex(opts.radixPoint) + "]";
                            isValid = new RegExp(radix).test(chrs), isValid && maskset.validPositions[pos] && maskset.validPositions[pos].match.placeholder === opts.radixPoint && (isValid = {
                                caret: pos + 1
                            });
                        }
                        return isValid ? {
                            c: opts.radixPoint
                        } : isValid;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                    },
                    cardinality: 1,
                    placeholder: function(opts) {
                        return opts.radixPoint;
                    }
                }
            },
            onUnMask: function(maskedValue, unmaskedValue, opts) {
<<<<<<< HEAD
                if ("" === unmaskedValue && !0 === opts.nullable) return unmaskedValue;
                var processValue = maskedValue.replace(opts.prefix, "");
                return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                "" !== opts.placeholder.charAt(0) && (processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0")), 
                opts.unmaskAsNumber ? ("" !== opts.radixPoint && -1 !== processValue.indexOf(opts.radixPoint) && (processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".")), 
                processValue = processValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-"), 
                processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), 
                Number(processValue)) : processValue;
            },
            isComplete: function(buffer, opts) {
                var maskedValue = buffer.join("");
                if (buffer.slice().join("") !== maskedValue) return !1;
=======
                var processValue = maskedValue.replace(opts.prefix, "");
                return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                opts.unmaskAsNumber ? ("" !== opts.radixPoint && -1 !== processValue.indexOf(opts.radixPoint) && (processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".")), 
                Number(processValue)) : processValue;
            },
            isComplete: function(buffer, opts) {
                var maskedValue = buffer.join(""), bufClone = buffer.slice();
                if (opts.postFormat(bufClone, 0, opts), bufClone.join("") !== maskedValue) return !1;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                var processValue = maskedValue.replace(opts.prefix, "");
                return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                "," === opts.radixPoint && (processValue = processValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".")), 
                isFinite(processValue);
            },
            onBeforeMask: function(initialValue, opts) {
<<<<<<< HEAD
                if (opts.isNegative = undefined, initialValue = initialValue.toString().charAt(initialValue.length - 1) === opts.radixPoint ? initialValue.toString().substr(0, initialValue.length - 1) : initialValue.toString(), 
                "" !== opts.radixPoint && isFinite(initialValue)) {
                    var vs = initialValue.split("."), groupSize = "" !== opts.groupSeparator ? parseInt(opts.groupSize) : 0;
                    2 === vs.length && (vs[0].length > groupSize || vs[1].length > groupSize || vs[0].length <= groupSize && vs[1].length < groupSize) && (initialValue = initialValue.replace(".", opts.radixPoint));
                }
                var kommaMatches = initialValue.match(/,/g), dotMatches = initialValue.match(/\./g);
                if (dotMatches && kommaMatches ? dotMatches.length > kommaMatches.length ? (initialValue = initialValue.replace(/\./g, ""), 
                initialValue = initialValue.replace(",", opts.radixPoint)) : kommaMatches.length > dotMatches.length ? (initialValue = initialValue.replace(/,/g, ""), 
                initialValue = initialValue.replace(".", opts.radixPoint)) : initialValue = initialValue.indexOf(".") < initialValue.indexOf(",") ? initialValue.replace(/\./g, "") : initialValue = initialValue.replace(/,/g, "") : initialValue = initialValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                0 === opts.digits && (-1 !== initialValue.indexOf(".") ? initialValue = initialValue.substring(0, initialValue.indexOf(".")) : -1 !== initialValue.indexOf(",") && (initialValue = initialValue.substring(0, initialValue.indexOf(",")))), 
=======
                if ("" !== opts.radixPoint && isFinite(initialValue)) initialValue = initialValue.toString().replace(".", opts.radixPoint); else {
                    var kommaMatches = initialValue.match(/,/g), dotMatches = initialValue.match(/\./g);
                    dotMatches && kommaMatches ? dotMatches.length > kommaMatches.length ? (initialValue = initialValue.replace(/\./g, ""), 
                    initialValue = initialValue.replace(",", opts.radixPoint)) : kommaMatches.length > dotMatches.length ? (initialValue = initialValue.replace(/,/g, ""), 
                    initialValue = initialValue.replace(".", opts.radixPoint)) : initialValue = initialValue.indexOf(".") < initialValue.indexOf(",") ? initialValue.replace(/\./g, "") : initialValue = initialValue.replace(/,/g, "") : initialValue = initialValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
                }
                if (0 === opts.digits && (-1 !== initialValue.indexOf(".") ? initialValue = initialValue.substring(0, initialValue.indexOf(".")) : -1 !== initialValue.indexOf(",") && (initialValue = initialValue.substring(0, initialValue.indexOf(",")))), 
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
                "" !== opts.radixPoint && isFinite(opts.digits) && -1 !== initialValue.indexOf(opts.radixPoint)) {
                    var valueParts = initialValue.split(opts.radixPoint), decPart = valueParts[1].match(new RegExp("\\d*"))[0];
                    if (parseInt(opts.digits) < decPart.toString().length) {
                        var digitsFactor = Math.pow(10, parseInt(opts.digits));
                        initialValue = initialValue.replace(Inputmask.escapeRegex(opts.radixPoint), "."), 
                        initialValue = Math.round(parseFloat(initialValue) * digitsFactor) / digitsFactor, 
                        initialValue = initialValue.toString().replace(".", opts.radixPoint);
                    }
                }
<<<<<<< HEAD
                return initialValue;
            },
            canClearPosition: function(maskset, position, lvp, strict, opts) {
                var vp = maskset.validPositions[position], canClear = vp.input !== opts.radixPoint || null !== maskset.validPositions[position].match.fn && !1 === opts.decimalProtect || vp.input === opts.radixPoint && maskset.validPositions[position + 1] && null === maskset.validPositions[position + 1].match.fn || isFinite(vp.input) || position === lvp || vp.input === opts.groupSeparator || vp.input === opts.negationSymbol.front || vp.input === opts.negationSymbol.back;
                return !canClear || "+" != vp.match.nativeDef && "-" != vp.match.nativeDef || (opts.isNegative = !1), 
                canClear;
=======
                return initialValue.toString();
            },
            canClearPosition: function(maskset, position, lvp, strict, opts) {
                var positionInput = maskset.validPositions[position].input, canClear = positionInput !== opts.radixPoint || null !== maskset.validPositions[position].match.fn && opts.decimalProtect === !1 || isFinite(positionInput) || position === lvp || positionInput === opts.groupSeparator || positionInput === opts.negationSymbol.front || positionInput === opts.negationSymbol.back;
                return canClear;
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            },
            onKeyDown: function(e, buffer, caretPos, opts) {
                var $input = $(this);
                if (e.ctrlKey) switch (e.keyCode) {
                  case Inputmask.keyCode.UP:
                    $input.val(parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step)), $input.trigger("setvalue");
                    break;

                  case Inputmask.keyCode.DOWN:
                    $input.val(parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step)), $input.trigger("setvalue");
                }
            }
        },
        currency: {
            prefix: "$ ",
            groupSeparator: ",",
            alias: "numeric",
            placeholder: "0",
            autoGroup: !0,
            digits: 2,
            digitsOptional: !1,
            clearMaskOnLostFocus: !1
        },
        decimal: {
            alias: "numeric"
        },
        integer: {
            alias: "numeric",
            digits: 0,
            radixPoint: ""
        },
        percentage: {
            alias: "numeric",
            digits: 2,
<<<<<<< HEAD
            digitsOptional: !0,
=======
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            radixPoint: ".",
            placeholder: "0",
            autoGroup: !1,
            min: 0,
            max: 100,
            suffix: " %",
<<<<<<< HEAD
=======
            allowPlus: !1,
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
            allowMinus: !1
        }
    }), Inputmask;
});