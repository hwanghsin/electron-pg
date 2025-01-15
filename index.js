const {
  app,
  BrowserWindow,
  Menu,
  Notification,
  Tray,
  ipcMain,
} = require("electron");
const path = require("path");
const { exec } = require("child_process");
const firstRun = require("electron-first-run");

const assetsDirectory = path.join(__dirname, "assets");

let progressbar;

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
    try {
      const notify = new Notification({ title: "Notification", body: arg });

      notify.on("show", (event) => {
        console.log("Notification show", event);
      });

      notify.show();
    } catch (error) {
      console.log(`Notification error: ${error}`);
    }
  });

  ipcMain.handle("TEST", async () => {});

  ipcMain.on("DEVICE", () => {
    const platform = process.platform;
    console.log("DEVICE", platform);
    // openNotifySetting(platform);
  });

  ipcMain.on("DOM-READY", (event, notifyState) => {
    console.log("DOM-READY", notifyState);
  });

  win.loadFile("index.html");

  // 只有Windows和Linux有Tray
  const tray = new Tray(path.join(assetsDirectory, "profile.jpeg"));
  tray.on("click", () => {
    /* 點擊處理 */
    win.show();
    win.focus();
  });
  tray.on("double-click", () => {
    /* 雙擊處理 */
  });
  tray.on("right-click", () => {
    /* 右鍵處理 */
  });
  // 點右鍵時的選單
  // tray.setContextMenu(null);

  // 程式上方選單
  // Menu.setApplicationMenu(null);
  // 建立模板，回傳Menu物件
  // Menu.buildFromTemplate(null);

  // Mac Dock選單
  const dockMenu = Menu.buildFromTemplate([
    {
      label: "New Window",
      click() {
        console.log("New Window");
      },
    },
    {
      label: "New Window with Settings",
      submenu: [{ label: "Basic" }, { label: "Pro" }],
    },
    { label: "New Command..." },
  ]);

  if (process.platform === "darwin") {
    app.dock.setMenu(dockMenu);
  }

  // 進度條
  const increment = 0.03;
  const delay = 100;

  let progressTime = 0;
  progressbar = setInterval(() => {
    win.setProgressBar(progressTime);

    if (progressTime < 2) {
      progressTime += increment;
    } else {
      c = -increment * 5;
    }
  }, delay);
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
    const isFirstRun = firstRun();
    console.log("isFirstRun", isFirstRun);
    // const notification = new Notification({
    //   title: "Enable Notifications",
    //   body: "Notifications are disabled. Click here to enable them in system preferences.",
    //   actions: [{ type: "button", text: "Open Settings" }],
    // });
    // notification.on("action", () => {
    //   const platform = process.platform;
    //   openNotifySetting(platform);
    // });
    // notification.on("failed", (error) => {
    //   console.error("Notification failed:", error);
    // });
    // notification.show();
  });

app.on("before-quit", () => clearInterval(progressbar));

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
