// front/src/shared/utils/date.js

/**
 * Formata data ISO para padrão brasileiro dd/mm/aaaa
 * @param {string} isoString - Data no formato ISO (YYYY-MM-DD ou com tempo)
 * @returns {string} Data formatada (dd/mm/aaaa) ou string vazia
 */
export const formatDateBR = (isoString) => {
    if (!isoString) return '';
    try {
        const dateOnly = isoString.split('T')[0];
        const [year, month, day] = dateOnly.split('-');
        if (!year || !month || !day) return '';
        return `${day}/${month}/${year}`;
    } catch {
        return '';
    }
};

/**
 * Extrai apenas a parte YYYY-MM-DD de uma string ISO para comparação
 * @param {string} isoString - Data no formato ISO
 * @returns {string} Data no formato YYYY-MM-DD ou string vazia
 */
export const extractDate = (isoString) => {
    if (!isoString) return '';
    return isoString.split('T')[0];
};