const LoginController = require('../controllers/login_controller');

module.exports = function(server){
  server.post('/', LoginController.LoginController)
}
