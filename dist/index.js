'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.client = client;

var _endpoints = require('./endpoints');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function () {
    function Client(_ref) {
        var accountId = _ref.accountId,
            authToken = _ref.authToken;

        _classCallCheck(this, Client);

        this.__accountId = accountId;
        this.__authToken = authToken;
    }

    _createClass(Client, [{
        key: 'comparisons',
        get: function get() {
            return this.__comparisons || (this.__comparisons = new _endpoints.ComparisonsEndpoint({ accountId: this.__accountId, authToken: this.__authToken }));
        }
    }]);

    return Client;
}();

function client(accountId, authToken) {
    return new Client({ accountId: accountId, authToken: authToken });
}