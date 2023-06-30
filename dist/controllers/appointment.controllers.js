"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveAppointment = exports.pdfGenerate = exports.editAppointment = exports.deleteAppointment = exports.appointment = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _axios = _interopRequireDefault(require("axios"));
var _pdfkitTable = _interopRequireDefault(require("pdfkit-table"));
var _path = _interopRequireDefault(require("path"));
var _console = require("console");
// Modulos

// Muestra toda la información
var appointment = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var token, rutaSedes, ruta, option, datos, datosSedes, resultSedes, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!req.cookies.ckeib) {
            _context.next = 23;
            break;
          }
          _context.prev = 1;
          token = _jsonwebtoken["default"].verify(req.cookies.ckeib, process.env.SECRET_KEY);
          rutaSedes = "".concat(process.env.API, "/labApi/laboratory");
          ruta = "".concat(process.env.API, "/appointment/viewAppointment");
          option = {
            method: "get"
          };
          datos = {};
          datosSedes = {};
          _context.next = 10;
          return (0, _nodeFetch["default"])(rutaSedes, option).then(function (response) {
            return response.json();
          }).then(function (data) {
            datosSedes = data[0];
          })["catch"](function (error) {
            return console.error("Error en peticion: " + error);
          });
        case 10:
          resultSedes = _context.sent;
          _context.next = 13;
          return (0, _nodeFetch["default"])(ruta, option).then(function (response) {
            return response.json();
          }).then(function (data) {
            datos = data[0];
          })["catch"](function (error) {
            return console.error("Error en peticion: " + error);
          });
        case 13:
          result = _context.sent;
          res.render("dash", {
            "nombre": token.nombre,
            "foto": token.foto,
            "menu": 3,
            "datos": datos,
            "datosSedes": datosSedes
          });
          _context.next = 20;
          break;
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](1);
          res.redirect("/");
        case 20:
          ;
          _context.next = 24;
          break;
        case 23:
          res.redirect("/");
        case 24:
          ;
        case 25:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 17]]);
  }));
  return function appointment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Inserta información
exports.appointment = appointment;
var saveAppointment = function saveAppointment(req, res) {
  if (req.body.cedula && req.body.nombre && req.body.apellido && req.body.telefono && req.body.direccion && req.body.correo && req.body.idLab && req.body.fecha && req.body.horaCita && req.body.costoCita) {
    var data = {
      cedula: req.body.cedula,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      correo: req.body.correo,
      idLab: req.body.idLab,
      fecha: req.body.fecha,
      horaCita: req.body.horaCita,
      costoCita: req.body.costoCita
    };
    var metodo = "post";
    if (req.body.id) {
      data = {
        id: req.body.id,
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        correo: req.body.correo,
        idLab: req.body.idLab,
        fecha: req.body.fecha,
        horaCita: req.body.horaCita,
        costoCita: req.body.costoCita
      };
      metodo = "put";
    }
    ;
    var ruta = "".concat(process.env.API, "/appointment/saveAppointment");
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
      }).then(function (data) {})["catch"](function (err) {
        return console.log("Error al consumir API: " + err);
      });
      res.redirect("/viewA/viewAppointment");
    } catch (error) {
      console.log(error);
    }
    ;
  } else {
    console.send("Este es el error: " + error);
  }
  ;
};

// Edita la información
exports.saveAppointment = saveAppointment;
var editAppointment = function editAppointment(req, res) {
  var id = req.query.id;
  var cedula = req.query.cedula;
  var nombre = req.query.nombre;
  var apellido = req.query.apellido;
  var telefono = req.query.telefono;
  var direccion = req.query.direccion;
  var correo = req.query.correo;
  var idLab = req.query.idLab;
  var fecha = req.query.fecha;
  var horaCita = req.query.horaCita;
  var costoCita = req.query.costoCita;
  var datos = {
    id: id,
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    telefono: telefono,
    direccion: direccion,
    correo: correo,
    idLab: idLab,
    fecha: fecha,
    horaCita: horaCita,
    costoCita: costoCita
  };
  if (req.cookies.ckeib) {
    try {
      var token = _jsonwebtoken["default"].verify(req.cookies.ckeib, process.env.SECRET_KEY);
      res.render("dash", {
        "nombre": token.nombre,
        "foto": token.foto,
        "menu": 7,
        "datos": datos
      });
    } catch (error) {
      console.error("Error con el token:" + error);
    }
    ;
  }
  ;
};

