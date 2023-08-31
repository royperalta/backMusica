const express = require("express")
const titles = require("./components/getPlaylistTitles.js")
const ids = require("./components/getPlaylistId.js")
const route = express.Router()

route.get("/titulo", async (req, res) => {
    const titleJson = await titles()    
    const idsJson = ids() 
    
    res.json(titleJson)
    
})

module.exports = route