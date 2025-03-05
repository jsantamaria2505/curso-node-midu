//Esto solo en los módulos nativos
// que no tengan promesas nativas

// const {promisify} = require('node:util')
// const readFilePromise = promisify(fs.readFile)

import { readFile } from 'node:fs/promises';

Promise.all([
    readFile('./archivo.txt', 'utf-8'),
    readFile('./archivos2.txt', 'utf-8')
]).then(([text,secondText]) => {
    console.log('primer texto', text);
    console.log('segundo texto', secondText)
})