const request = require('supertest');
const app = require('../app');
const { Plan, User } = require('../models');
const { generarToken } = require('../middleware/auth');

describe('Planes API', () => {

    let token;

    beforeAll(async () => {
        const user = await User.findOne({
            where: {
                email: 'agustinf@gmail.com'
            }
        });

        token = generarToken(user);
    });

    test('GET /api/planes devuelve la lista de planes', async () => {

        const response = await request(app)
            .get('/api/planes')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

    });

    test('GET /api/planes/:id devuelve un plan existente', async () => {

        const plan = await Plan.create({
            nombre: 'Plan Test Buscar',
            descripcion: 'Creado por Jest',
            precio: 10000,
            duracionMeses: 6,
            activo: true
        });

        const response = await request(app)
            .get(`/api/planes/${plan.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(plan.id);

    });

    test('GET /api/planes/:id devuelve 404 si el plan no existe', async () => {

        const response = await request(app)
            .get('/api/planes/999999')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(404);

    });

    test('POST /api/planes crea un nuevo plan', async () => {

        const response = await request(app)
            .post('/api/planes')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nombre: 'Plan Premium Test',
                descripcion: 'Plan creado desde Jest',
                precio: 15000,
                duracionMeses: 12,
                activo: true
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.nombre).toBe('Plan Premium Test');

    });

    test('PUT /api/planes/:id actualiza un plan', async () => {

        const plan = await Plan.create({
            nombre: 'Plan Temporal',
            descripcion: 'Temporal',
            precio: 5000,
            duracionMeses: 1,
            activo: true
        });

        const response = await request(app)
            .put(`/api/planes/${plan.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                nombre: 'Plan Actualizado'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.nombre).toBe('Plan Actualizado');

    });

    test('DELETE /api/planes/:id elimina un plan', async () => {

        const plan = await Plan.create({
            nombre: 'Plan Eliminar',
            descripcion: 'Eliminar',
            precio: 8000,
            duracionMeses: 3,
            activo: true
        });

        const response = await request(app)
            .delete(`/api/planes/${plan.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('Plan eliminado correctamente');

    });

});