const { exec } = require('child_process');

function listarTitulos() {
    // Reemplaza 'URL_DEL_PLAYLIST' con la URL real del playlist de YouTube que deseas analizar.
    const { spawn } = require('child_process');

    // Reemplaza 'URL_DEL_PLAYLIST' con la URL real del playlist de YouTube que deseas analizar.
    const playlistUrl = 'https://www.youtube.com/playlist?list=PL4fGSI1pDJn61j743B9r2LNeLCUUZsRMV';

    // Ruta al archivo yt-dlp.exe
    const ytDlpPath = './extensiones/yt-dlp.exe';

    // Argumentos para yt-dlp (obtener títulos de un playlist)
    const args = [
        '--skip-download',
        '--get-title',
        '--flat-playlist',
        playlistUrl,
    ];

    // Ejecutar yt-dlp como un proceso hijo
    const ytDlpProcess = spawn(ytDlpPath, args);

    // Capturar la salida estándar (stdout) del proceso
    ytDlpProcess.stdout.on('data', (data) => {
        const titles = data.toString().trim().split('\n');

        console.log('Títulos del playlist:');
        titles.forEach((title, index) => {
            console.log(`${index + 1}. ${title}`);
        });
    });

    // Capturar errores si los hay
    ytDlpProcess.stderr.on('data', (data) => {
        console.error(`Error al obtener los títulos: ${data}`);
    });

    // Manejar el cierre del proceso
    ytDlpProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Proceso de yt-dlp finalizado con código de salida ${code}`);
        }
    });

}

module.exports = listarTitulos