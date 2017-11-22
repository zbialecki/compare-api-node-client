'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateIdentifier = generateIdentifier;

var _utilities = require('../../utilities');

var randomIdentifierLength = 12;

var randomIdentifierCharset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generateIdentifier() {
    return (0, _utilities.randomString)(randomIdentifierLength, randomIdentifierCharset);
}