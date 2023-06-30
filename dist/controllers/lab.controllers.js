"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewLab = exports.saveLab = exports.pdfGenerate = exports.labEdit = exports.labDelete = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _axios = _interopRequireDefault(require("axios"));
var _pdfkitTable = _interopRequireDefault(require("pdfkit-table"));
var _path = _interopRequireDefault(require("path"));
// Modulos

// Muestra información
var viewLab = /*#__PURE__*/function () {
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
          ruta = "".concat(process.env.API, "/labApi/laboratory");
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
            "menu": 5,
            "datos": datos
          });
          _context.next = 15;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          res.redirect("/v1/inicio");
        case 15:
          ;
          _context.next = 19;
          break;
        case 18:
          res.redirect("/v1/inicio");
        case 19:
          ;
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 12]]);
  }));
  return function viewLab(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Guarda información
exports.viewLab = viewLab;
var saveLab = function saveLab(req, res) {
  if (req.body.laboratory) {
    var data = {
      laboratory: req.body.laboratory
    };
    var metodo = "POST";
    if (req.body.id) {
      data = {
        id: req.body.id,
        laboratory: req.body.laboratory
      };
      metodo = "put";
    }
    var ruta = "".concat(process.env.API, "/labApi/laboratory");
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
      res.redirect("/viewlab/lab");
    } catch (error) {
      console.log("Ha ocurrido un error: " + error);
    }
    ;
  } else {
    console.send("hay un error: ");
  }
  ;
};

// Editar laboratorio
exports.saveLab = saveLab;
var labEdit = function labEdit(req, res) {
  var id = req.query.id;
  var laboratory = req.query.laboratory;
  var datos = {
    id: id,
    laboratory: laboratory
  };
  if (req.cookies.ckeib) {
    try {
      var token = _jsonwebtoken["default"].verify(req.cookies.ckeib, process.env.SECRET_KEY);
      res.render("dash", {
        "nombre": token.nombre,
        "foto": token.foto,
        "menu": 6,
        "datos": datos
      });
    } catch (error) {
      console.error("error con el token");
    }
    ;
  }
  ;
};

// Eliminar laboratorios
exports.labEdit = labEdit;
var labDelete = /*#__PURE__*/function () {
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
          url = "".concat(process.env.API, "/labApi/laboratory/").concat(id);
          option = {
            method: "DELETE"
          };
          _context2.next = 8;
          return (0, _nodeFetch["default"])(url, option).then(function (response) {
            return response.json();
          }).then(function (data) {
            if (data.affecteRows == 1) {
              console.log("borrado");
            } else {
              console.log("no borro");
            }
          });
        case 8:
          result = _context2.sent;
          res.redirect("/viewLab/lab");
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
  return function labDelete(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Exporta el pdf
exports.labDelete = labDelete;
var pdfGenerate = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var response, labData, doc, logoHeight, logoWidth, __dirname, imagePath, pageWidth, pageHeight, logoX, logoY, table, generador, fechaImpresion;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _axios["default"].get("".concat(process.env.API, "/labApi/laboratory"));
        case 3:
          response = _context3.sent;
          labData = response.data[0]; // Obtener el primer elemento del arreglo
          // Crear un nuevo documento PDF
          doc = new _pdfkitTable["default"]({
            margin: 30,
            size: 'A4'
          }); // Stream el contenido PDF a la respuesta HTTP
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename=reporteLaboratorios.pdf');
          doc.pipe(res);

          // Agregar el encabezado
          doc.fontSize(24).text('Reporte de laboratorios', {
            align: 'center'
          });

          // Agregar espacio después del encabezado
          doc.moveDown(3);

          // Agregar el logo del proyecto
          logoHeight = 80;
          logoWidth = 80;
          __dirname = _path["default"].resolve();
          imagePath = _path["default"].resolve(_path["default"].join(__dirname, 'public', 'images', 'logoMundoGenetico.png'));
          pageWidth = doc.page.width;
          pageHeight = doc.page.height;
          logoX = 30;
          logoY = 100;
          doc.image(imagePath, logoX, logoY, {
            width: logoWidth,
            height: logoHeight
          });

          // Agregar espacio después de la imagen
          doc.moveDown(2);

          // Crear la tabla
          table = {
            headers: ['Id', 'Laboratorio'],
            rows: labData.map(function (lab) {
              return [lab.id, lab.laboratory];
            })
          }; // Agregar la tabla al documento con un tamaño de letra más pequeño
          _context3.next = 24;
          return doc.table(table, {
            width: 500,
            prepareHeader: function prepareHeader() {
              return doc.font('Helvetica-Bold').fontSize(10);
            },
            prepareRow: function prepareRow() {
              return doc.font('Helvetica').fontSize(10);
            }
          });
        case 24:
          doc.moveDown(2);
          // Agregar el pie de página
          generador = 'Agendador de citas software';
          fechaImpresion = new Date().toLocaleString();
          doc.fontSize(10).text("Generado por: ".concat(generador));
          doc.fontSize(10).text("Fecha y hora de impresi\xF3n: ".concat(fechaImpresion), {
            align: 'right'
          });

          // Finalizar el PDF
          doc.end();
          _context3.next = 36;
          break;
        case 32:
          _context3.prev = 32;
          _context3.t0 = _context3["catch"](0);
          // Manejar errores de solicitud o cualquier otro error
          console.error(_context3.t0);
          res.status(500).send('Error al generar el PDF');
        case 36:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 32]]);
  }));
  return function pdfGenerate(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.pdfGenerate = pdfGenerate;