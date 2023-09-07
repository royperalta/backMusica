const fs = require('fs')
const ruta_audio = fs.readdirSync('./downloads')
//console.log(ruta_audio)
module.exports = ruta_audio


