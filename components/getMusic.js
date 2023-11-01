const { spawn } = require('child_process');

async function descargarCanciones(total) {
    // Reemplaza 'URL_DEL_PLAYLIST' con la URL real del playlist de YouTube que deseas descargar.
    const playlistUrl = 'https://www.youtube.com/playlist?list=PL4fGSI1pDJn4k5jOJjYpq8pluME-gNAnh';

    // Ruta al archivo yt-dlp.exe
    const ytDlpPath = './extensiones/yt-dlp';

    // Directorio de salida para los archivos MP3 descargados
    const outputDirectory = './downloads/';

    // Argumentos para yt-dlp (obtener títulos de un playlist)
    const args = [
        '-i',
        '--yes-playlist',
        '-x',
        '--audio-format', 'mp3',
        `--output`, `${outputDirectory}%(playlist_index)s_%(id)s.%(ext)s`,
        '--playlist-items', `1-${total}`,
        playlistUrl,
    ];
   
    return new Promise((resolve, reject) => {
        // Ejecutar el comando
        const ytDlpProcess = spawn(ytDlpPath, args);

        ytDlpProcess.stdout.on('data', (data) => {
            
            console.log(`stdout: ${data}`);
        });

        ytDlpProcess.stderr.on('data', (data) => {
            reject(`Error al obtener la URL De de las imágenes: ${data}`);
        });

        // Manejar el cierre del proceso
        ytDlpProcess.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(`Proceso de yt-dlp finalizado con código de salida ${code}`);
            }
        });
    });
}

module.exports = descargarCanciones