const request = require('supertest');
const app = require('../app');
const {
    Asistencia,
    Socio,
    User
} = require('../models');
const { generarToken } = require('../middleware/auth');

describe('Asistencias API', () => {

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
                nombre: 'Socio Test',
                apellido: 'Jest',
                dni: '99888777',
                email: 'sociotestjest@gmail.com',
                telefono: '2911111111',
                fechaNacimiento: '1995-05-10'
            });

        }

    });

    test('GET /api/asistencias devuelve las asistencias', async () => {

        const response = await request(app)
            .get('/api/asistencias')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

    });

    test('POST /api/asistencias crea una asistencia', async () => {

        const response = await request(app)
            .post('/api/asistencias')
            .set('Authorization', `Bearer ${token}`)
            .send({
                fecha: '2026-07-25',
                horaIngreso: '18:00:00',
                observaciones: 'Ingreso de prueba',
                presente: true,
                socioId: socio.id
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.socioId).toBe(socio.id);

    });

    test('GET /api/asistencias/:id devuelve una asistencia', async () => {

        const asistencia = await Asistencia.create({
            fecha: '2026-07-25',
            horaIngreso: '19:00:00',
            presente: true,
            socioId: socio.id
        });

        const response = await request(app)
            .get(`/api/asistencias/${asistencia.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(asistencia.id);

    });

    test('GET /api/asistencias/:id devuelve 404', async () => {

        const response = await request(app)
            .get('/api/asistencias/999999')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(404);

    });

    test('PUT /api/asistencias/:id actualiza una asistencia', async () => {

        const asistencia = await Asistencia.create({
            fecha: '2026-07-25',
            horaIngreso: '20:00:00',
            presente: true,
            socioId: socio.id
        });

        const response = await request(app)
            .put(`/api/asistencias/${asistencia.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                observaciones: 'Actualizado desde Jest'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.observaciones).toBe('Actualizado desde Jest');

    });

    test('DELETE /api/asistencias/:id elimina una asistencia', async () => {

        const asistencia = await Asistencia.create({
            fecha: '2026-07-25',
            horaIngreso: '21:00:00',
            presente: true,
            socioId: socio.id
        });

        const response = await request(app)
            .delete(`/api/asistencias/${asistencia.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('Asistencia eliminada correctamente');

    });

});