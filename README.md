# Meu Projeto React com Vite

Este é um projeto React criado com Vite. Ele inclui um Dockerfile para facilitar a implantação em contêineres Docker.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) (recomendado)

## Rodando a Aplicação Localmente

Siga estas etapas para rodar a aplicação em seu ambiente de desenvolvimento:

1. Clone este repositório:

   ```shell
   git clone https://github.com/seu-usuario/seu-projeto.git
   ```

Navegue até o diretório do projeto:

cd desafio-tecnico  
Instale as dependências:

Com npm:

    npm install

    npm run dev

Ou com Yarn:

    yarn

    yarn dev

Abra seu navegador e acesse http://localhost:3000 para visualizar a aplicação.

## Executando a Aplicação com Docker

Você também pode executar a aplicação dentro de um contêiner Docker. Certifique-se de ter o Docker instalado em sua máquina.

Certifique-se de que você está no diretório raiz do projeto onde o arquivo Dockerfile está localizado.

Execute o seguinte comando para construir a imagem Docker:

shell
Copy code
docker build -t nome-da-imagem .
Substitua nome-da-imagem pelo nome que você deseja dar à imagem Docker.

Após a construção bem-sucedida, você pode executar um contêiner com o seguinte comando:

shell
Copy code
docker run -p 8080:3000 -d nome-da-imagem
Isso iniciará um contêiner Docker com a aplicação em execução na porta 8080.

Abra seu navegador e acesse http://localhost:8080 para visualizar a aplicação em execução dentro do contêiner Docker.

Lembre-se de que você pode personalizar o arquivo Dockerfile e o .dockerignore conforme necessário para atender às especificações do seu projeto.

auto: Cauã Yves
.