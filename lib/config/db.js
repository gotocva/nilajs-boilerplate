"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var env = _dotenv["default"].config().parsed;
var connect = function connect() {
  _mongoose["default"].connect(env.MONGODB_URL).then(function () {
    console.log('Mongodb connected successfully...');
  })["catch"](function (error) {
    console.error('Mongoose connection error', error);
    process.exit(-1);
  });
};
var _default = exports["default"] = connect;