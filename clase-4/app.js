import express, { json } from "express";
import { moviesRouter } from "./routes/movies.js";
import { corsMiddleware } from "./middlewares/cors.js";


//como leer un json en ESModules primera forma
//import fs from 'node:fs'
//const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))


const app = express();
app.use(json());
app.disable("x-powered-by"); // deshabilitar el header X-Powered-by: Express
app.use(corsMiddleware())

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

app.use('/movies', moviesRouter)

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
