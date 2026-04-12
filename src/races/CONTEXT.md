# Races & Subraces - API Context

## 📖 Domain Logic & Lore
Este módulo gestiona las **Razas (Races)** y sus respectivas **Subrazas (Subraces)** en la enciclopedia estructurada de Mythera (Wiki). 
- **Race**: Es la categoría padre genérica (ej. "Elfos", "Humanos"). Funciona principalmente como un contenedor visual y organizativo.
- **Subrace**: Es la subclase específica jugable o que habita el mundo físico (ej. "Altos Elfos", "Elfos del Bosque"). Contiene la estadística real (stats) y atributos de personaje.

## 🗄️ Esquemas de Base de Datos
- **Race (`race.schema.ts`)**: 
  - `name`: Nombre de la Raza.
  - `imageUrl`: Imagen de la raza (subida a Cloudinary).
  - `description`: Descripción general.
  - `hereditaryTrait`: Objeto `{ title, description }` que heredan todas sus subrazas.
  
- **Subrace (`subrace.schema.ts`)**: 
  - `raceId`: Referencia a la `Race` (`Types.ObjectId`). **Relación 1:N** (Una raza tiene muchas subrazas).
  - Atributos base: `name`, `imageUrl`, `description`, `size`, `age`, `language`, `speed`.
  - Atributos complejos: 
    - `stats`: Objeto con `str, dex, con, int, wis, cha`.
    - `passiveTraits`: Array de objetos `{ title, description }`.
    - `activeTraits`: Array de objetos `{ title, description }`.

## ⚙️ Notas Técnicas y Quirks
- **Subida de Imágenes**: Ambos controladores usan `FileInterceptor('file')` de Multer + `CloudinaryService` para subir fotos.
- **Parsers (Importante)**: Al tratar con imágenes, el frontend debe enviar los datos con `FormData` en lugar de `application/json`. Por eso, en `subraces.controller.ts`, los atributos como `stats`, `passiveTraits` y `activeTraits` se reciben como `string` y el controlador hace manualmente un `JSON.parse()`. Esto es una peculiaridad que hay que recordar al modificar este módulo.
- **Cascada**: Si una Raza Principal se borra en el frontend (App), ¿deberían borrarse en cascada todas sus Subrazas? (*Nota: actualmente la API de Race no borra en cascada automáticamente en Mongoose, esto es un punto a revisar con el usuario*).

---
> ⚠️ **Estado Actual**: Work In Progress. Faltan detalles por definir respecto a su interactividad.
