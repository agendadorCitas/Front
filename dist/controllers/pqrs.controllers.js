"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.savePQRS = exports.pqrsDelete = exports.getpqrs = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
// Modulos

_dotenv["default"].config();

// Muestra todos los datos de las PQRS
var getpqrs = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var token, ruta, option, datos, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!req.cookies.ckeib) {
            _context.next = 18;
            break;
          }
          _context.prev = 1;
          token = _jsonwebtoken["default"].verify(req.cookies.ckeib, process.env.SECRET_KEY);
          ruta = "".concat(process.env.API, "/PQRS/pqrs");
          option = {
            method: "GET"
          };
          datos = {};
          _context.next = 8;
          return (0, _nodeFetch["default"])(ruta, option).then(function (response) {
            return response.json();
          }).then(function (data) {
            datos = data[0];
            //console.log(data[0]);
          })["catch"](function (error) {
            return console.error("Error en peticion: " + error);
          });
        case 8:
          result = _context.sent;
          res.render("dash", {
            "nombre": token.nombre,
            "foto": token.foto,
            "menu": 2,
            "datos": datos
          });
          _context.next = 15;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          res.redirect("/");
        case 15:
          ;
          _context.next = 19;
          break;
        case 18:
          res.redirect("/");
        case 19:
          ;
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 12]]);
  }));
  return function getpqrs(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Insertar información
exports.getpqrs = getpqrs;
var savePQRS = function savePQRS(req, res) {
  if (req.body.cedula && req.body.nombre_completo && req.body.descripcion) {
    var data = {
      cedula: req.body.cedula,
      nombre_completo: req.body.nombre_completo,
      descripcion: req.body.descripcion
    };
    var metodo = "POST";
    if (req.body.id) {
      data = {
        id: req.body.id,
        cedula: req.body.cedula,
        nombre_completo: req.body.nombre_completo,
        descripcion: req.body.descripcion
      };
      metodo = "put";
    }
    var ruta = "".concat(process.env.API, "/PQRS/pqrs");
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
      })["catch"](function (err) {
        return console.log("Error al consumir API: " + err);
      });
      res.redirect("/viewPqrs/viewpqrs");
    } catch (error) {}
  } else {
    console.send("Este es el error: ");
  }
};

// Elimina información
exports.savePQRS = savePQRS;
var pqrsDelete = /*#__PURE__*/function () {
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
          url = "".concat(process.env.API, "/PQRS/pqrs/").concat(id);
          option = {
            method: "DELETE"
          };
          _context2.next = 8;
          return (0, _nodeFetch["default"])(url, option).then(function (res) {
            return res.json();
          }).then(function (data) {
            if (data.affecteRows == 1) {
              console.log("Borrado");
            } else {
              console.log("No borro");
            }
            ;
          });
        case 8:
          result = _context2.sent;
          res.redirect("/viewPqrs/viewpqrs");
          _context2.next = 15;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](2);
          console.error("Error con el token:" + _context2.t0);
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
  return function pqrsDelete(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.pqrsDelete = pqrsDelete;