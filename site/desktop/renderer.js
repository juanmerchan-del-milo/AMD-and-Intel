(() => {
  if (!window.desktopApp) return;
  document.documentElement.classList.add('desktop-app');

  const platformName = platform => ({win32:'Windows',linux:'Linux',darwin:'macOS'}[platform] || platform);
  const gpuSummary = gpu => {
    if (!gpu) return 'GPU: comprobando';
    return Object.values(gpu).some(value => String(value).includes('enabled'))
      ? 'GPU acelerada' : 'Renderizado compatible';
  };
  const isCpuLab = () => /cpu-lab\.html$/i.test(location.pathname);
  const showView = view => {
    const button = document.querySelector(`[data-view="${view}"]`);
    if (button) {
      button.click();
      document.getElementById(view === 'catalog' ? 'selectionArea' : `${view}View`)?.scrollIntoView({behavior:'smooth',block:'start'});
      return;
    }
    location.href = './index.html';
  };

  const dock = document.createElement('aside');
  dock.id = 'desktopDock';
  dock.setAttribute('aria-label', 'Herramientas de escritorio');
  dock.innerHTML = `
    <div class="desktop-brand"><span class="desktop-dot"></span><b>PC LAB</b><small id="desktopVersion">1.24.0</small></div>
    <div class="desktop-nav">
      <button type="button" data-view-go="builder" title="Constructor 3D">⌂<span>Constructor</span></button>
      <button type="button" data-view-go="catalog" title="Catálogo">▦<span>Catálogo</span></button>
      <button type="button" id="desktopCpuLab" title="Laboratorio AMD/Intel">◈<span>CPU Lab</span></button>
      <button type="button" data-view-go="learn" title="Guía de nombres">?<span>Guía</span></button>
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

  dock.querySelectorAll('[data-view-go]').forEach(button => button.addEventListener('click', () => showView(button.dataset.viewGo)));
  document.getElementById('desktopCpuLab').addEventListener('click', () => {
    if (isCpuLab()) window.scrollTo({top:0,behavior:'smooth'});
    else location.href = './cpu-lab.html';
  });
  const profile = document.getElementById('desktopProfile');
  profile.addEventListener('change', () => window.desktopApp.setPerformanceProfile(profile.value));
  document.getElementById('desktopCapture').addEventListener('click', () => window.desktopApp.captureScreenshot());
  document.getElementById('desktopPdf').addEventListener('click', () => window.desktopApp.exportPdf());
  document.getElementById('desktopFullscreen').addEventListener('click', () => window.desktopApp.toggleFullscreen());

  function applyProfile(value) {
    document.documentElement.dataset.performanceProfile = value;
    profile.value = value;
    document.dispatchEvent(new CustomEvent('desktopPerformanceProfile', {detail:{profile:value}}));
  }

  window.desktopApp.getInfo().then(info => {
    document.getElementById('desktopVersion').textContent = info.appVersion;
    document.getElementById('desktopPlatform').textContent = `${platformName(info.platform)} · ${info.arch}`;
    document.getElementById('desktopGpu').textContent = info.softwareRendering ? 'GPU segura' : gpuSummary(info.gpu);
    applyProfile(info.profile || 'balanced');
  }).catch(() => applyProfile('balanced'));

  window.desktopApp.onCommand(({command,value}) => {
    if (command === 'view') showView(value);
    if (command === 'section') document.getElementById(value)?.scrollIntoView({behavior:'smooth',block:'start'});
    if (command === 'profile') applyProfile(value);
  });

  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'f') {
      const search = document.getElementById('search') || document.getElementById('specSearch');
      if (search) {
        event.preventDefault();
        if (search.id === 'search') showView('catalog');
        requestAnimationFrame(() => search.focus());
      }
    }
  });
})();
