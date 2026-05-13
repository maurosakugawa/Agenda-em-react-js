//front/src/shared/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { Button } from './Button.jsx';

export function Navbar({ usuario, onLogout }) {
    if (!usuario) return null;

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <Link to="/contatos" className="navbar__brand">
                    <span className="navbar__logo">📇</span>
                    <span>Agenda de Contatos</span>
                </Link>

                <div className="navbar__menu">
                    <span className="navbar__user">👤 {usuario.nome || usuario.email}</span>
                    <Button variant="secondary" onClick={onLogout}>
                        🚪 Sair
                    </Button>
                </div>
            </div>
        </nav>
    );
}