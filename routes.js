const express = require("express")
const titles = require("./components/getPlaylistTitles.js")
const route = express.Router()

route.get("/titulo",(req,res) => {
    titles()
})

module.exports = route