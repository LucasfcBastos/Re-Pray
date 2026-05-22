import { app, BrowserWindow, ipcMain } from "electron";

import machinePkg from "node-machine-id";

const { machineIdSync } = machinePkg;

function createWindow() {

  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minHeight: 600,
    minWidth: 787,

    webPreferences: {

      preload: new URL(
        "./preload.cjs",
        import.meta.url
      ).pathname,

      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL("http://localhost:5173");
}


app.whenReady().then(() => {

  // IPC
  ipcMain.handle(
    "get-device-id",
    () => {

      return machineIdSync();
    }
  );

  createWindow();

});


app.on("window-all-closed", () => {

  if (process.platform !== "darwin") {
    app.quit();
  }

});