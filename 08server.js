
//PARTE 3

app.post('/login', async (req, res) => {
  const { nome, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ nome: nome });
    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos!' });
    }
    
    else{
       req.session.usuarioId = usuario.customId;
       req.session.usuarioNome = usuario.nome;
       res.status(200).json({
        message: 'Login realizado com sucesso!',
        usuario: {
        id: usuario.customId,
        nome: usuario.nome
      }
    });
    }
    
    
  } catch (error) {
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
});
