/*  const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ytDlpPath = './extensiones/yt-dlp'; // Ruta al ejecutable yt-dlp

function generarIdUnico() {
    return Math.random().toString(36).substring(2, 15);
}

function descargarCancionWait(busqueda) {
    const idUnico = generarIdUnico();
    const descargasPath = path.join(__dirname, '..', 'Descargas'); // Carpeta "Descargas" en la raíz principal
    const carpeta = path.join(descargasPath, idUnico);

    try {
        if (!fs.existsSync(descargasPath)) {
            fs.mkdirSync(descargasPath);
        }
        fs.mkdirSync(carpeta);
    } catch (error) {
        console.error('Error al crear la carpeta:', error);
        return null;
    }

    const comando = ytDlpPath; // Utilizando la ruta especificada para yt-dlp
    const argumentos = [
        '-x',
        '--audio-format',
        'mp3',
        `ytsearch1:${busqueda}`,
        '-o',
        `${carpeta}/%(title)s.%(ext)s`
    ];

    const proceso = spawnSync(comando, argumentos, { encoding: 'utf-8' });

    if (proceso.error) {
        console.error('Error al ejecutar yt-dlp:', proceso.error);
        return null;
    }

    const archivoDescargado = fs.readdirSync(carpeta)[0];
    const nuevoNombre = `${busqueda}.mp3`;
    const rutaArchivoAntiguo = path.join(carpeta, archivoDescargado);
    const rutaArchivoNuevo = path.join(carpeta, nuevoNombre);

    try {
        fs.renameSync(rutaArchivoAntiguo, rutaArchivoNuevo);
    } catch (error) {
        console.error('Error al renombrar el archivo:', error);
        return null;
    }

    console.log('Canción descargada correctamente.');
    console.log('La canción se ha guardado en:', carpeta);

    return {
        idCarpeta: idUnico,
        busqueda: busqueda,
        nombreOriginal: archivoDescargado,
        ruta:`https://envivo.top:9100/descargas/${idUnico}/${encodeURIComponent(busqueda)}.mp3`
    };
}

module.exports = descargarCancionWait
// Uso de la función
/* const busqueda = 'corazon serrano ';
const resultado = descargarCancion(busqueda);
if (resultado) {
    console.log('Resultado:', resultado);
} else {
    console.log('Error al descargar la canción.');
}
 */  


/* const { spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

const ytDlpPath = './extensiones/yt-dlp'; // Ruta al ejecutable yt-dlp
const descargasPath = path.join(__dirname, '..', 'Descargas'); // Carpeta "Descargas" en la raíz principal

function generarIdUnico() {
    return Math.random().toString(36).substring(2, 15);
}

async function descargarCancion(busqueda) {
    return new Promise((resolve, reject) => {
        const idUnico = generarIdUnico();
        const carpeta = path.join(descargasPath, idUnico);
        const nombreArchivo = `${busqueda}`;

        fs.mkdir(descargasPath, { recursive: true })
            .then(() => fs.mkdir(carpeta))
            .then(() => {
                const comando = ytDlpPath; // Utilizando la ruta especificada para yt-dlp
                const argumentos = [
                    '--extract-audio',                   
                    '--socket-timeout', '10', // Tiempo de espera del socket (en segundos)
                    '--no-check-certificate', // No verificar certificados SSL
                    '--match-filter', 'duration < 1200', // Filtrar videos con duración menor a 1200 segundos (20 minutos)
                    `ytsearch:${busqueda}`,
                    '-o',
                    `${carpeta}/${nombreArchivo}` // Especificar el nombre del archivo directamente aquí
                ];

                const proceso = spawn(comando, argumentos);

                proceso.on('error', (error) => {
                    console.error('Error al ejecutar yt-dlp:', error);
                    reject(error);
                });

                proceso.on('close', async (code) => {
                    if (code === 0) {
                        console.log('Canción descargada correctamente.');
                        console.log('La canción se ha guardado en:', carpeta);

                        // Devolvemos los datos necesarios inmediatamente
                        const resultado = {
                            idCarpeta: idUnico,
                            busqueda: busqueda,
                            ruta: `https://envivo.top:9100/descargas/${idUnico}/${encodeURIComponent(nombreArchivo)}.opus`
                        };
                        resolve(resultado);
                    } else {
                        console.error('Error al descargar la canción.');
                        reject(new Error('Error al descargar la canción'));
                    }
                });
            })
            .catch((error) => {
                console.error('Error al crear la carpeta:', error);
                reject(error);
            });
    });
}


module.exports = descargarCancion; */


