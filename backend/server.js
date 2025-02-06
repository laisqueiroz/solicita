const app = require('./app');
const { sequelize } = require('./models');


const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta http://localhost/${PORT}`);
  await sequelize.sync({ force: false });
  console.log('Banco de dados sincronizado');
});
