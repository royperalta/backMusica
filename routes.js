const express = require("express")
const titles = require("./components/getPlaylistTitles.js")
const photo = require("./components/getFoto.js")
const ids = require("./components/getPlaylistId.js")
const listarUrls = require("./components/getUrlVideo.js")
const descargarCanciones = require("./components/getMusic.js")
const listarIds = require("./components/getPlaylistId.js")
const listarUrlImages = require("./components/getFoto.js")

const route = express.Router()

route.get("/titulo", async (req, res) => {
    const titleJson = await titles()
    const idsJson = ids()

    res.json(titleJson)

})

route.get("/photo", async (req, res) => {
    try {
        const photoJson = await photo();

        // Enviar solo la respuesta relacionada con las fotos, sin títulos
        res.json(photoJson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener fotos" });
    }
});


route.get('/urls', async (req, res) => {
    try {
        const urls = await listarUrls()
        console.log(urls)


    } catch (error) {
        console.log("hay un error", error)
    }
})


route.get('/getMusic', async (req, res) => {
    try {
        await descargarCanciones()
    } catch (error) {
        console.log("Hay un error a descargar la musica")
    }
})


route.get('/procesar', async (req, res) => {
    try {

      //  let json = {}
        let array = []
        //Lisar titulos
        const titleJson = await titles()
        let sizeArray = titleJson.data.length

        //Listar los ids
        const id_videos = await listarIds()

        //listar las imagenes
        const listImages = await listarUrlImages()
        console.log(listImages)
         
        for (let index = 0; index < sizeArray; index++) {           
           /*  array.push({
                "id_video": id_videos.data[index][1],
                "position":index+1,
                "titulo":titleJson.data[index][2],             

            })   */          
        }
       
        console.log(array)



    } catch (error) {
        console.log("hay un error al prcesar la informacion", error)
    }
})

module.exports = route;