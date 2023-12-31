// Modulos
import express from 'express';
import dotenv from 'dotenv';
import { loginRouter } from './routes/login.routes.js';
import passport from 'passport';
import './middlewares/google.js';
import ejs from 'ejs';
import path from 'path';
import * as url from 'url';
import route from "./routes/home.routes.js"
import dash from './routes/dashboard.routes.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dashLaboratory from './routes/lab.routes.js';
import dashEmail from './routes/email.routes.js';
import dashpqrs from './routes/pqrs.routes.js';
import dashAppointment from './routes/appointment.routes.js';

dotenv.config();

const app = express();

// Por si __dirname no funciona
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.set("views", path.join(__dirname, "views"));

// Asignacion de plantilla ejs
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.json());
app.use(passport.initialize());
app.use(express.static(__dirname + '../public'));
app.use('/resources', express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false}));

// Rutas y permisos de Google
app.use("/auth", passport.authenticate("auth-google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ],
    session: false
}), loginRouter);

// Rutas
app.use("/", route);
app.use("/viewEmail", dashEmail);
app.use("/v1", dash);
app.use("/viewLab", dashLaboratory);
app.use("/viewPqrs", dashpqrs);
app.use("/viewA", dashAppointment);

// Puerto
app.set("port", process.env.PORT || 9999);

export default app;