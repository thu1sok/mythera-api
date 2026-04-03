# Narrative Arcs - API Context

## 📖 Domain Logic & Lore
Los **Arcos Narrativos (Narrative Arcs)** son las grandes campañas, misiones o historias jugadas. 

## 🗄️ Esquema de Base de Datos (`narrative-arc.schema.ts`)
La estructura es altamente anidada y compleja:
- **NarrativeArc**: Contiene `title`, `descriptionHtml`, `imageUrl` y un array de `sessions`.
- **Session**: Dentro de un arco pueden haber múltiples sesiones. Tienen un `type` (Campaña, Quest, Oneshot, Bishot), `startLevel`, un array de `players` y un roaster de `contents`.
  - **Player**: `name` (Jugador), `character` (PJ), `level`.
  - **Content**: Resumen exhaustivo de la sesión (`title`, `initialSummary`, `finalSummary`).

## ⚙️ Técnicas y Quirks
- Al ser datos fuertemente anidados, las peticiones POST y PATCH desde el frontend pueden llegar con JSON complejos encadenados en `FormData` (si se sube imagen) o como puro JSON si no hay imágenes o se maneja la subida de imagen por separado.
- Mongoose maneja estos esquemas anidados mediante decoradores `@Prop({ type: [SubSchema] })`.
