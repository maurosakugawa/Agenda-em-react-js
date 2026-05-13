// front/src/shared/hooks/useDateMask.js
import { useState, useCallback } from 'react';

export function useDateMask(initialValue = '') {
    const [value, setValue] = useState(initialValue);

    const formatDate = useCallback((date) => {
        // Remove tudo que não é dígito
        const digits = date.replace(/\D/g, '');

        // Limita a 8 dígitos (ddmmyyyy)
        const limited = digits.slice(0, 8);

        // Aplica a máscara
        if (limited.length <= 2) {
            return limited;
        } else if (limited.length <= 4) {
            return `${limited.slice(0, 2)}/${limited.slice(2)}`;
        } else {
            return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`;
        }
    }, []);

    const handleChange = useCallback((e) => {
        const rawValue = e.target.value;
        const formatted = formatDate(rawValue);
        setValue(formatted);
        return formatted;
    }, [formatDate]);

    const clearValue = useCallback(() => {
        setValue('');
    }, []);

    // Valida se é uma data completa ou parcial válida
    const isValid = useCallback(() => {
        if (!value) return true; // Campo opcional

        const digits = value.replace(/\D/g, '');

        // Aceita dd (2), dd/mm (4) ou dd/mm/aaaa (8)
        if (digits.length === 2) {
            const day = parseInt(digits);
            return day >= 1 && day <= 31;
        } else if (digits.length === 4) {
            const day = parseInt(digits.slice(0, 2));
            const month = parseInt(digits.slice(2, 4));
            return day >= 1 && day <= 31 && month >= 1 && month <= 12;
        } else if (digits.length === 8) {
            const day = parseInt(digits.slice(0, 2));
            const month = parseInt(digits.slice(2, 4));
            const year = parseInt(digits.slice(4, 8));
            return day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900 && year <= 2100;
        }

        return false;
    }, [value]);

    // Converte para formato ISO (YYYY-MM-DD) ou parcial
    const toISO = useCallback(() => {
        if (!value) return null;

        const digits = value.replace(/\D/g, '');

        if (digits.length === 8) {
            // dd/mm/yyyy → yyyy-mm-dd
            return `${digits.slice(4, 8)}-${digits.slice(2, 4)}-${digits.slice(0, 2)}`;
        } else if (digits.length === 4) {
            // dd/mm → retorna apenas dia/mês (backend pode tratar)
            return `${digits.slice(2, 4)}-${digits.slice(0, 2)}`;
        } else if (digits.length === 2) {
            // dd → retorna apenas dia
            return digits;
        }

        return null;
    }, [value]);

    return {
        date: value,
        setDate: setValue,
        handleChange,
        clearValue,
        isValid,
        toISO
    };
}