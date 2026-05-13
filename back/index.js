// back/index.js
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import routes from './src/routes/index.js';
import { errorHandler, notFound } from './src/middleware/error.middleware.js';
import { getDb, closeDb } from './src/db/index.js';
import logger from './src/utils/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3101;
const SESSION_SECRET = process.env.SESSION_SECRET || 'troque-isso-em-producao';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Session
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}));

app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        logger.debug('🔐 SESSION DEBUG:', {
            path: req.path,
            method: req.method,
            sessionID: req.sessionID?.substring(0, 20),
            hasSession: !!req.session,
            hasUsuario: !!req.session?.usuario,
            usuarioId: req.session?.usuario?.id,
            cookiePresent: !!req.headers.cookie
        });
    }
    next();
});

// Routes
app.use(routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Server initialization
async function init() {
    try {
        await getDb();

        app.listen(PORT, () => {
            logger.success(`Servidor rodando em http://localhost:${PORT}`);
            logger.info(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (err) {
        logger.error('Falha ao iniciar servidor:', err.message);
        process.exit(1);
    }
}

init();

// Graceful shutdown
process.on('SIGINT', async () => {
    logger.info('Recebido SIGINT - encerrando...');
    await closeDb();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    logger.info('Recebido SIGTERM - encerrando...');
    await closeDb();
    process.exit(0);
});