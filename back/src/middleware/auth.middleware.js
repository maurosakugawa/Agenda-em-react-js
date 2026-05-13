// back/src/middleware/auth.middleware.js
import logger from '../utils/logger.js';

export const requireAuth = (req, res, next) => {
    logger.debug('Verificando autenticação...', {
        hasSession: !!req.session,
        hasUser: !!req.session?.usuario
    });

    if (req.session?.usuario?.id) {
        logger.debug('Usuário autenticado:', req.session.usuario.id);
        next();
    } else {
        logger.warn('Tentativa de acesso não autorizado');
        return res.status(401).json({
            error: 'Não autorizado. Faça login.',
            authenticated: false
        });
    }
};