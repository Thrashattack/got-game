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
                console.log("Conectado Ao banco");
                mongoClient.db('got').collection('usuarios', async (err, collection) => {
                    if(!err) {
                        console.log("Coleção de usuários pronta")
                        await collection.find(usuario).toArray((err, result) => {
                            if(result[0] !== undefined) {
                                console.warn("Usuário Encontrado!")
                                session.autorizado = true;

                                session.usuario = result[0].usuario;
                                session.casa = result[0].casa;
                                
                                console.log('[DATABASE - USUARIOS] - Autenticação finalizada | id: ' + usuario.usuario);
                                mongoClient.close();
                                
                                console.log("Autorizado")
                                res.redirect('jogo');
                            } else {
                                console.log('[DATABASE - USUARIOS] - Autenticação finalizada Porém Falhou | id: ' + usuario.usuario);
                                mongoClient.close();
                                res.render('index', {validation: [{msg:'Usuário ou senha inválidos!.'}], dadosForm: {}});
                            }

                            
                        });
                    } else {
                        console.error(err);
                    }
                })
            } else {
                console.error(err);
            }
        });
    }
}

module.exports = () => UsuariosDAO;

