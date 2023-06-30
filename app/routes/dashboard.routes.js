// Modulos
import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const dash = Router();

// Muestra la ruta de inicio y verifica si el email puede entrar
dash.get("/inicio", async (req, res) => {
    if (req.cookies.ckeib) {
        try {
            const token = jwt.verify(req.cookies.ckeib, process.env.SECRET_KEY)

            let ruta = `${process.env.API}/api/email`;
            let option = {
                method: "GET"
            }

            let datos = {};
            const result = await fetch(ruta, option)
                .then(response => response.json())
                .then(data => {
                    datos = data[0]
                    console.log(datos);
                })
                .catch(error => console.error("Error en peticion: " + error))

            let login = false;
            datos.forEach((correos) => {
                console.log(correos.email);
                if (token.correo == correos.email) {

                    login = true;


                } else {


                }
            })

            if (login == true) {
                res.render("dash", {
                    "nombre": token.nombre,
                    "foto": token.foto,
                    "menu": 0,
                    "correo": token.correo
                });
            } else {
                res.redirect("/v1/salir");
                console.log("¡Correo no registrado!");
            }

        } catch (error) {
            res.redirect("/");
            console.log("Error de datos: " + error);
        };
    } else {
        res.redirect("/")
        console.log("Error de toke");
    };
});

// Salir de la página
dash.get("/salir", (req, res) => {
    res.clearCookie("ckeib");
    res.redirect("/");
});

export default dash;