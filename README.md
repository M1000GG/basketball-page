# Basketball Page con React + Bootstrap

Aplicación React que replica la interfaz de “Central de Rendimiento” para Top Club Flames. Incluye búsqueda avanzada con debounce, paginación dinámica, ordenamiento multi-columna, favoritos persistentes y modo oscuro/claro. El objetivo es contar con un panel listo para desplegar en Netlify y evaluar métricas clave de los jugadores asignados.

> Carpeta principal a usar por el jurado y el equipo: `parcial-final-jurado-mateo-santiago` (antes `react-vite`). Mantengan este nombre en sus clones para que todos ubiquen el mismo punto de partida.
> Trabajo académico desarrollado por Sebastián Torres (Programación 1) con asistencia de la IA **GPT-5.1 Codex**.

## Funcionalidades clave

- Sistema de búsqueda con debounce (300 ms) y contador de resultados.
- Botones para colorear filas pares/impares y limpiar resaltado.
- Paginación completa: selector 5/10/20 por página, botones Primera/Anterior/Siguiente/Última y rango “Mostrando X-Y de Z”.
- Ordenamiento cíclico por todas las columnas (ninguno → ascendente → descendente).
- Modo oscuro/claro persistente mediante `localStorage`.
- Panel de estadísticas en tiempo real (`useMemo`): totales, promedios y distribución por posición con barras.
- Modal con detalles ampliados y animación de aparición.
- Sistema de favoritos persistente con filtro “mostrar solo favoritos”.
- Historial de últimas 5 búsquedas con restauración rápida y limpieza.
- Componentes reutilizables (`SearchBar`, `PlayerTable`, `PlayerRow`, `Pagination`, `StatsPanel`, `Modal`, `ThemeToggle`, `SearchHistory`).
- Estructura HTML completa (`<html><head><body>`) con metadatos de autor, keywords y descripción.
- Diseño responsive utilizando Bootstrap 5 (grid) + CSS propio con metodología **BEM**.

## Stack

- React 19 + Vite.
- Bootstrap 5.3 (grillas y helpers responsivos).
- CSS personalizado (BEM + variables).
- LocalStorage para persistencia de tema, favoritos e historial.

## Arquitectura

```text
src/
  components/
    Pagination.jsx
    PlayerModal.jsx
    PlayerRow.jsx
    PlayerTable.jsx
    SearchBar.jsx
    SearchHistory.jsx
    StatsPanel.jsx
    ThemeToggle.jsx
  data/
    players.js
  App.jsx
  App.css
  main.jsx
  index.css
```

## Hooks utilizados

- `useState`: controla búsqueda, debounce, colores de filas, paginación, sorteo, favoritos, historial, tema y modal.
- `useEffect`:
  - debounce de búsqueda con cleanup,
  - sincronización con `localStorage`,
  - reinicio de paginación al filtrar y límite automático de página.
- `useMemo`: calcula jugadores filtrados/ordenados y estadísticas (promedios, top scorer, distribución por posición) evitando renders costosos.

## Evidencia BEM

Ejemplos de bloques/modificadores en `src/App.css`:

- `performance-dashboard`, `performance-dashboard--light`.
- `scoreboard__card`, `scoreboard__team-code`.
- `player-row`, `player-row--even`, `player-row__favorite--active`.
- `stats-panel__card`, `stats-panel__card--highlight`.

## Capturas sugeridas


## Equipo

- Integrantes: Mateo Gutiérrez Delgado, Juan Sebastián Jurado García, Santiago Herrera Giraldo.

## ✅ Checklist de requisitos

- [x] Estructura HTML completa con `<html><head><body>`.
- [x] Metadatos de autor/keywords/description.
- [x] Indentación suave de 2 espacios.
- [x] Metodología BEM en clases CSS.
- [x] Componentes reutilizables solicitados.
- [x] Bootstrap como framework de grillas responsive.
- [x] Todos los sistemas interactivos (debounce, paginación, favoritos, historial, modal, stats, modo oscuro).
- [x] Preparado para subir a GitHub/GitLab y desplegar en Netlify.
