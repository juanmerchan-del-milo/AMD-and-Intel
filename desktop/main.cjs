const { app, BrowserWindow, Menu, dialog, ipcMain, shell, session } = require('electron');
const fs = require('node:fs');
const path = require('node:path');

const APP_NAME = 'AMD Intel CPU Lab';
const PROFILES = new Set(['performance', 'balanced', 'quality']);
let mainWindow = null;
let rendererRecoveryAttempts = 0;

app.setName(APP_NAME);
app.setAppUserModelId('com.juanpablo.amdintel.desktop');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');
if (process.platform === 'linux') app.commandLine.appendSwitch('ozone-platform-hint', 'auto');
if (process.argv.includes('--software-rendering')) app.disableHardwareAcceleration();

const hasLock = app.requestSingleInstanceLock();
if (!hasLock) app.quit();

function settingsPath() {
  return path.join(app.getPath('userData'), 'desktop-settings.json');
}

function loadSettings() {
  const defaults = {
    width: 1440,
    height: 900,
    maximized: false,
    zoomFactor: 1,
    performanceProfile: 'balanced'
  };
  try {
    const parsed = JSON.parse(fs.readFileSync(settingsPath(), 'utf8'));
    return { ...defaults, ...parsed };
  } catch {
    return defaults;
  }
}

let settings = loadSettings();

function saveSettings() {
  try {
    fs.mkdirSync(path.dirname(settingsPath()), { recursive: true });
    fs.writeFileSync(settingsPath(), JSON.stringify(settings, null, 2));
  } catch (error) {
    console.error('No se pudieron guardar los ajustes:', error);
  }
}

function sendCommand(command, value = null) {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  mainWindow.webContents.send('desktop:command', { command, value });
}

function setProfile(profile) {
  if (!PROFILES.has(profile)) return;
  settings.performanceProfile = profile;
  saveSettings();
  sendCommand('profile', profile);
  buildMenu();
}

function setZoom(next) {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  settings.zoomFactor = Math.min(1.8, Math.max(0.65, next));
  mainWindow.webContents.setZoomFactor(settings.zoomFactor);
  saveSettings();
  sendCommand('zoom', settings.zoomFactor);
}

async function captureScreenshot() {
  if (!mainWindow) return { canceled: true };
  const result = await dialog.showSaveDialog(mainWindow, {
    title: 'Guardar captura del laboratorio',
    defaultPath: path.join(app.getPath('pictures'), `AMD-Intel-Lab-${Date.now()}.png`),
    filters: [{ name: 'Imagen PNG', extensions: ['png'] }]
  });
  if (result.canceled || !result.filePath) return { canceled: true };
  const image = await mainWindow.webContents.capturePage();
  await fs.promises.writeFile(result.filePath, image.toPNG());
  return { canceled: false, path: result.filePath };
}

async function exportPdf() {
  if (!mainWindow) return { canceled: true };
  const result = await dialog.showSaveDialog(mainWindow, {
    title: 'Exportar catálogo en PDF',
    defaultPath: path.join(app.getPath('documents'), 'AMD-Intel-CPU-Lab.pdf'),
    filters: [{ name: 'Documento PDF', extensions: ['pdf'] }]
  });
  if (result.canceled || !result.filePath) return { canceled: true };
  const pdf = await mainWindow.webContents.printToPDF({
    printBackground: true,
    pageSize: 'A4',
    preferCSSPageSize: true
  });
  await fs.promises.writeFile(result.filePath, pdf);
  return { canceled: false, path: result.filePath };
}

function relaunchSafe() {
  const args = process.argv.slice(1).filter(arg => arg !== '--software-rendering');
  app.relaunch({ args: [...args, '--software-rendering'] });
  app.exit(0);
}

