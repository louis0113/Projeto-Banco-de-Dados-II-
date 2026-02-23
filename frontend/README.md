# 🛍️ Ecommerce - Drop 2026

Este é o Front-end de uma loja de roupas moderna, focado em uma experiência de usuário (UX) fluida, com design minimalista e fluxos de checkout interativos.

## 🚀 Tecnologias Utilizadas

* **React.js** (Biblioteca principal)
* **Vite** (Build tool ultrarrápido)
* **Tailwind CSS** (Estilização via utilitários)
* **Lucide React** (Pacote de ícones vetoriais)
* **Context API** (Gerenciamento de estado do carrinho)

## 🛠️ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (Versão 18 ou superior)
* [NPM](https://www.npmjs.com/) (Geralmente vem junto com o Node)

## 📦 Instalação e Execução

1. **Abra o terminal na pasta do projeto:**
   ```bash
   cd frontend
Instale as dependências:

Bash

npm install
Inicie o servidor de desenvolvimento:

Bash

npm run dev
Acesse no navegador:
O projeto estará rodando em http://localhost:5173/

📋 Funcionalidades Atuais (Front-end)
Vitrine Dinâmica: Listagem de produtos com efeito de hover.

Carrinho Lateral (Drawer): Adição, remoção e cálculo de subtotal em tempo real.

Sistema de Checkout:

Cálculo de frete simulado (digite 8 números no CEP).

Validação de campos para liberar o botão de finalizar.

Tela de sucesso após a confirmação do pedido com feedback visual.

Modal de Login: Interface pronta para autenticação.

🔗 Estrutura de Pastas
/src/components: Componentes visuais (Header, Checkout, Drawer, etc).

/src/context: Lógica do carrinho de compras e estados globais.

/src/data: Mock de produtos (JSON) para simular o banco de dados.

🛠️ Próximos Passos (Integração Back-end)
O projeto está preparado para receber integração via API nos seguintes pontos:

Substituir o arquivo src/data/products.js por uma chamada GET ao banco de dados.

Implementar a lógica de POST no envio do formulário de Checkout para registrar pedidos.

Conectar o Modal de Login com o sistema de autenticação (JWT, Firebase ou similar).