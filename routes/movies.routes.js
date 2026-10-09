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
    replaceMovie,
    updateMovie
} = require("../controllers/movies.controllers");

//IMPORTACION DEL MIDDLEWARE
const apiKeyAuth = require("../middleswares/apiKeyAuth");

// RUTAS ESPESÍFICAS CON DOCUMENTACION PARA SWAGGER
/**
 * @openapi
 * /movies:
 *   get:
 *     summary: Get all movies
 *     description: Returns all movies stored in MongoDB.
 *     tags:
 *       - Movies
 *     responses:
 *       200:
 *         description: Movies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Internal server error
 */
movieRouter.get("/",getAllMovies);
/**
 * @openapi
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     description: Returns a single movie using its MongoDB ID.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the movie
 *     responses:
 *       200:
 *         description: Movie retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found
 *       400:
 *         description: Invalid movie ID
 *       500:
 *         description: Internal server error
 */
movieRouter.get("/:id",getMovieById);
/**
 * @openapi
 * /movies/title/{title}:
 *   get:
 *     summary: Get a movie by title
 *     description: Searches for a movie by its title.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Title of the movie
 *         example: The Matrix
 *     responses:
 *       200:
 *         description: Movie found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */
movieRouter.get("/title/:title",getMovieByTitle);
/**
 * @openapi
 * /movies/genre/{genre}:
 *   get:
 *     summary: Get movies by genre
 *     description: Returns all movies matching the specified genre.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: genre
 *         required: true
 *         schema:
 *           type: string
 *         description: Movie genre
 *         example: Acción
 *     responses:
 *       200:
 *         description: Movies found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       404:
 *         description: No movies found for this genre
 *       500:
 *         description: Internal server error
 */
movieRouter.get("/genre/:genre",getMoviesByGenre);
/**
 * @openapi
 * /movies/released/from/{year}:
 *   get:
 *     summary: Get movies released from a given year
 *     description: Returns movies released in or after the specified year.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Minimum release year (inclusive)
 *         example: 2010
 *     responses:
 *       200:
 *         description: Movies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid year
 *       500:
 *         description: Internal server error
 */
movieRouter.get("/from/:year",getMoviesFromYear);
/**
 * @openapi
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     security:
 *      - ApiKeyAuth: []
 *     description: Adds a new movie to the database.
 *     tags:
 *       - Movies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - director
 *               - genre
 *             properties:
 *               title:
 *                 type: string
 *                 example: Inception
 *               director:
 *                 type: string
 *                 example: Christopher Nolan
 *               year:
 *                 type: integer
 *                 example: 2010
 *               genre:
 *                 type: string
 *                 example: Science Fiction
 *     responses:
 *       201:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid movie data
 *       500:
 *         description: Internal server error
 */
movieRouter.post("/",apiKeyAuth,createMovie);
/**
 * @openapi
 * /movies/{id}:
 *   put:
 *     summary: Replace a movie
 *     security:
 *      - ApiKeyAuth: []
 *     description: Replaces a movie. All fields are required.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieInput'
 *     responses:
 *       200:
 *         description: Movie replaced successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid ID or incomplete movie data
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */
movieRouter.put("/:id",apiKeyAuth,replaceMovie);

/**
 * @openapi
 * /movies/{id}:
 *   patch:
 *     summary: Partially update a movie 
 *     security:
 *      - ApiKeyAuth: []
 *     description: Updates one or more fields of an existing movie.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MoviePatch'
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid ID or update data
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */
movieRouter.patch("/:id",apiKeyAuth,updateMovie);

/**
 * @openapi
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie 
 *     security:
 *      - ApiKeyAuth: []
 *     description: Deletes an existing movie by its MongoDB ID.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the movie
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       400:
 *         description: Invalid movie ID
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */
movieRouter.delete("/:id",apiKeyAuth,deleteMovie);



// EXPORTACION DEL ROUTER
module.exports = movieRouter