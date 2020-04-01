module.exports.get = (app, req, res) => {
    res.render('index', {validation: {}, dadosForm: {}});
}

module.exports.post = (app, req, res) => {
    const dadosForm = req.body;

    req.assert('usuario', 'Usuário não pode estar vazio!').notEmpty();
    req.assert('senha', 'Senha não pode estar vazio!').notEmpty();

    const errors = req.validationErrors();

    if(errors) {
        res.render('index', {validation: errors, dadosForm});
        return;
    }
    const UsuariosDAO = new app.app.models.usuariosDAO(app.config.dbConnection);
    
    UsuariosDAO.autenticar(dadosForm, req.session, res);


    
}   