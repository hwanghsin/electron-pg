const ipcRenderer = require("electron").ipcRenderer;
const notify = document.getElementById("notify");

notify.addEventListener("submit", (event) => {
  event.preventDefault();

  ipcRenderer.send("NOTIFY", "Hello from electron");
  // web端的Notification API

  //   new Notification("Hello from browser", {
  //     body: "option body",
  //   }).show();
});
