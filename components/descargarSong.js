const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ytDlpPath = './extensiones/yt-dlp'; // Ruta al ejecutable yt-dlp

function generarIdUnico() {
    return Math.random().toString(36).substring(2, 15);
}

function descargarCancion(busqueda) {
    const idUnico = generarIdUnico();
    const descargasPath = path.join(__dirname, '..', 'Descargas'); // Carpeta "Descargas" en la raíz principal
    const carpeta = path.join(descargasPath, idUnico);

    try {
        if (!fs.existsSync(descargasPath)) {
            fs.mkdirSync(descargasPath);
        }
        fs.mkdirSync(carpeta);
    } catch (error) {
        console.error('Error al crear la carpeta:', error);
        return null;
    }

    const comando = ytDlpPath; // Utilizando la ruta especificada para yt-dlp
    const argumentos = [
        '-x',
        '--audio-format',
        'mp3',
        `ytsearch1:${busqueda}`,
        '-o',
        `${carpeta}/%(title)s.%(ext)s`
    ];

    const proceso = spawnSync(comando, argumentos, { encoding: 'utf-8' });

    if (proceso.error) {
        console.error('Error al ejecutar yt-dlp:', proceso.error);
        return null;
    }

    const archivoDescargado = fs.readdirSync(carpeta)[0];
    const nuevoNombre = `${busqueda}.mp3`;
    const rutaArchivoAntiguo = path.join(carpeta, archivoDescargado);
    const rutaArchivoNuevo = path.join(carpeta, nuevoNombre);

    try {
        fs.renameSync(rutaArchivoAntiguo, rutaArchivoNuevo);
    } catch (error) {
        console.error('Error al renombrar el archivo:', error);
        return null;
    }

    console.log('Canción descargada correctamente.');
    console.log('La canción se ha guardado en:', carpeta);

    return {
        idCarpeta: idUnico,
        busqueda: busqueda,
        nombreOriginal: archivoDescargado,
        ruta:`https://envivo.top/descargas/${idUnico}/${busqueda}.mp3`
    };
}

module.exports = descargarCancion
// Uso de la función
/* const busqueda = 'corazon serrano ';
const resultado = descargarCancion(busqueda);
if (resultado) {
    console.log('Resultado:', resultado);
} else {
    console.log('Error al descargar la canción.');
}
 */