import merge from "../help/merge.js";

function getEncodingHeight(encoding, options) {
	return options.height +
		((options.displayValue && encoding.text.length > 0) ? options.fontSize + options.textMargin : 0) +
		options.marginTop +
		options.marginBottom;
}

function getBarcodePadding(textWidth, barcodeWidth, options) {
	if (options.displayValue && barcodeWidth < textWidth) {
		if (options.textAlign == "center") {
			return Math.floor((textWidth - barcodeWidth) / 2);
		} else if (options.textAlign == "left") {
			return 0;
		} else if (options.textAlign == "right") {
			return Math.floor(textWidth - barcodeWidth);
		}
	}
	return 0;
}

function calculateEncodingAttributes(encodings, barcodeOptions, context) {
	for (let i = 0; i < encodings.length; i++) {
		var encoding = encodings[i];
		var options = merge(barcodeOptions, encoding.options);

		// Calculate the width of the encoding
		var textWidth;
		if (options.displayValue) {
			textWidth = messureText(encoding.text, options, context);
		} else {
			textWidth = 0;
		}

		var barcodeWidth = encoding.data.length * options.width;
		encoding.width = Math.ceil(Math.max(textWidth, barcodeWidth));

		encoding.height = getEncodingHeight(encoding, options);

		encoding.barcodePadding = getBarcodePadding(textWidth, barcodeWidth, options);
	}
}

function getTotalWidthOfEncodings(encodings) {
	var totalWidth = 0;
	for (let i = 0; i < encodings.length; i++) {
		totalWidth += encodings[i].width;
	}
	return totalWidth;
}

function getMaximumHeightOfEncodings(encodings) {
	var maxHeight = 0;
	for (let i = 0; i < encodings.length; i++) {
		if (encodings[i].height > maxHeight) {
			maxHeight = encodings[i].height;
		}
	}
	return maxHeight;
}

function messureText(string, options, context) {
	var ctx;

	if (context) {
		ctx = context;
	} else if (typeof document !== "undefined") {
		ctx = document.createElement("canvas").getContext("2d");
	} else {
		// If the text cannot be messured we will return 0.
		// This will make some barcode with big text render incorrectly
		return 0;
	}
	let font = ""
	if (options.fontOptions) {
		font = options.fontOptions

	}
	if (options.fontSize != null) {
		if (font) {
			font = font + " "
		}
		font = font + options.fontSize + "px"
		if (options.font) {
			if (font) {
				font = font + " "
			}
			font = font + options.font
		}
	}

	ctx.font = font;
	// ctx.setFontSize(options.fontSize)
	// Calculate the width of the encoding
	var size = ctx.measureText(string).width;

	return size;
}

export {
	getMaximumHeightOfEncodings,
	getEncodingHeight,
	getBarcodePadding,
	calculateEncodingAttributes,
	getTotalWidthOfEncodings
};
