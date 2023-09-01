const { spawn } = require('child_process');

async function obtenerImagenes() {
    // Reemplaza 'URL_DEL_MIX' con la URL real del mix de YouTube que deseas analizar.
    const mixUrl = 'https://music.youtube.com/playlist?list=PL4fGSI1pDJn61j743B9r2LNeLCUUZsRMV';

    // Ruta al archivo yt-dlp.exe
    const ytDlpPath = './extensiones/yt-dlp.exe';

    // Argumentos para yt-dlp (obtener imágenes de un mix)
    const args = [
        '--skip-download',
        '--get-thumbnail',  // Utilizar --get-thumbnail para obtener las URLs de las imágenes
        mixUrl,
    ];

    // Crear una promesa para manejar la ejecución asíncrona de yt-dlp
    return new Promise((resolve, reject) => {
        const result = {
            heading: ['id', 'position', 'imagen', 'fecha'],
            data: [],
        };

        // Ejecutar yt-dlp como un proceso hijo
        const ytDlpProcess = spawn(ytDlpPath, args);
        let count = 0;

        // Capturar la salida estándar (stdout) del proceso
        ytDlpProcess.stdout.on('data', (data) => {
            console.log(data.toString().trim());
            const imageUrls = data.toString().trim().split('\n');

            // Agregar las URLs de imágenes al arreglo de datos en el formato deseado
            count++;
            imageUrls.forEach((imageUrl) => {
                result.data.push(['id', count, imageUrl, new Date().toISOString()]);
            });
        });

        // Capturar errores si los hay
        ytDlpProcess.stderr.on('data', (data) => {
            const errorMessage = `Error al obtener las imágenes: ${data}`;
            console.error(errorMessage);
            reject(errorMessage); // Rechazar la promesa con el mensaje de error
        });

        // Manejar el cierre del proceso
        ytDlpProcess.on('close', (code) => {
            if (code === 0) {
                resolve(result);
            } else {
                const errorMessage = `Proceso de yt-dlp finalizado con código de salida ${code}`;
                console.error(errorMessage);
                reject(errorMessage); // Rechazar la promesa con el mensaje de error
            }
        });
    });
}

module.exports = obtenerImagenes;