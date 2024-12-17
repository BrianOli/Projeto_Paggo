
# Projeto Paggo

Este é o projeto **Paggo**, uma aplicação que permite o upload de documentos para análise utilizando IA. A aplicação é composta por um frontend em **React** e um backend em **Node.js** com **Express**.

## Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Instalação](#instalação)
3. [Executando o Backend](#executando-o-backend)
4. [Executando o Frontend](#executando-o-frontend)
5. [Estrutura do Projeto](#estrutura-do-projeto)

---

## Pré-requisitos

Antes de começar, verifique se você tem as seguintes ferramentas instaladas:

- **Node.js** (versão 18 ou superior)  
  [Download Node.js](https://nodejs.org/)

- **Yarn** (para gerenciar pacotes)  
  [Instalar Yarn](https://yarnpkg.com/getting-started/install)

- **PostgreSQL** (Banco de Dados Relacional)  
  [Download PostgreSQL](https://www.postgresql.org/download/)

---

## Instalação

### Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/projeto-paggo.git
   cd projeto-paggo/backend
   
2. Instale as dependências
   ```bash
   yarn install

3. Configure o arquivo `.env` com as variáveis necessárias. A estrutura para a conexão do banco de dados e as chaves da API é a seguinte:
   ```bash
   DATABASE_URL="postgresql://USER_NAME:USER_PASS@CONN:PORT/DB_NAME?schema=public"
   JWT_SECRET="jwtsecret"
   OPENAI_API_KEY="Your OpenAPI Key"
*Observação: O banco de dados utilizado é o PostgreSQL, um banco de dados relacional. A URL de conexão no formato postgresql://usuario:senha@host:porta/banco_de_dados?schema=public deve ser configurada corretamente.* 

4. Rode as migrações do banco de dados para criar as tabelas necessárias:
	```bash
	npx prisma generate
	npx prisma migrate dev --name init

5. O backend usa **Tesseract.js** para análise de documentos, então tenha certeza de que todas as dependências do backend estão configuradas corretamente.

#### Executando o Backend
1. Todas as dependências devem estar corretamente instaladas e configuradas para inicializar o servidor Backend.

2. Inicie o servidor Backend:
	```bash
	yarn start
O servidor será executado em `http://localhost:8000` (Ou outra porta configurada)

### Frontend

1. Navegue até a pasta do frontend:
	```bash
	cd ../frontend

2. Instale as dependências do frontend: 
	```bash
	yarn install

3. Configure o arquivo `.env` para definir a URL base da API do backend:
	```bash
	REACT_APP_API_URL=http://localhost:8000

*Observação: A URL deve ser alterada para a rota correta onde a API está sendo executada.*

#### Executando o Frontend
1. Inicie o servidor Frontend:
	```bash
	yarn start
O servidor será executado em `http://localhost:3000`
 

## Estrutura do Projeto

### Backend
	```bash
	backend/
	│
	├── src/
	│   ├── controllers/           # Controladores para lógica de rotas
	│   ├── models/                # Modelos de banco de dados (ex: usuário, documento)
	│   ├── routes/                # Definição das rotas da API
	│   ├── services/              # Serviços auxiliares (ex: autenticação, upload)
	│   └── app.js                 # Configuração do Express e middlewares
	│
	├── .env                       # Variáveis de ambiente (ex: configuração do banco de dados)
	├── package.json               # Dependências e scripts do backend
	└── yarn.lock                  # Dependências exatas do backend

### Frontend
	frontend/
	│
	├── src/
	│   ├── components/            # Componentes React reutilizáveis (ex: Navbar, Modal)
	│   ├── pages/                 # Páginas principais da aplicação (ex: Home, Login)
	│   ├── services/              # Serviços para interagir com a API (ex: api.js)
	│   └── App.tsx                # Componente principal da aplicação
	│
	├── .env                       # URL base da API do backend
	├── package.json               # Dependências e scripts do frontend
	└── yarn.lock                  # Dependências exatas do frontend

---

Esse `README` fornece uma visão geral de como rodar e testar a aplicação tanto no backend quanto no frontend, além de como configurar o banco de dados PostgreSQL e rodar as migrações. Certifique-se de personalizar o arquivo conforme a necessidade do seu projeto, incluindo quaisquer passos adicionais que possam ser específicos para o seu ambiente de desenvolvimento.
