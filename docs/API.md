# 📚 API - Agenda Backend

> API REST para gerenciamento de contatos com autenticação por sessão.

---

## 🗂️ Índice

- [📚 API - Agenda Backend](#-api---agenda-backend)
  - [🗂️ Índice](#️-índice)
  - [🚀 Tecnologias](#-tecnologias)
  - [🌐 Base URL](#-base-url)
  - [🔐 Autenticação](#-autenticação)
  - [📦 Headers](#-headers)
    - [JSON (obrigatório para body)](#json-obrigatório-para-body)
    - [Credenciais (frontend)](#credenciais-frontend)
    - [Padrão de Resposta de Erro](#padrão-de-resposta-de-erro)
  - [📌 Rotas](#-rotas)
  - [🔑 AUTH](#-auth)
    - [Login](#login)
      - [POST `/api/login`](#post-apilogin)
    - [Registrar usuário](#registrar-usuário)
      - [POST `/api/usuarios`](#post-apiusuarios)
    - [Logout](#logout)
      - [POST `/api/logout`](#post-apilogout)
    - [Usuário autenticado](#usuário-autenticado)
      - [GET `/api/auth/me`](#get-apiauthme)
  - [👥 CONTATOS](#-contatos)
    - [Listar contatos](#listar-contatos)
      - [GET `/api/contatos`](#get-apicontatos)
    - [Criar contato](#criar-contato)
      - [POST `/api/contatos`](#post-apicontatos)
    - [Atualizar contato](#atualizar-contato)
      - [PUT `/api/contatos/:id`](#put-apicontatosid)
    - [Excluir contato](#excluir-contato)
      - [DELETE `/api/contatos/:id`](#delete-apicontatosid)
  - [🔒 Middleware de autenticação](#-middleware-de-autenticação)
  - [🗄️ Banco de dados](#️-banco-de-dados)
    - [Tabela `tbusuario`](#tabela-tbusuario)
    - [Tabela `tbcontato`](#tabela-tbcontato)
  - [🔄 Exemplo de Fluxo Completo (Frontend)](#-exemplo-de-fluxo-completo-frontend)
  - [🧪 Testes](#-testes)
    - [Estrutura](#estrutura)
    - [Comandos](#comandos)
  - [▶️ Executar projeto](#️-executar-projeto)
  - [📁 Estrutura](#-estrutura)

---

## 🚀 Tecnologias

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express
- **Banco de Dados:** PGlite (PostgreSQL embarcado)
- **Sessão:** `express-session`
- **CORS:** Habilitado para `http://localhost:3000` (dev)

---

## 🌐 Base URL

```txt
http://localhost:3101
```

> ⚠️ **CORS em desenvolvimento**: O backend permite requisições de `http://localhost:3000`. Em produção, ajuste a configuração de CORS no `index.js`.

---

## 🔐 Autenticação

A autenticação é baseada em **sessão via cookie** (`express-session`).

1. Após login bem-sucedido, o backend define um cookie `connect.sid` na resposta.
2. O frontend deve enviar `credentials: 'include'` nas requisições para que o cookie seja enviado automaticamente.
3. Rotas protegidas validam `req.session.usuario.id`.

---

## 📦 Headers

### JSON (obrigatório para body)

```http
Content-Type: application/json
```

### Credenciais (frontend)

Exemplo usando `fetch`:

```js
fetch('http://localhost:3101/api/contatos', {
    credentials: 'include'  // ← Essencial para enviar cookie de sessão
});
```

### Padrão de Resposta de Erro

```json
{
    "error": "Mensagem amigável para o usuário",
    "code": "CÓDIGO_TÉCNICO_OPCIONAL"
}
```

---

## 📌 Rotas

---

## 🔑 AUTH

---

### Login

#### POST `/api/login`

Autentica o usuário e inicia a sessão.

**Body:**

```json
{
    "email": "admin@email.com",
    "senha": "123456"
}
```

**Response (200):**

```json
{
    "success": true,
    "usuario": {
        "id": 1,
        "email": "admin@email.com",
        "nome": "Administrador"
    }
}
```

**Possíveis erros:**

| Código | Resposta                                                                                               |
| ------ | ------------------------------------------------------------------------------------------------------ |
| `400`  | `{ "error": "Email e senha são obrigatórios", "code": "MISSING_FIELDS" }`                              |
| `401`  | `{ "error": "Email ou senha incorretos. Verifique suas credenciais.", "code": "INVALID_CREDENTIALS" }` |

---

### Registrar usuário

#### POST `/api/usuarios`

Cria um novo usuário.

**Body:**

```json
{
    "email": "usuario@email.com",
    "senha": "123456",
    "nome": "Usuário Teste"
}
```

**Response (201):**

```json
{
    "success": true,
    "data": { "id": 1 }
}
```

**Possíveis erros:**

| Código | Resposta                                                    |
| ------ | ----------------------------------------------------------- |
| `409`  | `{ "error": "Email usuario@email.com já está cadastrado" }` |

---

### Logout

#### POST `/api/logout`

Encerra a sessão atual e limpa o cookie.

**Response (200):**

```json
{
    "success": true,
    "message": "Logout realizado com sucesso"
}
```

---

### Usuário autenticado

#### GET `/api/auth/me`

Retorna os dados do usuário autenticado.

**Requer autenticação:** ✅

**Response (200):**

```json
{
    "success": true,
    "usuario": {
        "id": 1,
        "mail": "admin@email.com",
        "nome": "Administrador"
    }
}
```

**Possíveis erros:**

| Código | Resposta                                                             |
| ------ | -------------------------------------------------------------------- |
| `401`  | `{ "error": "Não autorizado. Faça login.", "authenticated": false }` |

---

## 👥 CONTATOS

> ⚠️ **Todas as rotas abaixo requerem autenticação.**

---

### Listar contatos

#### GET `/api/contatos`

Lista todos os contatos do usuário autenticado, ordenados por nome.

**Response (200):**

```json
{
    "success": true,
    "contatos": [
        {
            "idcontato": 1,
            "nome": "João",
            "telefone": "11999999999",
            "aniversario": "1990-10-10",
            "logradouro": "R Central",
            "numero": "100",
            "bairro": "Centro",
            "complemento": "Apto 10",
            "cidade": "São Paulo",
            "estado": "SP",
            "cep": "00000000",
            "criado_em": "2026-05-14T00:00:00.000Z"
        }
    ]
}
```

---

### Criar contato

#### POST `/api/contatos`

Cria um novo contato para o usuário autenticado.

**Headers:**

```http
Content-Type: application/json
Cookie: connect.sid=...  # Enviado automaticamente pelo navegador
```

**Body:**

```json
{
    "nome": "Maria Silva",                    // Obrigatório
    "telefone": "(11) 99999-9999",            // Obrigatório (qualquer formato, normalizado para dígitos)
    "aniversario": "1995-01-20",              // Opcional, formato ISO: YYYY-MM-DD
    "logradouro": "Rua das Flores",           // Opcional (normalizado: "Rua" → "R")
    "numero": "120",                          // Opcional
    "bairro": "Centro",                       // Opcional
    "complemento": "Casa",                    // Opcional
    "cidade": "São Paulo",                    // Opcional
    "estado": "SP",                           // Opcional, 2 letras maiúsculas
    "cep": "01000-000"                        // Opcional (aceita com ou sem máscara)
}
```

> 💡 **Normalizações automáticas no backend**:
> `telefone`: Remove caracteres não numéricos → `"11999999999"`
> `logradouro`: Padroniza tipo → `"Rua das Flores"` → `"R das Flores"`
> `cep`: Remove traço → `"01000000"`

**Response (201):**

```json
{
    "success": true,
    "data": { "id": 1 }
}
```

**Possíveis erros:**

| Código | Resposta                                                                             |
| ------ | ------------------------------------------------------------------------------------ |
| `400`  | `{ "error": "Nome e telefone são obrigatórios" }`                                    |
| `401`  | `{ "error": "Usuário não autenticado" }`                                             |
| `409`  | `{ "error": "Telefone já cadastrado para este usuário", "code": "PHONE_DUPLICATE" }` |

---

### Atualizar contato

#### PUT `/api/contatos/:id`

Atualiza um contato existente. Apenas o dono do contato pode atualizar.

**Body:** (mesmo formato de criação, campos opcionais podem ser omitidos)

```json
{
    "nome": "Maria Silva",
    "telefone": "11999999999",
    "logradouro": "R Nova",
    "numero": "200"
}
```

**Response (200):**

```json
{
    "success": true,
    "message": "Contato atualizado"
}
```

**Possíveis erros:**

| Código | Resposta                                                                                        |
| ------ | ----------------------------------------------------------------------------------------------- |
| `401`  | `{ "error": "Usuário não autenticado" }`                                                        |
| `404`  | `{ "error": "Contato não encontrado ou não pertence ao usuário", "code": "CONTACT_NOT_FOUND" }` |
| `409`  | `{ "error": "Telefone já cadastrado para este usuário", "code": "PHONE_DUPLICATE" }`            |

---

### Excluir contato

#### DELETE `/api/contatos/:id`

Remove um contato. Apenas o dono do contato pode excluir.

**Response (200):**

```json
{
    "success": true,
    "message": "Contato excluído"
}
```

**Possíveis erros:**

| Código | Resposta                                                             |
| ------ | -------------------------------------------------------------------- |
| `401`  | `{ "error": "Usuário não autenticado" }`                             |
| `404`  | `{ "error": "Contato não encontrado", "code": "CONTACT_NOT_FOUND" }` |

---

## 🔒 Middleware de autenticação

Rotas protegidas utilizam o middleware `requireAuth`:

```js
// back/src/middleware/auth.middleware.js
export const requireAuth = (req, res, next) => {
    if (!req.session?.usuario?.id) {
        return res.status(401).json({ error: 'Não autorizado', authenticated: false });
    }
    next();
};
```

A sessão é validada através de:

```js
req.session.usuario.id  // ID do usuário autenticado
```

---

## 🗄️ Banco de dados

### Tabela `tbusuario`

| Campo       | Tipo      | Descrição                 |
| ----------- | --------- | ------------------------- |
| `idusuario` | SERIAL    | Chave primária            |
| `mail`      | TEXT      | Email único do usuário    |
| `senha`     | TEXT      | Senha armazenada no banco |
| `nome`      | TEXT      | Nome de exibição          |
| `criado_em` | TIMESTAMP | Data de criação           |

---

### Tabela `tbcontato`

| Campo           | Tipo        | Descrição                             |
| --------------- | ----------- | ------------------------------------- |
| `idcontato`     | SERIAL      | Chave primária                        |
| `idusuario`     | INTEGER     | FK para `tbusuario` (CASCADE delete)  |
| `nome`          | TEXT        | Nome do contato                       |
| `telefone`      | TEXT        | Telefone normalizado (apenas dígitos) |
| `aniversario`   | DATE        | Data de aniversário (YYYY-MM-DD)      |
| `logradouro`    | TEXT        | Rua/Av normalizada (ex: "R Crato")    |
| `numero`        | VARCHAR(20) | Número do endereço                    |
| `bairro`        | TEXT        | Bairro                                |
| `complemento`   | TEXT        | Complemento (aptos, blocos, etc.)     |
| `cidade`        | TEXT        | Cidade                                |
| `estado`        | VARCHAR(2)  | UF em maiúsculas                      |
| `cep`           | VARCHAR(9)  | CEP normalizado (apenas dígitos)      |
| `criado_em`     | TIMESTAMP   | Data de criação                       |
| `atualizado_em` | TIMESTAMP   | Última atualização                    |

**Índices:**

- `idx_contato_usuario` — Busca por usuário
- `idx_contato_logradouro` — Busca por rua
- `idx_contato_usuario_telefone` — **ÚNICO**: impede telefone duplicado por usuário

---

## 🔄 Exemplo de Fluxo Completo (Frontend)

```js
// 1. Login (cookie de sessão é definido automaticamente)
const login = await fetch('http://localhost:3101/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@email.com', senha: '123456' }),
    credentials: 'include'  // ← Essencial para cookies
});

// 2. Listar contatos (cookie é enviado automaticamente)
const response = await fetch('http://localhost:3101/api/contatos', {
    credentials: 'include'
});
const { contatos } = await response.json();

// 3. Criar contato
await fetch('http://localhost:3101/api/contatos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        nome: 'Maria', 
        telefone: '(11) 99999-9999',  // Aceita máscara, backend normaliza
        logradouro: 'Rua das Flores'   // Backend normaliza para "R das Flores"
    }),
    credentials: 'include'
});

// 4. Logout
await fetch('http://localhost:3101/api/logout', {
    method: 'POST',
    credentials: 'include'
});
```

---

## 🧪 Testes

A aplicação utiliza **Vitest** para testes de integração da API e regras de negócio.

### Estrutura

```txt
test/
├── auth.test.js
├── contacts.test.js
└── integration/
    └── unique-phone.test.js

scripts/
└── debug/
```

### Comandos

```bash
# Rodar todos os testes
npm test

# Rodar teste específico
npx vitest run test/auth.test.js

# Rodar testes em watch mode
npm run test:watch

# Gerar coverage report
npm run test:coverage
```

> 💡 Os testes utilizam PGlite isolado para evitar interferência entre execuções.

---

## ▶️ Executar projeto

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm start
```

> 💡 Na primeira execução, o banco de dados é criado automaticamente em `back/pgdata/`.

---

## 📁 Estrutura

```txt
back/
├── index.js                 # Entry point, configuração do Express
├── package.json
├── src/
│   ├── controllers/         # Lógica das rotas (req/res)
│   │   ├── auth.controller.js
│   │   └── contact.controller.js
│   ├── services/            # Regras de negócio e acesso ao banco
│   │   ├── auth.service.js
│   │   └── contact.service.js
│   ├── routes/              # Definição de rotas
│   │   └── index.js
│   ├── middleware/          # Middlewares reutilizáveis
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   ├── db/                  # Configuração do PGlite e schema
│   │   └── index.js
│   └── utils/               # Utilitários
│       ├── logger.js
│       └── address.js       # Normalização de logradouro
├── test/                    # Testes automatizados Vitest
│   ├── integration/
│   ├── auth.test.js
│   └── contacts.test.js
├── scripts/
│   └── debug/               # Scripts auxiliares de depuração
└── pgdata/                  # Dados do PGlite (.gitignore)
```

---

> 📄 **Licença**: GNU GPL v3 — Consulte [LICENSE](../LICENSE) para detalhes.  
> 👨‍💻 **Autor**: [Mauro Toshiuki Sakugawa](https://www.linkedin.com/in/mauro-toshiuki-sakugawa-802805127/)
