const { spawnSync } = require('child_process');

async function listarUrlImages(total) {
    const playlistUrl = 'https://www.youtube.com/playlist?list=PL4fGSI1pDJn4k5jOJjYpq8pluME-gNAnh';
    const ytDlpPath = './extensiones/yt-dlp';

    const args = [
        '--skip-download',
        '--get-thumbnail',
        '--playlist-items', `1-${total}`,
        playlistUrl,
    ];

    const result = {
        heading: ['id', 'position', 'url_image', 'fecha'],
        data: [],
    };

    const ytDlpProcess = spawnSync(ytDlpPath, args, { encoding: 'utf-8' });

    if (ytDlpProcess.error) {
        throw new Error(`Error al ejecutar el proceso: ${ytDlpProcess.error}`);
    }

    if (ytDlpProcess.status !== 0) {
        throw new Error(`Proceso de yt-dlp finalizado con código de salida ${ytDlpProcess.status}`);
    }

    const urlImages = ytDlpProcess.stdout.trim().split('\n');
    let count = 0;

    urlImages.forEach((urlImage) => {
        count++;
        result.data.push({ id: 'id', position: count, url_image: urlImage, fecha: new Date().toISOString() });
    });

    return result;
}

module.exports = listarUrlImages;


/* const { spawn } = require('child_process');

async function listarUrlImages(total) {
    // Reemplaza 'URL_DEL_PLAYLIST' con la URL real del playlist de YouTube que deseas analizar.h
    const playlistUrl = 'https://www.youtube.com/playlist?list=PL4fGSI1pDJn4k5jOJjYpq8pluME-gNAnh';

    // Ruta al archivo yt-dlp.exe
    const ytDlpPath = './extensiones/yt-dlp';

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


module.exports = listarUrlImages; */