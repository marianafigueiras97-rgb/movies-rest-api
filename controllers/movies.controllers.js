// IMPORTACION DEL MODELO DE PELICULA
const Movie = require("../models/movie.model");

// CONTROLADORES

// 1. Crear un endpoint get que devuelva todas las películas.
const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        return res.status(200).json(movies)
    } catch (error) {
        return res
        .status(500)
        .json(
            {
                message: "error obteniendo peliculas ❌",
                error: error.message
            }
        );
    }
};

// 2. Crear un endpoint get que devuelva una película según su _id, incluye manejo de errores cuando: el id no de válido o no existe

const getMovieById = async (req,res) =>{
    try {
    const {id} = req.params;
    const movie = await Movie.findById(id);
    if(!movie){
        return res.status(404).json({message: "No se encuentra la pelicula con ese id ❌"})
    }      
    
    return res.status(200).json(movie)
} catch (error) {

    if (error.name === "CastError") {
            return res.status(400).json({
                message: "El formato del id no es válido ❌"
            });
        }

    return res
    .status(500)
    .json(
        {
            message: "error obteniendo película ❌",
            error: error.message
        }
    );
} 
};
// 3. Crear un endpoint get que devuelva un valor por su titulo. Incluye manejo de errores cuando el título no se encuentra

const getMovieByTitle = async (req,res) =>{
    try {
    const {title} = req.params;
    const movie = await Movie.findOne({"title": title});
    if(!movie){
        return res.status(404).json({message: "No se encuentran películas con ese título ❌"})
    }      

    return res.status(200).json(movie)
    } catch (error) {
        return res
        .status(500)
        .json(
            {
                message: "error obteniendo película ❌",
                error: error.message
            }
        );
    }
};
// 4. Crear un endpoint get que devuelva los documentos según su género. Incluye manejo de errores cuando el género no existe en la bd
const getMoviesByGenre = async (req,res) =>{
    try {
    const {genre} = req.params;
    const movies = await Movie.find({genre});
    if(movies.length == 0){
        return res.status(404).json({message: "No se encuentran películas con ese género ❌"})
    }      

    return res.status(200).json(movies)
    } catch (error) {
        return res
        .status(500)
        .json(
            {
                message: "error obteniendo películas ❌",
                error: error.message
            }
        );
    }
};
// 5. Crear un endpoint get que devuelva las películas que se han estrenado a partir de un año dado como parámetro. Incluye manejo de errores cuando no existen peliculas en la bd a partir de ese año
const getMoviesFromYear = async (req,res) =>{
    try {
        const {year} = req.params;

    const movies = await Movie.find({
        year: {$gte: Number(year)}
    });
     if(movies.length == 0){
        return res.status(404).json({message: "No se encuentran películas de ese año ❌"})
    }
    
    return res.status(200).json(movies);

    } catch (error) {
        return res
        .status(500)
        .json(
            {
                message: "error obteniendo películas ❌",
                error: error.message
            }
        );
    }
};
// 6. Crear un método post de Movies para crear una nueva película.
const createMovie = async(req,res) =>{
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        return res.status(200).json(newMovie);
    } catch (error) {
        return res
        .status(500)
        .json(
            {
                message: "error creando película ❌",
                error: error.message
            }
        );
    }
};
// 7. Crear un método patch de Movies para modificar una película parcialmente. Incluye manejo de errores cuando el id es incorrecto o cuando no se cumple el esquema 
const updateMovie = async (req,res) => {
	try{
		const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body,{
		returnDocument: "after",
		runValidators: true,
		});
		
		if(!updatedMovie){
			return res
			.status(404)
			.json({message:"No se encuentra pelicula con ese id ❌"})
        };
		
		return res.status(200).json(updatedMovie);
	}catch (error){

        if(error.name === "ValidatonError" || error.name ==="StrictModeError"){
            return res.status(400).json({
                message:"los datos no respetan el esquema ❌", error: error.message
            });
        }
		return res.status(500)
		.json({ message: "Error accediendo a la pelicual ❌",error: error.message});
	}
} ;

// 8. Crear un metodo put para reemplazar una pelicula completa. Incluye manejo de errores cuando el id no se encuentra
const replaceMovie = async (req, res) => {
    try {
        const { title, director, year, genre } = req.body;

        // Comprobar que se han enviado todos los campos
        if (
            typeof title !== "string" || !title.trim() ||
            typeof director !== "string" || !director.trim() ||
            !Number.isInteger(year) ||
            typeof genre !== "string" || !genre.trim()
        ) {
            return res.status(400).json({
                message: "PUT requires all movie fields with valid values"
            });
        }

        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            { title, director, year, genre },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.status(200).json(movie);

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid movie ID"
            });
        }

        res.status(500).json({
            message: "Internal server error"
        });
    }
};
// 9. Crear un método delete de Movies para eliminar una película. Incluye manejo de errores cuando el id no se encuentra
const deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

        if (!deletedMovie) {
            return res.status(404).json({
                message: "No se encuentra película con ese id ❌"
            });
        }

        return res.status(200).json({
            message: "Película borrada correctamente ✅"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error borrando película ❌",
            error: error.message
        });
    }
};

//EXPORTACIONES DE CONTROLLADORES
module.exports = {getAllMovies, getMovieById, getMovieByTitle,getMoviesByGenre,getMoviesFromYear,createMovie, replaceMovie, updateMovie,deleteMovie};