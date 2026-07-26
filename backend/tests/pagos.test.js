const request = require('supertest');
const app = require('../app');
const { Pago, Socio, User } = require('../models');
const { generarToken } = require('../middleware/auth');

describe('Pagos API', () => {

    let token;
    let socio;

    beforeAll(async () => {

        const user = await User.findOne({
            where: {
                email: 'agustinf@gmail.com'
            }
        });

        token = generarToken(user);

        socio = await Socio.findOne();

        if (!socio) {

            socio = await Socio.create({
                nombre: 'Socio Pago',
                apellido: 'Test',
                dni: `${Date.now()}`,
                email: `socio${Date.now()}@test.com`,
                telefono: '2914000000',
                fechaNacimiento: '1995-01-01',
                activo: true
            });

        }

    });

    test('GET /api/pagos devuelve la lista de pagos', async () => {

        const response = await request(app)
            .get('/api/pagos')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

    });

    test('POST /api/pagos crea un pago', async () => {

        const response = await request(app)
            .post('/api/pagos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                monto: 15000,
                fechaPago: '2026-07-25',
                metodoPago: 'Efectivo',
                socioId: socio.id
            });

        expect(response.statusCode).toBe(201);
        expect(Number(response.body.monto)).toBe(15000);

    });

    test('GET /api/pagos/:id devuelve un pago', async () => {

        const pago = await Pago.create({
            monto: 10000,
            fechaPago: '2026-07-25',
            metodoPago: 'Transferencia',
            socioId: socio.id
        });

        const response = await request(app)
            .get(`/api/pagos/${pago.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(pago.id);

    });

    test('GET /api/pagos/:id devuelve 404 si no existe', async () => {

        const response = await request(app)
            .get('/api/pagos/999999')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(404);

    });

    test('PUT /api/pagos/:id actualiza un pago', async () => {

        const pago = await Pago.create({
            monto: 5000,
            fechaPago: '2026-07-25',
            metodoPago: 'Débito',
            socioId: socio.id
        });

        const response = await request(app)
            .put(`/api/pagos/${pago.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                monto: 9000
            });

        expect(response.statusCode).toBe(200);
        expect(Number(response.body.monto)).toBe(9000);

    });

    test('DELETE /api/pagos/:id elimina un pago', async () => {

        const pago = await Pago.create({
            monto: 7000,
            fechaPago: '2026-07-25',
            metodoPago: 'Mercado Pago',
            socioId: socio.id
        });

        const response = await request(app)
            .delete(`/api/pagos/${pago.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('Pago eliminado correctamente');

    });

});