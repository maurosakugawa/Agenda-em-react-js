// back/test/integration/contacts.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { getDb, closeDb } from '../../src/db/index.js';
import { contactService } from '../../src/services/contact.service.js';

describe('Contact Service - Unique Phone', () => {
  let db;
  let testUserId;

  beforeAll(async () => {
    db = await getDb();

    // ✅ Use dados ÚNICOS para este arquivo de teste
    const user = await db.query(
      `INSERT INTO tbusuario (mail, senha, nome) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (mail) DO UPDATE SET nome = EXCLUDED.nome
       RETURNING idusuario`,
      ['teste-contacts@vitest.com', '123456', 'Teste Contacts']  // ← Diferente!
    );
    testUserId = user.rows[0].idusuario;

    // Limpar contatos anteriores
    await db.query('DELETE FROM tbcontato WHERE idusuario = $1', [testUserId]);
  });

  afterAll(async () => {
    // Limpar dados após teste
    await db.query('DELETE FROM tbcontato WHERE idusuario = $1', [testUserId]);
    await db.query('DELETE FROM tbusuario WHERE idusuario = $1', [testUserId]);
    await closeDb();
  });

  it('deve permitir criar contato com telefone único', async () => {
    // ✅ Use telefone DIFERENTE do outro teste
    const result = await contactService.create({
      usuarioId: testUserId,
      nome: 'Contato Contacts Test',
      telefone: '11922222222'  // ← Diferente de 11911111111!
    });

    expect(result).toBeDefined();
    expect(result).toBeGreaterThan(0);
  });

  it('deve rejeitar telefone duplicado para mesmo usuário', async () => {
    await expect(
      contactService.create({
        usuarioId: testUserId,
        nome: 'Contato Duplicado',
        telefone: '11922222222'  // ← Mesmo do teste anterior = deve falhar
      })
    ).rejects.toThrow(/já cadastrado|unique/);
  });
});