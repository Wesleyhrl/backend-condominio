const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const residentRoutes = require('./routes/residentRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes'); // Importação das rotas de veículos
const userRoutes = require('./routes/userRoutes'); // Importação das rotas de usuários

dotenv.config();
connectDB();

const app = express();

app.use(bodyParser.json());

// Rotas
app.use('/api/residents', residentRoutes); // Registro das rotas residentes
app.use('/api/vehicles', vehicleRoutes); // Registro das rotas de veículos
app.use('/api/users', userRoutes); // Registro das rotas de usuários

module.exports = app;
