// back/test/contacts.test.js
import request from 'supertest';
import { describe, it, expect, beforeEach } from 'vitest';
import app from '../index.js';
import { getDb } from '../src/db/index.js';

describe('Contacts API', () => {
    let agent;

    beforeEach(async () => {
        const db = await getDb();

        // Log do que será deletado
        const beforeDelete = await db.query('SELECT COUNT(*) FROM tbusuario');
        console.log(`[SETUP] Usuários antes do DELETE: ${beforeDelete.rows[0].count}`);

        // Limpa banco antes de cada teste
        await db.exec(`
            TRUNCATE TABLE tbcontato, tbusuario
            RESTART IDENTITY CASCADE
        `);

        // Cria usuário de teste
        const created = await db.query(
            `INSERT INTO tbusuario (mail, senha, nome)
            VALUES ($1, $2, $3)
            RETURNING idusuario`,  // ← ← ← Capture o ID criado
            ['admin@test.com', '123456', 'Administrador']
        );
        
        const novoUsuarioId = created.rows[0].idusuario;
        console.log(`[SETUP] Usuário criado com ID: ${novoUsuarioId}`);

        // Cria um NOVO agent para cada teste (isolamento)
        agent = request.agent(app);
    });

    // Função de login usando o agent (cookies automáticos)
    async function login() {
        const response = await agent
            .post('/api/login')
            .send({
                email: 'admin@test.com',
                senha: '123456'
            });
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        return response;
    }

    it('deve bloquear acesso sem autenticação', async () => {
        const response = await request(app).get('/api/contatos');
        expect(response.status).toBe(401);
    });

    it('deve criar contato', async () => {
        await login();
        const response = await agent
            .post('/api/contatos')
            .send({
                nome: 'Maria',
                telefone: '(11) 99999-9999',
                cidade: 'São Paulo',
                estado: 'SP'
            });
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
    });

    it('deve listar contatos', async () => {
        await login();
        await agent.post('/api/contatos').send({
            nome: 'João',
            telefone: '11999999999'
        });
        const response = await agent.get('/api/contatos');
        expect(response.status).toBe(200);
        expect(response.body.contatos.length).toBe(1);
    });

    it('não deve permitir telefone duplicado', async () => {
        await login();
        const payload = { nome: 'Maria', telefone: '11999999999' };
        await agent.post('/api/contatos').send(payload);
        const response = await agent.post('/api/contatos').send(payload);
        expect(response.status).toBe(409);
        expect(response.body.code).toBe('PHONE_DUPLICATE');
    });

    it('deve atualizar contato', async () => {
        await login();
        const created = await agent.post('/api/contatos').send({
            nome: 'Contato Original',
            telefone: '11999999999'
        });
        const id = created.body.data.id;
        const response = await agent
            .put(`/api/contatos/${id}`)
            .send({
                nome: 'Contato Atualizado',
                telefone: '11888888888'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

it('deve excluir contato', async () => {
    const DEBUG = true;
    const log = (label, data) => DEBUG && console.log(`[🧪 ${label}]`, data);

    // === 🧪 LOG EXTRA: Verificar usuário no banco ANTES do login ===
    const db = await getDb();
    const checkBeforeLogin = await db.query(
        'SELECT idusuario, mail FROM tbusuario WHERE mail = $1',
        ['admin@test.com']
    );
    console.log(`[🧪 BANCO ANTES DO LOGIN] Usuários encontrados: ${checkBeforeLogin.rows.length}`, checkBeforeLogin.rows[0]);

    // 1. Login
    const loginResponse = await login();
    const sessionUserId = loginResponse.body.usuario?.id;
    
    console.log(`[TEST] ID na sessão: ${sessionUserId}`);
    
    // === 🧪 LOG EXTRA: Verificar usuário no banco DEPOIS do login ===
    const checkAfterLogin = await db.query(
        'SELECT idusuario, mail FROM tbusuario WHERE idusuario = $1',
        [sessionUserId]
    );
    console.log(`[🧪 BANCO APÓS LOGIN] Usuário ${sessionUserId} existe: ${checkAfterLogin.rows.length > 0}`);

    // ✅ VERIFICAÇÃO CRÍTICA: confirmar que a sessão está ativa
    const meResponse = await agent.get('/api/auth/me');  // ← ÚNICA declaração
    log('👤 Sessão ativa?', {
        status: meResponse.status,
        usuarioId: meResponse.body.usuario?.id
    });
    
    // === 🧪 LOG EXTRA: Se falhar, mostrar estado do banco ===
    if (meResponse.status !== 200) {
        const allUsers = await db.query('SELECT idusuario, mail FROM tbusuario');
        console.log(`[🧪 DEBUG FINAL] Todos os usuários no banco:`, allUsers.rows);
    }
    
    expect(meResponse.status).toBe(200);  // ← ← ← Se falhar aqui, a sessão não persistiu

    // 2. Criar contato
    const created = await agent
        .post('/api/contatos')
        .send({
            nome: 'Contato para Excluir',
            telefone: '11777777777'
        });
    
    log('📝 Criado', {
        status: created.status,
        contatoId: created.body.data?.id
    });

    expect(created.status).toBe(201);
    const contatoId = created.body.data.id;
    expect(contatoId).toBeDefined();

 const contatoNoBanco = await db.query(
    `SELECT idcontato, idusuario, nome, telefone
     FROM tbcontato
     WHERE idcontato = $1`,
    [contatoId]
);

console.log(
    '[🧪 CONTATO NO BANCO ANTES DELETE]',
    contatoNoBanco.rows[0]
);

    // 3. Excluir o contato (sem verificar cookies, confiar no agent)
    log('🗑️ Deletando', {
        url: `/api/contatos/${contatoId}`
        // Removido: cookiesNoAgent (não confiável)
    });

    const deleteResponse = await agent.delete(`/api/contatos/${contatoId}`);
    
    log('🗑️ Resposta', {
        status: deleteResponse.status,
        body: deleteResponse.body
    });

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.success).toBe(true);
    
    // 4. Verificar exclusão
    const afterDelete = await agent.get('/api/contatos');
    expect(afterDelete.body.contatos.length).toBe(0);
});


});