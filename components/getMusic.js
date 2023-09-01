const { spawn } = require('child_process');
const urls =require('./getUrlVideo.js')
const fs = require('fs')

/**
 * Descarga un audio en formato mp3 de una URL de YouTube usando yt-dlp y devuelve
 * un objeto con el título, la duración y el ID del audio.
 * @param {string} url - URL del video de YouTube
 * @param {string} downloadPath - Ruta donde se guardarán los archivos descargados
 * @returns {Promise<{title: string, duration: number, id: string}>} - Objeto con la información del audio descargado
 * 
 */

async function getListaUrls(){
    const lista = await urls()
    console.log(lista)
}

getListaUrls()

async function descargarAudio(url, downloadPath) {
  
    const jsonPath = `${downloadPath}/info.json`;

    const ytDlp = spawn('yt-dlp', [
        '-x', // Descargar solo el audio
        '--audio-format', 'mp3', // Formato de audio deseado
        '--audio-quality', '0', // Calidad de audio máxima
        '--write-info-json', // Crear archivo JSON con la información del audio
        '--write-json', downloadPath, // Guardar archivo JSON en la carpeta de descarga
        url // URL del video de YouTube
    ]);

    const stdoutChunks = [];
    const stderrChunks = [];

    ytDlp.stdout.on('data', (data) => {
        stdoutChunks.push(data);
    });

    ytDlp.stderr.on('data', (data) => {
        stderrChunks.push(data);
    });

    return new Promise((resolve, reject) => {
        ytDlp.on('close', (code) => {
            if (code === 0) {
                fs.readFile(jsonPath, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        const audioInfo = JSON.parse(data.toString());
                        const title = audioInfo.title;
                        const duration = audioInfo.duration;
                        const id = audioInfo.id;
                        resolve({ title, duration, id });
                    }
                });
            } else {
                const stderr = Buffer.concat(stderrChunks).toString();
                reject(new Error(`yt-dlp cerró con código ${code}. stderr: ${stderr}`));
            }
        });
    });
}



//module.exports = descargarAudio