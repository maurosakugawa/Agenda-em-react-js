  

## 2️⃣ BACKEND

  

```markdown

# 🔙 Backend — Agenda de Contatos

  

API REST desenvolvida em Node.js + Express para gerenciamento de contatos, com persistência local via PGlite (PostgreSQL embarcado).

  

---

  

## 🚀 Iniciando

  

```bash

cd back

npm install

npm run dev # http://localhost:3101

```

  

> 💡 A primeira execução cria automaticamente o banco em `pgdata/`.

  

---

  

##  🗄️ Banco de Dados

  

###  Schema Principal: `tbcontato`

```sql

CREATE  TABLE  tbcontato (

idcontato SERIAL  PRIMARY KEY,

idusuario INTEGER  REFERENCES tbusuario(idusuario),

nome TEXT  NOT NULL,

telefone TEXT  NOT NULL,

aniversario DATE,

logradouro TEXT, -- Ex: "Av Paulista" (normalizado)

numero VARCHAR(20), -- Ex: "000"

bairro TEXT, -- Ex: "Bela Vista"

complemento TEXT,

cidade TEXT,

estado VARCHAR(2),

cep VARCHAR(9),

criado_em TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,

atualizado_em TIMESTAMP  DEFAULT CURRENT_TIMESTAMP

);

```

  

###  Índices Otimizados

-  `idx_contato_usuario` — Busca por usuário

-  `idx_contato_logradouro` — Busca por rua

-  `idx_contato_usuario_telefone` — ÚNICO: impede telefone duplicado por usuário

  

---

  

##  🔐 Autenticação

  

- Sessões via `express-session` (cookie `connect.sid`)

- Middleware `requireAuth` protege rotas sensíveis

- Dados do usuário armazenados em `req.session.usuario`

  

> ⚠️ Em desenvolvimento, `secure: false` no cookie. Em produção, usar HTTPS e `secure: true`.

  

---

  

##  📡 Endpoints da API

  

###  Autenticação

| Método | Endpoint | Descrição |

|--------|----------|-----------|

| POST |  `/api/login`  | Autentica usuário e inicia sessão |

| POST |  `/api/logout`  | Encerra sessão |

| GET |  `/api/me`  | Retorna dados do usuário autenticado |

  

###  Contatos

| Método | Endpoint | Descrição |

|--------|----------|-----------|

| GET |  `/api/contatos`  | Lista contatos do usuário |

| POST |  `/api/contatos`  | Cria novo contato |

| GET |  `/api/contatos/:id`  | Busca contato por ID |

| PUT |  `/api/contatos/:id`  | Atualiza contato (valida proprietário) |

| DELETE |  `/api/contatos/:id`  | Exclui contato (valida proprietário) |

  

###  Exemplo de Requisição

```bash

curl -X  POST  http://localhost:3101/api/contatos  \

-H "Content-Type: application/json" \

-H  "Cookie: connect.sid=..."  \

-d '{

"nome":  "João Silva",

"telefone":  "11999999999",

"logradouro":  "Av Paulista",

"numero":  "1000",

"bairro":  "Bela Vista",

"cidade":  "São Paulo",

"estado":  "SP",

"cep":  "01310100"

}'

```

  

---

  

##  🧪 Testes e Scripts Úteis

  

```bash

# Rodar testes de integração (Vitest)

npm test

  

# Verificar dados de um contato

node test/check-logradouro.js

  

# Corrigir typos no logradouro (ex: "Rual" → "R")

node test/fix-rual-typo.js

```

  

---

  

##  📦 Scripts Disponíveis

  

| Comando | Descrição |

|---------|-----------|

|  `npm run dev`  | Inicia servidor com nodemon (hot reload) |

|  `npm test`  | Roda testes com Vitest |

|  `npm run test:watch`  | Roda testes em modo watch |

  

---

  

##  📄 Licença

  

GNU GPL v3 — Veja [LICENSE](../LICENSE) na raiz do projeto.

```

  

---

  
