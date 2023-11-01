const { spawn } = require('child_process');

async function listarTitulos(total) {
    // Reemplaza 'URL_DEL_PLAYLIST' con la URL real del playlist de YouTube que deseas analizar.
    const playlistUrl = 'https://www.youtube.com/playlist?list=PL4fGSI1pDJn4k5jOJjYpq8pluME-gNAnh';

    // Ruta al archivo yt-dlp.exe
    const ytDlpPath = './extensiones/yt-dlp';

    // Argumentos para yt-dlp (obtener títulos de un playlist)
    const args = [
        '--skip-download',
        '--get-title',
        '--flat-playlist',
        '--encoding', 'utf-8', // Configuración de codificación utf-8
        '--playlist-items', `1-${total}`,
        playlistUrl,
    ];

    // Crear una promesa para manejar la ejecución asíncrona de yt-dlp
    return new Promise((resolve, reject) => {
        const result = {
            heading: ['id', 'position', 'title', 'fecha'],
            data: [],
        };

        // Ejecutar yt-dlp como un proceso hijo
        const ytDlpProcess = spawn(ytDlpPath, args);
        let count = 0
        // Capturar la salida estándar (stdout) del proceso
        ytDlpProcess.stdout.on('data', (data) => {
            //console.log(data.toString().trim())
            const titles = data.toString().trim().split('\n');

            // Agregar los títulos al arreglo de datos en el formato deseado
            count++
            titles.forEach((title, index) => {
                result.data.push(['id', count, title, new Date().toISOString()]);
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


module.exports = listarTitulos;