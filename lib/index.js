"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _db = _interopRequireDefault(require("./config/db"));
var _express = _interopRequireDefault(require("./config/express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _user = _interopRequireDefault(require("./modules/v1/user/user.routes"));
var env = _dotenv["default"].config().parsed;
(0, _db["default"])();
/**
 * Modules route injection
 */

_express["default"].use('/v1/user', _user["default"]);
_express["default"].listen(env.PORT, function () {
  console.log("Application running on port ".concat(env.PORT));
});