const { spawnSync } = require('child_process');

async function listarIds() {
    const playlistUrl = 'https://www.youtube.com/playlist?list=PL4fGSI1pDJn4k5jOJjYpq8pluME-gNAnh';
    const ytDlpPath = './extensiones/yt-dlp';

    const args = [
        '--skip-download',
        '--get-id',
        '--flat-playlist',
        '--encoding', 'utf-8',
        playlistUrl,
    ];

    const result = {
        heading: ['position', 'id', 'fecha'],
        data: [],
    };

    const ytDlpProcess = spawnSync(ytDlpPath, args, { encoding: 'utf-8' });

    if (ytDlpProcess.error) {
        throw new Error(`Error al ejecutar el proceso: ${ytDlpProcess.error}`);
    }

    if (ytDlpProcess.status !== 0) {
        throw new Error(`Proceso de yt-dlp finalizado con código de salida ${ytDlpProcess.status}`);
    }

    const ids = ytDlpProcess.stdout.trim().split('\n');
    let count = 0;

    ids.forEach((id) => {
       
        count++;
        result.data.push({ position: count, id: id, fecha: new Date().toISOString() });
    });

    return result;
}

module.exports = listarIds;


/* const { spawn } = require('child_process');

async function listarIds() {
    // Reemplaza 'URL_DEL_PLAYLIST' con la URL real del playlist de YouTube que deseas analizar.h
    const playlistUrl = 'https://www.youtube.com/playlist?list=PL4fGSI1pDJn4k5jOJjYpq8pluME-gNAnh';

    // Ruta al archivo yt-dlp.exe
    const ytDlpPath = './extensiones/yt-dlp';


    // Argumentos para yt-dlp (obtener títulos de un playlist)
    const args = [
        '--skip-download',
        '--get-id',
        '--flat-playlist',
        '--encoding', 'utf-8', // Configuración de codificación utf-8
        playlistUrl,
    ];
    

    // Crear una promesa para manejar la ejecución asíncrona de yt-dlp
    return new Promise((resolve, reject) => {
        const result = {
            heading: ['position', 'id', 'fecha'],
            data: [],
        };

        // Ejecutar yt-dlp como un proceso hijo
        const ytDlpProcess = spawn(ytDlpPath, args);
        
        let count = 0
        // Capturar la salida estándar (stdout) del proceso
        ytDlpProcess.stdout.on('data', (data) => {
          
            const ids = data.toString().trim().split('\n');
            // Agregar los títulos al arreglo de datos en el formato deseado
            count++
            ids.forEach((id, index) => {
                result.data.push([count, id, new Date().toISOString()]);
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

module.exports = listarIds; */