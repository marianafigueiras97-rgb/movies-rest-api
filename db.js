
/*conexion local
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
*/

//conexion a mongo atlas
const mongoose = require ("mongoose");

const connect = async () => {

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado a MongoDB Atlas");
    } catch(error){
        console.error("Error de conexión", error.message);
        process.exit(1);
    }
};

module.exports = connect;