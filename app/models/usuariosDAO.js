class UsuariosDAO {
    constructor(dbConnection) {
        this._connection = dbConnection();
    }

    inserirUsuario = usuario => {
        console.log('[DATABASE - USUARIOS] - Cadastro iniciado | id: ' + usuario.usuario);
        this._connection.connect((err, mongoClient) => {
            if(!err) {
                mongoClient.db('got').collection('usuarios', async (err, collection) => {
                    if(!err) {
                        await collection.insertOne(usuario);
                        console.log('[DATABASE - USUARIOS] - Cadastro finalizado | id: ' + usuario.usuario);
                        mongoClient.close();
                    }
                })
            }
        });
        
    }
    
    autenticar = (usuario, session, res) => {
        console.log('[DATABASE - USUARIOS] - Autenticação iniciada | id: ' + usuario.usuario);
        this._connection.connect((err, mongoClient) => {
            if(!err) {
                mongoClient.db('got').collection('usuarios', async (err, collection) => {
                    if(!err) {
                        await collection.find(usuario).toArray((err, result) => {
                            if(result[0] !== undefined) {
                                session.autorizado = true;

                                session.usuario = result[0].usuario;
                                session.casa = result[0].casa;
                            }
                            
                            if(session.autorizado) {
                                res.redirect('jogo');
                            } else res.render('index', {validation: [{msg:'Usuário ou senha inválidos!.'}], dadosForm: {}});

                            console.log('[DATABASE - USUARIOS] - Autenticação finalizada | id: ' + usuario.usuario);
                            mongoClient.close();
                        });
                    }
                })
            }
        });
    }
}

module.exports = () => UsuariosDAO;

