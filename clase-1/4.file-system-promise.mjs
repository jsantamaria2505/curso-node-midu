//Esto solo en los módulos nativos
// que no tengan promesas nativas

// const {promisify} = require('node:util')
// const readFilePromise = promisify(fs.readFile)

import { readFile } from 'node:fs/promises';

console.log("Leyendo el primer archivo...")

readFile('./archivo.txt', 'utf-8')
    .then(text => {
        console.log('primer texto', text)
    })

console.log("--> hacer cosas mientras lee el archivo...")

console.log("Leyendo el segundo archivo...")
readFile('./archivos2.txt', 'utf-8')
    .then(text => {
        console.log('segundo texto', text)
    })
