"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _passport = _interopRequireDefault(require("passport"));
var _passportGoogleOauth = require("passport-google-oauth20");
var _dotenv = _interopRequireDefault(require("dotenv"));
// Modulos

_dotenv["default"].config();

// Configuración google
_passport["default"].use("auth-google", new _passportGoogleOauth.Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_API
}, function (accessToken, refreshToken, profile, cb) {
  return cb(null, profile);
}));