'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** 
 * Entry point for beginning the Piksel behaviors
 * the config argument is the main configuration object passed to the instantitation
 * @param options
 * @constructor
 */
var Piksel = function () {
  function Piksel() {
    _classCallCheck(this, Piksel);
  }

  _createClass(Piksel, [{
    key: 'test',
    value: function test() {
      console.log('HELLO');
    }
  }]);

  return Piksel;
}();

exports.default = Piksel;