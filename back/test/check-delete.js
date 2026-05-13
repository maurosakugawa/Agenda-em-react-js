// back/test/check-delete.js
import { getDb } from '../src/db/index.js';

async function check() {
    const db = await getDb();

    // Verificar se o contato existe
    const contato = await db.query(
        'SELECT idcontato, idusuario, nome, telefone FROM tbcontato WHERE idcontato = $1',
        [47]  // ← ← ← ID que está dando 404
    );

    console.log('🔍 Contato ID 47:', contato.rows[0] || 'NÃO ENCONTRADO');

    // Verificar usuário logado
    const user = await db.query(
        "SELECT idusuario, mail FROM tbusuario WHERE mail = 'mauro@teste.com'"
    );
    console.log('👤 Usuário mauro@teste.com:', user.rows[0]);

    // Testar a query de delete manualmente
    if (contato.rows[0] && user.rows[0]) {
        const result = await db.query(
            'DELETE FROM tbcontato WHERE idcontato = $1 AND idusuario = $2 RETURNING idcontato',
            [47, user.rows[0].idusuario]
        );
        console.log('🗑️ Resultado do delete manual:', result.rowCount, 'linha(s) afetada(s)');
    }
}

check();