# App ***Find A Friend*** Node.js

## Desafio 03 - módulo 03 Trilha Node.js Ignite 2022/2023 - Rocketseat

### Sobre o Projeto:

****Find A Friend*** é uma API Rest feita em Node.js. Nela é possível um usuário encontrar e adotar o seu amigo Pet. Aplicação feita usando TDD e SOLID como principais Patterns na construção da API.

### Tecnologias utilizadas:

* Express
* Zod
* Typescript
* Vitest

### Bibliotecas em destaque:

* Zod
* tsup
* Vitest

## RFs (Requisitos funcionais)

- [x] Deve ser possível cadastrar um pet;
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [x] Deve ser possível filtrar pets por suas características;
- [x] Deve ser possível visualizar detalhes de um pet para adoção;
- [x] Deve ser possível se cadastrar como uma ORG;
- [x] Deve ser possível realizar login como uma ORG;



## RNs (Regras de negócio)

- [x] Para listar os pets, obrigatoriamente precisamos informar o estado e cidade;
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp;
- [x] Um pet deve estar ligado a uma ORG;
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
- [x] Todos os filtros, além da cidade, são opcionais;
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada;
- [x] Não pode ser possível criar uma Organização com email duplicado;



## RNFs (Requisitos não funcionais)

- [x] A senha precisa ser criptografada;
- [x] Os dados da aplicação precisam estar persistidos(salvos) em BD PostgreSQL;
- [] Todas as listas de dados precisar estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT(JSON Web Token);
- [x] O upload das imagens deve ser feita com Multer;