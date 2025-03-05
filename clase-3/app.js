const express = require("express");
const crypto = require("node:crypto");
const movies = require("./movies.json");
const cors = require("cors")
const { validateMovie, validatePartialMovie } = require("./schemas/movies");


const app = express();
app.use(express.json());
app.disable("x-powered-by"); // deshabilitar el header X-Powered-by: Express
app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:8080',
            'http://localhost:1234',
            'https://movies.com',
            'https://midu.dev'
        ]
        
        if(ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true)
        }

        if(!origin) {
            return callback(null, true)
        }

        return callback(new Error('Not Allowed by CORS'))
    }
}))

//metodos normales: GET/HEAD/POST
//metodos complejos: PUT/PATCH/DELETE

//CORS PRE-flight
//OPTIONS

app.get("/", (req, res) => {
  res.json({ message: "hola mundo" });
});

/* const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234',
    'https://movies.com',
    'https://midu.dev'
] */

app.get("/movies", (req, res) => {
  //res.json(movies)
    // res.header('Access-Control-Allow-Origin', '*')
    /* const origin = req.header('origin')
    if(ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin)
    } */

  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLocaleLowerCase())
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);

  res.status(404).json({ message: "Movie not found" });
});

app.post("/movies", (req, res) => {
    const result = validateMovie(req.body)

  //const { title, genre, year, director, duration, rate, poster } = req.body;

  if(!result.success){
    return res.status(400).json({error: JSON.parse(result.error.message)})
  }

  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    ...result.data
    /* title,
    genre,
    year,
    director,
    duration,
    rate: rate ?? 0,
    poster, */
  };

  //Esto no seria REST, porque estamos guardando el estado de app en memoria
  movies.push(newMovie);

  res.status(201).json(newMovie); // actualizar la caché del cliente
});

app.delete('/movies/:id', (req, res) => {
    /* const origin = req.header('origin')
    if(ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin)
    } */
    
    const {id} = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
    console.log("movieIndex", movieIndex)

    if(movieIndex === -1) {
        return res.status(404).json({message: 'Movie not found'})
    }

    movies.splice(movieIndex, 1)

    return res.json({message: 'Movie deleted'})
})

app.patch('/movies/:id', (req, res) => {

    const result = validatePartialMovie(req.body)

    if(!result.success){
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }
    const {id} = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
    console.log("movieIndex", movieIndex)
    if(movieIndex === -1){
        return res.status(404).json({message: 'Movie not found'})
    }

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie

    return res.json(updateMovie)
})

/* app.options('/movies/:id', (req, res) => {

    const origin = req.header('origin')
    if(ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin)
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    }
    res.send(200)
}) */

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
