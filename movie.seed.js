//CARGAR VARIABLES DE ENTORNO PARA CONEXCION CON MONGO ATLAS
require("dotenv").config();
//IMPORTACIONES DE LIBRERÍA Y MODELO 
const mongoose = require("mongoose");

const Movie = require("./models/movie.model");

// DATOS PRUEBA
const moviesData = [  
  {  
    title: 'The Matrix',  
    director: 'Hermanas Wachowski',  
    year: 1999,  
    genre: 'Acción',  
  },  
  {  
    title: 'The Matrix Reloaded',  
    director: 'Hermanas Wachowski',  
    year: 2003,  
    genre: 'Acción',  
  },  
  {  
    title: 'Buscando a Nemo',  
    director: 'Andrew Stanton',  
    year: 2003,  
    genre: 'Animación',  
  },  
  {  
    title: 'Buscando a Dory',  
    director: 'Andrew Stanton',  
    year: 2016,  
    genre: 'Animación',  
  },  
  {  
    title: 'Interestelar',  
    director: 'Christopher Nolan',  
    year: 2014,  
    genre: 'Ciencia ficción',  
  },  
  {  
    title: '50 primeras citas',  
    director: 'Peter Segal',  
    year: 2004,  
    genre: 'Comedia romántica',  
  },  
];

// FUNCION QUE CONECTA -> VERIFICA SI HAY DATOS -> INSERTA -> DESCONECTA
const seedDatabase = async () => {
    try {
        // conexcion local -> await mongoose.connect("mongodb://localhost:27017/movies")
        await mongoose.connect(process.env.MONGO_URI);
        console.log("conectando con la BD")
        
        const totalMovies = await Movie.countDocuments();
        if(totalMovies > 0){
          console.log("la conexcion ya tiene peliculas");
          return;
        }
        await Movie.insertMany(moviesData);
        console.log("insertados los datos")

    } catch (error) {
        console.error("error ejecutando la semilla", error.message);
    } finally {
        await mongoose.disconnect();
        console.log("desconectando de la bd")
    }
}

// EJECUCION DE LA FUNCION 
seedDatabase()