// back/test/check-contact-data.js
import { getDb } from '../src/db/index.js';

async function check() {
    const db = await getDb();
    const result = await db.query(`
        SELECT idcontato, nome, logradouro, numero, bairro, cidade, estado, cep
        FROM tbcontato
        ORDER BY criado_em DESC
        LIMIT 1
    `);
    console.log('📇 Contato mais recente:', result.rows[0]);
}
check();