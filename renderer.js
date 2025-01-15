const ipcRenderer = require("electron").ipcRenderer;
const test = document.getElementById("test");
const notify = document.getElementById("notify");
const device = document.getElementById("device");

window.addEventListener("DOMContentLoaded", () => {
  const notifyState = localStorage.getItem("notifyState");
  ipcRenderer.send("DOM-READY", notifyState);
});

notify.addEventListener("submit", (event) => {
  event.preventDefault();

  ipcRenderer.send("NOTIFY", "Hello from electron");
  // web端的Notification API

  // console.log(Notification.permission);
  // const notify = new Notification("Hello from browser", {
  //   body: "option body",
  // });

  // notify.onshow = (event) => {
  //   console.log("Notification show:", event);
  // };

  // notify.onerror = (event) => {
  //   console.log("Notification error:", event);
  // };
});

device.addEventListener("submit", (event) => {
  event.preventDefault();

  // console.log(Notification.permission);
  ipcRenderer.send("DEVICE");
});

test.addEventListener("submit", (event) => {
  event.preventDefault();

  ipcRenderer.invoke("TEST");
});
