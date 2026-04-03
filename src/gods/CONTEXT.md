# Gods - API Context

## 📖 Domain Logic & Lore
Los **Dioses (Gods)** son las deidades supremas adoradas por las distintas razas y culturas a lo largo del plano de Mythera. 

## 🗄️ Esquema de Base de Datos (`god.schema.ts`)
- `name`: Nombre del Dios.
- `nickname`: Título divino (ej. "Dios de la Justicia").
- `domain`: Dominio o elemento sobre el que gobierna.
- `legend`: Su origen cósmico o mitología.
- `prayers`: Un array de strings `[String]`. Representa los rezos, cánticos o dogmas seguidos por sus fieles.
- `imageUrl`: Avatar o símbolo divino (Cloudinary).

## ⚙️ Técnicas y Quirks
- **Parsers (Importante)**: Al igual que en *Subrazas*, como las peticiones POST/PATCH con imágenes entran vía `FormData`, un array como `prayers` llegará en forma de string (`"['Rezo 1', 'Rezo 2']"` o separadores por coma). El controlador debe transformar este campo (`JSON.parse` o `split`) antes de guardarlo en Mongoose como `string[]`.
- Utiliza la misma inyección de `CloudinaryService` para la gestión multimedia.
