// ===== ARQUIVO DO MEIO =====
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld( "electronAPI", {
    getDeviceId: () => ipcRenderer.invoke("get-device-id")
});