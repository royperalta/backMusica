const { spawn } = require('child_process');

async function descargarCanciones() {
    // Reemplaza 'URL_DEL_PLAYLIST' con la URL real del playlist de YouTube que deseas descargar.
    const playlistUrl = 'https://www.youtube.com/playlist?list=PL4fGSI1pDJn61j743B9r2LNeLCUUZsRMV';

    // Ruta al archivo yt-dlp.exe
    const ytDlpPath = './extensiones/yt-dlp.exe';

    // Directorio de salida para los archivos MP3 descargados
    const outputDirectory = './downloads/';

    // Argumentos para yt-dlp (obtener títulos de un playlist)
    const args = [
        '-i',
        '--yes-playlist',
        '-x',
        '--audio-format', 'mp3',
        `--output`, `${outputDirectory}%(playlist_index)s_%(title)s.%(ext)s`,
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