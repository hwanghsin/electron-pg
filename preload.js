window.addEventListener("DOMContentLoaded", () => {
  const { contextBridge, ipcRenderer } = require("electron");
  contextBridge.exposeInMainWorld("electronAPI", {
    invoke: (channel, args) => ipcRenderer.invoke(channel, args),
    send: (channel, args) => ipcRenderer.send(channel, args),
    on: (channel, listener) => ipcRenderer.on(channel, listener),
    handle: (channel, listener) => ipcRenderer.handle(channel, listener),
  });

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
