#MATCHFY-API

Para se fazer o Singin de um usuário:

route -> PUT /v1/users

corpo da requisição:
{
    "email" : "victorelioenay@hotmail.com",
    "name" : "Victor Elioenay",
    "picture" : "sadasdjlkasjjs.jpg"
}

paylout:
{
    singin : true || false
}

Para se fazer o login de um usuário:

route -> POST /v1/users

corpo da requisição:
{
    "email" : "victorelioenay@hotmail.com"
}

paylout:
{
    login : true || false
}

Para alterar a localização do usuário:

route -> PUT /v1/location

corpo da requisição:
{
    "user_id" : 1,
    "lat" : 2,
    "lon" : 2
}

paylout:
{
    update : true || false
}

Para visualizar a localização do usuário:

route -> GET /v1/location?id=1

paylout:
{
    location : undefined || location
}

Para caso o usuário faça um like:

route -> PUT /v1/like

corpo da requisição:
{
    "user_id" : 2, //ID do usuário que deu o like
    "target_id" : 1 //ID do usuário que recebeu o like
}

Caso não ocorra nenhum erro durante o like, então 'like : true'. 
E caso ocorra um match, então 'match : true'

paylout:
{
    like : true || false,
    match : true || false
}

Para caso o usuário faça um deslike:

route -> PUT /v1/deslike

corpo da requisição:
{
    "user_id" : 2, //ID do usuário que deu o deslike
    "target_id" : 1 //ID do usuário que recebeu o deslike
}

paylout:
{
    deslike : true || false
}

Para caso o usuário faça um superlike:

route -> PUT /v1/superlike

corpo da requisição:
{
    "user_id" : 2, //ID do usuário que deu o superlike
    "target_id" : 1 //ID do usuário que recebeu o superlike
}

paylout:
{
    superlike : true || false,
    match : true || false
}

Para visualizar os superlikes que o usuário recebeu:

route -> GET /v1/superlike?id=1

paylout:
{
    superlikes : undefined || superlikes
}

Para alterar as configurações do usuário:

route -> PUT /v1/settings

corpo da requisição:
{
    "user_id" : 1,
    "sexo" : "masculino",
    "idade" : 21,
    "bio" : "Um teste"
}

paylout:
{
    update : true || false
}

Para visualizar as configurações do usuário:

route - > GET /v1/settings?id=1

paylout:
{
    settings: undefined || settings
}

Para alterar as preferências do usuário:

route -> PUT /v1/preferences

corpo da requisição:
{
    "user_id" : 1,
    "sexo" : "feminino",
    "idadeMin" : 18,
    "idadeMax" : 24,
    "dist" : 20 
}

paylout:
{
    update : true || false
}

Para visualizar as preferências do usuário:

route -> GET /v1/preferences?id=1

paylout:
{
    preferences : undefined || preferences 
}

Para visualizar todos o matchs do usuário:

route -> GET /v1/match?id=1

paylout:
{
    matchs : undefined || matchs
}

Para desfazer um match:

route -> DELETE /v1/match

corpo da requisição:
{
    "user_id" : 1,
    "target_id" : 2
}

paylout:
{
    delete : true || false
}

Rotas para a comunicação em chat:
-> POST /v1/chat
-> PUT /v1/chat
-> GET /v1/chat

Toda vez que ocorrer um match será criado um arquivo .txt onde as mensagens ficarão armazenadas. Exite um exemplo no diretório do projeto, client1.js e client2.js.
Para iniciar um chat o usuário precisa se conectar atráves de um socket apontado para o domínio corrente.
Apóes conectado, fazer um requisição para acesso ao chat.

    POST /v1/chat

    corpo da requisição:
    {
        user_id : 2,
        target_id : 1
    }

    paylout:
    {
        access : true || false
    }

Caso o 'access : true', então o usuário pode visualizar as mensagens enviadas no passado.
Para visualizar:

    GET /v1/chat?user_id=1&target_id=2

    paylout:
    {
        mensagens : undefined || mensagens
    }

Caso o usuário queira enviar uma mensagem:

    PUT /v1/chat

    corpo da requisição:
    {
        user_id : 2,
        target_id : 1,
        text : "Hello World!"
    }