// front/src/pages/LoginPage.jsx — VERSÃO FINAL
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth.js';
import { LoginForm } from '@/features/auth/components/LoginForm.jsx';

export function LoginPage({ onLoginSuccess }) {
    const navigate = useNavigate();
    const { login, carregando } = useAuth();

    const handleSubmit = async (email, senha) => {
        try {
            const result = await login(email, senha);

            if (result?.success) {
                // ✅ Redirect com pequeno delay para garantir state update
                setTimeout(() => {
                    navigate('/contatos', { replace: true });
                }, 50);  // 50ms é suficiente
                return result;
            }

            return result || { success: false, error: 'Falha no login' };

        } catch (err) {
            console.error('Erro no login:', err);
            return { success: false, error: err.message || 'Falha no login' };
        }
    };

    return <LoginForm onSubmit={handleSubmit} loading={carregando} />;
}