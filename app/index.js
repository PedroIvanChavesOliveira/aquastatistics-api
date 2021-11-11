const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');

const app = express();
const { connection } = mongoose;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes/DeskParametersController')(app);
require('./routes/ProbeParametersController')(app);
require('./routes/SystemController')(app);

console.log('Iniciando conexão ao MongoDB...');
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      connectedToMongoDB = false;
      console.error(`Erro na conexão ao MongoDB - ${err}`);
    }
  }
);

connection.once('open', () => {
  let connectedToMongoDB = true;
  console.log('Conectado ao MongoDB');

  const APP_PORT = process.env.PORT || 3001;
  app.listen(APP_PORT, () => {
    console.log(`Servidor iniciado na porta ${APP_PORT}`);
  });
});
