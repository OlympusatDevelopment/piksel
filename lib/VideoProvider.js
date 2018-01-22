'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('./config');

var _videoProviderModel = require('./utils/videoProviderModel');

var _videoProviderModel2 = _interopRequireDefault(_videoProviderModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** 
 * Object for 
 * the config argument is the main configuration object passed to the instantitation
 * @param options
 * @constructor
 */
var VideoProvider = function VideoProvider(config) {
    config = {
        endpointURL: null,
        apiKey: null,
        pingInterval: null,
        startTime: null,
        endTime: null
    };

    var _getEndpointURL = function _getEndpointURL(providerType) {
        return _config.PIKSEL_ENDPOINT.replace('{APP_TOKEN}', '').replace('{PROJECT_UUID}', '');
    };

    var _getEmbedCode = function _getEmbedCode(endpointURL) {
        return _videoProviderModel2.default.get({ url: endpointURL }).then(function (res) {
            console.log(btoa(res.WsEmbedResponse.embedcode));
            return btoa(res.WsEmbedResponse.embedcode);
        });
    };

    var _init = function _init() {
        var endpointURL = _getEndpointURL();

        _getEmbedCode(endpointURL);
    };

    return {
        test: function test() {
            console.log('HELLO!?');
        },

        getEmbedCode: function getEmbedCode() {
            return _getEmbedCode();
        },

        publishEvents: function publishEvents() {},

        play: function play() {},

        pause: function pause() {},

        skip: function skip() {},

        dispatchPlayTime: function dispatchPlayTime() {}
    };
};

exports.default = VideoProvider;