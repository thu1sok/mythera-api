# Eternals - API Context

## 📖 Domain Logic & Lore
Los **Eternos (Eternals)** representan entidades inmortales o de gran poder y presencia dentro del mundo de Mythera. Son figuras legendarias o históricas que trascienden el tiempo.

## 🗄️ Esquema de Base de Datos (`eternal.schema.ts`)
- `name`: Nombre verdadero del Eterno.
- `nickname`: Apodo o título por el cual es conocido (ej. "El Guardián").
- `imageUrl`: Representación gráfica (Cloudinary).
- `legend`: Historia o leyenda principal que lo define.
- `presence`: Ubicación, plano de existencia o cómo se manifiesta su impacto en el mundo físico.

## ⚙️ Técnicas y Flujos
- CRUD estándar de NestJS.
- **Subida de Imágenes**: Como la mayoría de las entidades visuales del Wiki, utiliza `FileInterceptor` con Multer para atrapar el `file` procedente de un `FormData` y subirlo a Cloudinary, guardando la URL en `imageUrl`.
