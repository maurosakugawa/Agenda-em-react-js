
## 3️⃣ FRONTEND

  

```markdown

# 🎨 Frontend — Agenda de Contatos

  

Interface desenvolvida em React 18 + Vite, focada em UX, reutilização de componentes e integração com a API backend.

  

---

  

## 🚀 Iniciando

  

```bash

cd front

npm install

npm run dev # http://localhost:3000

```

  

> 💡 O Vite oferece HMR (Hot Module Replacement) para desenvolvimento ágil.

  

---

  

##  🗂️ Estrutura de Pastas

  

```

src/

├── features/ # Módulos por funcionalidade (auth, contacts)

│ ├── auth/

│ │ ├── components/ # LoginForm, RegisterForm

│ │ ├── hooks/ # useAuth

│ │ ├── services/ # authService.js

│ │ └── styles/ # auth.css

│ └── contacts/

│ ├── components/ # ContactCard, ContactForm, ContactList

│ ├── hooks/ # useContacts

│ ├── services/ # contactService.js

│ └── styles/ # contacts.css

│

├── pages/ # Páginas da aplicação

│ ├── LoginPage.jsx

│ ├── ContactsPage.jsx

│ ├── RegisterContactPage.jsx

│ └── NotFoundPage.jsx

│

├── shared/ # Recursos reutilizáveis

│ ├── components/ # Button, Input, Layout, Navbar, Spinner

│ ├── hooks/ # useCEP, usePhoneMask, useDateMask

│ ├── services/ # api.js (configuração do Axios/fetch)

│ ├── styles/ # CSS global, variáveis, utilitários

│ └── utils/ # Formatadores: phone.js, date.js, cep.js, address.js

│

├── assets/ # Imagens, ícones, fontes

├── App.jsx # Configuração de rotas

├── main.jsx # Entry point

└── index.html # HTML base

```

  

---

  

##  🎣 Hooks Personalizados

  

###  `useCEP`

Busca automática de endereço via ViaCEP.

```jsx

const  cep  =  useCEP();

<input  value={cep.cep}  onChange={cep.handleChange}  onBlur={()  =>  cep.handleBlur(onAddressFound)}  />

```

  

###  `usePhoneMask` / `useDateMask`

Máscaras de input reutilizáveis.

```jsx

const  phone  =  usePhoneMask();

<input  value={phone.phone}  onChange={phone.handleChange}  />

// Para enviar: phone.getRawValue() → "11999999999"

```

  

---

  

##  🎨 Utilitários de Formatação

  

| Arquivo | Funções | Exemplo |

|---------|---------|---------|

|  `utils/phone.js`  |  `formatPhoneBR()`  |  `"11999999999"` → `"(11) 99999-9999"`  |

|  `utils/date.js`  |  `formatDateBR()`, `extractDate()`  |  `"2025-12-25T..."` → `"25/12/2025"`  |

|  `utils/cep.js`  |  `formatCEP()`, `cleanCEP()`  |  `"01310000"` → `"01310-000"`  |

|  `utils/address.js`  |  `normalizeLogradouro()`, `expandLogradouro()`  |  `"Av Paulista"` ↔ `"Avenida Paulista"`  |

  

---

  

##  🧭 Rotas da Aplicação

  

| Rota | Componente | Protegida? |

|------|-----------|-----------|

|  `/`  | LoginPage | ❌ Não |

|  `/registro`  | RegisterPage | ❌ Não |

|  `/contatos`  | ContactsPage | ✅ Sim |

|  `/registrar`  | RegisterContactPage | ✅ Sim |

|  `/contatos/:id/editar`  | RegisterContactPage | ✅ Sim |

|  `*`  | NotFoundPage | ❌ Não |

  

> 🔐 Rotas protegidas usam o componente `<Layout>` com navbar persistente.

  

---

  

##  🎨 Estilização

  

- CSS Modular por feature (`styles/contacts.css`, `styles/auth.css`)

- Variáveis CSS em `shared/styles/variables.css`

- Utilitários em `shared/styles/utilities.css`

- Sem frameworks pesados (Bootstrap, Tailwind) — controle total do CSS

  

---

  

##  📦 Scripts Disponíveis

  

| Comando | Descrição |

|---------|-----------|

|  `npm run dev`  | Inicia servidor de desenvolvimento com HMR |

|  `npm run build`  | Gera build otimizado para produção (`dist/`) |

|  `npm run preview`  | Preview do build de produção localmente |

|  `npm run lint`  | Roda ESLint para verificar código |

  

---

  

##  🌐 Integração com Backend

  

Configuração em `shared/services/api.js`:

```js

const  API_BASE  =  import.meta.env.VITE_API_URL  ||  'http://localhost:3101/api';

  

// Requisições incluem credentials para enviar cookies de sessão

fetch(`${API_BASE}/contatos`,  {  credentials:  'include'  });

```

  

> ⚠️ Em produção, configurar `VITE_API_URL` no `.env` para apontar para a API real.

  

---

  

##  📄 Licença

  

GNU GPL v3 — Veja [LICENSE](../LICENSE) na raiz do projeto.

```

  

---

  

## 💡 Dica Bônus: Badge de Licença no README Geral

  

Adicione no topo do `README.md` da raiz para destacar a licença:

  

```markdown

# 📋 Agenda de Contatos

  

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)

[![Node](https://img.shields.io/badge/Node-18+-green?logo=node.js)](https://nodejs.org)

  

> Um projeto pessoal e despretencioso para estudo e prática de desenvolvimento full-stack.

```
