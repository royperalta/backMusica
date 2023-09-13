const InfoModel = require("../model/Info")
const listarUrlImages = require("./getFoto")
const descargarCanciones = require("./getMusic")
const listarIds = require("./getPlaylistId")
const listarTitulos = require("./getPlaylistTitles")
const ruta_audio = require("./obtenerRuta")

async function procesarInformacion(total, url) {

    try {

        const listAudio = ruta_audio()
        console.log(listAudio[0])
        //Descargar canciones
        await descargarCanciones(total)
        //  let json = {}
        let datos = []
        //Lisar titulos
        const titleJson = await listarTitulos(total)
        let sizeArray = titleJson.data.length

        //Listar los ids
        const id_videos = await listarIds(total)

        //listar las imagenes
        const listImages = await listarUrlImages(total)

        const fechaHoy = new Date();
        const fechaUtc = fechaHoy.toISOString();

        for (let index = 0; index < total; index++) {
            datos.push({
                "id_video": id_videos.data[index][1],
                "position": index + 1,
                "titulo": titleJson.data[index][2],
                "url_image": listImages.data[index][2],
                "url_audio": `${url}/music/${ruta_audio[index]}`,
                "fecha": fechaUtc
            })
        }

        for (const dato of datos) {
            const info = new InfoModel(dato)
            await info.save()
        }

    } catch (error) {
        console.log("hay un error al prcesar la informacion", error)
    }
}

module.exports = procesarInformacion