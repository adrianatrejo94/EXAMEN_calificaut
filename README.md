# CalificaUT · Página de práctica (SonarQube + Playwright)

Calculadora de promedio para las actividades de la Unidad II de **Gestión del Proceso de Desarrollo de Software**.
La página **tiene defectos a propósito**: encuéntrenlos con SonarQube (análisis estático) y Playwright (pruebas E2E)
y regístrenlos en la bitácora de pruebas.

## Instalar

```bash
npm install
npx playwright install chromium firefox   # solo si aún no tienen los navegadores
```

## Comandos

| Comando | Qué hace |
|---|---|
| `npm start` | Levanta la página en http://localhost:4000 para probarla a mano |
| `npm run test:chromium` | Ejecuta las pruebas en Chromium |
| `npm test` | Ejecuta las pruebas en Chromium y Firefox |
| `npm run test:ui` | Modo UI de Playwright |
| `npm run report` | Abre el reporte HTML |
| `npx @sonar/scan -Dsonar.token=SU_TOKEN` | Envía el análisis a SonarQube (http://localhost:9000) |

## Estructura

```
public/index.html, app.js, estilos.css   la página (esto analiza SonarQube)
server.js                                servidor sin dependencias (puerto 4000)
tests/calificaciones.spec.ts             pruebas de Playwright (CP-01 resuelta, CP-02 a CP-06 por completar)
playwright.config.ts                     configuración de Playwright
sonar-project.properties                 configuración del análisis de SonarQube
```

No suban su token de SonarQube al repositorio.
