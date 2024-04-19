"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRegister = exports.authLogin = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _user = require("./user.model");
var _response = require("../../../utils/response");
var _session = require("./session.model");
var _dotenv = _interopRequireDefault(require("dotenv"));
var _otp = require("../../../emails/templates/otp");
var env = _dotenv["default"].config().parsed;

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
var authRegister = exports.authRegister = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var userValidation, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _user.User.findOne({
            email: req.body.email
          }).select({
            _id: 1
          }).exec();
        case 3:
          userValidation = _context.sent;
          if (!userValidation) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", (0, _response.sendErrorResponse)(res, {
            message: 'Email id already exists',
            statusCode: 400
          }));
        case 6:
          req.body.authentication_token = _jsonwebtoken["default"].sign(req.body.email, env.JWT_SECRET);
          _context.next = 9;
          return _bcrypt["default"].hash(req.body.password, Number(env.BCRYPT_SALT_ROUND));
        case 9:
          req.body.password = _context.sent;
          req.body.otp = Number((Math.random() * (999999 - 111111) + 111111).toFixed());
          (0, _otp.sendOtp)(req.body.email, req.body.otp);
          user = new _user.User(req.body);
          _context.next = 15;
          return user.save();
        case 15:
          delete req.body.otp;
          return _context.abrupt("return", (0, _response.sendSuccessResponse)(res, {
            message: 'New user account created successfully',
            data: req.body
          }));
        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          console.log('Error ', _context.t0);
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 19]]);
  }));
  return function authRegister(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
var authLogin = exports.authLogin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _user.User.findOne({
            email: req.body.email
          }).select({
            _id: 1,
            password: 1,
            authentication_token: 1,
            status: 1
          }).exec();
        case 2:
          user = _context2.sent;
          if (user) {
            _context2.next = 5;
            break;
          }
          return _context2.abrupt("return", (0, _response.sendErrorResponse)(res, {
            message: 'Email id not exists',
            statusCode: 400
          }));
        case 5:
          if (!(user.status == 0)) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", (0, _response.sendErrorResponse)(res, {
            message: 'Your account is suspended',
            statusCode: 400
          }));
        case 7:
          _bcrypt["default"].compare(req.body.password, user.password, function (err, result) {
            if (err) {
              // handle error
              return (0, _response.sendErrorResponse)(res, {
                message: 'Invalid password',
                statusCode: 400
              });
            }
            if (result) {
              // credentials authentication completed need to create or update session
              sessionHandler(req, res, user);
            } else {
              // response is OutgoingMessage object that server response http request
              return (0, _response.sendErrorResponse)(res, {
                message: 'passwords do not match',
                statusCode: 400
              });
            }
          });
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function authLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} user 
 */
var sessionHandler = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, user) {
    var session, userSession;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          // create a new session 
          session = {
            user_id: user._id,
            session_token: _jsonwebtoken["default"].sign({
              email: user.email,
              _id: user._id
            }, env.JWT_SECRET)
          };
          userSession = new _session.UserSession(session);
          _context3.next = 4;
          return userSession.save();
        case 4:
          return _context3.abrupt("return", (0, _response.sendSuccessResponse)(res, {
            message: 'User logged in successfully',
            data: {
              authentication_token: user.authentication_token,
              session_token: userSession.session_token,
              user_id: userSession.user_id
            }
          }));
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function sessionHandler(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();