'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
      embedCode: null,
      playerReady: false,
      playerID: Math.floor(Math.random() * 100000),
      clientAPI: null,
      projectID: null,

      autoplay: false,
      startTime: false, // in seconds. (Works only with autoplay)
      endTime: false, // in seconds. 
      defaultVolume: null, // Must be a string value
      theme: {
        defaultControlsColor: null, // hex string
        defaultControlsHoverColor: null // hex string
      },

      width: null,
      height: null,
      injectID: null,
      overrideURL: null,
      _script: null,
      _player: null,
      _injectElement: null
    }, options);

    this.options._callbackFnName = 'callback__' + this.options.playerID;
    this.options._appid = this.options.playerID + '__instance';
    this.events = {
      onReady: function onReady() {}
    };

    return this._initPlayer(this.options);
  }

  _createClass(Piksel, [{
    key: 'play',
    value: function play() {
      this._player.play();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this._player.pause();
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this._player.currentTime();
    }
  }, {
    key: 'setCurrentTime',
    value: function setCurrentTime(time) {
      this._player.currentTime(time);
    }
  }, {
    key: 'speedUp',
    value: function speedUp() {
      this._player.playbackRate(this.getCurrentRate() + 0.5);
    }
  }, {
    key: 'speedDown',
    value: function speedDown() {
      this._player.playbackRate(this.getCurrentRate() - 0.5);
    }
  }, {
    key: 'getCurrentRate',
    value: function getCurrentRate() {
      return this._player.playbackRate();
    }
  }, {
    key: 'getCurrentVolume',
    value: function getCurrentVolume() {
      return this._player.volume();
    }
  }, {
    key: 'mute',
    value: function mute() {
      this._player.volume(0);
    }
  }, {
    key: 'volumeUp',
    value: function volumeUp() {
      this._player.volume(this._player.volume() + 0.1);
    }
  }, {
    key: 'volumeDown',
    value: function volumeDown() {
      this._player.volume(this._player.volume() - 0.1);
    }
  }, {
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
          _this._playerReady = true;

          /**
           * Play/pause, etc are in the prototype
           * NOTE: This player is the SAME as the window.player_manager.playerInstances[this.options._appid]
           */
          _this._player = player;
          _this._proxyEvents(_this._player.el_.children[0]);

          resolve(_this); // Resolve our Class, NOT the player itself
        };

        // This is our global callback used by the player script
        window[_this.options._callbackFnName] = _this.events.onReady;
      });
    }
  }, {
    key: '_makePlayerUrl',
    value: function _makePlayerUrl() {
      if (this.options.overrideURL) {
        return this.options.overrideURL;
      } else {
        var base = '';

        // Decide if we're loading a project id or video/program id
        if (this.options.projectID) {
          base = this.options.basePlayerUrl + '/p/' + this.options.projectID;
        } else if (this.options.videoUUID) {
          base = this.options.basePlayerUrl + '/v/' + this.options.videoUUID;
        }

        var urlString = base + '?embed=js&de-callback-method=' + this.options._callbackFnName + '&de-html-default=true&targetId=' + this.options.injectID + '&de-appid=' + this.options._appid;

        // Support for additional player url parameters
        if (this.options.addonUrlParams) {
          urlString = urlString + '&' + this.options.addonUrlParams;
        }

        return this._buildPlayerOptions(urlString, this.options);
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

    /**
    * Check for the embed element and inject the script in the embed
    * @param {*} elemId 
    * @param {*} script 
    */

  }, {
    key: '_injectScript',
    value: function _injectScript(elemId, script) {
      this._injectElement = document.getElementById(elemId);

      if (!this._injectElement) {
        throw new Error('The injectID (#' + this.options.injectID + ') does not reference a valid element on the DOM');
      }

      this._injectElement.appendChild(script);
    }
  }, {
    key: '_buildPlayerOptions',
    value: function _buildPlayerOptions(url, options) {
      var _tmpUrl = url;
      var appendOption = function appendOption(str) {
        return function (option) {
          return str + '&' + option;
        };
      };

      // @todo create a map of the property name and the 'de-' parameter name, then loop through and set, instead of manually conditioning these
      if (options.autoplay) {
        _tmpUrl = appendOption(_tmpUrl)('de-autoPlay=' + options.autoplay);
      }
      if (options.defaultVolume) {
        _tmpUrl = appendOption(_tmpUrl)('de-volume=' + options.defaultVolume);
      }
      if (options.startTime) {
        _tmpUrl = appendOption(_tmpUrl)('de-start=' + options.startTime);
      }
      if (options.endTime) {
        _tmpUrl = appendOption(_tmpUrl)('de-end=' + options.endTime);
      }
      if (options.theme.defaultControlsColor) {
        _tmpUrl = appendOption(_tmpUrl)('de-color-default=' + options.theme.defaultControlsColor);
      }
      if (options.theme.defaultControlsHoverColor) {
        _tmpUrl = appendOption(_tmpUrl)('de-color-hover=' + options.theme.defaultControlsHoverColor);
      }
      // if (options.loop) { _tmpUrl = appendOption(_tmpUrl)(`de-loop=${options.loop}`); }

      return _tmpUrl;
    }
  }, {
    key: '_proxyEvents',
    value: function _proxyEvents(elem) {
      var self = this;
      var events = ['playing', 'pause', 'seeking', 'seeked', 'timeupdate', 'volumechange', 'ended', 'error', 'loadstart'];
      // document.body.addEventListener(`piksel__playing`, e => {
      //   console.log('piksel__timeupdate EVENT picked up', e, e.data.eventName, e.data.value);
      // });

      events.forEach(function (eventName) {
        return elem.addEventListener(eventName, function (e) {
          var _tmpEvent = new Event('piksel__' + self.options.playerID);
          var _tmpEventSpecific = new Event('piksel__' + eventName);

          var data = {
            value: self._decideEventValue(eventName),
            timestamp: Date.now(),
            playerID: self.options.playerID,
            videoID: self.options.videoUUID,
            eventName: eventName
          };

          _tmpEvent.data = data;
          _tmpEventSpecific.data = data;

          // Dispatch the events to the document.
          document.body.dispatchEvent(_tmpEvent);
          document.body.dispatchEvent(_tmpEventSpecific);
        });
      });
    }
  }, {
    key: '_decideEventValue',
    value: function _decideEventValue(eventName) {
      switch (eventName) {
        case 'timeupdate':
        case 'seeking':
        case 'seeked':
        case 'pause':
        case 'playing':
          return this._player.currentTime();
        case 'volumechange':
          return this._player.volume();
        default:
          return true;
      }
    }
  }]);

  return Piksel;
}();

exports.default = Piksel;