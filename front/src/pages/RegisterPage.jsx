// front/src/pages/RegisterPage.jsx
import { useAuth } from '../features/auth/hooks/useAuth.js';
import { RegisterForm } from '../features/auth/components/RegisterForm.jsx';

export function RegisterPage() {
    const { register, carregando } = useAuth();

    return <RegisterForm onSubmit={register} loading={carregando} />;
}