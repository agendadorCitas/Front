"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginRouter = void 0;
var _express = require("express");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
// Modulos

_dotenv["default"].config();
var loginRouter = (0, _express.Router)();

// Auth google
exports.loginRouter = loginRouter;
loginRouter.get("/google", function (req, res) {
  var id = req.user.id;
  var name = req.user.displayName;
  var email = req.user.emails[0].value;
  var foto = req.user.photos[0].value;
  var payload = {
    nombre: name,
    correo: email,
    foto: foto
  };
  var token = _jsonwebtoken["default"].sign(payload, process.env.SECRET_KEY, {
    "expiresIn": process.env.EXPIRE_TOKEN
  });
  res.cookie("ckeib", token);
  res.redirect("../v1/inicio");

  //res.render("backOffice", {nombre: name});
  //res.redirect("backOffice");
});