const cashBack = require('../controllers/cashBack_controller');

module.exports = function(server){
  server.get('/cashBack/:cpf', cashBack.getApiBoticario)
}
