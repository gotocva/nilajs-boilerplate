"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendValidationError = exports.sendSuccessResponse = exports.sendErrorResponse = void 0;
/**
 *
 * @param {*} res
 * @param {*} data
 * @param {*} statusCode
 * @returns
 */
var sendSuccessResponse = exports.sendSuccessResponse = function sendSuccessResponse(res, _ref) {
  var data = _ref.data,
    message = _ref.message,
    statusCode = _ref.statusCode;
  return res.status(statusCode || 200).json({
    status: true,
    message: message || 'success response',
    data: data || {}
  });
};

/**
 *
 * @param {*} res
 * @param {*} error
 * @param {*} statusCode
 * @returns
 */
var sendErrorResponse = exports.sendErrorResponse = function sendErrorResponse(res, _ref2) {
  var error = _ref2.error,
    message = _ref2.message,
    statusCode = _ref2.statusCode;
  return res.status(statusCode || 500).json({
    status: false,
    message: message || 'error occurs',
    error: error || {}
  });
};

/**
 *
 * @param {*} res
 * @param {*} errors
 * @param {*} statusCode
 * @returns
 */
var sendValidationError = exports.sendValidationError = function sendValidationError(res, _ref3) {
  var error = _ref3.error,
    message = _ref3.message,
    statusCode = _ref3.statusCode;
  return res.status(statusCode || 400).json({
    status: false,
    message: message || 'Validation error',
    data: error || {}
  });
};