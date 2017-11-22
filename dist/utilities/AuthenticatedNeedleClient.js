'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _needle = require('needle');

var _needle2 = _interopRequireDefault(_needle);

var _utilities = require('../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthenticatedNeedleClient = function () {
    function AuthenticatedNeedleClient(_ref) {
        var accountId = _ref.accountId,
            authToken = _ref.authToken;

        _classCallCheck(this, AuthenticatedNeedleClient);

        this.accountId = accountId;
        this.authToken = authToken;
    }

    _createClass(AuthenticatedNeedleClient, [{
        key: '__needle_get',
        value: function __needle_get(url, parameters, callback) {
            _needle2.default.request('GET', url, parameters, {
                json: true,
                accept: 'application/json',
                decode: true,
                headers: {
                    'Authorization': 'Token ' + this.authToken
                }
            }, callback);
        }
    }, {
        key: '__needle_post',
        value: function __needle_post(url, multipart, data, callback) {
            _needle2.default.request('POST', url, data, {
                multipart: multipart,
                json: !multipart,
                accept: 'application/json',
                decode: true,
                headers: {
                    'Authorization': 'Token ' + this.authToken
                }
            }, callback);
        }
    }, {
        key: '__needle_delete',
        value: function __needle_delete(url, callback) {
            _needle2.default.request('DELETE', url, null, {
                json: true,
                accept: 'application/json',
                decode: true,
                headers: {
                    'Authorization': 'Token ' + this.authToken
                }
            }, callback);
        }
    }, {
        key: '__needlePromiseCallback',
        value: function __needlePromiseCallback(_ref2) {
            var expectedStatusCode = _ref2.expectedStatusCode,
                resolve = _ref2.resolve,
                reject = _ref2.reject;

            return function (error, response) {
                if (error) {
                    reject(new _utilities.WrappedError("Unable to submit request.", error));
                } else if (response.statusCode !== expectedStatusCode) {
                    var bodyDescription = response.body ? " Response body: " + JSON.stringify(response.body) : "";
                    if (response.statusCode === 404) {
                        reject(new Error('Not found.' + bodyDescription));
                    }
                    if (response.statusCode === 400) {
                        reject(new Error('Bad request.' + bodyDescription));
                    }
                    if (response.statusCode === 401) {
                        reject(new Error('Authentication failed.' + bodyDescription));
                    }
                    if (response.statusCode === 403) {
                        reject(new Error('Unable to authenticate.' + bodyDescription));
                    }
                    reject(new Error('Unknown response received (status code was \'' + response.statusCode + '\', but we expected \'' + expectedStatusCode + '\').' + bodyDescription));
                } else {
                    resolve(response.body);
                }
            };
        }
    }, {
        key: 'get',
        value: function get(url, parameters) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                return _this.__needle_get(url, parameters, _this.__needlePromiseCallback({ expectedStatusCode: 200, resolve: resolve, reject: reject }));
            });
        }
    }, {
        key: 'post',
        value: function post(url, data, multipart) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                return _this2.__needle_post(url, multipart || false, data, _this2.__needlePromiseCallback({ expectedStatusCode: 201, resolve: resolve, reject: reject }));
            });
        }
    }, {
        key: 'destroy',
        value: function destroy(url) {
            var _this3 = this;

            // Needle still returns an object as response.body when there's no content. (It contains an empty buffer.) We just ignore it in favor of returning null.
            new Promise(function (resolve, reject) {
                return _this3.__needle_delete(url, _this3.__needlePromiseCallback({ expectedStatusCode: 204, resolve: resolve, reject: reject }));
            }).then(function (data) {
                return null;
            });
        }
    }]);

    return AuthenticatedNeedleClient;
}();

exports.default = AuthenticatedNeedleClient;