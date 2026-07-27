const request = require('supertest');
const app = require('../app');

let token = '';

beforeAll(async () => {

    const login = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'agustinf@gmail.com',
            password: '123456'
        });

    token = login.body.token;

});

describe('Socios API', () => {

    test('GET /api/socios devuelve todos los socios', async () => {

        const response = await request(app)
            .get('/api/socios')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

    });

    test('GET /api/socios sin token devuelve 401', async () => {

        const response = await request(app)
            .get('/api/socios');

        expect(response.statusCode).toBe(401);

    });

    test('GET /api/socios/1 devuelve un socio', async () => {

        const response = await request(app)
            .get('/api/socios/1')
            .set('Authorization', `Bearer ${token}`);

        expect([200,404]).toContain(response.statusCode);

    });

    test('GET /api/socios/9999 devuelve 404', async () => {

        const response = await request(app)
            .get('/api/socios/9999')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(404);

    });

    test('POST /api/socios crea un nuevo socio', async () => {

    const nuevoSocio = {
        nombre: 'Juan',
        apellido: 'Pérez',
        dni: Date.now().toString(),
        email: `juan${Date.now()}@gmail.com`,
        telefono: '2911234567',
        fechaNacimiento: '1998-05-20',
        planId: 1
    };

    const response = await request(app)
        .post('/api/socios')
        .set('Authorization', `Bearer ${token}`)
        .send(nuevoSocio);

    expect(response.statusCode).toBe(201);

    expect(response.body.nombre).toBe('Juan');

});
test('PUT /api/socios/9999 devuelve 404', async () => {

    const response = await request(app)
        .put('/api/socios/9999')
        .set('Authorization', `Bearer ${token}`)
        .send({
            nombre: 'Modificado'
        });

    expect(response.statusCode).toBe(404);

});
test('DELETE /api/socios/9999 devuelve 404', async () => {

    const response = await request(app)
        .delete('/api/socios/9999')
        .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(404);

});
test('POST /api/socios crea un nuevo socio', async () => {

    const login = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'agustinf@gmail.com',
            password: '123456'
        });

    const token = login.body.token;

    const response = await request(app)
        .post('/api/socios')
        .set('Authorization', `Bearer ${token}`)
        .send({
            nombre: 'Carlos',
            apellido: 'Perez',
            dni: Date.now().toString(),
            email: `carlos${Date.now()}@gmail.com`,
            telefono: '2911111111',
            fechaNacimiento: '1998-05-10'
        });

    expect(response.statusCode).toBe(201);
});
test('POST /api/socios debe rechazar datos incompletos', async () => {

    const login = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'agustinf@gmail.com',
            password: '123456'
        });

    const token = login.body.token;

    const response = await request(app)
        .post('/api/socios')
        .set('Authorization', `Bearer ${token}`)
        .send({
            nombre: ''
        });

    expect(response.statusCode).toBe(400);
});
test('PUT /api/socios/:id actualiza un socio', async () => {

    const login = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'agustinf@gmail.com',
            password: '123456'
        });

    const token = login.body.token;

    const socios = await request(app)
        .get('/api/socios')
        .set('Authorization', `Bearer ${token}`);

    const id = socios.body[0].id;

    const response = await request(app)
        .put(`/api/socios/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            telefono: '299999999'
        });

    expect(response.statusCode).toBe(200);
    expect(response.body.telefono).toBe('299999999');

});
test('DELETE /api/socios/:id elimina un socio', async () => {

    const login = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'agustinf@gmail.com',
            password: '123456'
        });

    const token = login.body.token;

    const nuevo = await request(app)
        .post('/api/socios')
        .set('Authorization', `Bearer ${token}`)
        .send({
            nombre: 'Eliminar',
            apellido: 'Test',
            dni: Date.now().toString(),
            email: `eliminar${Date.now()}@gmail.com`,
            telefono: '111111111',
            fechaNacimiento: '1990-01-01'
        });

    const response = await request(app)
        .delete(`/api/socios/${nuevo.body.id}`)
        .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
});
test('PUT /api/socios/:id devuelve 404 si no existe', async () => {

    const login = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'agustinf@gmail.com',
            password: '123456'
        });

    const token = login.body.token;

    const response = await request(app)
        .put('/api/socios/999999')
        .set('Authorization', `Bearer ${token}`)
        .send({
            telefono: '123'
        });

    expect(response.statusCode).toBe(404);

});
test('DELETE /api/socios/:id devuelve 404 si no existe', async () => {

    const login = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'agustinf@gmail.com',
            password: '123456'
        });

    const token = login.body.token;

    const response = await request(app)
        .delete('/api/socios/999999')
        .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(404);

});

});