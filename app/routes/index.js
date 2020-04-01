module.exports = function(application){
	application.get('/', function(req, res){
		application.app.controllers.index.get(application, req, res);
	});

	application.post('/autenticar', function(req, res) {
		application.app.controllers.index.post(application, req, res);
	})
}