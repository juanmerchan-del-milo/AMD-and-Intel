# PC Lab Builder 3D v1.25.0

Constructor educativo de PC en 3D, catálogo de hardware y laboratorio de procesadores AMD/Intel para web, Android, Windows, Linux, macOS, iPhone y iPad.

## Qué incluye

- Catálogo ampliado de CPU de escritorio, portátiles, mini PC y sistemas embebidos, con NPU cuando corresponde.
- GPU desde generaciones anteriores a GeForce GT 1030 hasta modelos recientes.
- RAM DDR SDRAM (DDR1), DDR2, DDR3, DDR4 y DDR5, incluidos perfiles DIMM y SO-DIMM representativos.
- Almacenamiento SATA y perfiles PCIe 1.0, 2.0, 3.0, 4.0 y 5.0. La versión PCIe describe el enlace; no es la «versión del SSD».
- Placas base, fuentes, refrigeración, gabinetes, potencia orientativa y comprobaciones preliminares de compatibilidad.
- Constructor 3D con giro, zoom/pellizco fluido, explosión de componentes y perfiles de calidad.
- Taller 3D de GPU y RAM: desmontaje/montaje por capas, selección de piezas, aislamiento, vistas superior/inferior y controles de zoom.
- Interiores con PCB, núcleo gráfico, VRAM/HBM, VRM, aletas, tubos de calor y contactos. DDR5 muestra PMIC; RDIMM incluye registro; SO-DIMM conserva su formato compacto.
- Nombres y capacidades legibles: `512 MB`, `1 GB`, Founders Edition, perfiles traducidos y módulos DDR1 expresados en MB cuando corresponde.
- CPU Lab reparado: Generaciones, Portátiles, Mini PC, NPU, filtros AMD/Intel/móvil/escritorio y vistas educativas.
- Español, inglés y chino; funcionamiento sin conexión y sin dependencias CDN.

El catálogo contiene modelos verificables y perfiles genéricos claramente identificados. No pretende representar cada SKU regional fabricado en la historia. La compatibilidad y el consumo son una orientación educativa: antes de comprar, confirma BIOS, QVL, dimensiones, conectores y límites del fabricante.

El taller usa **geometría didáctica por familia, no escaneos de cada SKU**. La cantidad de chips, ventiladores y tornillos es ilustrativa. Los chips permanecen soldados; únicamente se separan cubiertas y capas térmicas. No es una guía para abrir o reparar hardware real. En RAM, la cubierta opcional no implica que el perfil elegido la incluya. Explorar no modifica la configuración hasta pulsar **Usar en mi PC**.

La vista DDR5 distingue PMIC y concentrador SPD según la [documentación de Kingston](https://www.kingston.com/en/blog/pc-performance/ddr5-overview). Los sistemas térmicos varían: véase el [diseño Founders Edition de NVIDIA](https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/). La placa [ASRock P4i65G](https://www.asrock.com/mb/Intel/P4i65G/index.asp) usa AGP, no PCIe, y el comprobador ahora rechaza esa combinación.

## Descargas

La [última versión](https://github.com/juanmerchan-del-milo/AMD-and-Intel/releases/latest) genera:

- Android APK (Android 7.0+).
- Windows x64, instalador y portátil.
- Linux x86-64, AppImage y `tar.gz`.
- macOS Intel y Apple Silicon, DMG y ZIP sin firma/notarización.
- Web/PWA en ZIP.

## Web, iPhone y iPad

La URL prevista es [PC Lab Builder 3D](https://juanmerchan-del-milo.github.io/AMD-and-Intel/), pendiente de habilitar GitHub Pages en la cuenta propietaria. Cuando esté publicada, en iPhone/iPad usa Safari → Compartir → **Añadir a pantalla de inicio**. Una IPA nativa requiere firma Apple Developer; la PWA es la alternativa web. El ZIP Web/PWA puede servirse por HTTPS desde otro alojamiento autorizado.

## Desarrollo y validación

```bash
npm ci
npm test
npm run check
npm run sync
npm run check:mirrors
```

Los datos están separados del motor de compatibilidad para poder ampliar el catálogo sin rehacer la interfaz. Consulta [README-DESKTOP.md](README-DESKTOP.md), [android-app/README.md](android-app/README.md) e [ios/README.md](ios/README.md) para cada plataforma.
