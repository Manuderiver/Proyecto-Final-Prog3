# Proyecto Final - Programación III

## Descripción

Este proyecto consiste en el desarrollo de una aplicación web Full-Stack basada en una arquitectura de microservicios utilizando Docker Compose. El sistema implementa una API REST desarrollada con Node.js, Express y Sequelize, conectada a una base de datos PostgreSQL, incluyendo autenticación mediante JWT y gestión de entidades relacionadas con un gimnasio.

La aplicación se ejecuta completamente mediante contenedores Docker, permitiendo una configuración sencilla y reproducible del entorno de desarrollo.

---

## Tecnologías Utilizadas

### Backend

* Node.js
* Express.js
* Sequelize ORM
* PostgreSQL
* JWT (JSON Web Token)
* bcryptjs
* Docker

### Infraestructura

* Docker
* Docker Compose
* PostgreSQL 15
* Redis 7
* Caddy Reverse Proxy
* pgAdmin 4

---

## Arquitectura del Sistema

```text
┌─────────────┐
│   Cliente   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Caddy    │
│ ReverseProxy│
└──────┬──────┘
       │
 ┌─────┴─────┐
 ▼           ▼
Frontend   Backend
 React     Express
               │
               ▼
         PostgreSQL
```

Todos los servicios se ejecutan dentro de contenedores Docker y se comunican mediante una red interna.

---

## Funcionalidades Implementadas

### Autenticación JWT

El sistema permite registrar usuarios, iniciar sesión y acceder a rutas protegidas mediante tokens JWT.

#### Funcionalidades

* Registro de usuarios
* Login de usuarios
* Generación de tokens JWT
* Validación de tokens
* Acceso a perfil protegido

#### Endpoints

| Método | Endpoint           | Descripción                            |
| ------ | ------------------ | -------------------------------------- |
| POST   | /api/auth/register | Registrar usuario                      |
| POST   | /api/auth/login    | Iniciar sesión                         |
| GET    | /api/auth/perfil   | Obtener perfil del usuario autenticado |

---

## Gestión de Socios

Permite administrar los socios registrados en el gimnasio.

### Datos almacenados

* Nombre
* Apellido
* DNI
* Email
* Teléfono
* Fecha de nacimiento
* Estado activo/inactivo

### Endpoints

| Método | Endpoint        | Descripción          |
| ------ | --------------- | -------------------- |
| POST   | /api/socios     | Crear socio          |
| GET    | /api/socios     | Listar socios        |
| GET    | /api/socios/:id | Obtener socio por ID |
| PUT    | /api/socios/:id | Actualizar socio     |
| DELETE | /api/socios/:id | Eliminar socio       |

---

## Gestión de Planes

Permite administrar los planes disponibles para los socios.

### Datos almacenados

* Nombre
* Descripción
* Precio
* Duración en meses
* Estado activo/inactivo

### Endpoints

| Método | Endpoint        | Descripción         |
| ------ | --------------- | ------------------- |
| POST   | /api/planes     | Crear plan          |
| GET    | /api/planes     | Listar planes       |
| GET    | /api/planes/:id | Obtener plan por ID |
| PUT    | /api/planes/:id | Actualizar plan     |
| DELETE | /api/planes/:id | Eliminar plan       |

---

## Gestión de Pagos

Permite registrar los pagos realizados por los socios.

### Datos almacenados

* Monto
* Fecha de pago
* Método de pago
* Socio asociado

### Endpoints

| Método | Endpoint       | Descripción         |
| ------ | -------------- | ------------------- |
| POST   | /api/pagos     | Crear pago          |
| GET    | /api/pagos     | Listar pagos        |
| GET    | /api/pagos/:id | Obtener pago por ID |
| PUT    | /api/pagos/:id | Actualizar pago     |
| DELETE | /api/pagos/:id | Eliminar pago       |

---

## Relaciones Implementadas

### Plan - Socio

Un plan puede estar asociado a múltiples socios.

```text
Plan 1 ---- N Socios
```

### Socio - Pago

Un socio puede registrar múltiples pagos.

```text
Socio 1 ---- N Pagos
```

---

## Base de Datos

Las tablas principales implementadas son:

* users
* socios
* planes
* pagos

Todas las entidades son gestionadas mediante Sequelize ORM y almacenadas en PostgreSQL.

---

## Colección Postman

Se incluye la colección:

```text
ProyectoFinal.postman_collection.json
```

La misma contiene todas las pruebas realizadas sobre los endpoints de:

* Autenticación
* Socios
* Planes
* Pagos

---

## Ejecución del Proyecto

### Construcción de contenedores

```bash
docker compose build
```

### Levantar servicios

```bash
docker compose up
```

### Levantar en segundo plano

```bash
docker compose up -d
```

### Detener servicios

```bash
docker compose down
```

---

## Integrantes

* Manuel Aguilar
* Agustín [Apellido]

---

## Estado del Proyecto

Proyecto funcional con:

* Autenticación JWT completa.
* CRUD completo de Socios.
* CRUD completo de Planes.
* CRUD completo de Pagos.
* Persistencia en PostgreSQL.
* Docker Compose operativo.
* Pruebas realizadas mediante Postman.
