// back/src/middleware/error.middleware.js
import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
    logger.error('Erro não tratado:', err.message);
    logger.debug('Stack:', err.stack);

    const status = err.status || 500;
    const message = err.message || 'Erro interno no servidor';

    res.status(status).json({
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

export const notFound = (req, res) => {
    res.status(404).json({ error: 'Endpoint não encontrado' });
};