// front/src/App.jsx — Adicionar rota /registrar
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './features/auth/hooks/useAuth.js';
import { Spinner } from './shared/components/Spinner.jsx';

// Páginas
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { ContactsPage } from './pages/ContactsPage.jsx';
import { RegisterContactPage } from './pages/RegisterContactPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';

// Layout com navbar
import { Layout } from './shared/components/Layout.jsx';

const ProtectedRoute = ({ children }) => {
  const isAuth = !!localStorage.getItem('usuario');
  return isAuth ? children : <Navigate to="/" replace />;
};

function App() {
  const { usuario, carregando, logout } = useAuth();

  if (carregando) {
    return (
      <div className="loading-screen flex-center">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <Routes>
      {/* 🔓 Rotas PÚBLICAS (SEM navbar) */}
      <Route
        path="/"
        element={
          localStorage.getItem('usuario')
            ? <Navigate to="/contatos" replace />
            : <LoginPage />
        }
      />
      <Route path="/registro" element={<RegisterPage />} />

      {/* 🔐 Rotas PROTEGIDAS (COM navbar via Layout) */}
      <Route
        element={
          <ProtectedRoute>
            <Layout usuario={usuario} onLogout={logout} />
          </ProtectedRoute>
        }
      >
        {/* Todas as rotas abaixo herdam o Layout automaticamente */}
        <Route path="/contatos" element={<ContactsPage />} />
        <Route path="/registrar" element={<RegisterContactPage />} />
        {/* Adicione aqui outras rotas protegidas, ex: */}
        {/* <Route path="/contatos/:id/editar" element={<RegisterContactPage />} /> */}
      </Route>

      {/* Rota 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;