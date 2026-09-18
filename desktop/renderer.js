(() => {
  if (!window.desktopApp) return;
  document.documentElement.classList.add('desktop-app');

  const platformName = platform => ({ win32: 'Windows', linux: 'Linux', darwin: 'macOS' }[platform] || platform);
  const gpuSummary = gpu => {
    if (!gpu) return 'GPU: comprobando';
    const accelerated = Object.values(gpu).filter(value => String(value).includes('enabled')).length;
    return accelerated ? 'GPU acelerada' : 'Renderizado compatible';
  };
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const dock = document.createElement('aside');
  dock.id = 'desktopDock';
  dock.setAttribute('aria-label', 'Herramientas de escritorio');
  dock.innerHTML = `
    <div class="desktop-brand"><span class="desktop-dot"></span><b>CPU LAB</b><small id="desktopVersion">1.21.3</small></div>
    <div class="desktop-nav">
      <button type="button" data-go="homeSection" title="Inicio">⌂<span>Inicio</span></button>
      <button type="button" data-go="catalogSection" title="Catálogo">▦<span>Catálogo</span></button>
      <button type="button" data-go="real3dSection" title="Laboratorio 3D">◈<span>3D</span></button>
      <button type="button" data-go="coreBench" title="Rendimiento">▥<span>Pruebas</span></button>
    </div>
    <label class="desktop-profile">Perfil
      <select id="desktopProfile">
        <option value="performance">Rendimiento</option>
        <option value="balanced">Equilibrado</option>
        <option value="quality">Calidad</option>
      </select>
    </label>
    <div class="desktop-actions">
      <button id="desktopCapture" type="button" title="Guardar captura">📷</button>
      <button id="desktopPdf" type="button" title="Exportar PDF">PDF</button>
      <button id="desktopFullscreen" type="button" title="Pantalla completa">⛶</button>
    </div>
    <div class="desktop-system"><span id="desktopPlatform">Escritorio</span><small id="desktopGpu">GPU</small></div>`;
  document.body.appendChild(dock);

  dock.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => go(button.dataset.go)));
  const profile = document.getElementById('desktopProfile');
  profile.addEventListener('change', () => window.desktopApp.setPerformanceProfile(profile.value));
  document.getElementById('desktopCapture').addEventListener('click', () => window.desktopApp.captureScreenshot());
  document.getElementById('desktopPdf').addEventListener('click', () => window.desktopApp.exportPdf());
  document.getElementById('desktopFullscreen').addEventListener('click', () => window.desktopApp.toggleFullscreen());

  function applyProfile(value) {
    document.documentElement.dataset.performanceProfile = value;
    profile.value = value;
    document.dispatchEvent(new CustomEvent('desktopPerformanceProfile', { detail: { profile: value } }));
  }

  window.desktopApp.getInfo().then(info => {
    document.getElementById('desktopVersion').textContent = info.appVersion;
    document.getElementById('desktopPlatform').textContent = `${platformName(info.platform)} · ${info.arch}`;
    document.getElementById('desktopGpu').textContent = info.softwareRendering ? 'GPU segura' : gpuSummary(info.gpu);
    applyProfile(info.profile || 'balanced');
  }).catch(() => applyProfile('balanced'));

  window.desktopApp.onCommand(({ command, value }) => {
    if (command === 'section') go(value);
    if (command === 'profile') applyProfile(value);
  });

  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'f') {
      const search = document.getElementById('search');
      if (search) {
        event.preventDefault();
        go('catalogSection');
        requestAnimationFrame(() => search.focus());
      }
    }
  });
})();
