# Proyecto Final - Sistema de Gestión de Gimnasio

## Integrantes

* Manuel Aguilar
* Agustín González

## Carrera

Tecnicatura Universitaria en Programación - Universidad Tecnológica Nacional (UTN)

---

# Descripción

Sistema de Gestión de Gimnasio desarrollado como Proyecto Final de la materia Programación III.

La aplicación permite administrar socios, planes y pagos mediante una API REST desarrollada con Node.js, Express y PostgreSQL utilizando Sequelize como ORM.

Además, incorpora autenticación mediante JWT para la gestión segura de usuarios y acceso a rutas protegidas.

Toda la solución se encuentra containerizada mediante Docker y Docker Compose, permitiendo levantar el entorno completo de desarrollo con un único comando.

---

# Tecnologías utilizadas

## Backend

* Node.js
* Express
* Sequelize
* PostgreSQL
* JWT (JSON Web Token)
* CORS
* Helmet
* Morgan
* dotenv

## Frontend

* React

## Infraestructura y herramientas

* Docker
* Docker Compose
* Caddy Reverse Proxy
* Redis
* pgAdmin 4
* Postman

---

# Arquitectura del proyecto

Proyecto-Final-Prog3/

├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── migrations/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   └── server.js
│
├── frontend/
│   └── src/
│
├── database/
│   └── init.sql
│
├── caddy/
│
├── pgadmin/
│
├── postman/
│   └── ProyectoFinal.postman_collection.json
│
├── docker-compose.yml
│
└── README.md

---

# Funcionalidades implementadas

## Autenticación

* Registro de usuarios
* Inicio de sesión
* Generación de token JWT
* Validación de token
* Protección de rutas
* Consulta de perfil autenticado

## Gestión de Socios

* Crear socio
* Obtener todos los socios
* Obtener socio por ID
* Actualizar socio
* Eliminar socio

## Gestión de Planes

* Crear plan
* Obtener todos los planes
* Obtener plan por ID
* Actualizar plan
* Eliminar plan

## Gestión de Pagos

* Crear pago
* Obtener todos los pagos
* Obtener pago por ID
* Actualizar pago
* Eliminar pago

---

# Modelo de datos

## Socio

| Campo           | Tipo    |
| --------------- | ------- |
| id              | Integer |
| nombre          | String  |
| apellido        | String  |
| dni             | String  |
| email           | String  |
| telefono        | String  |
| fechaNacimiento | Date    |
| activo          | Boolean |
| planId          | Integer |

## Plan

| Campo         | Tipo    |
| ------------- | ------- |
| id            | Integer |
| nombre        | String  |
| descripcion   | String  |
| precio        | Decimal |
| duracionMeses | Integer |
| activo        | Boolean |

## Pago

| Campo      | Tipo    |
| ---------- | ------- |
| id         | Integer |
| monto      | Decimal |
| fechaPago  | Date    |
| metodoPago | String  |
| socioId    | Integer |

## Usuario

| Campo    | Tipo    |
| -------- | ------- |
| id       | Integer |
| nombre   | String  |
| email    | String  |
| password | String  |

---

# Relaciones

* Un Plan puede tener muchos Socios.
* Un Socio pertenece a un Plan.
* Un Socio puede registrar múltiples Pagos.
* Un Pago pertenece a un Socio.

---

# Endpoints disponibles

## Endpoints generales

| Método | Endpoint    |
| ------ | ----------- |
| GET    | /health     |
| GET    | /api/health |
| GET    | /api/test   |

---

## Autenticación

| Método | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |
| GET    | /api/auth/perfil   |

---

## Socios

| Método | Endpoint        |
| ------ | --------------- |
| GET    | /api/socios     |
| GET    | /api/socios/:id |
| POST   | /api/socios     |
| PUT    | /api/socios/:id |
| DELETE | /api/socios/:id |

---

## Planes

| Método | Endpoint        |
| ------ | --------------- |
| GET    | /api/planes     |
| GET    | /api/planes/:id |
| POST   | /api/planes     |
| PUT    | /api/planes/:id |
| DELETE | /api/planes/:id |

---

## Pagos

| Método | Endpoint       |
| ------ | -------------- |
| GET    | /api/pagos     |
| GET    | /api/pagos/:id |
| POST   | /api/pagos     |
| PUT    | /api/pagos/:id |
| DELETE | /api/pagos/:id |

---

# Ejecución del proyecto

## Requisitos

* Docker Desktop
* Docker Compose
* Git

## Clonar repositorio

```bash
git clone <url-del-repositorio>
cd Proyecto-Final-Prog3
```

## Levantar entorno completo

```bash
docker compose up --build
```

---

# Servicios disponibles

| Servicio         | URL                          |
| ---------------- | ---------------------------- |
| Frontend React   | http://localhost:3000        |
| Backend API      | http://localhost:3001        |
| Health Check API | http://localhost:3001/health |
| API Base         | http://localhost:3001/api    |
| pgAdmin          | http://localhost:5050        |

---

# pgAdmin

Credenciales por defecto:

Email:

```text
admin@example.com
```

Contraseña:

```text
admin123
```

---

# Colección Postman

Dentro de la carpeta:

```text
postman/
```

se encuentra la colección:

```text
ProyectoFinal.postman_collection.json
```

La misma contiene ejemplos de solicitudes para probar los distintos endpoints de la API.

---

# Health Check

Verificación del estado de la aplicación:

Endpoint:

```text
GET /api/health
```

Respuesta esperada:

```json
{
  "status": "OK",
  "message": "API funcionando correctamente",
  "timestamp": "2026-06-22T03:46:37.916Z",
  "environment": "development"
}
```

---

# Estado actual del proyecto

* Backend implementado y funcional.
* Base de datos PostgreSQL configurada.
* ORM Sequelize configurado.
* Autenticación JWT implementada.
* Docker Compose operativo.
* pgAdmin integrado.
* Colección Postman incluida.
* Frontend React inicial configurado para futuras funcionalidades.
