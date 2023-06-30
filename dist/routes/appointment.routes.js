"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _dotenv = _interopRequireDefault(require("dotenv"));
var controllers = _interopRequireWildcard(require("../controllers/appointment.controllers.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// Modulos

_dotenv["default"].config();
var dashAppointment = (0, _express.Router)();

// Ruta para mostrar la información
dashAppointment.get("/viewAppointment", controllers.appointment);

// Ruta para insertar datos
dashAppointment.post("/appointSave", controllers.saveAppointment);

// Ruta para actualizar infromación
dashAppointment.get("/editA", controllers.editAppointment);

// Ruta para eliminar información
dashAppointment.get("/deleAppointment", controllers.deleteAppointment);

// Ruta para crear el PDF
dashAppointment.post("/generatePdf", controllers.pdfGenerate);
var _default = dashAppointment;
exports["default"] = _default;