/* const { spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

const ytDlpPath = './extensiones/yt-dlp'; // Path to the yt-dlp executable
const descargasPath = path.join(__dirname, '..', 'Descargas'); // "Descargas" folder in the root directory

function generarIdUnico() {
    return Math.random().toString(36).substring(2, 15);
}

async function descargarCancion(busqueda) {
    const idUnico = generarIdUnico();
    const carpeta = path.join(descargasPath, idUnico);
    const nombreArchivo = `${busqueda}.opus`; // Specify the extension here

    try {
        // Ensure the download path exists
        await fs.mkdir(descargasPath, { recursive: true });
        await fs.mkdir(carpeta);
    } catch (error) {
        console.error('Error al crear la carpeta:', error.message);
        throw new Error(`Failed to create directory: ${error.message}`);
    }

    const comando = ytDlpPath;
    const argumentos = [
        '--extract-audio',
        '--audio-format', 'opus',
        '--socket-timeout', '10', // Socket timeout in seconds
        '--no-check-certificate', // Don't verify SSL certificates
        '--match-filter', 'duration < 1200', // Filter videos shorter than 1200 seconds (20 minutes)
        `ytsearch:${busqueda}`,
        '-o', `${carpeta}/${nombreArchivo}`
    ];

    return new Promise((resolve, reject) => {
        const proceso = spawn(comando, argumentos);

        proceso.on('error', (error) => {
            console.error('Error al ejecutar yt-dlp:', error.message);
            reject(new Error(`Failed to execute yt-dlp: ${error.message}`));
        });

        proceso.on('close', async (code) => {
            if (code === 0) {
                console.log('Canción descargada correctamente.');
                console.log('La canción se ha guardado en:', carpeta);

                const resultado = {
                    idCarpeta: idUnico,
                    busqueda: busqueda,
                    ruta: `https://envivo.top:9100/descargas/${idUnico}/${encodeURIComponent(nombreArchivo)}`
                };
                resolve(resultado);
            } else {
                const errorMessage = `yt-dlp exited with code ${code}`;
                console.error('Error al descargar la canción:', errorMessage);
                reject(new Error(errorMessage));
            }
        });
    });
}

module.exports = descargarCancion; */


const { spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

const ytDlpPath = './extensiones/yt-dlp'; // Path to the yt-dlp executable
const descargasPath = path.join(__dirname, '..', 'Descargas'); // "Descargas" folder in the root directory
const cookiesPath = './youtube_cookies.txt'; // Path to the cookies file

function generarIdUnico() {
    return Math.random().toString(36).substring(2, 15);
}

async function descargarCancion(busqueda) {
    const idUnico = generarIdUnico();
    const carpeta = path.join(descargasPath, idUnico);
    const nombreArchivo = `${busqueda}.opus`; // Specify the extension here

    try {
        // Ensure the download path exists
        await fs.mkdir(descargasPath, { recursive: true });
        await fs.mkdir(carpeta);
    } catch (error) {
        console.error('Error al crear la carpeta:', error.message);
        throw new Error(`Failed to create directory: ${error.message}`);
    }

    const comando = ytDlpPath;
    const argumentos = [
        '--extract-audio',
        '--audio-format', 'opus',
        '--socket-timeout', '10', // Socket timeout in seconds
        '--no-check-certificate', // Don't verify SSL certificates
        '--match-filter', 'duration < 1200', // Filter videos shorter than 1200 seconds (20 minutes)
        `ytsearch:${busqueda}`,
        '-o', `${carpeta}/${nombreArchivo}`,
        '--cookies', cookiesPath // Add this line to use cookies
    ];

    return new Promise((resolve, reject) => {
        const proceso = spawn(comando, argumentos);
        
        let stdout = '';
        let stderr = '';

        proceso.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        proceso.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        proceso.on('error', (error) => {
            console.error('Error al ejecutar yt-dlp:', error.message);
            reject(new Error(`Failed to execute yt-dlp: ${error.message}`));
        });

        proceso.on('close', (code) => {
            if (code === 0) {
                console.log('Canción descargada correctamente.');
                console.log('La canción se ha guardado en:', carpeta);

                const resultado = {
                    idCarpeta: idUnico,
                    busqueda: busqueda,
                    ruta: `https://envivo.top:9100/descargas/${idUnico}/${encodeURIComponent(nombreArchivo)}`
                };
                resolve(resultado);
            } else {
                console.error('Error al descargar la canción:');
                console.error(`Exit code: ${code}`);
                console.error(`Stdout: ${stdout}`);
                console.error(`Stderr: ${stderr}`);
                reject(new Error(`yt-dlp exited with code ${code}\nStdout: ${stdout}\nStderr: ${stderr}`));
            }
        });
    });
}

module.exports = descargarCancion;

// Usage example
// const busqueda = 'corazon serrano';
// descargarCancion(busqueda)
//     .then(resultado => console.log('Resultado:', resultado))
//     .catch(error => console.log('Error al descargar la canción:', error));



