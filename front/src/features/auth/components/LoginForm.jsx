// front/src/features/auth/components/LoginForm.jsx
import { useState } from 'react';
import { Input } from '@/shared/components/Input.jsx';
import { Button } from '@/shared/components/Button.jsx';
import { Alert } from '@/shared/components/Alert.jsx';

export function LoginForm({ onSubmit, loading: parentLoading }) {  // ← Recebe loading do pai
    const [formData, setFormData] = useState({ email: '', senha: '' });
    const [error, setError] = useState('');
    const [fieldError, setFieldError] = useState({ email: '', senha: '' });

    // ✅ ADICIONE ESTA LINHA:
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (fieldError[name]) {
            setFieldError(prev => ({ ...prev, [name]: '' }));
        }
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setFieldError({ email: '', senha: '' });
        setLoading(true);  // ← Agora funciona!

        try {
            const result = await onSubmit(formData.email, formData.senha);

            // ✅ Proteger contra undefined/null
            if (!result) {
                setError('Ocorreu um erro inesperado. Tente novamente.');
                return;
            }

            if (!result.success) {
                if (result.code === 'INVALID_CREDENTIALS') {
                    setError(result.error);
                    setFieldError({ email: '✗', senha: '✗' });
                } else if (result.code === 'MISSING_FIELDS') {
                    setError(result.error);
                    if (!formData.email) setFieldError(prev => ({ ...prev, email: 'Este campo é obrigatório' }));
                    if (!formData.senha) setFieldError(prev => ({ ...prev, senha: 'Este campo é obrigatório' }));
                } else {
                    setError(result.error || 'Ocorreu um erro. Tente novamente.');
                }
            }
        } catch (err) {
            console.error('Erro inesperado no login:', err);
            setError('Não foi possível conectar ao servidor.');
        } finally {
            setLoading(false);  // ← Agora funciona!
        }
    };

    // Use o loading local OU o do pai (se existir)
    const isLoading = loading || parentLoading;

    return (
        <div className="auth-card">
            <h1 className="auth__title">🔐 Login</h1>

            {error && (
                <Alert
                    message={error}
                    type="error"
                    onClose={() => setError('')}
                    autoClose={5000}
                />
            )}

            <form onSubmit={handleSubmit} className="auth__form">
                <Input
                    label="E-mail"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                    disabled={isLoading}
                    autoComplete="email"
                    error={fieldError.email}
                />

                <Input
                    label="Senha"
                    name="senha"
                    type="password"
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                    autoComplete="current-password"
                    error={fieldError.senha}
                />

                <Button
                    type="submit"
                    variant="primary"
                    loading={isLoading}
                    disabled={!formData.email || !formData.senha}
                    className="btn-block"
                >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>
            </form>

            <p className="auth__hint">
                Não tem conta? <a href="/registro" className="link-primary">Cadastre-se</a>
            </p>
        </div>
    );
}