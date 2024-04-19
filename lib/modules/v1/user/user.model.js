"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
var userSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: true,
    required: true
  },
  authentication_token: {
    type: String,
    unique: true
  },
  otp: {
    type: Number,
    "default": 0
  },
  email_verified: {
    type: Number,
    "enum": [0, 1],
    "default": 0
  },
  profile: {
    type: Object
  },
  status: {
    type: Number,
    "default": 1
  },
  created_at: {
    type: Date,
    "default": Date.now
  },
  updated_at: {
    type: Date,
    "default": Date.now
  }
}, {
  versionKey: false
});
userSchema.index({
  email: 1
});
userSchema.pre('save', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(next) {
    var obj;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          try {
            obj = Object.assign({}, this); // this.authentication_token = jwt.sign(obj._doc.email, options.JWT_SECRET);
            // this.password = await bcrypt.hash(this.password, Number(options.BCRYPT_SALT_ROUND));
            next();
          } catch (error) {
            next(error);
          }
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
userSchema.plugin(_mongoosePaginateV["default"]);
var User = exports.User = _mongoose["default"].model('users', userSchema);