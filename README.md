

# Projeto Paggo

Este repositório foi desenvolvido para concluir a etapa de Case Técnico do Processo Seletivo **Paggo**, que tem como objetivo desenvolver um sistema web que permite aos usuários fazer upload de documentos, extrair texto via OCR e interagir com o conteúdo extraído por meio de um modelo de linguagem. O sistema possui backend em **NestJS** e **Prisma**, frontend em **ReactJS**, e utiliza **PostgreSQL** para armazenar os dados. Ele inclui funcionalidades como visualização, download de documentos e autenticação de usuários.

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
	│   ├── auth/           	   # Lógica de autenticação, Login e Cadastro de usuário)
	│   ├── documents/             # Manipulação das rotas de documentos
	│   ├── llm/                   # Responsável pela Resposta da IA
	│   ├── ocr/                   # Extrai texto do documento recebido
	│   ├── prisma/                # Inicializa o ORM Prisma
	│   └── utils/                 # Salva os arquivos enviados ao sistema
	│
	├── .main.ts                   # Configurações iniciais do sistema
	├── .env                       # Variáveis de ambiente (ex: configuração do banco de dados)
	├── package.json               # Dependências e scripts do backend
	└── yarn.lock                  # Dependências exatas do backend

### Frontend
	frontend/
	│
	├── src/
	│   ├── config/                # Configurações para inicialização do Axios
	│   ├── pages/                 # Páginas principais da aplicação
	│   │   └──styles/		       # Estilização da aplicação
	│   ├── App.tsx                # Rotas/Páginas presentes na aplicação
	│   └── index.tsx              # Componente principal da aplicação
	│
	├── .env                       # URL base da API do backend
	├── package.json               # Dependências e scripts do frontend
	└── yarn.lock                  # Dependências exatas do frontend

---

Esse `README` fornece uma visão geral de como rodar e testar a aplicação tanto no backend quanto no frontend, além de como configurar o banco de dados PostgreSQL e rodar as migrações. Certifique-se de personalizar o arquivo conforme a necessidade do seu projeto, incluindo quaisquer passos adicionais que possam ser específicos para o seu ambiente de desenvolvimento.
