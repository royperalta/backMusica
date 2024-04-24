const { spawnSync } = require('child_process');

async function descargarCanciones(total) {
    const playlistUrl = 'https://www.youtube.com/playlist?list=PL4fGSI1pDJn4k5jOJjYpq8pluME-gNAnh';
    const ytDlpPath = './extensiones/yt-dlp';
    const outputDirectory = './downloads/';
    const args = [
        '-i',
        '--yes-playlist',
        '-x',
        '--audio-format', 'mp3',
        `--output`, `${outputDirectory}%(playlist_index)s_%(id)s.%(ext)s`,
        '--playlist-items', `1-${total}`,
        playlistUrl,
    ];

    // Ejecutar el comando de manera sincrónica
    const result = spawnSync(ytDlpPath, args);

    if (result.error) {
        throw new Error(`Error al ejecutar yt-dlp: ${result.error.message}`);
    }

    if (result.status !== 0) {
        throw new Error(`Proceso de yt-dlp finalizado con código de salida ${result.status}`);
    }

    // El proceso terminó exitosamente
    console.log('Descarga completada correctamente.');
}

module.exports = descargarCanciones;
