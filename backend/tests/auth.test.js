const request = require('supertest');
const app = require('../app');

describe('API', () => {

test('GET /health debe responder con estado 200', async () => {

    const response = await request(app)
    .get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('OK');

});

test('POST /api/auth/login debe iniciar sesión correctamente', async () => {

    const response = await request(app)
    .post('/api/auth/login')
    .send({
        email: 'agustinf@gmail.com',
        password: '123456'
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.email).toBe('agustinf@gmail.com');

});

});

test('POST /api/auth/login debe fallar con contraseña incorrecta', async () => {

    const response = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'agustinf@gmail.com',
            password: '123'
        });

    expect(response.statusCode).toBe(401);

    expect(response.body.error).toBe('Credenciales inválidas');

});

test('POST /api/auth/login debe fallar si el usuario no existe', async () => {

    const response = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'noexiste@gmail.com',
            password: '123456'
        });

    expect(response.statusCode).toBe(401);

    expect(response.body.error).toBe('Credenciales inválidas');

});

test('GET /api/auth/perfil devuelve el usuario autenticado', async () => {

    const login = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'agustinf@gmail.com',
            password: '123456'
        });

    const token = login.body.token;

    const response = await request(app)
        .get('/api/auth/perfil')
        .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.user.email).toBe('agustinf@gmail.com');

});

test('GET /api/auth/perfil debe rechazar si no hay token', async () => {

    const response = await request(app)
        .get('/api/auth/perfil');

    expect(response.statusCode).toBe(401);

});

test('GET /api/auth/perfil debe rechazar token inválido', async () => {

    const response = await request(app)
        .get('/api/auth/perfil')
        .set('Authorization', 'Bearer tokeninventado');

    expect(response.statusCode).toBe(401);

});