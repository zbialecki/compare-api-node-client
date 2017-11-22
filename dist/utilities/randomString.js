"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = randomString;

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tryGetBytes(length) {
    var bytes = void 0;
    for (var attempt = 0; attempt < 100; ++attempt) {
        try {
            bytes = _crypto2.default.randomBytes(length);
            break;
        } catch (error) {}
    }
    if (!bytes) {
        throw new Error("Unable to generate random bytes (attempted 100 times...)");
    }
    var byteArray = [];
    for (var i = 0; i < length; ++i) {
        byteArray.push(bytes.readUInt8(i));
    }
    return byteArray;
}

function randomString(length, charset) {
    var chars = charset.length;
    if (chars > 256) {
        throw new Error("randomString only accepts charsets at most 256 characters.");
    }

    var byteRejectionThreshold = 256 - 256 % chars;
    var result = '';
    while (length > 0) {
        var probablyEnoughBytes = Math.ceil(length * 256 / byteRejectionThreshold + 1 + length / 6);
        var bytes = tryGetBytes(probablyEnoughBytes);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = bytes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var byte = _step.value;

                if (byte < byteRejectionThreshold) {
                    result += charset.charAt(byte % chars);
                    --length;
                    if (length == 0) {
                        break;
                    }
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    return result;
}