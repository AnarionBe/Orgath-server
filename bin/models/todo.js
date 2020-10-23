"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _mongoose["default"].model('Todo', new _mongoose["default"].Schema({
  content: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    "default": false
  }
}));

exports["default"] = _default;
//# sourceMappingURL=todo.js.map