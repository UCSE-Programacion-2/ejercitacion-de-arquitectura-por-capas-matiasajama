require('dotenv').config({ quiet: true });

const express = require('express');
const connectDB = require('./config/database');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

// TODO: Importar y usar las rutas de partidos

const PORT = process.env.PORT || 3000;

// Exportamos 'app' para poder hacer testing
module.exports = { app };

// Iniciar el servidor solo si este archivo se ejecuta directamente
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}
