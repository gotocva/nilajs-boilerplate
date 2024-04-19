"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transport = void 0;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var env = _dotenv["default"].config().parsed;
var transport = exports.transport = _nodemailer["default"].createTransport({
  host: env.SMTP_HOST || "smtp.zoho.com",
  port: env.SMTP_PORT || 587,
  auth: {
    user: env.SMTP_EMAIL || "contact@sivabharathy.in",
    pass: env.SMTP_PASSWORD || "ntnxMHjqcYfr"
  }
});