// Elimina información
exports.editAppointment = editAppointment;
var deleteAppointment = /*#__PURE__*/function () {
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
          url = "".concat(process.env.API, "/appointment/deleAppointment/").concat(id);
          option = {
            method: "delete"
          };
          _context2.next = 8;
          return (0, _nodeFetch["default"])(url, option).then(function (response) {
            return response.json();
          }).then(function (data) {
            if (data[0].affecteRows === 1) {
              console.log("Borrado");
            } else {
              console.log("No borro");
            }
            ;
          });
        case 8:
          result = _context2.sent;
          res.redirect("/viewA/viewAppointment");
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
  return function deleteAppointment(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Genera PDF con los datos de la tabla
exports.deleteAppointment = deleteAppointment;
var pdfGenerate = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var response, citaData, doc, logoHeight, logoWidth, __dirname, imagePath, logoX, logoY, table, generador, fechaImpresion;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _axios["default"].get("".concat(process.env.API, "/appointment/viewAppointment"));
        case 3:
          response = _context3.sent;
          citaData = response.data[0];
          doc = new _pdfkitTable["default"]({
            margin: 30,
            size: 'A4'
          });
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename=reporteCitas.pdf');
          doc.pipe(res);

          // Agrega el encabezado
          doc.fontSize(24).text('Reporte de citas', {
            align: 'center'
          });

          // Agrega espacio después del encabezado
          doc.moveDown(3);

          // Agrega el logo del proyecto
          logoHeight = 80;
          logoWidth = 80;
          __dirname = _path["default"].resolve();
          imagePath = _path["default"].resolve(_path["default"].join(__dirname, 'public', 'images', 'logoMundoGenetico.png'));
          logoX = 30;
          logoY = 100;
          doc.image(imagePath, logoX, logoY, {
            width: logoWidth,
            height: logoHeight
          });

          // Agrega espacio después de la imagen
          doc.moveDown(2);

          // Crear la tabla
          table = {
            headers: ['Id', 'Nombre', 'Apellido', 'Telefono', 'Direccion', 'Correo', 'Laboratorio', 'Fecha', 'Hora de la cita', 'Valor de la cita'],
            rows: citaData.map(function (cita) {
              return [cita.id, cita.nombre, cita.apellido, cita.telefono, cita.direccion, cita.correo, cita.laboratory, cita.fecha, cita.horaCita, cita.costoCita];
            })
          }; // Agrega la tabla al documento con un tamaño de letra más pequeño
          _context3.next = 22;
          return doc.table(table, {
            width: 500,
            prepareHeader: function prepareHeader() {
              return doc.font('Helvetica-Bold').fontSize(10);
            },
            prepareRow: function prepareRow() {
              return doc.font('Helvetica').fontSize(10);
            }
          });
        case 22:
          doc.moveDown(2);

          // Agrega el pie de página
          generador = 'Agendador de citas software';
          fechaImpresion = new Date().toLocaleString();
          doc.fontSize(10).text("Generado por: ".concat(generador));
          doc.fontSize(10).text("Fecha y hora de impresi\xF3n: ".concat(fechaImpresion), {
            align: 'right'
          });

          // Finaliza el PDF
          doc.end();
          _context3.next = 34;
          break;
        case 30:
          _context3.prev = 30;
          _context3.t0 = _context3["catch"](0);
          // Maneja errores de solicitud o cualquier otro error
          console.error(_context3.t0);
          res.status(500).send('Error al generar el PDF');
        case 34:
          ;
        case 35:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 30]]);
  }));
  return function pdfGenerate(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.pdfGenerate = pdfGenerate;