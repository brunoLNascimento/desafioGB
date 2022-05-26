const sallerController = require('../controllers/seller_controller');

module.exports = function(server){
  server.post('/saller', sallerController.newSaller)
  server.get('/saller/:id?', sallerController.getSaller)

}
