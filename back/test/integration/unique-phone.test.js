// back/test/integration/unique-phone.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { getDb, closeDb } from '../../src/db/index.js';

describe('Contato - Telefone Único', () => {
    let db;
    let testUserId;

    beforeAll(async () => {
        db = await getDb();

        // Criar usuário de teste (ou reutilizar existente)
        const user = await db.query(
            `INSERT INTO tbusuario (mail, senha, nome) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (mail) DO UPDATE SET nome = EXCLUDED.nome
       RETURNING idusuario`,
            ['teste@vitest.com', '123456', 'Teste Vitest']
        );
        testUserId = user.rows[0].idusuario;

        // Limpar contatos anteriores para teste limpo
        await db.query('DELETE FROM tbcontato WHERE idusuario = $1', [testUserId]);
    });

    afterAll(async () => {
        await closeDb();
    });

    it('deve permitir criar contato com telefone único', async () => {
        const result = await db.query(
            'INSERT INTO tbcontato (idusuario, nome, telefone) VALUES ($1, $2, $3) RETURNING idcontato',
            [testUserId, 'Contato Único', '11911111111']
        );

        expect(result.rows[0].idcontato).toBeDefined();
        expect(result.rows[0].idcontato).toBeGreaterThan(0);
    });

    it('deve rejeitar telefone duplicado para mesmo usuário', async () => {
        await expect(
            db.query(
                'INSERT INTO tbcontato (idusuario, nome, telefone) VALUES ($1, $2, $3)',
                [testUserId, 'Contato Duplicado', '11911111111']  // Mesmo telefone
            )
        ).rejects.toThrow(/duplicate key|idx_contato_usuario_telefone|unique/);
    });
});