
##  1️⃣ README

  

```markdown

#  📋 Agenda de Contatos

  

> Um projeto pessoal e simples para estudo e prática de desenvolvimento full-stack.

  

Aplicação web para gerenciamento de contatos com foco em boas práticas: normalização de dados, UX com máscaras de input, autenticação por sessão e integração com APIs externas.

  

✨ [Ver Demo](#) • 📖 [Documentação](docs/) • 🐛 [Reportar Bug](issues)

  

---

  

##  🚀 Funcionalidades

  

- ✅ CRUD completo de contatos com autenticação por sessão

- 📍 Preenchimento automático de endereço via API ViaCEP

- 📞 Máscaras inteligentes para telefone, data e CEP

- 🏠 Endereço normalizado (logradouro, número e bairro separados)

- 🔒 Rotas protegidas e navbar persistente

- 🎨 Interface limpa, responsiva e sem dependências visuais pesadas

  

---

  

##  🛠️ Tecnologias

  

###  Frontend (`/front`)

| Tecnologia | Finalidade |

|-----------|-----------|

| React 18 + Vite | Build e desenvolvimento |

| React Router | Navegação e rotas protegidas |

| Hooks personalizados |  `useCEP`, `usePhoneMask`, `useDateMask`  |

| CSS Modular | Estilização sem frameworks pesados |

  

###  Backend (`/back`)

| Tecnologia | Finalidade |

|-----------|-----------|

| Node.js + Express | API REST e servidor |

| PGlite | PostgreSQL embarcado (persistência local) |

| express-session | Autenticação por sessão |

| CORS | Comunicação segura entre front/back |

  

###  Integrações

- 🌐 [ViaCEP](https://viacep.com.br/) — Busca automática de endereços

  

---

  

##  📦 Estrutura do Projeto

  

```

agenda-contatos/

├── front/ # Aplicação React (Vite)

│ ├── src/

│ │ ├── features/ # Módulos por funcionalidade

│ │ ├── shared/ # Componentes, hooks e utils reutilizáveis

│ │ └── pages/ # Páginas da aplicação

│ └── README.md # Docs específicas do frontend

│

├── back/ # API Node.js + Express

│ ├── src/

│ │ ├── controllers/ # Lógica das rotas

│ │ ├── services/ # Regras de negócio e acesso ao banco

│ │ ├── db/ # Configuração do PGlite

│ │ └── utils/ # Utilitários (logger, normalização)

│ ├── test/ # Scripts de teste e migração

│ └── README.md # Docs específicas do backend

│

├── docs/ # Documentação complementar

├── .gitignore

├── LICENSE # GNU GPL v3

└── README.md # Este arquivo

```

  

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

  

###  Frontend

```bash

cd  front

npm install

npm run  dev  # Inicia em http://localhost:3000

```

  

###  Acessando

1. Abra `http://localhost:3000`

2. Faça login com uma conta cadastrada

3. Comece a gerenciar seus contatos!

  

---

  

##  📄 Licença

  

Este projeto está sob a licença **GNU General Public License v3.0**.

Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

  

> 📌 Resumindo: você pode usar, modificar e distribuir, mas qualquer derivação também deve ser open-source sob a mesma licença.

  

---

  

##  🤝 Contribuindo

  

1. Fork o projeto

2. Crie uma branch para sua feature (`git checkout -b feature/minha-ideia`)

3. Commit suas mudanças (`git commit -m 'feat: adiciona minha ideia'`)

4. Push para a branch (`git push origin feature/minha-ideia`)

5. Abra um Pull Request

  

---

  

##  👨‍💻 Autor

  

**Mauro Toshiuki Sakugawa**

[LinkedIn](#) • [GitHub](#)

  

*Projeto desenvolvido para fins de estudo e prática. Contribuições são bem-vindas!*

```

  

---

