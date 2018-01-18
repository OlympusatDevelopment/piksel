'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('./config');

/** 
 * Object for 
 * the config argument is the main configuration object passed to the instantitation
 * @param options
 * @constructor
 */
var Video = function Video(options) {
    options = {
        videoID: null,
        providerType: null,
        startTime: null,
        endTime: null
    };

    var _createEndpoint = function _createEndpoint() {};

    var _createIFrameHTML = function _createIFrameHTML() {};

    var _init = function _init() {};

    return {
        test: function test() {
            console.log('HELLO!?');
        },

        getEmbedCode: function getEmbedCode() {},

        subscribeEvents: function subscribeEvents() {},

        play: function play() {},

        pause: function pause() {},

        skip: function skip() {},

        end: function end() {},

        dispatchPlayTime: function dispatchPlayTime() {}
    };
};

exports.default = Video;