const purschase = require('../controllers/purchase_controller');

module.exports = function(server){
  server.post('/purschase', purschase.newPurschase)
  server.get('/purschase/:id?', purschase.getPurschases)

}
