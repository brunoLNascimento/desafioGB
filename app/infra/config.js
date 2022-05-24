const config = {
  db: {
      url: 'mongodb+srv://bruno:bruno@cluster0.h6epz.mongodb.net/?retryWrites=true&w=majority',
      // urlDocker: 'mongodb://mongo:27017/desafioHurb',
      // urlTeste: 'mongodb://localhost:27017/desafioHurbTest',
      options: {
          server: {
              socketOptions: {keepAlive: 1}
              //auto_reconnect: true
          }
      }
  },

  cashBack: {
      url: "https://mdaqk8ek5j.execute-api.us-east1.amazonaws.com/v1/cashback?cpf=12312312323 ",
      timeout: 4000,
      retorno: 1
  },

  limit: 10
};

module.exports = config;