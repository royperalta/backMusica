const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const https = require('https');
const fs = require('fs');
const route = require('./routes.js');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/music', express.static('./downloads'));
app.use('/api', route);

// Configuración para el servidor HTTPS
const httpsOptions = {
  key: fs.readFileSync('/etc/ssl/virtualmin/169985749449668/ssl.key'), // Reemplaza con la ruta a tu clave privada
  cert: fs.readFileSync('/etc/ssl/virtualmin/169985749449668/ssl.cert'), // Reemplaza con la ruta a tu certificado
};

const httpsServer = https.createServer(httpsOptions, app);

const PORT = 9100; // Cambié el puerto a 9100

httpsServer.listen(PORT, () => {
  console.log('El servidor está corriendo en el puerto ' + PORT);
});

/* const PORT = 9100; // Cambié el puerto a 9100
app.listen(PORT, () => {
  console.log('El servidor está corriendo en el puerto ' + PORT);
}); */