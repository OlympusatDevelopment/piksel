'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import {
//     PIKSEL_API_KEY,
//     PIKSEL_ENDPOINT
// } from './config';


var _videoProviderModel = require('./utils/videoProviderModel');

var _videoProviderModel2 = _interopRequireDefault(_videoProviderModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** 
 * Object for 
 * the config argument is the main configuration object passed to the instantitation
 * @param options
 * @constructor apiKey, endpoint
 */
var VideoProvider = function () {
    function VideoProvider() {
        var apiKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var endpoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        _classCallCheck(this, VideoProvider);

        this.config = {
            endpoint: this.endpoint,
            apiKey: this.apiKey,
            pingInterval: null,
            startTime: null,
            endTime: null
        };
    }

    _createClass(VideoProvider, [{
        key: '_getEndpointURL',
        value: function _getEndpointURL(providerType) {
            if (this.endpoint) return this.endpoint;

            return ENDPOINT.replace('{API_KEY}', this.config.apiKey);
            // .replace('{PROJECT_UUID}', '');
        }
    }, {
        key: '_getEmbedCode',
        value: function _getEmbedCode(endpointURL) {
            if (this.embedCode) return this.embedCode;

            return _videoProviderModel2.default.get({ url: endpointURL }).then(function (res) {
                console.log(btoa(res.WsEmbedResponse.embedcode)); // decode embed code from base64
                return btoa(res.WsEmbedResponse.embedcode);
            });
        }
    }, {
        key: '_init',
        value: function _init() {
            var endpointURL = _getEndpointURL();

            _getEmbedCode(endpointURL);
        }
    }, {
        key: 'getEmbedCode',
        value: function getEmbedCode() {
            return _getEmbedCode();
        }
    }, {
        key: 'publishEvents',
        value: function publishEvents() {}
    }, {
        key: 'play',
        value: function play() {}
    }, {
        key: 'pause',
        value: function pause() {}
    }, {
        key: 'skip',
        value: function skip() {}
    }, {
        key: 'dispatchPlayTime',
        value: function dispatchPlayTime() {}
    }]);

    return VideoProvider;
}();

exports.default = VideoProvider;