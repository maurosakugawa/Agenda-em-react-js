// front/src/shared/components/Spinner.jsx
export function Spinner({ size = 'medium' }) {
    return (
        <div className={`spinner spinner--${size}`} role="status">
            <span className="visually-hidden">Carregando...</span>
        </div>
    );
}