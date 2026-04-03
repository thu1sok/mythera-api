# Places - API Context

## 📖 Domain Logic & Lore
Los **Lugares (Places)** representan puntos de interés dentro del mundo de Mythera. Al contrario que otras entidades genéricas de la Wiki, los Places están íntimamente vinculados al **Mapa Interactivo** mediante coordenadas cartesianas.

## 🗄️ Esquema de Base de Datos (`places.schema.ts`)
- **Place**: Contiene `name`, `description`, `type` (ej. Ciudad, Ruina, Bosque), y crucialmente: `x` e `y` (coordenadas en el mapa). 
  - `imageUrl` e `iconSize` están orientados a cómo se pinta su marcador/icono en el mapa.
- **PlaceDetails**: Objeto anidado (`details`) masivo que encapsula el lore profundo del lugar.
  - Campos de texto (`descriptionHtml`, `creatures`, `legendaryCreatures`).
  - Arrays de `NamedDescription` (objetos con `{name, description}`) para: `objects` (Artefactos), `army` (Ejército/Defensas), `placesOfInterest` (Lugares de interés internos).
  - Array de `Npc`: (NPCs importantes que habitan el lugar con su `name, title, image, descriptionHtml, personality`).

## ⚙️ Técnicas y Quirks
- Altamente relacional con el frontend del Mapa interactivo. Modificar un Place muchas veces implica verificar que sigue rindiendo bien en Konva/Leaflet en el frontend.
- Dados los detalles anidados (como NPCs con imágenes), las subidas u operaciones CRUD aquí pueden ser las más pesadas de toda la API.
