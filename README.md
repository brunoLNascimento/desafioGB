# desafioGB

### Rodando o sistema
```sh
$ npm install -- Instalar as dependências.
$ npm start -- Rodar o sistema.
```

1. Post localhost:3000/saller
- Endpoint salva na base de dados o vendedor, retornando algumas informações e o token que será usado para salvar uma venda

2. Get localhost:3000/saller/
- Endpoint busca os vendedores salvos na base, pode ser consultado sem passar aí, com saller_id e cpf. Sempre paginado e limitado a 10.
- EX busca por saller_id: localhost:3000/saller/5
- EX busca por doc: localhost:3000/saller/?doc=15350946057
- EX busca por página: localhost:3000/saller/?page=1

3. Post localhost:3000/login
- Endpoint para fazer o login, retorna o token que será usado para salvar uma venda
- Ex body: { "email": "aprovado@teste.com.br", "password": "123456" }

4. Post localhost:3000/purschase
- Endpoint para fazer uma venda
- Ex body: { "saller_id": 6, "code": 1322, "value": 15000 }

5. Get localhost:3000/purschase/
- Endpoint para fazer consulta das vendas, pode ser feita também por saller_id
- Ex: localhost:3000/purschase/6 para buscar vendas de um usuário espécifico 

6. Get localhost:3000/cashback/05759852752
- Endpoint para fazer consulta no endpoint disponibilizado pela Boticário
