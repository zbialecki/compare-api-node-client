'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = require('../../utilities');

var _utilities2 = require('./utilities');

var _getViewerURL = require('./getViewerURL');

var _getViewerURL2 = _interopRequireDefault(_getViewerURL);

var _urls = require('./urls');

var _fileTypes = require('./fileTypes');

var _Comparison = require('./Comparison');

var _Comparison2 = _interopRequireDefault(_Comparison);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ComparisonsEndpoint = function () {
    _createClass(ComparisonsEndpoint, [{
        key: 'accountId',
        get: function get() {
            return this.__needleClient.accountId;
        }
    }, {
        key: 'authToken',
        get: function get() {
            return this.__needleClient.authToken;
        }
    }]);

    function ComparisonsEndpoint(_ref) {
        var _this = this;

        var accountId = _ref.accountId,
            authToken = _ref.authToken;

        _classCallCheck(this, ComparisonsEndpoint);

        this.getAll = function () {
            return _this.__needleClient.get(_urls.comparisonsEndpointURL).then(function (data) {
                if (!data || !data.results) {
                    throw new Error('Unexpected response received - expected object with non-null results array, instead got: ' + JSON.stringify(data));
                }
                return data.results.map(function (data) {
                    return new _Comparison2.default(data);
                });
            });
        };

        this.get = function (identifier) {
            return _this.__needleClient.get((0, _urls.getComparisonEndpointURL)({ identifier: identifier })).then(function (data) {
                if (!data) {
                    throw new Error('Unexpected response received - expected non-empty comparison object, instead got nothing.');
                }
                return new _Comparison2.default(data);
            });
        };

        this.create = function (_ref2) {
            var left = _ref2.left,
                right = _ref2.right,
                identifier = _ref2.identifier,
                publiclyAccessible = _ref2.publiclyAccessible,
                expires = _ref2.expires;

            var multipartRequired = false;
            function getSideData(side, data) {
                if (data.fileType == null || typeof data.fileType !== "string") {
                    throw new Error('Invalid file type given - file type must be a string.');
                }
                if (_fileTypes.allowedFileTypes[data.fileType.toLowerCase()] == null) {
                    throw new Error('Invalid file type "' + data.fileType.toLowerCase() + '" given. Expected one of ("' + Object.keys(_fileTypes.allowedFileTypes).join('", "') + '").');
                }
                var sideData = {};
                sideData.file_type = data.fileType;
                if (data.displayName) {
                    sideData.display_name = data.displayName;
                }
                if (typeof data.source === 'string') {
                    sideData.source_url = data.source;
                } else {
                    sideData.file = { content_type: 'application/octet-stream', filename: side + '.' + data.fileType, buffer: data.source };
                    multipartRequired = true;
                }
                return sideData;
            }

            try {
                if (expires) {
                    if (typeof expires === 'string') {
                        expires = Date.parse(expires);
                    }
                    if (typeof expires === 'number') {
                        expires = new Date(expires);
                    }
                    expires = expires.toISOString();
                }
                var data = {
                    identifier: identifier,
                    left: getSideData('left', left),
                    right: getSideData('right', right),
                    public: publiclyAccessible,
                    expiry_time: expires
                };
                return _this.__needleClient.post(_urls.comparisonsEndpointURL, data, multipartRequired).then(function (data) {
                    if (!data) {
                        throw new Error('Unexpected response received - expected non-empty comparison object, instead got nothing.');
                    }
                    return new _Comparison2.default(data);
                });
            } catch (error) {
                return Promise.reject(error);
            }
        };

        this.destroy = function (identifier) {
            return _this.__needleClient.destroy((0, _urls.getComparisonEndpointURL)({ identifier: identifier }));
        };

        this.generateIdentifier = function () {
            return (0, _utilities2.generateIdentifier)();
        };

        this.publicViewerURL = function (identifier, wait) {
            return (0, _getViewerURL2.default)(_this.accountId, null, identifier, null, wait || false);
        };

        this.signedViewerURL = function (identifier, valid_until, wait) {
            return (0, _getViewerURL2.default)(_this.accountId, _this.authToken, identifier, valid_until || Date.now() + 30 * 60 * 1000, wait || false);
        };

        this.__needleClient = new _utilities.AuthenticatedNeedleClient({ accountId: accountId, authToken: authToken });
    }

    return ComparisonsEndpoint;
}();

exports.default = ComparisonsEndpoint;