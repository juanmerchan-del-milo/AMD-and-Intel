const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopApp', Object.freeze({
  getInfo: () => ipcRenderer.invoke('desktop:get-info'),
  setPerformanceProfile: profile => ipcRenderer.invoke('desktop:set-profile', profile),
  setZoom: value => ipcRenderer.invoke('desktop:set-zoom', value),
  toggleFullscreen: () => ipcRenderer.invoke('desktop:toggle-fullscreen'),
  captureScreenshot: () => ipcRenderer.invoke('desktop:capture'),
  exportPdf: () => ipcRenderer.invoke('desktop:export-pdf'),
  onCommand: callback => {
    const handler = (_event, payload) => callback(payload);
    ipcRenderer.on('desktop:command', handler);
    return () => ipcRenderer.removeListener('desktop:command', handler);
  }
}));
