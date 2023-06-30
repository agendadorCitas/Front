"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _app = _interopRequireDefault(require("./app.js"));
_app["default"].listen(_app["default"].get("port"), function () {
  console.log("Se ha conectado al puerto: ".concat(_app["default"].get("port"), "\n    ").concat(process.env.API, ", ").concat(_app["default"].get("port"), "\n    "));
});