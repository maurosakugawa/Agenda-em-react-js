// back/test/auth.test.js
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';

import app from '../index.js';
import { getDb } from '../src/db/index.js';

describe('Auth API', () => {

    beforeEach(async () => {
        const db = await getDb();

        // Limpa usuário de teste
        await db.query(
            "DELETE FROM tbusuario WHERE mail = 'admin@test.com'"
        );

        // Cria usuário de teste
        await db.query(
            `INSERT INTO tbusuario (mail, senha, nome)
             VALUES ($1, $2, $3)`,
            [
                'admin@test.com',
                '123456',
                'Administrador'
            ]
        );
    });

    it('deve fazer login com credenciais válidas', async () => {

        const response = await request(app)
            .post('/api/login')
            .send({
                email: 'admin@test.com',
                senha: '123456'
            });

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.usuario).toMatchObject({
            email: 'admin@test.com',
            nome: 'Administrador'
        });

        expect(response.headers['set-cookie']).toBeDefined();
    });

    it('deve rejeitar senha inválida', async () => {

        const response = await request(app)
            .post('/api/login')
            .send({
                email: 'admin@test.com',
                senha: 'senha_errada'
            });

        expect(response.status).toBe(401);

        expect(response.body.error).toBeDefined();
    });

    it('deve manter sessão autenticada', async () => {

        const login = await request(app)
            .post('/api/login')
            .send({
                email: 'admin@test.com',
                senha: '123456'
            });

        const cookie = login.headers['set-cookie'];

        const me = await request(app)
            .get('/api/auth/me')
            .set('Cookie', cookie);

        expect(me.status).toBe(200);

        expect(me.body.usuario).toMatchObject({
            idusuario: expect.any(Number),
            mail: 'admin@test.com',
            nome: 'Administrador'
        });
    });

    it('deve fazer logout', async () => {

        const login = await request(app)
            .post('/api/login')
            .send({
                email: 'admin@test.com',
                senha: '123456'
            });

        const cookie = login.headers['set-cookie'];

        const logout = await request(app)
            .post('/api/logout')
            .set('Cookie', cookie);

        expect(logout.status).toBe(200);

        const me = await request(app)
            .get('/api/auth/me')
            .set('Cookie', cookie);

        expect(me.status).toBe(401);
    });
});