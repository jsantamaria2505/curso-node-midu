//Esto solo en los módulos nativos
// que no tengan promesas nativas

// const {promisify} = require('node:util')
// const readFilePromise = promisify(fs.readFile)

const { readFile } = require("node:fs/promises");

//IIFE - Inmediatly Invoked Function Expresion
(async() => {
  console.log("Leyendo el primer archivo...");

  const text = await readFile("./archivo.txt", "utf-8")

  console.log('primer texto', text);

  console.log("--> hacer cosas mientras lee el archivo...");

  console.log("Leyendo el segundo archivo...");
  const segundoTexto = await readFile("./archivos2.txt", "utf-8")
  console.log('segundoTexto', segundoTexto)
})();
