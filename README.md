📦 Loja Roupas – E-commerce Fullstack

🖥️ Visão Geral

Aplicação fullstack de e-commerce desenvolvida com arquitetura moderna, separando Frontend e Backend, utilizando autenticação JWT, upload de imagens com AWS S3, cache com Redis e banco híbrido (MongoDB + PostgreSQL).

🚀 Tecnologias Utilizadas

🎨 Frontend

React 19

Vite

Tailwind CSS 4

React Router

Axios

Lucide

⚙️ Backend

Node.js

Express 5

JWT

Bcrypt

Sequelize

Mongoose

Redis

Amazon S3

🗄️ Banco de Dados

MongoDB

PostgreSQL

🏗️ Arquitetura do Projeto

loja-roupas/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── seed/
│   └── server.js
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── routes/
│   └── main.jsx
│
├── .env
├── package.json
└── vite.config.js

🔐 Funcionalidades

Cadastro de usuário

Login com autenticação JWT

Hash de senha com Bcrypt

CRUD de produtos

Upload de imagens via AWS S3

Cache com Redis

Seed automático de usuários e produtos

Separação de banco relacional e não relacional

🛠️ Pré-requisitos

Antes de instalar, você precisa ter instalado:

Node.js (v18+ recomendado)

PostgreSQL

MongoDB

Redis

Conta na Amazon Web Services para uso do S3

⚙️ Instalação Passo a Passo

1️⃣ Clonar o repositório

git clone https://github.com/seuusuario/loja-roupas.git


2️⃣ Instalar dependências

npm install

3️⃣ Criar arquivo .env

Na raiz do projeto:

PORT=5000

# JWT
JWT_SECRET=sua_chave_super_secreta

# PostgreSQL
DB_HOST=localhost
DB_USER=postgres
DB_PASS=sua_senha
DB_NAME=loja_roupas
DB_PORT=5432

# MongoDB
MONGO_URI=mongodb://localhost:27017/loja_roupas

# Redis
REDIS_URL=redis://localhost:6379

# AWS S3
AWS_ACCESS_KEY_ID=sua_key
AWS_SECRET_ACCESS_KEY=sua_secret
AWS_REGION=us-east-1
AWS_BUCKET_NAME=nome_do_bucket

4️⃣ Criar bancos de dados

PostgreSQL
CREATE DATABASE loja_roupas;

MongoDB cria automaticamente ao conectar.

5️⃣ Rodar Seeds

npm run seed:users
npm run seed:products

▶️ Rodando o Projeto

Backend
npm run start

Servidor rodando em:

http://localhost:5000
Frontend
npm run dev

Aplicação rodando em:

http://localhost:5173

🔄 Scripts Disponíveis

Script	Descrição
npm run dev	Inicia frontend com Vite
npm run build	Build de produção
npm run preview	Preview do build
npm run start	Inicia backend
npm run seed:users	Popula usuários
npm run seed:products	Popula produtos
npm run lint	Roda ESLint

🔐 Autenticação

A autenticação é feita via JWT.

Fluxo:

Usuário faz login

Backend valida senha com Bcrypt

Token JWT é gerado

Frontend armazena token

Rotas protegidas usam middleware de autenticação

📦 Integração com AWS S3

Upload de imagens de produtos

Armazenamento em bucket

Retorno da URL pública

Salvo no banco

🧠 Estratégia de Banco Híbrido

Tipo de dado	Banco
Usuários	PostgreSQL
Produtos	MongoDB
Sessões/cache	Redis

🚀 Deploy (Recomendado)

Backend:

Render

Railway

Frontend:

Vercel

Netlify

Banco:

Supabase (Postgres)

MongoDB Atlas

🧪 Testes Manuais

Testar Login
POST /auth/login
Testar Produtos
GET /products
POST /products
PUT /products/:id
DELETE /products/:id

📈 Melhorias Futuras

Testes automatizados

CI/CD

Docker

Painel administrativo

Pagamento (Stripe)

Sistema de carrinho persistente
