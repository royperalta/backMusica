const fs = require('fs')


function listarAudios() {

    const ruta_audio = fs.readdirSync('./downloads')
    //console.log(ruta_audio)
    return ruta_audio
}

module.exports = listarAudios


