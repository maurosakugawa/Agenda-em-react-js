// front/src/shared/utils/address.js

/**
 * Mapeamento de variações de tipo de logradouro → forma padronizada (abreviada)
 */
const LOGRADOURO_MAP = {
    // Rua
    'rua': 'R',
    'r': 'R',
    'r.': 'R',

    // Avenida
    'avenida': 'Av',
    'av': 'Av',
    'av.': 'Av',

    // Praça
    'praça': 'Pç',
    'praca': 'Pç',
    'pç': 'Pç',
    'pc': 'Pç',
    'pç.': 'Pç',

    // Alameda
    'alameda': 'Al',
    'al': 'Al',
    'al.': 'Al',

    // Travessa
    'travessa': 'Tv',
    'tv': 'Tv',
    'tv.': 'Tv',

    // Estrada
    'estrada': 'Estr',
    'estr': 'Estr',
    'estr.': 'Estr',

    // Rodovia
    'rodovia': 'Rod',
    'rod': 'Rod',
    'rod.': 'Rod',

    // Viela
    'viela': 'Vl',
    'vl': 'Vl',
    'vl.': 'Vl',

    // Largo
    'largo': 'Lg',
    'lg': 'Lg',
    'lg.': 'Lg',
};

/**
 * Normaliza tipo de logradouro para formato padrão (abreviado)
 * @param {string} logradouro - Ex: "Rua Crato", "R. Crato", "R Crato"
 * @returns {string} Logradouro normalizado: "R Crato"
 */
export const normalizeLogradouro = (logradouro) => {
    if (!logradouro) return '';

    // Remove excesso de espaços e converte para minúsculo para comparação
    const clean = logradouro.trim().replace(/\s+/g, ' ').toLowerCase();

    // Tenta extrair o tipo (primeira palavra) e o restante
    const parts = clean.split(' ');
    if (parts.length < 2) return logradouro.trim();  // Não tem tipo + nome, retorna como está

    const tipoOriginal = parts[0].replace(/[.,]/g, '');  // "rua", "r.", "av"
    const resto = logradouro.trim().split(' ').slice(1).join(' ');  // Mantém case original do nome

    // Busca no mapa de normalização
    const tipoNormalizado = LOGRADOURO_MAP[tipoOriginal];

    if (tipoNormalizado) {
        return `${tipoNormalizado} ${resto}`;
    }

    // Se não encontrou no mapa, retorna original (evita transformar "Rual" em "R")
    return logradouro.trim();
};

/**
 * Expande logradouro abreviado para forma completa (para exibição)
 * @param {string} logradouro - Ex: "R Crato"
 * @returns {string} Logradouro expandido: "Rua Crato"
 */
export const expandLogradouro = (logradouro) => {
    if (!logradouro) return '';

    // Mapeamento inverso: abreviação → forma completa
    const EXPAND_MAP = {
        'R': 'Rua',
        'Av': 'Avenida',
        'Pç': 'Praça',
        'Al': 'Alameda',
        'Tv': 'Travessa',
        'Estr': 'Estrada',
        'Rod': 'Rodovia',
        'Vl': 'Viela',
        'Lg': 'Largo',
    };

    const clean = logradouro.trim();
    const parts = clean.split(' ');
    if (parts.length < 2) return clean;

    const tipoAbrev = parts[0];
    const resto = parts.slice(1).join(' ');

    const tipoExpandido = EXPAND_MAP[tipoAbrev];

    if (tipoExpandido) {
        return `${tipoExpandido} ${resto}`;
    }

    return clean;
};

/**
 * Compara dois logradouros ignorando variações de tipo
 * @param {string} a - Primeiro logradouro
 * @param {string} b - Segundo logradouro
 * @returns {boolean} True se forem equivalentes
 */
export const logradourosIguais = (a, b) => {
    return normalizeLogradouro(a) === normalizeLogradouro(b);
};