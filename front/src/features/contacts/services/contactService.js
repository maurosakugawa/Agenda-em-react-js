// front/src/features/contacts/services/contactService.js
import { api } from '@/shared/services/api.js';

export const contactService = {
    async listar() {
        const response = await api.get('/contatos');
        return response.contatos || [];
    },

    async criar(contatoData) {
        const response = await api.post('/contatos', contatoData);
        return response.data;
    },

    async atualizar(id, contatoData) {
        const response = await api.put(`/contatos/${id}`, contatoData);
        return response;
    },

    async excluir(id) {
        const response = await api.delete(`/contatos/${id}`);
        return response;
    }
};