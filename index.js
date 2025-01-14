const { app, BrowserWindow, Notification, ipcMain } = require("electron");
// const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  ipcMain.on("MESSAGE", (event, arg) => {
    console.log(arg);
  });

  ipcMain.handle("ASYNC_ACTION", async (event, message) => {
    // async action
  });

  ipcMain.on("NOTIFY", (event, arg) => {
    new Notification({ title: "Notification", body: arg }).show();
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
