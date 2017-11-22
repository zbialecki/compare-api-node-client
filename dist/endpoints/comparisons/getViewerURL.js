'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getViewerURL;

var _urls = require('./urls');

var _utilities = require('../../utilities');

function getViewerURL(accountId, authToken, identifier, valid_until, wait) {
    var baseURL = (0, _urls.getComparisonViewerURL)({ accountId: accountId, identifier: identifier });
    if (!valid_until) {
        return '' + baseURL + (wait ? '?wait' : '');
    }
    if (typeof valid_until === "string") {
        valid_until = Date.parse(valid_until);
    }
    if (typeof valid_until !== "number") {
        valid_until = Number(valid_until);
    }
    // `valid_until` should now be in milliseconds since the UNIX epoch by this point. We want it to be in seconds since the UNIX epoch.
    valid_until = Math.floor(valid_until / 1000);

    var policy = {
        account_id: accountId,
        identifier: identifier,
        valid_until: valid_until
    };
    if (!authToken) {
        throw Error("Signing a link requires an authToken.");
    }
    var signature = (0, _utilities.hexHMAC)(authToken, policy);
    return baseURL + '?valid_until=' + valid_until + '&signature=' + signature + (wait ? '&wait' : '');
}