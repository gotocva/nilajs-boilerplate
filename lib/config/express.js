"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _xss = _interopRequireDefault(require("../utils/xss"));
var _response = require("../utils/response");
var app = (0, _express["default"])();

// parse json request body
app.use(_express["default"].json());

// parse urlencoded request body
app.use(_express["default"].urlencoded({
  extended: true
}));

// enable cors
app.use((0, _cors["default"])());
app.options('*', (0, _cors["default"])());
app.use(_xss["default"]);
app.disable('x-powered-by');
app.get('/', function (req, res) {
  return (0, _response.sendSuccessResponse)(res, {
    message: 'Application api working fine'
  });
});
app.get('/PING', function (req, res) {
  return (0, _response.sendSuccessResponse)(res, {
    message: 'PONG'
  });
});
var _default = exports["default"] = app;