function buildMenu() {
  const profileItems = [
    ['performance', 'Máximo rendimiento'],
    ['balanced', 'Equilibrado'],
    ['quality', 'Máxima calidad']
  ].map(([id, label]) => ({
    label,
    type: 'radio',
    checked: settings.performanceProfile === id,
    click: () => setProfile(id)
  }));

  const template = [
    {
      label: 'Archivo',
      submenu: [
        { label: 'Guardar captura…', accelerator: 'CmdOrCtrl+Shift+S', click: captureScreenshot },
        { label: 'Exportar en PDF…', accelerator: 'CmdOrCtrl+Shift+E', click: exportPdf },
        { type: 'separator' },
        { role: 'quit', label: 'Salir' }
      ]
    },
    {
      label: 'Navegación',
      submenu: [
        { label: 'Inicio', accelerator: 'Home', click: () => sendCommand('section', 'homeSection') },
        { label: 'Catálogo', accelerator: 'CmdOrCtrl+1', click: () => sendCommand('section', 'catalogSection') },
        { label: 'Laboratorio 3D', accelerator: 'CmdOrCtrl+2', click: () => sendCommand('section', 'real3dSection') },
        { label: 'Rendimiento', accelerator: 'CmdOrCtrl+3', click: () => sendCommand('section', 'coreBench') },
        { label: 'Especificaciones', accelerator: 'CmdOrCtrl+4', click: () => sendCommand('section', 'specsSection') }
      ]
    },
    {
      label: 'Vista',
      submenu: [
        { label: 'Perfil gráfico', submenu: profileItems },
        { type: 'separator' },
        { label: 'Aumentar zoom', accelerator: 'CmdOrCtrl+=', click: () => setZoom(settings.zoomFactor + 0.1) },
        { label: 'Reducir zoom', accelerator: 'CmdOrCtrl+-', click: () => setZoom(settings.zoomFactor - 0.1) },
        { label: 'Zoom original', accelerator: 'CmdOrCtrl+0', click: () => setZoom(1) },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Pantalla completa', accelerator: 'F11' },
        { label: 'Recargar interfaz', accelerator: 'CmdOrCtrl+R', click: () => mainWindow?.webContents.reload() }
      ]
    },
    {
      label: 'Herramientas',
      submenu: [
        { label: 'Reiniciar con renderizado seguro', click: relaunchSafe },
        { label: 'Limpiar caché visual', click: async () => { await session.defaultSession.clearCache(); mainWindow?.webContents.reload(); } }
      ]
    },
    {
      label: 'Ayuda',
      submenu: [
        {
          label: 'Acerca de',
          click: () => dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: APP_NAME,
            message: `${APP_NAME} ${app.getVersion()}`,
            detail: 'Laboratorio educativo de procesadores AMD e Intel para Windows y Linux.'
          })
        }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

function createWindow() {
  const icon = path.join(__dirname, '..', 'build', process.platform === 'win32' ? 'icon.ico' : 'icon.png');
  mainWindow = new BrowserWindow({
    title: APP_NAME,
    width: Math.max(1024, settings.width || 1440),
    height: Math.max(680, settings.height || 900),
    minWidth: 960,
    minHeight: 640,
    show: false,
    backgroundColor: '#070d18',
    icon,
    autoHideMenuBar: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
      webSecurity: true,
      spellcheck: false
    }
  });

  if (settings.maximized) mainWindow.maximize();
  mainWindow.loadFile(path.join(__dirname, '..', 'index.html'));
  mainWindow.webContents.setZoomFactor(settings.zoomFactor);

  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.webContents.on('did-finish-load', () => {
    sendCommand('profile', settings.performanceProfile);
    sendCommand('zoom', settings.zoomFactor);
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https:\/\//i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  mainWindow.webContents.on('will-navigate', (event, url) => {
    const current = new URL(mainWindow.webContents.getURL());
    const next = new URL(url);
    if (next.protocol !== 'file:' || next.pathname !== current.pathname) event.preventDefault();
  });

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.type !== 'keyDown') return;
    if (input.key === 'F11') {
      event.preventDefault();
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
    }
    if (input.key === 'Escape' && mainWindow.isFullScreen()) mainWindow.setFullScreen(false);
  });

  mainWindow.webContents.on('render-process-gone', (_event, details) => {
    if (details.reason === 'clean-exit') return;
    if (rendererRecoveryAttempts < 1) {
      rendererRecoveryAttempts += 1;
      mainWindow.reload();
      return;
    }
    dialog.showMessageBox(mainWindow, {
      type: 'warning',
      title: 'Recuperación de la aplicación',
      message: 'El componente gráfico dejó de responder.',
      detail: 'Puedes reiniciar con renderizado seguro desde el menú Herramientas.'
    });
  });

  mainWindow.on('close', () => {
    if (!mainWindow.isMaximized() && !mainWindow.isMinimized()) {
      const bounds = mainWindow.getBounds();
      settings.width = bounds.width;
      settings.height = bounds.height;
    }
    settings.maximized = mainWindow.isMaximized();
    saveSettings();
  });
  mainWindow.on('closed', () => { mainWindow = null; });
}

ipcMain.handle('desktop:get-info', async () => ({
  appVersion: app.getVersion(),
  platform: process.platform,
  arch: process.arch,
  profile: settings.performanceProfile,
  zoomFactor: settings.zoomFactor,
  gpu: app.getGPUFeatureStatus(),
  softwareRendering: process.argv.includes('--software-rendering')
}));
ipcMain.handle('desktop:set-profile', (_event, profile) => { setProfile(profile); return profile; });
ipcMain.handle('desktop:toggle-fullscreen', () => {
  if (!mainWindow) return false;
  mainWindow.setFullScreen(!mainWindow.isFullScreen());
  return mainWindow.isFullScreen();
});
ipcMain.handle('desktop:capture', captureScreenshot);
ipcMain.handle('desktop:export-pdf', exportPdf);
ipcMain.handle('desktop:set-zoom', (_event, value) => { setZoom(Number(value) || 1); return settings.zoomFactor; });

app.on('second-instance', () => {
  if (!mainWindow) return;
  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.show();
  mainWindow.focus();
});

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
  buildMenu();
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
