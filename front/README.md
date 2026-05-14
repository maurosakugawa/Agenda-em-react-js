# 3️⃣ Frontend — Agenda de Contatos

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

## 🛠️ Stack Tecnológica

- React 18
- Vite
- React Router DOM
- Axios
- CSS Modules / CSS puro
- ESLint

## 🗂️ Estrutura de Pastas

```txt
src/
├── features/ 
│   ├── auth/
│   │   ├── components/ 
│   │   ├── hooks/ 
│   │   ├── services/ 
│   │   └── styles/ 
│   └── contacts/
│       ├── components/ 
│       ├── hooks/ 
│       ├── services/ 
│       └── styles/ 
│
├── pages/ 
│   ├── LoginPage.jsx
│   ├── ContactsPage.jsx
│   ├── RegisterContactPage.jsx
│   └── NotFoundPage.jsx
│
├── shared/ 
│   ├── components/ 
│   ├── hooks/ 
│   ├── services/ 
│   ├── styles/ 
│   └── utils/ 
│
├── assets/ 
├── App.jsx 
├── main.jsx 
└── index.html 
```

### Estrutura

- `features/` → módulos por funcionalidade (auth, contacts)
- `shared/` → componentes e utilitários reutilizáveis
- `pages/` → páginas da aplicação
- `assets/` → imagens, ícones e fontes
- `styles/` → estilos css e layout

---

## 🎣 Hooks Personalizados

### `useCEP`

Busca automática de endereço via ViaCEP.

```jsx
const cep = useCEP();
<input
  value={cep.cep}
  onChange={cep.handleChange}
  onBlur={() => cep.handleBlur(onAddressFound)}
/>
```

### `usePhoneMask` / `useDateMask`

Máscaras de input reutilizáveis.

```jsx
const phone = usePhoneMask();

<input
  value={phone.phone}
  onChange={phone.handleChange}
/>

// Para enviar:
phone.getRawValue(); // "11999999999"
```

---

## 🎨 Utilitários de Formatação

| Arquivo             | Funções                                        | Exemplo                                     |
| ------------------- | ---------------------------------------------- | ------------------------------------------- |
| `utils/phone.js`    | `formatPhoneBR()`                              | `"11999999999"` → `"(11) 99999-9999"`       |
| `utils/date.js`     | `formatDateBR()`, `extractDate()`              | `"2025-12-25T..."` → `"25/12/2025"`         |
| `utils/cep.js`      | `formatCEP()`, `cleanCEP()`                    | `"01310000"` → `"01310-000"`                |
| `utils/address.js`  | `normalizeLogradouro()`, `expandLogradouro()`  | `"Av Paulista"` ↔ `"Avenida Paulista"`      |

---

## 🧭 Rotas da Aplicação

| Rota                   | Componente          | Protegida? |
| ---------------------- | ------------------- | ---------- |
| `/`                    | LoginPage           | ❌ Não     |
| `/registro`            | RegisterPage        | ❌ Não     |
| `/contatos`            | ContactsPage        | ✅ Sim     |
| `/registrar`           | RegisterContactPage | ✅ Sim     |
| `/contatos/:id/editar` | RegisterContactPage | ✅ Sim     |
| `*`                    | NotFoundPage        | ❌ Não     |

> 🔐 Rotas protegidas usam o componente `<Layout>` com navbar persistente.

---

## 🎨 Estilização

- CSS Modular por feature (`styles/contacts.css`, `styles/auth.css`)
- Variáveis CSS em `shared/styles/variables.css`
- Utilitários em `shared/styles/utilities.css`
- Sem frameworks pesados (Bootstrap, Tailwind) — controle total do CSS

---

## 📦 Scripts Disponíveis

| Comando           | Descrição                                    |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Inicia servidor de desenvolvimento com HMR   |
| `npm run build`   | Gera build otimizado para produção (`dist/`) |
| `npm run preview` | Preview do build de produção localmente      |
| `npm run lint`    | Roda ESLint para verificar código            |

---

## 🌐 Integração com Backend

Configuração em `shared/services/api.js`:

```js
const API_BASE =
  import.meta.env.VITE_API_URL || 'http://localhost:3101/api';

// Requisições incluem credentials para enviar cookies de sessão
fetch(`${API_BASE}/contatos`, {
  credentials: 'include',
});
```

> ⚠️ Em produção, configurar `VITE_API_URL` no `.env` para apontar para a API real.

---

## 📄 Licença

GNU GPL v3 — Veja [LICENSE](../LICENSE) na raiz do projeto.
