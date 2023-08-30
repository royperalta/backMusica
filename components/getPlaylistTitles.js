const { exec } = require('child_process');

function listarTitulos() {
    // Reemplaza 'URL_DEL_PLAYLIST' con la URL real del playlist de YouTube que deseas analizar.
    const playlistUrl = 'https://www.youtube.com/playlist?list=PL4fGSI1pDJn61j743B9r2LNeLCUUZsRMV';

    // Ejecutar yt-dlp para obtener la información del playlist
    const command = `yt-dlp --skip-download --get-title --flat-playlist ${playlistUrl}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al obtener los títulos: ${error}`);
            return;
        }

        // Los títulos se separan por líneas, así que los dividimos en un array
        const titles = stdout.trim().split('\n');

        // Imprimir los títulos
        console.log('Títulos del playlist:');
        titles.forEach((title, index) => {
            console.log(`${index + 1}. ${title}`);
        });
    });

}

module.exports = listarTitulos