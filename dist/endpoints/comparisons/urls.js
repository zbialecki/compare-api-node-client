'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.comparisonsEndpointURL = undefined;
exports.getComparisonEndpointURL = getComparisonEndpointURL;
exports.getComparisonViewerURL = getComparisonViewerURL;

var _urls = require('../urls');

var comparisonsEndpointURL = exports.comparisonsEndpointURL = _urls.apiBaseURL + '/comparisons';

function getComparisonEndpointURL(_ref) {
    var identifier = _ref.identifier;

    return comparisonsEndpointURL + '/' + identifier;
}

function getComparisonViewerURL(_ref2) {
    var accountId = _ref2.accountId,
        identifier = _ref2.identifier;

    return comparisonsEndpointURL + '/viewer/' + accountId + '/' + identifier;
}