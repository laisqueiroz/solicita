require('dotenv').config();
const express = require('express');
const cors = require('cors');
const UserRoutes = require('./routes/UserRoutes');
const InstitutionRoutes = require('./routes/InstitutionRoutes');
const RotationRoutes = require('./routes/RotationRoutes');
const EquipmentRoutes = require('./routes/EquipmentRoutes');
const SolicitationRoutes = require('./routes/SolicitationRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
  });

app.use('/users', UserRoutes);
app.use('/institutions', InstitutionRoutes);
app.use('/rotations', RotationRoutes);
app.use('/equipment', EquipmentRoutes);
app.use('/solicitations', SolicitationRoutes);

module.exports = app;
