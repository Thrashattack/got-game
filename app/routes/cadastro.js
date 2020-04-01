module.exports = function(application){
	application.get('/cadastro', function(req, res){
		application.app.controllers.cadastro.get(application, req, res);
	});

	application.post('/cadastrar', function(req, res){
		application.app.controllers.cadastro.post(application, req, res);
	});
}