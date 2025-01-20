const test = document.getElementById("test");
const notify = document.getElementById("notify");
const device = document.getElementById("device");
const quality = document.getElementById("image-quality");

window.addEventListener("DOMContentLoaded", () => {
  // const notifyState = localStorage.getItem("notifyState");
  // window.electronAPI.send("DOM-READY", notifyState);
});

notify?.addEventListener("submit", (event) => {
  event.preventDefault();

  // window.electronAPI.send("NOTIFY", "Hello from electron");
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

// device?.addEventListener("submit", (event) => {
//   event.preventDefault();

//   window.electronAPI.send("DEVICE");
// });

test?.addEventListener("submit", async (event) => {
  event.preventDefault();

  await window.electronAPI.invoke("TEST");
});

quality?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const res = await fetch("./assets/test.PNG");
  const ab = await res.arrayBuffer();

  const buffer = await window.electronAPI.invoke("IMAGE-QUALITY", { ab });

  const img = document.getElementById("reslution");

  // const blob = new Blob([buffer], { type: "image/png" });
  // const file = new File([blob], "test_compress.png", { type: "image/png" });

  const imageUrl = URL.createObjectURL(blob);

  img.src = imageUrl;
  img.style.maxWidth = "400px";
  img.style.display = "block";

  // const original = new Blob([ab], { type: "image/png" });
  // const originalFile = new File([original], "original.png", {
  //   type: "image/png",
  // });

  // window.electronAPI.on("IMAGE-QUALITY-RESULT", (event, buffer) => {
  //   const img = document.getElementById("reslution");

  //   const blob = new Blob([buffer], { type: "image/png" });
  //   const file = new File([blob], "test_compress.png", { type: "image/png" });
  //   console.log("file", file);

  //   const imageUrl = URL.createObjectURL(blob);

  //   img.src = imageUrl;
  //   img.style.maxWidth = "400px";
  //   img.style.display = "block";
  // });
});
