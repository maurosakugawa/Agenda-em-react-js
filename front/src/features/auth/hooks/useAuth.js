// front/src/features/auth/hooks/useAuth.js
import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService.js';

export function useAuth() {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setUsuario(user);
        }
        setCarregando(false);
    }, []);

    const login = useCallback(async (email, senha) => {
        setError(null);
        try {
            const user = await authService.login(email, senha);
            setUsuario(user);
            return { success: true, usuario: user };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    }, []);

    const logout = useCallback(async () => {
        await authService.logout();
        setUsuario(null);
    }, []);

    const register = useCallback(async (userData) => {
        setError(null);
        try {
            await authService.register(userData);
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    }, []);

    return {
        usuario,
        carregando,
        error,
        login,
        logout,
        register,
        isAuthenticated: !!usuario
    };
}