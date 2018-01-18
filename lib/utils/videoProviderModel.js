"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var videoProviderModel = {

        get: function get(args) {
                return new Promise(function (resolve, reject) {
                        var xhr = new XMLHttpRequest();
                        xhr.open("GET", args.url);
                        xhr.onload = function () {
                                return resolve(xhr.responseText);
                        };
                        xhr.onerror = function () {
                                return reject(xhr.statusText);
                        };
                        xhr.send();
                });
        }
};

exports.default = videoProviderModel;