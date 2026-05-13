// front/src/shared/components/Button.jsx
export function Button({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled = false,
    loading = false,
    className = '',
    ...props
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`btn btn--${variant} ${className}`}
            {...props}
        >
            {loading ? 'Carregando...' : children}
        </button>
    );
}