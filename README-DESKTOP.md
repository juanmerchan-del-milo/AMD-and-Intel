# AMD Intel CPU Lab — versión de escritorio 1.21.3

Aplicación educativa para explorar y comparar procesadores AMD e Intel en Windows y Linux.

## Mejoras de escritorio

- Laboratorio 3D con aceleración gráfica y tres perfiles visuales.
- Menú nativo, navegación rápida y pantalla completa.
- Atajos de teclado para catálogo, laboratorio, rendimiento y zoom.
- Capturas PNG y exportación directa a PDF.
- Funcionamiento completamente sin conexión.
- Recuperación del proceso gráfico y renderizado seguro opcional.
- Persistencia del tamaño de ventana, zoom y perfil de rendimiento.
- Seguridad reforzada: aislamiento del contenido, sin acceso de Node.js y permisos bloqueados.

## Atajos principales

| Acción | Atajo |
|---|---|
| Pantalla completa | `F11` |
| Buscar procesador | `Ctrl+F` |
| Catálogo | `Ctrl+1` |
| Laboratorio 3D | `Ctrl+2` |
| Rendimiento | `Ctrl+3` |
| Especificaciones | `Ctrl+4` |
| Guardar captura | `Ctrl+Shift+S` |
| Exportar PDF | `Ctrl+Shift+E` |
| Restablecer zoom | `Ctrl+0` |

## Desarrollo

Requiere Node.js. Instala las dependencias con `npm install` y abre la aplicación con `npm start`.

- Linux: `npm run dist:linux`
- Windows: `npm run dist:win`
- Windows portátil desde Linux: `npm run pack:win`

Los ejecutables generados se guardan en la carpeta `release`.
