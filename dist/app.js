"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _loginRoutes = require("./routes/login.routes.js");
var _passport = _interopRequireDefault(require("passport"));
require("./middlewares/google.js");
var _ejs = _interopRequireDefault(require("ejs"));
var _path = _interopRequireDefault(require("path"));
var url = _interopRequireWildcard(require("url"));
var _homeRoutes = _interopRequireDefault(require("./routes/home.routes.js"));
var _dashboardRoutes = _interopRequireDefault(require("./routes/dashboard.routes.js"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _labRoutes = _interopRequireDefault(require("./routes/lab.routes.js"));
var _emailRoutes = _interopRequireDefault(require("./routes/email.routes.js"));
var _pqrsRoutes = _interopRequireDefault(require("./routes/pqrs.routes.js"));
var _appointmentRoutes = _interopRequireDefault(require("./routes/appointment.routes.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// Modulos

_dotenv["default"].config();
var app = (0, _express["default"])();

// Por si __dirname no funciona
var _filename = url.fileURLToPath(import.meta.url);
var _dirname = url.fileURLToPath(new URL('.', import.meta.url));
app.set("views", _path["default"].join(_dirname, "views"));

// Asignacion de plantilla ejs
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(_express["default"].json());
app.use(_passport["default"].initialize());
app.use(_express["default"]["static"](_dirname + '../public'));
app.use('/resources', _express["default"]["static"]('public'));
app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));

// Rutas y permisos de Google
app.use("/auth", _passport["default"].authenticate("auth-google", {
  scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
  session: false
}), _loginRoutes.loginRouter);

// Rutas
app.use("/", _homeRoutes["default"]);
app.use("/viewEmail", _emailRoutes["default"]);
app.use("/v1", _dashboardRoutes["default"]);
app.use("/viewLab", _labRoutes["default"]);
app.use("/viewPqrs", _pqrsRoutes["default"]);
app.use("/viewA", _appointmentRoutes["default"]);

// Puerto
app.set("port", process.env.PORT || 9999);
var _default = app;
exports["default"] = _default;