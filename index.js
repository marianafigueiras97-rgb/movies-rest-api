//IMPORTACIONES LIBRERÍAS, CONECCION BD, ROUTER, VARIABLES DE ENTORNO Y SWAGGER 
require("dotenv").config();
const express = require("express");
const connect = require("./db")
const movieRouter = require("./routes/movies.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

// INSTANCIA DE SERVIDOR EXPRESS
const server = express();

//DATOS DE LA URL
const PORT = process.env.PORT || 3000;
//const URL = "http://localhost:"

// PARA PODER USAR JSON CON EXPRESS
server.use(express.json())

//CONEXION BD
connect()

// SWAGGGER
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// RUTA GLOBAL + ROUTAS ESPESÍFICAS
server.use("/movies", movieRouter)

// RUTA NO ENCONTRADA
server.use((req,res) => {
    return res.status(404).json({message: "ruta no encontrada ❌"})
});

// LEVANTAMOS SERVIDOR
server.listen(PORT, () =>{
    console.log(`servidor funcionando en el puerto ${PORT}`);
});

