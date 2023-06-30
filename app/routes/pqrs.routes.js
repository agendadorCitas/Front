// Modulos
import { Router } from "express";
import dotenv from "dotenv";
import * as controllers from "../controllers/pqrs.controllers.js";

dotenv.config();

const dashpqrs = Router ();

// Muestra datos
dashpqrs.get("/viewpqrs", controllers.getpqrs);

// Guarda datos
dashpqrs.post("/pqrsSave", controllers.savePQRS);

// Eliminar datos
dashpqrs.get("/deletePqrs", controllers.pqrsDelete);

export default dashpqrs;