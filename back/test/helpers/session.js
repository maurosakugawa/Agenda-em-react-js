// back/test/helpers/session.js
export async function loginAndGetCookie(request, app) {
    const response = await request(app)
        .post('/api/login')
        .send({
            email: 'admin@test.com',
            senha: '123456'
        });

    return response.headers['set-cookie'];
}