# 📇 Agenda de Contatos

Sistema moderno de gerenciamento de contatos desenvolvido com **React + Node.js + Pglite**.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🚀 Features

- ✅ Autenticação completa (login/registro)
- ✅ CRUD de contatos
- ✅ Interface responsiva e moderna
- ✅ CSS puro com @layer (sem frameworks)
- ✅ Backend com arquitetura em camadas
- ✅ Banco de dados PostgreSQL embarcado (Pglite)
- ✅ Pronto para contribuição open source

## 🛠️ Tech Stack

### Frontend
- **React 18** - Biblioteca UI
- **React Router v6** - Roteamento
- **Vite** - Build tool
- **CSS Moderno** - @layer, variáveis CSS, BEM

### Backend
- **Node.js 18+** - Runtime
- **Express** - Framework web
- **Pglite** - PostgreSQL em WebAssembly
- **express-session** - Gerenciamento de sessão

## 📦 Instalação

### Pré-requisitos
- Node.js >= 18.0.0
- npm ou yarn

### Backend
```bash
cd back
npm install
cp .env.example .env
# Edite .env conforme necessário
npm run dev