class JogoDAO {
    constructor(dbConnection) {
        this._connection = dbConnection()
    }

    gerarParametros = usuario => {
        console.log('[DATABASE - JOGO] - Gerando parametros iniciais | id: ' + usuario.usuario);
        this._connection.connect((err, mongoClient) => {
            if(!err) {
                mongoClient.db('got').collection('jogo', async (err, collection) => {
                    if(!err) {
                        await collection.insertOne({
                            usuario,
                            moeda: 15,
                            suditos: 10,
                            temor: Math.floor(Math.random()*100),
                            sabedoria: Math.floor(Math.random()*100),
                            comercio: Math.floor(Math.random()*100),
                            magia: Math.floor(Math.random()*100) 
                        });
                        console.log('[DATABASE - JOGO] - Geração de parametros finalizada | id: ' + usuario.usuario);
                        mongoClient.close();
                    }
                })
            }
        });  
    }

    iniciarJogo = (usuario, callback) => {        
        console.log('[DATABASE - JOGO] - Iniciando Jogo | id: ' + usuario);
        this._connection.connect((err, mongoClient) => {
            if(!err) {
                mongoClient.db('got').collection('jogo', (err, collection) => {
                    if(!err) {
                        collection.find().toArray((err, jogos) => {
                            jogos.forEach(game => {
                                if(game.usuario.usuario === usuario) {                         
                                    console.log('[DATABASE - JOGO] - Jogo Iniciado | id: ' + usuario);
                                    callback(game);
                                }
                            });
                        })
                        mongoClient.close();
                    }
                })
            }
        });
    }

    acao = acao => {
        console.log('[DATABASE - JOGO] - Inserindo ação | id: ' + acao.usuario);
        this._connection.connect((err, mongoClient) => {
            if(!err) {
                mongoClient.db('got').collection('acao', (err, collection) => {
                    if(!err) {
                        let horas = 0;
                        console.log(acao.acao)
                        switch(acao.acao) {
                            case '1': horas = 1; break;
                            case '2': horas = 2; break;
                            case '3': horas = 5; break;
                            case '4': horas = 5; break;
                        }
                        const target = (3600000 * horas);                        
                        const terminaEm = new Date(new Date().getTime() + target)
                        acao.termina_em = terminaEm;

                        collection.insertOne(acao);
                        console.log('[DATABASE - JOGO] - Ação inserida | id: ' + acao.usuario);
                        mongoClient.close();
                    }
                })
            }
        });
    }

    obterAcoes = (usuario, callback) => {
        console.log('[DATABASE - JOGO] - Obtendo ações | id: ' + usuario);
        this._connection.connect((err, mongoClient) => {
            if(!err) {
                mongoClient.db('got').collection('acao', (err, collection) => {
                    if(!err) {
                        collection.find().toArray((err, acoes) => {
                            acoes.forEach(acao => {
                                if(acao.usuario === usuario) {                         
                                    console.log('[DATABASE - JOGO] - Ações obtidas | id: ' + usuario);
                                    callback(acao);
                                }
                            });
                        })
                        mongoClient.close();
                    }
                })
            }
        });
    }
}

module.exports = () => JogoDAO