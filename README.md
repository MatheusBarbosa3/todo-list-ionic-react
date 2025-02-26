# Todo List Ionic React

Este projeto é uma lista de tarefas simples desenvolvida com **Ionic** e **React**, com integração de uma API simulada usando **JSON Server**.

## Requisitos

- [Node.js](https://nodejs.org/en/) instalado (para gerenciar pacotes)
- [Ionic CLI](https://ionicframework.com/docs/cli) instalado
- [Git](https://git-scm.com/) instalado

## Passos para rodar o projeto

### 1. Instalar o Node.js

Se você não tiver o **Node.js** instalado, faça o download e instale a versão LTS [aqui](https://nodejs.org/en/).

### 2. Instalar o Ionic CLI

Abra o terminal de comando do seu sistema operacional e instale o **Ionic CLI** globalmente para poder rodar o projeto:

```bash
npm install -g @ionic/cli
```

### 3. Instalar o Git e clonar o projeto para sua máquina local e configurar

Instale o Git nesse [link](https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Instalando-o-Git).

Clone o projeto para sua máquina:

```bash
git clone https://github.com/MatheusBarbosa3/todo-list-ionic-react.git
```

Após baixar/clonar o projeto na sua máquina, navegue ate a raiz do projeto onde foi clonado/baixado:

```bash
cd todo-list-ionic-react
```

Instale as dependências do projeto usando o npm:

```bash
npm install
```

### 4. Rodando o projeto

Navegue ate a raiz do projeto onde foi clonado/baixado, e apos seguir os passos do 1 ao 3 acima, e execute o JSON Server: 

Para rodar a API simulada com o JSON Server, execute o seguinte comando:

```bash
json-server --watch db.json --port 5001
```

O JSON Server irá emular um banco de dados RESTful local e estará disponível em http://localhost:5001.

Em outro terminal, inicie o servidor de desenvolvimento do Ionic para rodar a aplicação:

```bash
ionic serve
```

O Ionic irá compilar a aplicação e a abrirá automaticamente no navegador, geralmente em http://localhost:8100.

