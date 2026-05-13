// front/src/pages/RegisterContactPage.jsx
import { useNavigate } from 'react-router-dom';
import { useContacts } from '@/features/contacts/hooks/useContacts.js';
import { ContactForm } from '@/features/contacts/components/ContactForm.jsx';
import { Button } from '@/shared/components/Button.jsx';

export function RegisterContactPage() {
    const navigate = useNavigate();
    const { criarContato, carregando, error } = useContacts();

    const handleSubmit = async (contatoData) => {
        const result = await criarContato(contatoData);

        if (result.success) {
            // ✅ Redireciona para a lista após criar
            navigate('/contatos', {
                replace: true,
                state: { message: 'Contato registrado com sucesso!' }
            });
        }

        return result;
    };

    return (
        <div className="register-contact-page">
            <div className="page-header">
                <h1> Adicionar Contato</h1>
                <Button
                    variant="secondary"
                    onClick={() => navigate('/contatos')}
                    className="btn-back"
                >
                    ← Voltar para lista
                </Button>
            </div>

            {error && (
                <div className="alert alert--error">
                    <span>⚠️ {error}</span>
                </div>
            )}

            <ContactForm onSubmit={handleSubmit} loading={carregando} />
        </div>
    );
}