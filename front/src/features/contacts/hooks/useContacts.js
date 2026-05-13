// front/src/features/contacts/hooks/useContacts.js
import { useState, useEffect, useCallback } from 'react';
import { contactService } from '../services/contactService.js';

export function useContacts() {
    const [contatos, setContatos] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [error, setError] = useState(null);

    const carregarContatos = useCallback(async () => {
        setCarregando(true);
        setError(null);
        try {
            const data = await contactService.listar();
            setContatos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        carregarContatos();
    }, [carregarContatos]);

    const criarContato = useCallback(async (contatoData) => {
        try {
            await contactService.criar(contatoData);
            await carregarContatos();
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }, [carregarContatos]);

    const atualizarContato = useCallback(async (id, contatoData) => {
        console.log('🔁 atualizarContato chamado:', { id, contatoData });

        try {
            const result = await contactService.atualizar(id, contatoData);
            console.log('✅ Service retornou:', result);

            await carregarContatos();  // Recarrega lista
            return { success: true };

        } catch (err) {
            console.error('❌ Erro em atualizarContato:', {
                message: err.message,
                status: err.status,
                code: err.code,
                data: err.data
            });

            return { success: false, error: err.message, code: err.code };
        }
    }, [carregarContatos]);

    const excluirContato = useCallback(async (id) => {
        // ✅ Atualização otimista: remove da UI imediatamente
        setContatos(prev => prev.filter(c => c.idcontato !== id));

        try {
            await contactService.excluir(id);
            // Se sucesso, apenas recarrega para garantir sincronia
            await carregarContatos();
            return { success: true };
        } catch (err) {
            // ✅ Reverte se der erro
            if (err.status !== 404) {  // 404 não precisa reverter (já está "excluído")
                await carregarContatos();  // Restaura lista do banco
            }
            return { success: err.status === 404, error: err.message };
        }
    }, [carregarContatos]);

    return {
        contatos,
        carregando,
        error,
        criarContato,
        atualizarContato,
        excluirContato,
        recarregar: carregarContatos
    };
}