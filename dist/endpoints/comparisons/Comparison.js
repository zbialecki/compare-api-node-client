'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Comparison = function Comparison(data) {
    _classCallCheck(this, Comparison);

    this.identifier = data.identifier;
    this.left = {
        fileType: data.left.file_type,
        sourceURL: data.left.source_url,
        displayName: data.left.display_name
    };
    this.right = {
        fileType: data.right.file_type,
        sourceURL: data.right.source_url,
        displayName: data.right.display_name
    };
    this.publiclyAccessible = data.public || false;
    this.creationTime = new Date(Date.parse(data.creation_time));
    if (data.expiry_time) this.expiryTime = new Date(Date.parse(data.expiry_time));
    this.ready = data.ready;
    if (data.failed != null) this.failed = data.failed;
    if (data.error_message != null) this.errorMessage = data.error_message;
};

exports.default = Comparison;