'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = hexHMAC;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hexHMAC(key, policy) {
    var hmacAlgorithm = _crypto2.default.createHmac('sha256', key);
    var jsonPolicy = JSON.stringify(policy);
    return hmacAlgorithm.update(jsonPolicy, 'utf8').digest('hex');
}