//Modulos
import app from "./app.js";

//Se escucha el puerto
app.listen(app.get("port"), () => {
    console.log(`Se ha conectado al puerto: ${app.get("port")}
    ${process.env.API}, ${app.get("port")}
    `);
});