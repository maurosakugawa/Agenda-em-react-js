// front/src/shared/services/api.js
const API_BASE = '/api';

const defaultOptions = {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
};

const handleResponse = async (res) => {
    // ✅ Tenta parsear JSON, mas não quebra se for HTML/texto
    let data;
    const contentType = res.headers.get('content-type');

    try {
        data = contentType?.includes('application/json')
            ? await res.json()
            : { error: await res.text() };
    } catch {
        // Fallback se não conseguir parsear
        data = { error: `Erro ${res.status}: ${res.statusText}` };
    }

    if (!res.ok) {
        const error = new Error(data.error || 'Erro na requisição');
        error.status = res.status;
        error.data = data;
        error.code = data.code;  // ← ← ← Propaga código de erro do backend
        throw error;
    }

    return data;
};

const request = async (url, options = {}) => {
    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };

    const response = await fetch(`${API_BASE}${url}`, config);
    return handleResponse(response);
};

export const api = {
    get: (url) => request(url, { method: 'GET' }),
    post: (url, body) => request(url, { method: 'POST', body: JSON.stringify(body) }),
    put: (url, body) => request(url, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (url) => request(url, { method: 'DELETE' })
};

export default api;