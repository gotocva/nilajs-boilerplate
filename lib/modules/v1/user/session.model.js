"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserSession = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
var userSessionSchema = new _mongoose["default"].Schema({
  user_id: {
    type: _mongoose["default"].Schema.ObjectId,
    ref: 'users'
  },
  session_token: {
    type: String,
    unique: true,
    required: true
  },
  session_meta: {
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
userSessionSchema.index({
  email: 1
});
userSessionSchema.pre('save', /*#__PURE__*/function () {
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
userSessionSchema.plugin(_mongoosePaginateV["default"]);
var UserSession = exports.UserSession = _mongoose["default"].model('sessions', userSessionSchema);