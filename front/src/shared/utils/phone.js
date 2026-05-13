// front/src/shared/utils/phone.js

/**
 * Formata telefone brasileiro
 * @param {string} phone - Telefone (pode ter máscara ou apenas dígitos)
 * @returns {string} Telefone formatado: (99) 99999-9999 ou (99) 9999-9999
 */
export const formatPhoneBR = (phone) => {
    if (!phone) return '';

    // Remove tudo que não é dígito
    const digits = phone.replace(/\D/g, '');

    // Aplica máscara conforme tamanho
    if (digits.length === 11) {
        // Celular: (99) 99999-9999
        return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (digits.length === 10) {
        // Fixo: (99) 9999-9999
        return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }

    // Retorna como está se não bater nos padrões
    return phone;
};
