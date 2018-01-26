'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import {
//     PIKSEL_API_KEY,
//     PIKSEL_ENDPOINT
// } from './config';


var _pikselModel = require('./models/pikselModel');

var _pikselModel2 = _interopRequireDefault(_pikselModel);

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** 
 * Object for 
 * the config argument is the main configuration object passed to the instantitation
 * @param options
 * @constructor config
 */
var Piksel = function () {
  function Piksel(config) {
    _classCallCheck(this, Piksel);

    this.config = Object.assign({}, {
      basePlayerUrl: config.endpoint,
      uuid: null,
      pingInterval: null,
      startTime: null,
      endTime: null,
      embedOptions: {},
      embedCode: null
    }, config);
  }

  _createClass(Piksel, [{
    key: '_getPlayerUrl',
    value: function _getPlayerUrl() {
      if (this.config.overrideURL) {
        return this.config.overrideURL;
      } else {
        return this.config.basePlayerUrl.replace('{PROJECT_ID}', this.config.projectID).replace('{UUID}', this.config.embedOptions.uuid).replace('{AUTOPLAY}', this.config.embedOptions.autoplay || false);
      }
    }
  }, {
    key: '_getPlayerIframe',
    value: function _getPlayerIframe() {
      var ifrm = document.createElement("video");
      ifrm.setAttribute("src", this.config.embedOptions.playerUrl);
      ifrm.setAttribute("name", this.config.playerID);
      ifrm.setAttribute("id", this.config.playerID);
      ifrm.setAttribute("allowtransparency", this.config.embedOptions.allowtransparency || false);
      ifrm.setAttribute("frameborder", this.config.embedOptions.frameborder || false);
      ifrm.style.width = this.config.embedOptions.width;
      ifrm.style.height = this.config.embedOptions.height;

      return ifrm;
    }
  }, {
    key: 'create',
    value: function create(embedOptions) {
      var self = this;

      self.config.embedOptions = embedOptions;
      self.config.embedOptions['playerUrl'] = self._getPlayerUrl();

      this.iframe = self._getPlayerIframe();

      return this.inject(this.config.embedOptions.appendToElementId, this.iframe);
    }
  }, {
    key: 'inject',
    value: function inject(elemId, iframe) {
      var elem = elemId ? document.getElementById(elemId) : document.body;
      console.log('ELEM', elem, elemId, iframe);
      elem.appendChild(iframe);

      this.player = document.getElementById(this.config.playerID);
      return this.player;
    }
  }, {
    key: 'publishEvents',
    value: function publishEvents() {}
  }, {
    key: 'play',
    value: function play() {
      console.log('ELEM', this.player);
      this.player.pause();
    }
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

  return Piksel;
}();

exports.default = Piksel;