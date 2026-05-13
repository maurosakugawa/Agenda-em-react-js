// front/src/pages/ContactsPage.jsx — Apenas listagem
import { useNavigate, useLocation } from 'react-router-dom';
import { useContacts } from '@/features/contacts/hooks/useContacts.js';
import { ContactList } from '@/features/contacts/components/ContactList.jsx';
import { Button } from '@/shared/components/Button.jsx';

import '@/features/contacts/styles/contacts.css';

export function ContactsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.successMessage;
    const { contatos, carregando, error, excluirContato, atualizarContato } = useContacts();

    return (
        <div className="contacts-page">
            {/* Exibir mensagem se existir */}
            {successMessage && (
                <div className="alert alert--success" role="status">
                    <span>✅ {successMessage}</span>
                </div>
            )}
            <div className="page-header">
                <h1>📇 Meus Contatos</h1>
                <Button
                    variant="primary"
                    onClick={() => navigate('/registrar')}
                    className="btn-new"
                >
                    + Novo Contato
                </Button>
            </div>

            {error && (
                <div className="alert alert--error">
                    <span>⚠️ {error}</span>
                </div>
            )}

            <ContactList
                contatos={contatos}
                carregando={carregando}
                error={error}
                onEdit={atualizarContato}
                onDelete={excluirContato}
            />
        </div>
    );
}