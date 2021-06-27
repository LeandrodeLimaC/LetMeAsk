<div align="center">
    <img alt="Let Me Ask Logo" src="https://github.com/LeandrodeLimaC/LetMeAsk/blob/main/src/assets/images/logo.svg" width="40%" />
</div>

## Sobre

Projeto desenvolvido durante a edição 6 do Next Level Week, um evento organizado pela rocketseat.
Onde tive a oportunidade e o prazer de compartilhar e aprender muito, alem de conhecer varias pessoas legais!


<img alt="Let Me Ask Aplicativo Desktop" src="https://github.com/LeandrodeLimaC/LetMeAsk/blob/main/public/Capa.png"/>


<div align="center">
    "Toda pergunta tem uma resposta. Aprenda e compartilhe conhecimento com outras pessoas"
</div>


## Requisitos

Para executar o projeto, será necessário instalar:

1. [Nodejs 12.x](https://nodejs.org/en/)

## Construido com

- [Firebase](https://firebase.google.com/)
- [ReactJS](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/) 

## Começando

Para iniciar o desenvolvimento, é necessário clonar o projeto do GitHub num diretório de sua preferência:

```shell
git clone https://github.com/LeandrodeLimaC/LetMeAsk.git
```

Navegue até a pasta criada e execute o seguinte comando para instalar as dependências do projeto
```
npm install
```

Por fim, inicie o servidor de desenvolvimento através do seguinte comando
```
npm run serve
```

## Desafios

- [x] Configurar Github Actions
- [x] Fancy Readme
    - [x] Começando
    - [x] Tecnologias
    - [x] Estrutura do projeto
    - [x] Imagens (Aplicativo)
    - [ ] Ilustrações 
- [ ] Usabilidade
    - [x] Toasts
    - [ ] Dark mode
    - [ ] Responsividade
    - [x] Modais
- [ ] Versão PWA
- [ ] Styled Components
- [ ] Eslint Prettier

## Estrutura de pastas

Organização do aplicativo para facil e rápida compreensão.

```
+-- public         
|   -- index.html               
|
+-- src
|   +-- assets
|   |   +-- images            // Todas as ilustrações utilizadas no sistema             
|   |
|   +-- components            // Componentes do sistema, separados em pastar com seu index e styles
|   |
|   +-- contexts
|   |   +-- AuthContext.ts    // Context utilizado para toda parte de authentication da aplicação
|   |
|   +-- hooks                 
|   |   +-- useAuth.ts        // Hook criado para facilitar importação do useContext e authContext
|   |   +-- useRoom.ts        // Hook de todo gerenciamento das informações das salas
|   |
|   +-- pages   
|   |   +-- AdminRoom.tsx     // Página com controles de administrador e visualização sobre as perguntas da sala
|   |   +-- Home.tsx          // Página de entrada da aplicação
|   |   +-- NewRoom.tsx       // Página de criação de nova sala, apenas para usuarios logados
|   |   +-- Room.tsx          // Página de envio e de visualização de perguntas
|   |
|   +-- services              
|   |   +-- firebase.ts       // Arquivo responsável pela importação e configuração do Firebase
|   |
|   +-- styles                // Estilos globais ou compartilhados da aplicação      
|   |
|   +-- App.tsx
|   +-- index.tsx 
|   +-- react-app-env.d.ts
```
