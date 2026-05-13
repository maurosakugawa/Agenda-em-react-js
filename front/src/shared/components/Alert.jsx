// front/src/shared/components/Alert.jsx
import { useEffect } from 'react';

export function Alert({ message, type = 'error', onClose, autoClose = 3000 }) {
    useEffect(() => {
        if (autoClose && onClose) {
            const timer = setTimeout(onClose, autoClose);
            return () => clearTimeout(timer);
        }
    }, [autoClose, onClose]);

    return (
        <div className={`alert alert--${type}`} role="alert">
            <span>{message}</span>
            {onClose && (
                <button onClick={onClose} className="alert__close">
                    ×
                </button>
            )}
        </div>
    );
}