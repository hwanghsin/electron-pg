const ipcRenderer = require("electron").ipcRenderer;
const notify = document.getElementById("notify");
const device = document.getElementById("device");

notify.addEventListener("submit", (event) => {
  event.preventDefault();

  ipcRenderer.send("NOTIFY", "Hello from electron");
  // web端的Notification API

  //   new Notification("Hello from browser", {
  //     body: "option body",
  //   }).show();
});

device.addEventListener("submit", (event) => {
  event.preventDefault();

  // console.log(Notification.permission);
  ipcRenderer.send("DEVICE");
});
