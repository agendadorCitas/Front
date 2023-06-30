"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = require("express");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
// Modulos

_dotenv["default"].config();
var dash = (0, _express.Router)();

// Muestra la ruta de inicio y verifica si el email puede entrar
dash.get("/inicio", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var token, ruta, option, datos, result, login;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!req.cookies.ckeib) {
            _context.next = 21;
            break;
          }
          _context.prev = 1;
          token = _jsonwebtoken["default"].verify(req.cookies.ckeib, process.env.SECRET_KEY);
          ruta = "".concat(process.env.API, "/api/email");
          option = {
            method: "GET"
          };
          datos = {};
          _context.next = 8;
          return (0, _nodeFetch["default"])(ruta, option).then(function (response) {
            return response.json();
          }).then(function (data) {
            datos = data[0];
            console.log(datos);
          })["catch"](function (error) {
            return console.error("Error en peticion: " + error);
          });
        case 8:
          result = _context.sent;
          login = false;
          datos.forEach(function (correos) {
            console.log(correos.email);
            if (token.correo == correos.email) {
              login = true;
            } else {}
          });
          if (login == true) {
            res.render("dash", {
              "nombre": token.nombre,
              "foto": token.foto,
              "menu": 0,
              "correo": token.correo
            });
          } else {
            res.redirect("/v1/salir");
            console.log("¡Correo no registrado!");
          }
          _context.next = 18;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](1);
          res.redirect("/");
          console.log("Error de datos: " + _context.t0);
        case 18:
          ;
          _context.next = 23;
          break;
        case 21:
          res.redirect("/");
          console.log("Error de toke");
        case 23:
          ;
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 14]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// Salir de la página
dash.get("/salir", function (req, res) {
  res.clearCookie("ckeib");
  res.redirect("/");
});
var _default = dash;
exports["default"] = _default;