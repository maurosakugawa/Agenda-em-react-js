// front/src/shared/utils/cep.js

/**
 * Formata CEP brasileiro: 00000000 → 00000-000
 * @param {string} cep - CEP (com ou sem máscara)
 * @returns {string} CEP formatado ou string vazia
 */
export const formatCEP = (cep) => {
    if (!cep) return '';

    // Remove tudo que não é dígito
    const digits = cep.replace(/\D/g, '');

    // Aplica máscara: 00000-000
    return digits.replace(/(\d{5})(\d)/, '$1-$2');
};

/**
 * Remove máscara do CEP, retorna apenas dígitos
 * @param {string} cep - CEP formatado ou não
 * @returns {string} Apenas dígitos
 */
export const cleanCEP = (cep) => {
    if (!cep) return '';
    return cep.replace(/\D/g, '');
};

/**
 * Busca endereço na API ViaCEP
 * @param {string} cep - CEP para busca (apenas dígitos)
 * @returns {Promise<Object|null>} Dados do endereço ou null se não encontrado
 */
export const fetchAddressByCEP = async (cep) => {
    try {
        // Limpa CEP e valida tamanho
        const cleanCep = cleanCEP(cep);

        if (cleanCep.length !== 8) {
            console.warn('CEP inválido:', cep);
            return null;
        }

        // Chama API ViaCEP (gratuita, sem necessidade de API key)
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();

        // Verifica se CEP foi encontrado
        if (data.erro) {
            console.warn('CEP não encontrado:', cep);
            return null;
        }

        // Retorna dados formatados
        return {
            logradouro: data.logradouro || '',
            complemento: data.complemento || '',
            bairro: data.bairro || '',
            localidade: data.localidade || '',  // Cidade
            uf: data.uf || ''                    // Estado (UF)
        };

    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        return null;
    }
};

/**
 * Valida se o CEP tem 8 dígitos
 * @param {string} cep - CEP para validar
 * @returns {boolean}
 */
export const isValidCEP = (cep) => {
    const cleanCep = cleanCEP(cep);
    return cleanCep.length === 8;
};