// front/src/features/auth/services/authService.js
import { api } from '@/shared/services/api.js';

export const authService = {
    async login(email, senha) {
        try {
            const response = await api.post('/login', { email, senha });

            if (response.success && response.usuario) {
                localStorage.setItem('usuario', JSON.stringify(response.usuario));
                return response.usuario;
            }

            // Se backend retornou erro mas sem exception
            throw new Error(response.error || 'Login falhou');

        } catch (err) {
            // ✅ Re-lança o erro para o hook tratar
            throw err;
        }
    },

    async register(userData) {
        const response = await api.post('/usuarios', userData);
        return response;
    },

    async logout() {
        try {
            await api.post('/logout');
        } finally {
            localStorage.removeItem('usuario');
        }
    },

    getCurrentUser() {
        const stored = localStorage.getItem('usuario');
        return stored ? JSON.parse(stored) : null;
    },

    isAuthenticated() {
        return !!this.getCurrentUser();
    }
};