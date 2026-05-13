// back/src/controllers/auth.controller.js
import { authService } from '../services/auth.service.js';
import logger from '../utils/logger.js';

export const authController = {
    async login(req, res, next) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({
                    error: 'Email e senha são obrigatórios',
                    code: 'MISSING_FIELDS'
                });
            }

            const usuario = await authService.login(email, senha);

            if (!usuario) {
                return res.status(401).json({
                    error: 'Email ou senha incorretos. Verifique suas credenciais.',
                    code: 'INVALID_CREDENTIALS',
                });
            }

            // ✅ Salvar usuário na sessão
            req.session.usuario = {
                id: usuario.idusuario,
                email: usuario.mail,
                nome: usuario.nome
            };

            // ✅ ESSENCIAL: Salvar sessão explicitamente
            await new Promise((resolve, reject) => {
                req.session.save((err) => {
                    if (err) {
                        console.error('❌ Erro ao salvar sessão:', err);
                        reject(err);
                    } else {
                        console.log('✅ Sessão salva com sucesso:', req.session.usuario);
                        resolve();
                    }
                });
            });

            console.log('🔐 Login realizado, sessão persistida:', usuario.idusuario);

            res.json({
                success: true,
                usuario: {
                    id: usuario.idusuario,
                    email: usuario.mail,
                    nome: usuario.nome
                }
            });

        } catch (err) {
            console.error('💥 Erro no login:', err);
            next(err);
        }
    },

    async register(req, res, next) {
        try {
            const { email, senha, nome } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios' });
            }

            const usuario = await authService.register({ email, senha, nome });

            logger.success('Usuário registrado:', usuario.idusuario);

            res.status(201).json({
                success: true,
                data: { id: usuario.idusuario }
            });
        } catch (err) {
            if (err.message.includes('já está cadastrado')) {
                return res.status(409).json({ error: err.message });
            }
            next(err);
        }
    },

    logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao encerrar sessão' });
            }
            res.clearCookie('connect.sid');
            logger.info('Logout realizado');
            res.json({ success: true, message: 'Logout realizado com sucesso' });
        });
    },

    async me(req, res, next) {
        try {
            const usuario = await authService.findById(req.session.usuario.id);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.json({ success: true, usuario });
        } catch (err) {
            next(err);
        }
    }
};
