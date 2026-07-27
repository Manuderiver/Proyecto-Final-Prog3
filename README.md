# Proyecto Final - Sistema de Gestión de Gimnasio

## Integrantes

- Manuel Aguilar
- Agustín González

## Carrera

Tecnicatura Universitaria en Programación - Universidad Tecnológica Nacional (UTN)

---

# Descripción

Sistema de Gestión de Gimnasio desarrollado como Proyecto Final de la materia Programación III.

La aplicación permite administrar socios, planes, pagos y asistencias mediante una API REST desarrollada con Node.js, Express y PostgreSQL utilizando Sequelize como ORM.

Además incorpora autenticación mediante JWT para proteger los endpoints y gestionar usuarios autenticados.

Toda la solución se encuentra containerizada mediante Docker y Docker Compose, permitiendo levantar el entorno completo con un único comando.

---

# Tecnologías utilizadas

## Backend

- Node.js
- Express
- Sequelize
- PostgreSQL
- JWT (JSON Web Token)
- Helmet
- CORS
- Morgan
- dotenv

## Frontend

- React

## Testing

- Jest
- Supertest

## Infraestructura

- Docker
- Docker Compose
- Caddy Reverse Proxy
- Redis
- pgAdmin 4
- Postman

---

# Arquitectura del proyecto

```
Proyecto-Final-Prog3/

├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── migrations/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── app.js
│   └── server.js
│
├── frontend/
│
├── database/
│
├── postman/
│
├── caddy/
│
├── pgadmin/
│
├── docker-compose.yml
│
└── README.md
```

---

# Funcionalidades implementadas

## Autenticación

- Registro de usuarios
- Inicio de sesión
- Generación de JWT
- Validación de token
- Protección de rutas
- Consulta del perfil autenticado

## Gestión de Socios

- Crear socio
- Obtener todos los socios
- Obtener socio por ID
- Actualizar socio
- Eliminar socio

## Gestión de Planes

- Crear plan
- Obtener todos los planes
- Obtener plan por ID
- Actualizar plan
- Eliminar plan

## Gestión de Pagos

- Crear pago
- Obtener todos los pagos
- Obtener pago por ID
- Actualizar pago
- Eliminar pago

## Gestión de Asistencias

- Registrar asistencia
- Obtener todas las asistencias
- Obtener asistencia por ID
- Actualizar asistencia
- Eliminar asistencia

---

# Modelo de datos

## Usuario

| Campo | Tipo |
|--------|------|
| id | Integer |
| nombre | String |
| email | String |
| password | String |

---

## Socio

| Campo | Tipo |
|--------|------|
| id | Integer |
| nombre | String |
| apellido | String |
| dni | String |
| email | String |
| telefono | String |
| fechaNacimiento | Date |
| activo | Boolean |
| planId | Integer |

---

## Plan

| Campo | Tipo |
|--------|------|
| id | Integer |
| nombre | String |
| descripcion | String |
| precio | Decimal |
| duracionMeses | Integer |
| activo | Boolean |

---

## Pago

| Campo | Tipo |
|--------|------|
| id | Integer |
| monto | Decimal |
| fechaPago | Date |
| metodoPago | String |
| socioId | Integer |

---

## Asistencia

| Campo | Tipo |
|--------|------|
| id | Integer |
| fecha | Date |
| horaIngreso | Time |
| observaciones | String |
| presente | Boolean |
| socioId | Integer |

---

# Relaciones

- Un Plan puede tener muchos Socios.
- Un Socio pertenece a un Plan.
- Un Socio puede registrar múltiples Pagos.
- Un Pago pertenece a un Socio.
- Un Socio puede registrar múltiples Asistencias.
- Una Asistencia pertenece a un Socio.

---

# Endpoints disponibles

## Health Check

| Método | Endpoint |
|---------|----------|
| GET | /health |

---

## Autenticación

| Método | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/auth/perfil |

---

## Socios

| Método | Endpoint |
|---------|----------|
| GET | /api/socios |
| GET | /api/socios/:id |
| POST | /api/socios |
| PUT | /api/socios/:id |
| DELETE | /api/socios/:id |

---

## Planes

| Método | Endpoint |
|---------|----------|
| GET | /api/planes |
| GET | /api/planes/:id |
| POST | /api/planes |
| PUT | /api/planes/:id |
| DELETE | /api/planes/:id |

---

## Pagos

| Método | Endpoint |
|---------|----------|
| GET | /api/pagos |
| GET | /api/pagos/:id |
| POST | /api/pagos |
| PUT | /api/pagos/:id |
| DELETE | /api/pagos/:id |

---

## Asistencias

| Método | Endpoint |
|---------|----------|
| GET | /api/asistencias |
| GET | /api/asistencias/:id |
| POST | /api/asistencias |
| PUT | /api/asistencias/:id |
| DELETE | /api/asistencias/:id |

---

# Testing

El backend cuenta con pruebas automáticas desarrolladas con Jest y Supertest.

Actualmente se encuentran implementadas pruebas para:

- Autenticación
- Socios
- Planes
- Pagos
- Asistencias

Resultado actual:

```
Test Suites: 5 passed
Tests: 38 passed
```

---

# Ejecución del proyecto

## Requisitos

- Docker Desktop
- Docker Compose
- Git

## Clonar el repositorio

```bash
git clone <url-del-repositorio>

cd Proyecto-Final-Prog3
```

## Levantar el proyecto

```bash
docker compose up --build
```

---

# Servicios disponibles

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:3001 |
| Health Check | http://localhost:3001/health |
| API REST | http://localhost:3001/api |
| pgAdmin | http://localhost:5050 |

---

# pgAdmin

Credenciales por defecto

Email

```
admin@example.com
```

Contraseña

```
admin123
```

---

# Colección Postman

Dentro de la carpeta

```
postman/
```

se encuentra la colección

```
ProyectoFinal.postman_collection.json
```

que permite probar todos los endpoints de la API.

---

# Health Check

Endpoint

```
GET /health
```

Respuesta esperada

```json
{
  "status": "OK",
  "timestamp": "2026-07-26T18:30:00.000Z",
  "uptime": 123.45
}
```

---

# Estado actual del proyecto

- Backend completamente funcional.
- API REST implementada.
- Arquitectura MVC.
- PostgreSQL integrado mediante Sequelize.
- Autenticación JWT.
- Docker y Docker Compose configurados.
- pgAdmin integrado.
- Colección Postman incluida.
- Pruebas automáticas implementadas con Jest y Supertest.
- 38 pruebas automatizadas exitosas.
- Frontend React preparado para su integración con la API.

---

# Autores

Proyecto desarrollado por:

- Manuel Aguilar
- Agustín González

Tecnicatura Universitaria en Programación  
Universidad Tecnológica Nacional (UTN)