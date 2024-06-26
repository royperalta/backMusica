const { spawnSync } = require('child_process');

async function listarTitulos(total) {
    const playlistUrl = 'https://www.youtube.com/playlist?list=PL4fGSI1pDJn4k5jOJjYpq8pluME-gNAnh';
    const ytDlpPath = './extensiones/yt-dlp';

    const args = [
        '--skip-download',
        '--get-title',
        '--flat-playlist',
        '--encoding', 'utf-8',
        '--playlist-items', `1-${total}`,
        playlistUrl,
    ];

    const result = {
        heading: ['id', 'position', 'title', 'fecha'],
        data: [],
    };

    const ytDlpProcess = spawnSync(ytDlpPath, args, { encoding: 'utf-8' });

    if (ytDlpProcess.error) {
        throw new Error(`Error al ejecutar el proceso: ${ytDlpProcess.error}`);
    }

    if (ytDlpProcess.status !== 0) {
        throw new Error(`Proceso de yt-dlp finalizado con código de salida ${ytDlpProcess.status}`);
    }

    const titles = ytDlpProcess.stdout.trim().split('\n');
    let count = 0;

    
    titles.forEach((title) => {        
        count++;
        result.data.push({ id: count, title: title, fecha: new Date().toISOString() });
    });

    return result;
}

module.exports = listarTitulos;


/* const { spawn } = require('child_process');

async function listarTitulos(total) {
    // Reemplaza 'URL_DEL_PLAYLIST' con la URL real del playlist de YouTube que deseas analizar.h
    const playlistUrl = 'https://www.youtube.com/playlist?list=PL4fGSI1pDJn4k5jOJjYpq8pluME-gNAnh';

    // Ruta al archivo yt-dlp.exeg
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


module.exports = listarTitulos; */