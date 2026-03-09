# Software Requirements Specification (SRS) - Mythera Map API

## 1. Introducción
**Propósito:** Este documento especifica los requisitos de software para el backend **Mythera Map API**, construido sobre el framework NestJS.
**Alcance:** La API REST sirve como puente centralizado de datos para Mythera Map App, gestionando la persistencia en MongoDB y almacenando multimedia en Cloudinary.

## 2. Descripción General
**Perspectiva del Producto:** Mythera Map API es un servicio backend expuesto a través de peticiones HTTP RESTful. Guarda toda la información de cordenadas geográficas del mundo, detalles intrincados de los lugares y la enciclopedia narrativa (arcos, sesiones).
**Funciones del Producto:**
- CRUD de Entidades Geográficas (Places).
- CRUD de Elementos Narrativos (Narrative Arcs & Sessions).
- Gestión e Integración de imágenes a través de Cloudinary.

## 3. Requisitos Funcionales

### 3.1. Gestión de Lugares (Places Endpoint)
- **FR1.1 Creación de lugar:** El sistema debe permitir la creación de lugares (`POST /places`) recibiendo tanto datos (x, y, nombre, descripción, tipo) como una imagen, la cual debe ser procesada y subida a Cloudinary devolviendo una URL.
- **FR1.2 Lectura de lugares:** El sistema debe devolver una lista general de lugares para renderizarse en el mapa (`GET /places`).
- **FR1.3 Detalles de un lugar:** El sistema debe devolver la información extendida de un lugar por su identificador (`GET /places/details/:id`).
- **FR1.4 Actualizaciones Parciales:** El sistema debe soportar actualizaciones específicas (PATCH) sobre un lugar (entidades anidadas):
  - Actualización de sub-campos básicos y de la imagen (`PATCH /places/:id/image`).
  - Descripción HTML (`PATCH /places/:id/description`).
  - Tipos de criaturas (`PATCH /places/:id/creatures`).
  - Edición en sub-listas (CRUD): Objetos (`/places/:id/objects`), Ejércitos (`/places/:id/army`), Lugares de interés (`/places/:id/places-of-interest`), y NPCs (`/places/:id/npcs`).

### 3.2. Gestión de Arcos Narrativos (Narrative Arcs Endpoint)
- **FR2.1 Gestión de Arcos:** El sistema debe permitir operaciones completas CRUD sobre los arcos narrativos (`/narrative-arcs`), incluyendo subida opcional de imagen.
- **FR2.2 Gestión de Sesiones:** Cada arco puede contener un listado anidado de sesiones. El sistema debe permitir agregar (`POST`), editar (`PATCH`) y eliminar (`DELETE`) sesiones de forma independiente por el ID del arco.
- **FR2.3 Composición de la Sesión:** Una sesión abarca Tipo (Campaña, Quest, Oneshot, Bishot), Nivel de inicio, arreglo de Jugadores (Personaje, Nivel) y arreglos de Contenido (Resumen Inicial, Resumen Final).

### 3.3. Gestión de Recursos (Imágenes)
- **FR3.1 Cloudinary:** Toda subida de imagen (`Express.Multer.File`) debe ser interceptada, procesada de forma segura por el servicio de Cloudinary y almacenada mediante su correspondiente URL en la base de datos MongoDB.

## 4. Requisitos No Funcionales (Atributos de Calidad)
- **NFR.1 Seguridad e Infraestructura:** No se aprecia mecanismo de autenticación expuesto actualmente en `places.controller.ts` (posible expansión requerida o el API es interna).
- **NFR.2 Bases de Datos:** El ecosistema de bases de datos debe ser Mongoose con esquemas estrictamente tipados.
- **NFR.3 Tecnologías:** NestJS 10.x, MongoDB (Mongoose 8.x), Cloudinary, TypeScript, Multer.

## 5. Diseño de Base de Datos (Principales Modelos)
- **Place:** `id, name, description, type, x, y, imageUrl, iconSize, details (PlaceDetails)`
- **PlaceDetails:** `descriptionHtml, creatures, legendaryCreatures, objects[], army[], placesOfInterest[], npcs[]`
- **NarrativeArc:** `title, descriptionHtml, imageUrl, sessions[]`
- **Session:** `type, startLevel, players[], contents[]`
