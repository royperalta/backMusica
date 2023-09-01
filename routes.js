const express = require("express")
const titles = require("./components/getPlaylistTitles.js")
const photo = require("./components/getFoto.js")
const ids = require("./components/getPlaylistId.js")
const getMusica = require('./components/getMusic.js')
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


route.get('/musica', async (req,res)=>{
    try {
        const musica = await getMusica();
        
        
    } catch (error) {
        console.log("hay un error", error)
    }
})
module.exports = route;