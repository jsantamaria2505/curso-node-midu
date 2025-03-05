const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

//statusCode

//100-199: Respuestas informativas
//200-299: Respuestas satisfactorias
//300-399: Redirecciones
//400-499: Erroes del cliente
//500-599: Errores del servidor

const processRequest = (req, res) =>{
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    if(req.url === '/'){
        res.statusCode = 200 // OK
        res.end('<h1>Bienvenido a mi página de inicio</h1>')
    }else if(req.url === '/imagen-super-bonita.png') {
        fs.readFile('./slider.jpg', (err, data) => {
            if(err){
                res.statusCode = 500
                res.end('<h1>500 Internal Server Error</h1>')
            } else{
                res.setHeader('Content-Type', 'image/jpg')
                res.end(data)
            }
        })
    }
    else if(req.url === '/contacto') {
        res.statusCode = 200 //OK
        res.end('<h1>Contacto</h1>')
    }else {
        res.status = 404 // Not found
        res.end('<h1>404</h1>')
    }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, ()=>{
    console.log(`server listening on port http://localhost:${desiredPort}`)
})