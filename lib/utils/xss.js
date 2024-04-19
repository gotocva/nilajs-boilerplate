"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _xss = _interopRequireDefault(require("xss"));
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
var xssPrevention = function xssPrevention(req, res, next) {
  // Sanitize req.body
  if (req.body) {
    sanitize(req.body);
  }
  // Sanitize req.query
  if (req.query) {
    sanitize(req.query);
  }
  next();
};

// Sanitize function using xss library
/**
 *
 * @param {*} data
 */
var sanitize = function sanitize(data) {
  for (var key in data) {
    if (typeof data[key] === 'string') {
      data[key] = (0, _xss["default"])(data[key]);
    } else if ((0, _typeof2["default"])(data[key]) === 'object') {
      sanitize(data[key]);
    }
  }
};
var _default = exports["default"] = xssPrevention;