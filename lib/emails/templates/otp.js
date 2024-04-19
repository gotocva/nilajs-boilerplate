"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendOtp = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _index = require("../index");
var env = _dotenv["default"].config().parsed;
var otpContent = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>OTP Email</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            margin: 0;\n            padding: 0;\n            background-color: #f5f5f5;\n        }\n\n        .container {\n            max-width: 600px;\n            margin: 0 auto;\n            padding: 20px;\n            background-color: #ffffff;\n            border-radius: 8px;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n        }\n\n        h1 {\n            color: #333333;\n            text-align: center;\n        }\n\n        p {\n            color: #666666;\n            font-size: 16px;\n            line-height: 1.6;\n            margin-bottom: 20px;\n        }\n\n        .otp-code {\n            background-color: #f0f0f0;\n            padding: 10px 20px;\n            text-align: center;\n            font-size: 24px;\n            border-radius: 6px;\n            margin-bottom: 20px;\n        }\n\n        .cta-button {\n            display: block;\n            width: 200px;\n            margin: 0 auto;\n            background-color: #007bff;\n            color: #ffffff;\n            text-align: center;\n            padding: 10px 0;\n            border-radius: 4px;\n            text-decoration: none;\n        }\n\n        .cta-button:hover {\n            background-color: #0056b3;\n        }\n\n        .footer {\n            margin-top: 30px;\n            text-align: center;\n            color: #999999;\n        }\n    </style>\n</head>\n<body>\n    <div class=\"container\">\n        <h1>One Time Password (OTP) for Your Account</h1>\n        <p>Dear User,</p>\n        <p>Your One Time Password (OTP) is:</p>\n        <div class=\"otp-code\">{{OTP_CODE}}</div>\n        <p>This OTP is valid for a short period of time. Please do not share it with anyone.</p>\n        <p>If you did not request this OTP, please ignore this email.</p>\n        <div class=\"footer\">\n            <p>Best regards,<br>BugAtlas</p>\n        </div>\n    </div>\n</body>\n</html>\n\n";
var sendOtp = exports.sendOtp = function sendOtp(email, otp) {
  return new Promise(function (resolve, reject) {
    var content = otpContent.replace('{{OTP_CODE}}', otp);
    var mailOptions = {
      from: env.SMTP_EMAIL,
      to: email,
      subject: 'Your One Time Password (OTP) for Account Verification',
      html: content
    };
    _index.transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
        return console.log(error);
      }
      console.log(info);
      console.log('Message sent: %s', info.messageId);
      resolve(info);
    });
  });
};