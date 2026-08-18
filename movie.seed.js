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

// FUNCION QUE CONECTA -> BORRA -> INSERTA -> DESCONECTA
const seedDatabase = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/movies")
        console.log("conectando con la BD")
        
        await Movie.deleteMany();
        console.log("borrando collecion de datos")
        
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