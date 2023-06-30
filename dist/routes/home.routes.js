"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
// Modulos

var route = (0, _express.Router)();

// Ruta pagina principal 
route.get("/", function (req, res) {
  res.render("index");
});
var _default = route;
exports["default"] = _default;