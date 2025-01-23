const app = require('./app');
//const express = require('express');
//const UserRoutes = require('./routes/UserRoutes');
const { sequelize } = require('./models');

//const app = express();

//app.use(express.json());

//app.use('/users', UserRoutes);

//const PORT = process.env.PORT || 3000;

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta http://localhost/${PORT}`);
  await sequelize.sync({ force: false });
  console.log('Banco de dados sincronizado');
});
