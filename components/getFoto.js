const { spawn } = require('child_process');

async function listarUrlImages(total) {
    // Reemplaza 'URL_DEL_PLAYLIST' con la URL real del playlist de YouTube que deseas analizar.
    const playlistUrl = 'https://www.youtube.com/playlist?list=PL4fGSI1pDJn61j743B9r2LNeLCUUZsRMV';

    // Ruta al archivo yt-dlp.exe
    const ytDlpPath = './extensiones/yt-dlp.exe';

    // Argumentos para yt-dlp (obtener títulos de un playlist)
    const args = [
        '--skip-download',
        '--get-thumbnail',  
        '--playlist-items', `1-${total}`,     
        playlistUrl,
    ];

    // Crear una promesa para manejar la ejecución asíncrona de yt-dlp
    return new Promise((resolve, reject) => {
        const result = {
            heading: ['id', 'position', 'url_image', 'fecha'],
            data: [],
        };

        // Ejecutar yt-dlp como un proceso hijo
        const ytDlpProcess = spawn(ytDlpPath, args);
        let count = 0
        // Capturar la salida estándar (stdout) del proceso
        ytDlpProcess.stdout.on('data', (data) => {
           //console.log(data.toString().trim())
            const url_images = data.toString().trim().split('\n');

            // Agregar los títulos al arreglo de datos en el formato deseado
            count++
            url_images.forEach((url_image) => {
                console.log(url_image)
                result.data.push(['id', count, url_image, new Date().toISOString()]);
            });
        });

        // Capturar errores si los hay
        ytDlpProcess.stderr.on('data', (data) => {
            reject(`Error al obtener la URL De de las imágenes: ${data}`);
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


module.exports = listarUrlImages;