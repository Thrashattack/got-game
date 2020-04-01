module.exports.get = (app, req, res) => {
    if(!req.session.autorizado) {
        res.render('index', {validation:[{msg: 'Usuario precisa estar autenticado!'}], dadosForm: {}});        
        return;
    }
    let erro = false
    if(req.query.erro === 's') {
        erro = true
    }
    let acaoInserida = false
    if(req.query.acao_inserida === 's') {
        acaoInserida = true
    }
    const callback = (jogo) => res.render('jogo', {img_casa: req.session.casa, jogo, erro, acaoInserida});
    
    const JogoDAO = new app.app.models.jogoDAO(app.config.dbConnection);
    JogoDAO.iniciarJogo(req.session.usuario, callback)        

}
module.exports.sair = (app, req, res) => {    
    req.session.destroy((err) => {
        res.render('index', {validation: {}, dadosForm: {}});
    });
   
}

module.exports.suditos = (app, req, res) => {    
    if(!req.session.autorizado) {
        res.render('index', {validation:[{msg: 'Usuario precisa estar autenticado!'}], dadosForm: {}});        
        return;
    }
       res.render('aldeoes');
}

module.exports.pergaminhos = (app, req, res) => {  
    if(!req.session.autorizado) {
        res.render('index', {validation:[{msg: 'Usuario precisa estar autenticado!'}], dadosForm: {}});      
        return;
    }  
    const JogoDAO = new app.app.models.jogoDAO(app.config.dbConnection);
    const callback = (acoes) => res.render('pergaminhos', { acoes });
    JogoDAO.obterAcoes(req.session.usuario, callback);
}

module.exports.ordenar_acao_sudito = (app, req, res) => {  
    if(!req.session.autorizado) {
        res.render('index', {validation:[{msg: 'Usuario precisa estar autenticado!'}], dadosForm: {}});        
        return;
    }  
       const dadosForm = req.body;

       req.assert('acao', "Ação deve ser informada").notEmpty();
       req.assert('quantidade', "Quantidade de suditos deve ser informada").notEmpty();

       const erros = req.validationErrors();

       if(erros) {
           res.redirect('jogo?erro=s')
           return;
       }

       const JogoDAO = new app.app.models.jogoDAO(app.config.dbConnection);
       dadosForm.usuario = req.session.usuario
       JogoDAO.acao(dadosForm);
       res.redirect('jogo?acao_inserida=s')
}


