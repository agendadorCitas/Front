// Modulos
import { Router } from "express";
import dotenv from "dotenv";
import * as controllers from "../controllers/lab.controllers.js";

dotenv.config();

const dashLaboratory = Router ();

// Muestra datos
dashLaboratory.get("/lab",controllers.viewLab);

// Guardar datos
dashLaboratory.post("/labeSave", controllers.saveLab);

// Edita datos
dashLaboratory.get("/editLab", controllers.labEdit);

// Elimina datos
dashLaboratory.get("/deleteLab", controllers.labDelete);

// Genera pdf
dashLaboratory.post("/generatePdf", controllers.pdfGenerate);

export default dashLaboratory;


