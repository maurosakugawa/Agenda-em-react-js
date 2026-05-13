//back/src/controllers/contact.controller.js
import { contactService } from '../services/contact.service.js';
import logger from '../utils/logger.js';

export const contactController = {
    async list(req, res, next) {
        try {
            const usuarioId = req.session.usuario.id;
            const contatos = await contactService.findByUserId(usuarioId);
            logger.debug('Contatos listados:', contatos.length);
            res.json({ success: true, contatos });
        } catch (err) {
            next(err);
        }
    },

    async create(req, res, next) {
        try {
            const {
                nome,
                telefone,
                aniversario,
                logradouro,
                numero,
                bairro,
                complemento,
                cidade,
                estado,
                cep
            } = req.body;

            // ✅ Verificar se usuário está autenticado
            if (!req.session?.usuario?.id) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }

            const usuarioId = req.session.usuario.id;

            if (!nome || !telefone) {
                return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
            }

            const id = await contactService.create({
                nome,
                telefone,
                aniversario: aniversario || null,
                logradouro: logradouro || null,
                numero: numero || null,
                bairro: bairro || null,
                complemento: complemento || null,
                cidade: cidade || null,
                estado: estado || null,
                cep: cep || null,
                usuarioId
            });
            logger.success('Contato criado:', id);

            res.status(201).json({ success: true, data: { id } });
        } catch (err) {
            // ✅ TRATAR ERROS ESPECÍFICOS ANTES DE next(err)
            logger.error('Erro ao criar contato:', err.message);

            if (err.message?.includes('já cadastrado')) {
                return res.status(409).json({
                    error: err.message,
                    code: 'PHONE_DUPLICATE'
                });
            }

            if (err.message?.includes('obrigatório')) {
                return res.status(400).json({ error: err.message });
            }

            // Erros genéricos do banco
            if (err.message?.includes('duplicate key') ||
                err.message?.includes('unique constraint')) {
                return res.status(409).json({
                    error: 'Telefone já cadastrado para este usuário',
                    code: 'PHONE_DUPLICATE'
                });
            }

            // Passa outros erros para o handler global
            next(err);
        }
    },

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const {
                nome,
                telefone,
                aniversario,
                logradouro,
                numero,
                bairro,
                complemento,
                cidade,
                estado,
                cep
            } = req.body;
            const usuarioId = req.session?.usuario?.id;

            if (!usuarioId) {
                logger.warn('⚠️ Usuário não autenticado para update');
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }

            if (!nome || !telefone) {
                logger.warn('⚠️ Campos obrigatórios faltando');
                return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
            }

            const afetados = await contactService.update({
                id,
                nome,
                telefone,
                usuarioId,
                aniversario: aniversario || null,
                logradouro: logradouro || null,
                numero: numero || numero,
                bairro: bairro || null,
                complemento: complemento || null,
                cidade: cidade || null,
                estado: estado || null,
                cep: cep || null
            });

            if (afetados === 0) {
                logger.warn('⚠️ Update não afetou nenhuma linha', { id, usuarioId });
                return res.status(404).json({
                    error: 'Contato não encontrado ou não pertence ao usuário',
                    code: 'CONTACT_NOT_FOUND',
                    debug: { id, usuarioId }  // ← Remover em produção
                });
            }

            logger.success('Contato atualizado:', id);
            res.json({ success: true, message: 'Contato atualizado' });

        } catch (err) {
            logger.error('❌ Erro no update:', {
                message: err.message,
                stack: err.stack,
                name: err.name
            });
            next(err);
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const usuarioId = req.session?.usuario?.id;

            if (!usuarioId) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }

            if (!usuarioId) {
                logger.warn('⚠️ Usuário não autenticado para exclusão');
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }

            const afetados = await contactService.delete(id, usuarioId);

            if (afetados === 0) {
                logger.warn('⚠️ Contato não encontrado ou não pertence ao usuário', { id, usuarioId });
                return res.status(404).json({
                    error: 'Contato não encontrado',
                    debug: { id, usuarioId }  // ← ← ← Remover em produção!
                });
            }

            logger.success('Contato excluído:', id);
            res.json({ success: true, message: 'Contato excluído' });

        } catch (err) {
            logger.error('Erro ao excluir contato:', err.message);
            next(err);
        }
    }
};