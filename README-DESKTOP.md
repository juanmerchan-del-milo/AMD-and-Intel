# PC Lab Builder 3D — escritorio 1.26.0

Aplicación educativa sin conexión para construir una PC en 3D, revisar compatibilidad preliminar y explorar el laboratorio AMD/Intel.

## Plataformas

- Windows 10/11 x64: instalador y ejecutable portátil.
- Linux x86-64: AppImage y archivo `tar.gz`.
- macOS: DMG y ZIP para Intel x64 y Apple Silicon arm64.

## Funciones de escritorio

- Constructor 3D, catálogo, nomenclatura, equipos guardados y CPU Lab en una sola aplicación.
- Perfil de rendimiento, equilibrado o calidad; aceleración gráfica y modo de renderizado seguro.
- Captura PNG, exportación PDF, pantalla completa, zoom y navegación mediante menú nativo.
- Contenido local: no necesita descargar bibliotecas desde un CDN.
- Aislamiento de contexto de Electron, sin integración de Node.js en la página y permisos del navegador bloqueados.

## Atajos

| Acción | Atajo |
|---|---|
| Constructor | `Inicio` |
| Catálogo | `Ctrl/Cmd+1` |
| Guía | `Ctrl/Cmd+2` |
| Equipos guardados | `Ctrl/Cmd+3` |
| CPU Lab | `Ctrl/Cmd+4` |
| Captura | `Ctrl/Cmd+Mayús+S` |
| Exportar PDF | `Ctrl/Cmd+Mayús+E` |
| Pantalla completa | `F11` |
| Restablecer zoom | `Ctrl/Cmd+0` |

## Desarrollo

Requiere Node.js 22 o posterior.

```bash
npm ci
npm test
npm run check
npm start
```

Paquetes: `npm run dist:win`, `npm run dist:linux` y `npm run dist:mac`.

Las compilaciones públicas de macOS no están firmadas ni notarizadas. Gatekeeper puede solicitar confirmación; eliminar ese aviso requiere una cuenta Apple Developer y un certificado Developer ID.
