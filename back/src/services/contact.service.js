//back/src/services/contact.service.js
import { getDb } from '../db/index.js';
import logger from '../utils/logger.js';
import { normalizeLogradouro } from '../utils/address.js';

// ✅ Helper para normalizar telefone (apenas dígitos)
const normalizePhone = (phone) => {
    if (!phone) return null;
    return phone.toString().replace(/\D/g, '');
};


export const contactService = {
    async findByUserId(usuarioId) {
        const db = await getDb();
        const result = await db.query(
            `SELECT idcontato, nome, telefone, aniversario,
                    logradouro, numero, bairro, complemento, cidade, estado, cep,
                    criado_em 
            FROM tbcontato 
            WHERE idusuario = $1 
            ORDER BY nome`,
            [usuarioId]
        );
        return result.rows;
    },

    async create({
        nome,
        telefone,
        usuarioId,
        aniversario,
        logradouro,
        numero,
        bairro,
        complemento,
        cidade,
        estado,
        cep }) {
        const db = await getDb();

        // ✅ Normalizar telefone ANTES de validar
        const telefoneNormalizado = normalizePhone(telefone);

        if (!telefoneNormalizado) {
            throw new Error('Telefone é obrigatório');
        }

        // ✅ Verifica se telefone já existe para este usuário
        const existing = await db.query(
            'SELECT idcontato FROM tbcontato WHERE idusuario = $1 AND telefone = $2',
            [usuarioId, telefoneNormalizado]
        );

        if (existing.rows.length > 0) {
            throw new Error(`Telefone ${telefone} já cadastrado para este usuário`);
        }

        // ✅ Normalizar logradouro antes de salvar
        const logradouroNormalizado = logradouro ? normalizeLogradouro(logradouro) : null;

        const result = await db.query(
            `INSERT INTO tbcontato (
                idusuario, nome, telefone, aniversario, 
                logradouro, numero, bairro, complemento, cidade, estado, cep) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
            RETURNING idcontato`,
            [
                usuarioId,
                nome,
                telefoneNormalizado,
                aniversario || null,
                logradouro,
                numero || null,
                bairro || null,
                complemento || null,
                cidade || null,
                estado || null,
                cep || null
            ]
        );

        return result.rows[0].idcontato;
    },

    async update({
        id,
        nome,
        telefone,
        usuarioId,
        aniversario,
        logradouro,
        numero,
        bairro,
        complemento,
        cidade,
        estado,
        cep
    }) {
        const db = await getDb();

        const telefoneNormalizado = normalizePhone(telefone);

        // Validar duplicata (exceto o próprio contato)
        if (telefoneNormalizado) {
            const existing = await db.query(
                `SELECT idcontato FROM tbcontato 
                WHERE idusuario = $1 AND telefone = $2 AND idcontato != $3`,
                [usuarioId, telefoneNormalizado, id]
            );

            if (existing.rows.length > 0) {
                throw new Error(`Telefone ${telefone} já cadastrado para este usuário`);
            }
        }

        // ✅ Normalizar logradouro antes de salvar
        const logradouroNormalizado = logradouro ? normalizeLogradouro(logradouro) : null;

        const normalize = (val) => {
            if (val === null || val === undefined) return null;
            if (typeof val === 'string' && val.trim() === '') return null;
            return val;
        };

        const result = await db.query(
            `UPDATE tbcontato 
            SET nome = $1, 
                telefone = $2, 
                aniversario = $3,
                logradouro = $4,
                numero = $5,
                bairro = $6,
                complemento = $7,
                cidade = $8,
                estado = $9,
                cep = $10,
                atualizado_em = CURRENT_TIMESTAMP 
            WHERE idcontato = $11 AND idusuario = $12
            RETURNING idcontato`,
            [
                normalize(nome),
                telefoneNormalizado,
                normalize(aniversario),
                logradouroNormalizado,
                normalize(numero),
                normalize(bairro),
                normalize(complemento),
                normalize(cidade),
                normalize(estado),
                normalize(cep),
                id,
                usuarioId
            ]
        );

        const linhasAfetadas = result.rowCount ?? result.rows?.length ?? 0;

        return linhasAfetadas;
    },

    async delete(id, usuarioId) {
        const db = await getDb();
        logger.debug('Excluindo contato:', { id, usuarioId });

        const result = await db.query(
            'DELETE FROM tbcontato WHERE idcontato = $1 AND idusuario = $2',
            [id, usuarioId]
        );

        return result.rowCount || 0;
    },

    async findById(id, usuarioId) {
        const db = await getDb();
        const result = await db.query(
            'SELECT idcontato, nome, telefone FROM tbcontato WHERE idcontato = $1 AND idusuario = $2',
            [id, usuarioId]
        );
        return result.rows[0] || null;
    },

    // ✅ Busca por logradouro com normalização
    async findByLogradouro(usuarioId, logradouroBusca) {
        const db = await getDb();

        const logradouroNormalizado = normalizeLogradouro(logradouroBusca);

        const result = await db.query(
            `SELECT idcontato, nome, telefone, logradouro, numero, bairro, cidade, estado, cep
             FROM tbcontato
             WHERE idusuario = $1 AND logradouro = $2
             ORDER BY nome`,
            [usuarioId, logradouroNormalizado]
        );

        return result.rows;
    }
};
