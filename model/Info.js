const mongoose = require('mongoose')

const { Schema } = mongoose

const InfoSchema = new Schema({
    id_video: String,
    position: Number,
    titulo: String,
    url_image: String,
    url_audio: String,
    fecha: Date
})

const InfoModel = mongoose.model('musicas',InfoSchema)

module.exports = InfoModel