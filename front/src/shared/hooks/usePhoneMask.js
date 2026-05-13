// front/src/shared/hooks/usePhoneMask.js
import { useState, useCallback } from 'react';

export function usePhoneMask(initialValue = '') {
    const [value, setValue] = useState(initialValue);

    const formatPhone = useCallback((phone) => {
        // Remove tudo que não é dígito
        const digits = phone.replace(/\D/g, '');

        // Aplica a máscara
        if (digits.length <= 10) {
            // Formato: (11) 9999-9999
            return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else {
            // Formato: (11) 99999-9999 (celular)
            return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
    }, []);

    const handleChange = useCallback((e) => {
        const rawValue = e.target.value;
        const formatted = formatPhone(rawValue);
        setValue(formatted);
        return formatted;
    }, [formatPhone]);

    const clearValue = useCallback(() => {
        setValue('');
    }, []);

    return {
        phone: value,
        setPhone: setValue,
        handleChange,
        clearValue,
        // Retorna apenas dígitos para enviar ao backend
        getRawValue: () => value.replace(/\D/g, '')
    };
}