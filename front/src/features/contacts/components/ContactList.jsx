// front/src/features/contacts/components/ContactList.jsx
import { ContactCard } from './ContactCard.jsx';
import { Spinner } from '@/shared/components/Spinner.jsx';

export function ContactList({ contatos, carregando, error, onEdit, onDelete }) {
    if (carregando && contatos.length === 0) {
        return (
            <div className="loading-container">
                <Spinner size="medium" />
                <p>Carregando contatos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert--error">
                <span>⚠️ {error}</span>
            </div>
        );
    }

    if (contatos.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state__icon">📭</div>
                <h3>Nenhum contato cadastrado</h3>
                <p>Comece adicionando seu primeiro contato acima!</p>
            </div>
        );
    }

    return (
        <div className="contact-list">
            <div className="contact-list__header">
                <h2>📇 Meus Contatos</h2>
                <span className="contact-count">{contatos.length} {contatos.length === 1 ? 'contato' : 'contatos'}</span>
            </div>

            <div className="contact-list__grid">
                {contatos.map(contato => (
                    <ContactCard
                        key={contato.idcontato}
                        contato={contato}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
}