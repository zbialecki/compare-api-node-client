'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hexHMAC = exports.randomString = exports.AuthenticatedNeedleClient = exports.WrappedError = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isStream = isStream;
exports.dataContainsStream = dataContainsStream;

var _WrappedError = require('./WrappedError');

var _WrappedError2 = _interopRequireDefault(_WrappedError);

var _AuthenticatedNeedleClient = require('./AuthenticatedNeedleClient');

var _AuthenticatedNeedleClient2 = _interopRequireDefault(_AuthenticatedNeedleClient);

var _randomString = require('./randomString');

var _randomString2 = _interopRequireDefault(_randomString);

var _hexHMAC = require('./hexHMAC');

var _hexHMAC2 = _interopRequireDefault(_hexHMAC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.WrappedError = _WrappedError2.default;
exports.AuthenticatedNeedleClient = _AuthenticatedNeedleClient2.default;
exports.randomString = _randomString2.default;
exports.hexHMAC = _hexHMAC2.default;
function isStream(object) {
    return object && object.pipe && typeof object.pipe === "function";
}

function dataContainsStream(data) {
    if (Array.isArray(data)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var value = _step.value;

                if (value) {
                    if (isStream(value)) {
                        return true;
                    }
                    if (dataContainsStream(value)) {
                        return true;
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

        return false;
    }
    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== "object") {
        return false;
    }
    for (var key in data) {
        if (!data.hasOwnProperty(key)) {
            continue;
        }
        var _value = data[key];
        if (_value) {
            if (isStream(_value)) {
                return true;
            }
            if (dataContainsStream(_value)) {
                return true;
            }
        }
    }
    return false;
}