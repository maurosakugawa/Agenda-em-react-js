
agenda-react/
├── back/
│   ├── src/
│   │   ├── routes/
│   │   │   └── index.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── contact.controller.js
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   └── contact.service.js
│   │   ├── db/
│   │   │   └── index.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   └── error.middleware.js
│   │   └── utils/
│   │       └── logger.js
│   ├── .env.example
│   ├── package.json
│   └── index.js
│
├── front/
│   ├── public/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   │   ├── LoginForm.jsx
│   │   │   │   │   └── RegisterForm.jsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useAuth.js
│   │   │   │   ├── services/
│   │   │   │   │   └── authService.js
│   │   │   │   └── styles/
│   │   │   │       └── auth.css
│   │   │   └── contacts/
│   │   │       ├── components/
│   │   │       │   ├── ContactForm.jsx
│   │   │       │   ├── ContactList.jsx
│   │   │       │   └── ContactCard.jsx
│   │   │       ├── hooks/
│   │   │       │   └── useContacts.js
│   │   │       ├── services/
│   │   │       │   └── contactService.js
│   │   │       └── styles/
│   │   │           └── contacts.css
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Alert.jsx
│   │   │   │   ├── Spinner.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Layout.jsx
│   │   │   ├── hooks/
│   │   │   │   ├── useFetch.js
│   │   │   │   └── useLocalStorage.js
│   │   │   ├── services/
│   │   │   │   └── api.js
│   │   │   └── styles/
│   │   │       ├── layers.css
│   │   │       ├── variables.css
│   │   │       ├── base.css
│   │   │       ├── components.css
│   │   │       ├── utilities.css
│   │   │       └── globals.css
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ContactsPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── router/
│   │   │   └── index.jsx
│   │   ├── main.jsx
│   │   └── App.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── docs/
│   ├── ARCHITECTURE.md
│   └── CONTRIBUTING.md
│
├── .editorconfig
├── .eslintrc.js
├── .prettierrc
├── .gitignore
└── README.md
