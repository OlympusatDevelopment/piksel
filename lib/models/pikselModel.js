'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pikselModel = {

  getEmbed: function getEmbed(args) {
    return new Promise(function (resolve, reject) {
      return (0, _axios2.default)({ url: '//player.olympusattelecom.com/v/vt20g3y0?wmode=transparent&r=true&autoPlay=true' }).then(resolve).catch(resolve);
    });
  }

  // getPlayerStatus: args => new Promise((resolve, reject) => {
  // })


};

exports.default = pikselModel;