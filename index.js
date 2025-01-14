const { app, BrowserWindow, Notification, ipcMain } = require("electron");
// const path = require("path");
const { exec } = require("child_process");

function checkNotifications() {
  exec(
    `osascript -e 'tell application "System Events" to get enabled of every item of (get every application process whose bundle identifier is "com.your.app.bundleid")'`,
    (error, stdout) => {
      if (error) {
        console.error("Error checking macOS notifications:", error);
      } else {
        console.log("Notification status:", stdout.trim());
      }
    }
  );
}

const openNotifySetting = (device = "darwin") => {
  const isMac = device === "darwin";

  exec(
    isMac
      ? `open "x-apple.systempreferences:com.apple.preference.notifications"`
      : "start ms-settings:notifications",
    (err) => {
      if (err) {
        console.error("Failed to open notification settings:", err);
      } else {
        console.log("Notification settings opened successfully.");
      }
    }
  );
};

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

  ipcMain.on("MESSAGE", (event, message) => {
    console.log("message", message);
  });

  ipcMain.handle("ASYNC_ACTION", async (event, message) => {
    // async action
  });

  ipcMain.on("NOTIFY", (event, arg) => {
    new Notification({ title: "Notification", body: arg }).show();
  });

  ipcMain.on("DEVICE", () => {
    const platform = process.platform;
    console.log("DEVICE", platform);
    // openNotifySetting(platform);
  });

  win.loadFile("index.html");
};

app
  .whenReady()
  .then(() => {
    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  })
  .then(() => {
    // checkNotifications();
    // console.log("checkNotifications");
    // const notification = new Notification({
    //   title: "Enable Notifications",
    //   body: "Notifications are disabled. Click here to enable them in system preferences.",
    //   actions: [{ type: "button", text: "Open Settings" }],
    // });
    // notification.on("action", () => {
    //   const platform = process.platform;
    //   openNotifySetting(platform);
    // });
    // notification.show();
  });

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
