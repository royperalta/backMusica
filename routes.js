const express = require("express")
const titles = require("./components/getPlaylistTitles.js")
const photo = require("./components/getFoto.js")

const listarUrls = require("./components/getUrlVideo.js")
const descargarCanciones = require("./components/getMusic.js")

const { default: mongoose } = require("mongoose")
const InfoModel = require("./model/Info.js")
const eliminarCanciones = require("./components/eliminarCanciones.js")
const procesarInformacion = require("./components/procesarInformacion.js")
const CronJob = require("cron").CronJob;
const descargarSong = require('./components/descargarSong.js')

mongoose.connect(process.env.MONGO_URL)

const route = express.Router()
//url base para descargar las canciones
const url = 'https://envivo.top:9100'
//const url = 'http://localhost:9100'


const total = 10

// Programa la ejecución de eliminarCanciones a la 01:00 AM todos los días
const job = new CronJob("0 1 * * *", () => {
    try {
        eliminarCanciones();
        console.log("Tarea eliminarCanciones ejecutada a las 01:00 AM.");
    } catch (err) {
        console.error("Error en la tarea eliminarCanciones:", err);
    }
});

const procesarJob = new CronJob("1 1 * * *", async () => {
    try {
        await procesarInformacion(total, url)
    } catch (error) {
        console.log("Error", error)
    }
})

job.start(); // Inicia la tarea programada
procesarJob.start(); // Inicia la tarea programada

route.get("/eliminarCanciones", (req, res) => {
    try {
        eliminarCanciones()
        res.send("Eliminado")
    } catch (err) {
        res.status(400).json({ status: err })
    }
})

route.get("/titulo", async (req, res) => {
    try {
        const titleJson = await titles(total)
        res.json(titleJson)
    } catch (error) {
        console.log("Hubo un error", error)
    }

})

route.get("/photo", async (req, res) => {
    try {
        const photoJson = await photo(total);
        res.json(photoJson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener fotos" });
    }
});

route.get('/urls', async (req, res) => {
    try {
        const urls = await listarUrls(total)
        console.log(urls)
    } catch (error) {
        console.log("hay un error", error)
    }
})

route.get('/getMusic', async (req, res) => {
    try {
        await descargarCanciones(total)
    } catch (error) {
        console.log("Hay un error a descargar la musica")
    }
})

route.get('/procesar', async (req, res) => {
    console.log("Procesando.........................")
    await procesarInformacion(total, url)
    res.status(200).json({ status: "Ejecutado" })
})

route.get('/info', async (req, res) => {
    try {
        // Consultar la colección Info para obtener todos los registros ordenados por createdAt de manera descendente (del más nuevo al más antiguo)
        const documentosOrdenados = await InfoModel.find()
            .sort({ createdAt: -1 }); // Ordenar por createdAt de manera descendente

        // Invertir el orden de los registros para obtener desde el último al primero
        const registrosInvertidos = documentosOrdenados.reverse();

        // Limitar la respuesta a los últimos 10 registros
        const ultimos10Registros = registrosInvertidos.slice(0, 10);

        res.status(200).json(ultimos10Registros);
    } catch (error) {
        res.status(500).json(`Error:${error}`)
    }
})


route.get('/descargar/:parametro',async (req, res) => {
    const texto = req.params.parametro;
    const data = await descargarSong(texto)
    res.json(data);
});

route.get('/test', (req, res) => {    
    res.json({data:"correcto"});
});



function borrarCarpetasDescargas() {
    const descargasPath = path.join(__dirname, '..', 'Descargas');

    try {
        const carpetas = fs.readdirSync(descargasPath);
        carpetas.forEach(carpeta => {
            const carpetaPath = path.join(descargasPath, carpeta);
            fs.rmdirSync(carpetaPath, { recursive: true });
            console.log(`Carpeta ${carpeta} eliminada.`);
        });
    } catch (error) {
        console.error('Error al borrar las carpetas de Descargas:', error);
    }
}

// Tarea programada para ejecutar la función a la 1 de la mañana todos los días
const tareaBorrarCarpetas = new CronJob('0 1 * * *', () => {
    console.log('Ejecutando la tarea de borrado de carpetas...');
    borrarCarpetasDescargas();
}, null, true, "America/New_York"); // Cambia a la zona horaria adecuada

tareaBorrarCarpetas.start();


/* route.get('/info', async (req, res) => 
    try {
        const now = new Date().toISOString(); // Obtener la fecha y hora actual en formato UTC
        console.log(now)
        // Calcular la fecha de mañana en formato UTC
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowUTC = tomorrow.toISOString();

        // Consultar la colección Info para documentos con fecha igual o posterior a hoy y anterior a mañana en UTC
        const documentosHoy = await InfoModel.find({
            fecha: {
                $gte: now,
                $lt: tomorrowUTC
            }
        });

        console.log(now);
        res.status(200).json(documentosHoy);
    } catch (error) {
        console.error("Error al obtener documentos de hoy en UTC:", error);
        res.status(500).json({ error: "Error al obtener documentos de hoy en UTC" });
    }
}); */


module.exports = route;