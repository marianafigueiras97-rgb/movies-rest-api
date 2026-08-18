//IMPORTACIONES LIBRERÍA, CONECCION BD Y ROUTER 
const express = require("express");
const connect = require("./db")
const movieRouter = require("./routes/movies.routes");

// INSTANCIA DE SERVIDOR EXPRESS
const server = express();

//DATOS DE LA URL
const PORT = 3000
const URL = "http://localhost:"

// PARA PODER USAR JSON CON EXPRESS
server.use(express.json())

//CONEXION BD
connect()

// RUTA GLOBAL + ROUTAS ESPESÍFICAS
server.use("/movies", movieRouter)

// RUTA NO ENCONTRADA
server.use((req,res) => {
    return res.status(404).json({message: "ruta no encontrada ❌"})
});

// LEVANTAMOS SERVIDOR
server.listen(PORT, () =>{
    console.log(`servidor levantado en ${URL + PORT}`)
});

