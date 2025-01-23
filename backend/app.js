//require('dotenv').config();
const express = require('express');
//const cors = require('cors');
const UserRoutes = require('./routes/UserRoutes');
const InstitutionRoutes = require('./routes/InstitutionRoutes');

const app = express();

//app.use(cors({
//  origin: 'http://localhost:5173',
//  methods: ['GET', 'POST', 'PUT', 'DELETE'],
//  allowedHeaders: ['Content-Type', 'Authorization'],
//}));

app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
  });

app.use('/users', UserRoutes);
app.use('/institutions', InstitutionRoutes);

module.exports = app;
