// IMPORTACION DE LIBRERÍA
const mongoose = require("mongoose");

// FUNCION DE CONECCIÓN
const connect = async () =>{
    try {
        await mongoose.connect("mongodb://localhost:27017/movies");
        console.log("conectado a la bd ✅")
    } catch (error) {
        console.error("error conectando a la bd ❌", error.message);
    }
}
// EXPORTACION 
module.exports = connect;