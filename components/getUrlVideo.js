const { spawn } = require('child_process');

async function listarUrls(total) {
    // Reemplaza 'URL_DEL_PLAYLIST' con la URL real del playlist de YouTube que deseas analizar.
    const playlistUrl = 'https://www.youtube.com/playlist?list=PL4fGSI1pDJn61j743B9r2LNeLCUUZsRMV';

    // Ruta al archivo yt-dlp.exe
    const ytDlpPath = './extensiones/yt-dlp.exe';

    // Argumentos para yt-dlp (obtener títulos de un playlist)
    const args = [
        '--get-url',
        '--flat-playlist',
        '--playlist-items', `1-${total}`,
        playlistUrl,
    ];

    // Crear una promesa para manejar la ejecución asíncrona de yt-dlp
    return new Promise((resolve, reject) => {
        const result = {
            heading: ['id', 'position', 'url_video', 'fecha'],
            data: [],
        };

        // Ejecutar yt-dlp como un proceso hijo
        const ytDlpProcess = spawn(ytDlpPath, args);
        let count = 0
        // Capturar la salida estándar (stdout) del proceso
        ytDlpProcess.stdout.on('data', (data) => {
           // console.log(data.toString().trim())
            const urls = data.toString().trim().split('\n');

            // Agregar los títulos al arreglo de datos en el formato deseado
            count++
            urls.forEach((url, index) => {
                result.data.push(['id', count, url, new Date().toISOString()]);
            });
        });

        // Capturar errores si los hay
        ytDlpProcess.stderr.on('data', (data) => {
            reject(`Error al obtener los títulos: ${data}`);
        });

        // Manejar el cierre del proceso
        ytDlpProcess.on('close', (code) => {
            if (code === 0) {
                resolve(result);
            } else {
                reject(`Proceso de yt-dlp finalizado con código de salida ${code}`);
            }
        });
    });
}


module.exports = listarUrls;