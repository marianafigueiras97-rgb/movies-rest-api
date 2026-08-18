//IMPORTACION LIBRERIA
const mongoose = require("mongoose");

// DEFINICION DEL ESQUEMA
const movieSchema = new mongoose.Schema(

    {
        title: {type: String, required: true, trim: true},
        director: {type:String, required: true,},
        year:{type: Number},
        genre: {type: String, required: true},
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
// INSTANCIA DE PELICULA USANDO ESQUEMA
const Movie = mongoose.model('Movie', movieSchema);

// EXPORTACION DEL MODELO 
module.exports = Movie;