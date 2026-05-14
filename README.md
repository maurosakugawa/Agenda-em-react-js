
# 1️⃣ Agenda de Contatos

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)

[![Node](https://img.shields.io/badge/Node-18+-green?logo=node.js)](https://nodejs.org)

> Um projeto pessoal e simples para estudo e prática de desenvolvimento full-stack.

Aplicação web para gerenciamento de contatos com foco em boas práticas: normalização de dados, UX com máscaras de input, autenticação por sessão e integração com APIs externas.

📖 [Documentação](docs/) • 🐛 [Reportar Bug](https://github.com/maurosakugawa/REPO/issues)

---

## 🚀 Funcionalidades

- ✅ CRUD completo de contatos com autenticação por sessão
- 📍 Preenchimento automático de endereço via API ViaCEP
- 📞 Máscaras inteligentes para telefone, data e CEP
- 🏠 Endereço normalizado (logradouro, número e bairro separados)
- 🔒 Rotas protegidas e navbar persistente
- 🎨 Interface limpa, responsiva e sem dependências visuais pesadas

---

## 🛠️ Stack Tecnológica

### Frontend (`/front`)

| Tecnologia           | Finalidade                              |
| -------------------- | --------------------------------------- |
| React 18 + Vite      | Build e desenvolvimento                 |
| React Router         | Navegação e rotas protegidas            |
| Hooks personalizados | `useCEP`, `usePhoneMask`, `useDateMask` |
| CSS Modular          | Estilização sem frameworks pesados      |

### Backend (`/back`)

| Tecnologia        | Finalidade                                |
| ----------------- | ----------------------------------------- |
| Node.js + Express | API REST e servidor                       |
| PGlite            | PostgreSQL embarcado (persistência local) |
| express-session   | Autenticação por sessão                   |
| CORS              | Comunicação segura entre front/back       |

### Integrações

- 🌐 [ViaCEP](https://viacep.com.br/) — Busca automática de endereços

---

## 📦 Estrutura do Projeto

```txt
agenda-contatos/
├── front/ # Aplicação React (Vite)
│   ├── src/
│   │   ├── features/ # Módulos por funcionalidade
│   │   ├── shared/ # Componentes, hooks e utils reutilizáveis
│   │   └── pages/ # Páginas da aplicação
│   └── README.md # Docs específicas do frontend
│
├── back/ # API Node.js + Express
│   ├── src/
│   │   ├── controllers/ # Lógica das rotas
│   │   ├── services/ # Regras de negócio e acesso ao banco
│   │   ├── db/ # Configuração do PGlite
│   │   └── utils/ # Utilitários (logger, normalização)
│   ├── test/ # Scripts de teste e migração
│   └── README.md # Docs específicas do backend
│
├── docs/ # Documentação complementar
├── .gitignore
├── LICENSE # GNU GPL v3
└── README.md # Este arquivo

```

### Estrutura

- `front/` → Aplicação React (Vite)
- `features/` → Módulos por funcionalidade
- `shared/` → Componentes, hooks e utils reutilizáveis
- `pages/` → Páginas da aplicação
- `README.md` → Docs específicas do frontend
- `back/` → API Node.js + Express
- `controllers/` → Lógica das rotas
- `services/` → Regras de negócio e acesso ao banco
- `db/` → Configuração do PGlite
- `utils/` → Utilitários (logger, normalização)
- `test/` → Scripts de teste e migração
- `README.md` → Docs específicas do backend
  
---

## ▶️ Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+
- npm ou pnpm

### Backend

```bash
cd back
npm install
npm run dev # Inicia em http://localhost:3101
```

> Os dados são persistidos localmente em `back/pgdata/` (não commitar).

### Frontend

```bash
cd front
npm install
npm run dev  # Inicia em http://localhost:3000
```

### Acessando

1. Abra `http://localhost:3000`
2. Faça login com uma conta cadastrada
3. Comece a gerenciar seus contatos!

---

## 📄 Licença

Este projeto está sob a licença **GNU General Public License v3.0**.

Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

> 📌 Resumindo: você pode usar, modificar e distribuir, mas qualquer derivação também deve ser open-source sob a mesma licença.

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-ideia`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona minha ideia'`)
4. Push para a branch (`git push origin feature/minha-ideia`)
5. Abra um Pull Request

---

## 👨‍💻 Autor

<h3 align="center">Mauro Toshiuki Sakugawa</h3>

<p align="center">
  <a href="https://www.linkedin.com/in/mauro-toshiuki-sakugawa-802805127/">
    <img height="28" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://github.com/maurosakugawa">
    <img height="28" src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
</p>

*Projeto desenvolvido para fins de estudo e prática. Contribuições são bem-vindas!*
