//PARTE 1

const express = require('express');
const mongoose = require('mongoose');

const Usuario = require('./models/Usuario');
const app = express(); 

app.use(express.json());
app.use(express.static('public'));

//INICIA A CONFIGURAÇÃO PARA A SESSÃO
const session = require('express-session');

app.use(session({
  secret: 'seuSegredoUltraSecreto', // troque por algo seguro
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // true só se usar HTTPS
}));

// CONECTA O SERVIDOR NODE.JS AO BANCO DE DADOS MONGODB
// SE ELE NÃO EXISTIR AINDA, O MONGODB CRIA AUTOMATICAMENTE QUANDO O USUÁRIO SALVAR O PRIMEIRO DADO.
mongoose.connect('mongodb://localhost:27017/Ordem')
  .then(() => console.log('MongoDB conectado!'))
  .catch(err => console.error('Erro na conexão:', err));


  

// INICIA O SERVIDOR EXPRESS DENTRO DO NODE.JS
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});




// FUNÇÃO QUE GERA UM ID  CRESCENTE PARA CADA NOVO REGISTRO
async function gerarCustomId() {
  const ultima = await Usuario.findOne().sort({ customId: -1 });
  return ultima ? ultima.customId + 1 : 1;
}
