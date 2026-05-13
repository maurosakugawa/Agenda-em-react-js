// front/src/features/auth/components/RegisterForm.jsx
import { useState } from 'react';
import { Input } from '@/shared/components/Input.jsx';
import { Button } from '@/shared/components/Button.jsx';
import { Alert } from '@/shared/components/Alert.jsx';

export function RegisterForm({ onSubmit, loading }) {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmSenha: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.senha !== formData.confirmSenha) {
            setError('As senhas não conferem');
            return;
        }

        if (formData.senha.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        const result = await onSubmit({
            nome: formData.nome,
            email: formData.email,
            senha: formData.senha
        });

        if (result.success) {
            setSuccess('Cadastro realizado! Faça login para continuar.');
            setFormData({ nome: '', email: '', senha: '', confirmSenha: '' });
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="auth-card">
            <h1 className="auth__title">📝 Criar Conta</h1>

            {error && <Alert message={error} type="error" onClose={() => setError('')} />}
            {success && <Alert message={success} type="success" />}

            <form onSubmit={handleSubmit} className="auth__form">
                <Input
                    label="Nome"
                    name="nome"
                    type="text"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    disabled={loading}
                />

                <Input
                    label="E-mail"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                    disabled={loading}
                />

                <Input
                    label="Senha"
                    name="senha"
                    type="password"
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                    required
                    disabled={loading}
                    minLength={6}
                />

                <Input
                    label="Confirmar Senha"
                    name="confirmSenha"
                    type="password"
                    value={formData.confirmSenha}
                    onChange={handleChange}
                    placeholder="Repita a senha"
                    required
                    disabled={loading}
                />

                <Button type="submit" variant="primary" loading={loading}>
                    Cadastrar
                </Button>
            </form>

            <p className="auth__hint">
                Já tem conta? <a href="/">Faça login</a>
            </p>
        </div>
    );
}