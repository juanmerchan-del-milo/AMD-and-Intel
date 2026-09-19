# PC Lab Builder 3D v1.24.0

Constructor educativo de PC en 3D, catálogo de hardware y laboratorio de procesadores AMD/Intel para web, Android, Windows, Linux, macOS, iPhone y iPad.

## Qué incluye

- Catálogo ampliado de CPU de escritorio, portátiles, mini PC y sistemas embebidos, con NPU cuando corresponde.
- GPU desde generaciones anteriores a GeForce GT 1030 hasta modelos recientes.
- RAM SDR DDR (DDR1), DDR2, DDR3, DDR4 y DDR5, incluidos perfiles DIMM y SO-DIMM representativos.
- Almacenamiento SATA y perfiles PCIe 1.0, 2.0, 3.0, 4.0 y 5.0. La versión PCIe describe el enlace; no es la «versión del SSD».
- Placas base, fuentes, refrigeración, gabinetes, potencia orientativa y comprobaciones preliminares de compatibilidad.
- Constructor 3D con giro, zoom/pellizco fluido, explosión de componentes y perfiles de calidad.
- CPU Lab reparado: Generaciones, Portátiles, Mini PC, NPU, filtros AMD/Intel/móvil/escritorio y vistas educativas.
- Español, inglés y chino; funcionamiento sin conexión y sin dependencias CDN.

El catálogo contiene modelos verificables y perfiles genéricos claramente identificados. No pretende representar cada SKU regional fabricado en la historia. La compatibilidad y el consumo son una orientación educativa: antes de comprar, confirma BIOS, QVL, dimensiones, conectores y límites del fabricante.

## Descargas

La [última versión](https://github.com/juanmerchan-del-milo/AMD-and-Intel/releases/latest) genera:

- Android APK (Android 7.0+).
- Windows x64, instalador y portátil.
- Linux x86-64, AppImage y `tar.gz`.
- macOS Intel y Apple Silicon, DMG y ZIP sin firma/notarización.
- Web/PWA en ZIP.

## Web, iPhone y iPad

Abre [PC Lab Builder 3D](https://juanmerchan-del-milo.github.io/AMD-and-Intel/). En iPhone/iPad usa Safari → Compartir → **Añadir a pantalla de inicio**. Una IPA nativa requiere firma Apple Developer; la PWA es la instalación compatible sin esa cuenta.

## Desarrollo y validación

```bash
npm ci
npm test
npm run check
```

Los datos están separados del motor de compatibilidad para poder ampliar el catálogo sin rehacer la interfaz. Consulta [README-DESKTOP.md](README-DESKTOP.md), [android-app/README.md](android-app/README.md) e [ios/README.md](ios/README.md) para cada plataforma.
