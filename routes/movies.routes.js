// IMPORTACION LIBRERIA
const express = require("express");

// INSTACIA EL ROUTER DE EXPRESS 
const movieRouter = express.Router();

// IMPORTACION DE LOS CONTROLADORES
const {getAllMovies,
    getMovieById,
    getMovieByTitle,
    getMoviesByGenre,
    getMoviesFromYear,
    createMovie,
    deleteMovie,
    updateMovie
} = require("../controllers/movies.controllers");


// RUTAS ESPESÍFICAS
movieRouter.get("/",getAllMovies);
movieRouter.get("/:id",getMovieById);
movieRouter.get("/title/:title",getMovieByTitle);
movieRouter.get("/genre/:genre",getMoviesByGenre);
movieRouter.get("/from/:year",getMoviesFromYear);
movieRouter.post("/",createMovie);
movieRouter.put("/:id",updateMovie);
movieRouter.delete("/:id",deleteMovie);

// EXPORTACION DEL ROUTER
module.exports = movieRouter