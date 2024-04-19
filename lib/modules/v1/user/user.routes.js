"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = require("./auth.controller");
var userRouter = _express["default"].Router();
userRouter.post('/auth/login', [], _auth.authLogin);
userRouter.post('/auth/register', [], _auth.authRegister);
var _default = exports["default"] = userRouter;