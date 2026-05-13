// back/src/services/auth.service.js
import { getDb } from '../db/index.js';
import logger from '../utils/logger.js';

export const authService = {
    async login(email, senha) {
        const db = await getDb();
        logger.debug('Tentando login para:', email);

        const result = await db.query(
            'SELECT idusuario, mail, nome FROM tbusuario WHERE mail = $1 AND senha = $2',
            [email, senha]
        );

        return result.rows[0] || null;
    },

    async register({ email, senha, nome = null }) {
        const db = await getDb();
        logger.debug('Registrando usuário:', email);

        try {
            const result = await db.query(
                'INSERT INTO tbusuario (mail, senha, nome) VALUES ($1, $2, $3) RETURNING idusuario, mail, nome',
                [email, senha, nome]
            );
            return result.rows[0];
        } catch (err) {
            if (err.message?.includes('unique constraint') || err.code === '23505') {
                throw new Error(`Email ${email} já está cadastrado`);
            }
            logger.error('Erro ao registrar usuário:', err.message);
            throw err;
        }
    },

    async findById(id) {
        const db = await getDb();
        const result = await db.query(
            'SELECT idusuario, mail, nome FROM tbusuario WHERE idusuario = $1',
            [id]
        );
        return result.rows[0] || null;
    }
};