# Como iniciar a API

- No terminal, instale todos os pacotes: yarn <br>
- Copie o arquivo '.env.example' e cole com o nome '.env'. <br>
- Acesse o pgadmin com suas credenciais <br>
- No ícone com a descrição 'Servers' no canto esquerdo superior, clique com o botão direito > Create > Server <br>
- Na aba 'General' defina um nome para o server.
- Na aba 'Connection' insira um host, a porta, o user e o password.
- No server criado, crie o banco de dados com o nome "enterprises".
- As variáveis de banco de dados existentes no arquivo .env devem ser equivalentes as informações dos passos anteriores.
- No terminal rode as migrations: yarn typeorm migration:run; <br>
- No terminal digite yarn start para iniciar a api. <br>

Obs: Para executar os endpoints, deve-se adicionar o bearer token no header da chamada. <br>

Documentação da API: https://documenter.getpostman.com/view/8632299/U16dR8jN