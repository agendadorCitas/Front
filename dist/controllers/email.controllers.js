"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.save = exports.getEmail = exports.emailEdit = exports.emailDelete = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
// Modulos

_dotenv["default"].config();

// Muestra información
var getEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var token, ruta, option, datos, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!req.cookies.ckeib) {
            _context.next = 17;
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
          })["catch"](function (error) {
            return console.error("Error en peticion: " + error);
          });
        case 8:
          result = _context.sent;
          res.render("dash", {
            "nombre": token.nombre,
            "foto": token.foto,
            "menu": 1,
            "datos": datos,
            "correo": token.correo
          });
          _context.next = 15;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          res.redirect("/");
        case 15:
          _context.next = 18;
          break;
        case 17:
          res.redirect("/");
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 12]]);
  }));
  return function getEmail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
// Guardar información
exports.getEmail = getEmail;
var save = function save(req, res) {
  if (req.body.email) {
    var data = {
      email: req.body.email
    };
    var metodo = "POST";
    if (req.body.id) {
      data = {
        id: req.body.id,
        email: req.body.email
      };
      metodo = "put";
    }
    ;
    var ruta = "".concat(process.env.API, "/api/email");
    var option = {
      method: metodo,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    try {
      var result = (0, _nodeFetch["default"])(ruta, option).then(function (res) {
        return res.json();
      }).then(function (data) {
        //aqui vamos
        console.log(data);
      })["catch"](function (err) {
        return console.log("Error al consumir API: " + err);
      });
      res.redirect("/viewEmail/email");
    } catch (error) {}
  } else {
    console.send("Este es el error: ");
  }
};

// Editar correo
exports.save = save;
var emailEdit = function emailEdit(req, res) {
  var id = req.query.id;
  var email = req.query.email;
  var datos = {
    id: id,
    email: email
  };
  if (req.cookies.ckeib) {
    try {
      var token = _jsonwebtoken["default"].verify(req.cookies.ckeib, process.env.SECRET_KEY);
      res.render("dash", {
        "nombre": token.nombre,
        "foto": token.foto,
        "menu": 4,
        "datos": datos
      });
    } catch (error) {
      console.error("error con el token");
    }
  }
};

// Eliminar correos
exports.emailEdit = emailEdit;
var emailDelete = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, token, url, option, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.query.id;
          if (!req.cookies.ckeib) {
            _context2.next = 16;
            break;
          }
          _context2.prev = 2;
          token = _jsonwebtoken["default"].verify(req.cookies.ckeib, process.env.SECRET_KEY);
          url = "".concat(process.env.API, "/api/email/").concat(id);
          option = {
            method: "DELETE"
          };
          _context2.next = 8;
          return (0, _nodeFetch["default"])(url, option).then(function (response) {
            return response.json();
          }).then(function (data) {
            if (data[0].affecteRows == 1) {
              console.log("borrado");
            } else {
              console.log("no borro");
            }
          });
        case 8:
          result = _context2.sent;
          res.redirect("/viewEmail/email");
          _context2.next = 15;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](2);
          console.error("error con el token");
        case 15:
          ;
        case 16:
          ;
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2, 12]]);
  }));
  return function emailDelete(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.emailDelete = emailDelete;