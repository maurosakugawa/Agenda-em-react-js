// front/src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';
import { Button } from '../shared/components/Button.jsx';

export function NotFoundPage() {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Página não encontrada</p>
            <Link to="/">
                <Button variant="primary">Voltar para o início</Button>
            </Link>
        </div>
    );
}