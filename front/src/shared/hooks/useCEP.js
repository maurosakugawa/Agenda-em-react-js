// front/src/shared/hooks/useCEP.js
import { useState, useCallback } from 'react';
import { formatCEP, cleanCEP, fetchAddressByCEP, isValidCEP } from '@/shared/utils/cep.js';

export const useCEP = () => {
    const [cep, setCep] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = useCallback((e) => {
        const value = e.target.value;
        const formatted = formatCEP(value);
        setCep(formatted);
        setError(null);
    }, []);

    const handleBlur = useCallback(async (onAddressFound) => {
        if (!isValidCEP(cep)) {
            setError('CEP deve ter 8 dígitos');
            return;
        }

        setLoading(true);
        setError(null);

        const address = await fetchAddressByCEP(cep);

        if (address) {
            if (onAddressFound) {
                // ✅ MAPEAMENTO CORRETO: usar os mesmos nomes que o form espera
                onAddressFound({
                    logradouro: address.logradouro,    // ← ← ← "logradouro", não "endereco"
                    bairro: address.bairro,             // ← ← ← "bairro" (já correto)
                    localidade: address.localidade,     // ← ← ← manter "localidade"
                    uf: address.uf,                     // ← ← ← manter "uf"
                    complemento: address.complemento    // ← ← ← opcional
                });
            }
        } else {
            setError('CEP não encontrado');
        }

        setLoading(false);
    }, [cep]);

    const clearCEP = useCallback(() => {
        setCep('');
        setError(null);
    }, []);

    const setCEP = useCallback((value) => {
        setCep(formatCEP(value));
    }, []);

    const getCleanCEP = useCallback(() => {
        return cleanCEP(cep);
    }, [cep]);

    return {
        cep,
        loading,
        error,
        handleChange,
        handleBlur,
        clearCEP,
        setCEP,
        getCleanCEP,
        isValid: isValidCEP(cep)
    };
};