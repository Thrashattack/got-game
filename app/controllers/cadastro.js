module.exports.get = (app, req, res) => {
    res.render('cadastro', {validacao: {}, dadosForm: {}});
}

module.exports.post = (app, req, res) => {
    const UsuariosDAO = new app.app.models.usuariosDAO(app.dbConnection);
    const JogoDAO = new app.app.models.jogoDAO(app.dbConnection);
    const dadosForm = req.body;

    req.assert('nome', 'Nome não pode ser vazio!').notEmpty();
    req.assert('usuario', 'Usuario não pode ser vazio!').notEmpty();
    req.assert('senha', 'Senha não pode ser vazia!').notEmpty();
    req.assert('casa', 'Casa não pode ser vazia!').notEmpty();

    const errors = req.validationErrors();

    if(errors) {
        res.render('cadastro', {validacao: errors, dadosForm});
        return;
    }
    UsuariosDAO.inserirUsuario(dadosForm);
    JogoDAO.gerarParametros(dadosForm);
    res.redirect('/');
}