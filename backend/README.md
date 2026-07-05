# Link-Sharing App API

## Descrição
Link-Sharing App API é uma api focada em armazenar os dados usuarios e links para compartilhamento.

## Tecnologias Usadas
[![My Skills](https://skillicons.dev/icons?i=ts,nodejs,express,postgres,pnpm,postman)](https://skillicons.dev)

## Estrutura do Projeto

```
backend
├── .env
├── .prettierignore
├── .prettierrc
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── prisma.config.ts
├── README.md
├── tsconfig.json
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│       ├── migration_lock.toml
│       ├── 20260629133432_init/
│       │   └── migration.sql
│       └── 20260630125753_adjust_user_and_link_fields/
│           └── migration.sql
├── src/
│   ├── app.ts
│   ├── index.ts
│   ├── config/
│   │   ├── database.ts
│   │   └── jwt.ts
│   ├── controllers/
│   │   ├── AuthController.ts
│   │   ├── LinkController.ts
│   │   └── UserController.ts
│   ├── middlewares/
│   │   └── authMiddleware.ts
│   ├── repositories/
│   │   ├── ILinkRepository.ts
│   │   ├── IUserRepository.ts
│   │   ├── LinkRepository.ts
│   │   └── UserRepository.ts
│   ├── routes/
│   │   ├── AuthRoutes.ts
│   │   ├── LinkRoutes.ts
│   │   ├── UserRoutes.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── AuthService.ts
│   │   ├── LinkService.ts
│   │   └── UserService.ts
│   └── utils/
│       └── password.ts
└── test/
```

## Instalação
1. Clone o repositório:
    ```sh
    git clone https://github.com/VitorMarins/Link-sharing-app.git
    ```

2. Navegue até o diretório do projeto:
    ```sh
    cd Link-sharing-app
    ```
    
3. Instale as dependências:
    ```sh
    pnpm install
    ```

## Configuração
1. Crie um arquivo `.env` na raiz do diretório `backend` e adicione as seguintes variáveis de ambiente:
    ```env
    DATABASE_URL="sua_string_de_conexão_postgreSQL"
    JWT_SECRET="seu_jwt_secret"
    PORT=3000
    ```

## Uso
1. Inicie o servidor:
    ```sh
    npm start
    ```
2. O servidor estará rodando em `http://localhost:3000`.

## Endpoints Principais
- **Autenticação**
  - `POST /api/auth/registrar` - Registrar um novo usuário (requer autenticação)
  - `POST /api/auth/login` - Login de usuário

- **Usuários**
  - `GET /api/usuarios` - Obter todos os usuários (requer autenticação)
  - `GET /api/usuarios/:id` - Obter usuário por ID (requer autenticação)
  - `PUT /api/usuarios/:id` - Atualizar usuário por ID (requer autenticação)
  - `DELETE /api/usuarios/:id` - Deletar usuário por ID (requer autenticação)

- **Links**
  - `GET /api/links` - Obter todos os conceitos (requer autenticação)
  - `GET /api/links/:id` - Obter conceito por ID (requer autenticação)
  - `POST /api/links` - Criar um novo conceito (requer autenticação)
  - `PUT /api/links/:id` - Atualizar conceito por ID (requer autenticação)
  - `DELETE /api/links/:id` - Deletar conceito por ID (requer autenticação)
