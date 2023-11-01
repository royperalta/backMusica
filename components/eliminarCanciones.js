const fs = require("fs");
const path = require("path");

function eliminarCanciones() {
    const carpeta = "./downloads"; // Reemplaza con la ruta de la carpeta que desees truncar

    // Lee el contenido de la carpeta
    fs.readdir(carpeta, (error, archivos) => {
        if (error) {
            console.error("Error al leer la carpeta:", error);
            return;
        }

        // Itera sobre los archivos en la carpeta y borra cada uno
        archivos.forEach(archivo => {
            const rutaArchivo = path.join(carpeta, archivo);

            fs.unlink(rutaArchivo, error => {
                if (error) {
                    console.error(`Error al borrar el archivo ${archivo}:`, error);
                } else {
                    console.log(`Archivo ${archivo} borrado correctamente.`);
                }
            });
        });
    });

}

module.exports = eliminarCanciones