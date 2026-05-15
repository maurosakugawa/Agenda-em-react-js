// back/scripts/debug/list-contacts.js
import { getDb } from '../../src/db/index.js';

async function list() {
    const db = await getDb();

    // Listar todos os contatos do usuário mauro@teste.com
    const result = await db.query(`
        SELECT c.idcontato, c.nome, c.telefone, c.idusuario, u.mail 
        FROM tbcontato c
        JOIN tbusuario u ON c.idusuario = u.idusuario
        WHERE u.mail = 'mauro@teste.com'
        ORDER BY c.idcontato
    `);

    console.log('📇 Contatos de mauro@teste.com:');
    console.table(result.rows);
}

list();