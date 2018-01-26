'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import {
//     PIKSEL_API_KEY,
//     PIKSEL_ENDPOINT
// } from './options';


var _pikselModel = require('./models/pikselModel');

var _pikselModel2 = _interopRequireDefault(_pikselModel);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const piksel = {
//   play:()=>{},
//   pause: ()=>{},
//   load:()=>{},
//   seekFwd: ()=>{},
//   seekBack:()=>{},
//   skipTo: (seconds)=>{},
//   startAt: (seconds)=>{},
//   endAt: (seconds)=>{}  
//   }
/** 
 * Object for 
 * the options argument is the main optionsuration object passed to the instantitation
 * @param options
 * @constructor options
 */
var Piksel = function () {
  function Piksel(options) {
    _classCallCheck(this, Piksel);

    this.options = Object.assign({}, {
      basePlayerUrl: null,
      videoUUID: null,
      pingInterval: null,
      startTime: null,
      endTime: null,
      embedCode: null,
      playerReady: false,
      playerID: Math.floor(Math.random() * 100000),
      clientAPI: null,
      projectID: null,
      autoplay: false,
      width: '900px',
      height: '600px',
      injectID: null,
      overrideURL: false,
      _script: null
    }, options);

    this.options._callbackFnName = 'callback__' + this.options.playerID;
    this.options._appid = this.options.playerID + '__instance';
    this.events = {
      onReady: function onReady() {}
    };

    return this._initPlayer(this.options);
  }

  _createClass(Piksel, [{
    key: '_initPlayer',
    value: function _initPlayer(options) {
      var _this = this;

      return new _bluebird2.default(function (resolve, reject) {
        // Clean the base url if needed
        if (_this.options.basePlayerUrl.charAt(_this.options.basePlayerUrl.length - 1) === '/') {
          _this.options.basePlayerUrl = _this.options.basePlayerUrl.slice(0, -1);
        }
        _this.options['_playerUrl'] = _this._makePlayerUrl();
        _this._script = _this._makePlayerScript(_this.options);

        // Now that we've built the script, inject it
        _this._injectScript(_this.options.injectID, _this._script);

        _this._script.onerror = reject;

        // Once the player has loaded the video, set the context and resolve
        _this.events.onReady = function (player) {
          _this.playerReady = true;

          /**
           * Play/pause, etc are in the prototype
           * NOTE: This player is the SAME as the window.player_manager.playerInstances[this.options._appid]
           */
          _this.player = player;

          resolve(_this); // Resolve our Class, NOT the player itself
        };

        // This is our global callback used by the player script
        window[_this.options._callbackFnName] = _this.events.onReady;
      });
    }

    /**
     * Check for the embed element and add inject the script in the embed
     * @param {*} elemId 
     * @param {*} script 
     */

  }, {
    key: '_injectScript',
    value: function _injectScript(elemId, script) {
      var injectElement = document.getElementById(elemId);

      if (!injectElement) {
        throw new Error('The injectID (#' + this.options.injectID + ') does not reference a valid element on the DOM');
      }
      // const wrapper = document.createElement('div');
      // const wrapperId = `${this.options.injectID}-${this.options.playerID}__wrapper`;
      // wrapper.setAttribute('id', wrapperId);

      // Double wrap the script to prevent "Unexpected token errors in React"
      // injectElement
      //   .appendChild(wrapper);
      injectElement.appendChild(script);

      // document.getElementById(wrapperId)
      //   .appendChild(script);
    }
  }, {
    key: 'publishEvents',
    value: function publishEvents() {}
  }, {
    key: 'play',
    value: function play() {
      this.player.play();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.player.pause();
    }
  }, {
    key: 'speedIncrease',
    value: function speedIncrease() {
      this.player.playbackRate(this.getCurrentRate() + 0.5);
    }
  }, {
    key: 'speedDecrease',
    value: function speedDecrease() {
      this.player.playbackRate(this.getCurrentRate() - 0.5);
    }
  }, {
    key: 'getCurrentRate',
    value: function getCurrentRate() {
      return this.player.playbackRate();
    }
  }, {
    key: 'skip',
    value: function skip() {}
  }, {
    key: 'dispatchPlayTime',
    value: function dispatchPlayTime() {}
  }, {
    key: '_makePlayerUrl',
    value: function _makePlayerUrl() {
      if (this.options.overrideURL) {
        return this.options.overrideURL;
      } else {
        var base = '';

        if (this.options.projectID) {
          base = this.options.basePlayerUrl + '/p/' + this.options.projectID;
        } else if (this.options.videoUUID) {
          base = this.options.basePlayerUrl + '/v/' + this.options.videoUUID;
        }

        return base + '?embed=js&de-callback-method=' + this.options._callbackFnName + '&de-html-default=true&targetId=' + this.options.injectID + '&de-appid=' + this.options._appid;
      }
    }
  }, {
    key: '_makePlayerScript',
    value: function _makePlayerScript(_ref) {
      var playerID = _ref.playerID,
          _playerUrl = _ref._playerUrl;

      var script = document.createElement("script");
      script.setAttribute("src", _playerUrl);
      script.async = 1;
      script.setAttribute("id", playerID);

      return script;
    }
  }]);

  return Piksel;
}();

exports.default = Piksel;