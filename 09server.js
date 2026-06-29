//PARTE 4

app.get('/verificar_sessao_usuario', (req, res) => {
  if (req.session.usuarioId) {
    res.status(200).json({ logado: true, nome: req.session.usuarioNome });
  } else {
    res.status(401).json({ logado: false });
  }
});
