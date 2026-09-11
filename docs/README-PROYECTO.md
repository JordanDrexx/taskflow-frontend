# TaskFlow — Frontend

Frontend de TaskFlow, una aplicación de gestión de tareas con tablero Kanban, autenticación real y conexión a la API REST de Laravel. Construido con React y Vite, consume la API protegida con Laravel Sanctum y permite a cada usuario gestionar únicamente sus propias tareas.

## Stack

- React 18 + Vite
- React Router
- axios

## Cómo correrlo localmente

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo .env con la URL del backend
echo "VITE_API_URL=http://localhost:8000/api" > .env

# 3. Levantar el servidor de desarrollo
npm run dev
```

## Build de producción

```bash
npm run build
```

`npm run build` genera `dist/` con los archivos estáticos ya optimizados. En este proyecto no se sube a mano: el workflow `.github/workflows/deploy-pages.yml` corre ese mismo comando en cada push a `main` y publica el resultado en GitHub Pages, en `https://{{REEMPLAZAR: usuario}}.github.io/taskflow-frontend/` (o en el dominio propio configurado en Settings → Pages).
