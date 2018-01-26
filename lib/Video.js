'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('./config');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** 
 * Object for 
 * the config argument is the main configuration object passed to the instantitation
 * @param options
 * @constructor
 */
var Video = function Video(options) {
    _classCallCheck(this, Video);

    this.options.videoID = null;
    this.options.providerType = null;
    this.options.startTime = null;
    this.options.endTime = null;
}

//     const _getEndpoint = (apiUrl)=>{
//         return apiUrl;
//     };

//     const _createIFrameHTML = ()=>{

//     };

//     const _init = ()=>{

//     };

//     return {
//       test: ()=>{
//         console.log('HELLO!?');
//       },

//       getEmbedCode: ()=>{
//         return _getEndpoint();
//       },

//       subscribeEvents: ()=>{

//       },

//       play: ()=>{

//       },

//       pause: ()=>{

//       },

//       skip: ()=>{

//       },

//       end: ()=>{

//       },

//       dispatchPlayTime: ()=>{

//       }
//     };
;

exports.default = Video;