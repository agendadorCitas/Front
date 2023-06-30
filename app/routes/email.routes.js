// Modulos
import { Router } from "express";
import dotenv from "dotenv";
import * as controllers from "../controllers/email.controllers.js";

dotenv.config();

const dashEmail = Router ();

// Mostrar datos
dashEmail.get("/email", controllers.getEmail);

// Guardar datos
dashEmail.post("/saveEmail", controllers.save);

// Elimina datos
dashEmail.get("/delete", controllers.emailDelete);

// Edita datos
dashEmail.get("/editEmail", controllers.emailEdit);

export default dashEmail;