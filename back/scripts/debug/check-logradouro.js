// back/scripts/debug/check-logradouro.js
import { getDb } from '../../src/db/index.js';

async function check() {
    const db = await getDb();
    const result = await db.query(`
        SELECT idcontato, logradouro, numero, bairro 
        FROM tbcontato 
        WHERE nome LIKE '%Mauro%'
    `);
    console.log('📇 Contatos do Mauro:', result.rows);
}
check();