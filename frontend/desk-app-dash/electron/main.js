// ===== IMPORTAÇÃO =====

// ===== Importação Nomeada
import { app, BrowserWindow, ipcMain } from "electron";

// ===== Importação Padrão
import machinePkg from "node-machine-id";

// ===== COMPONENTES =====

// ===== Nomear a Máquina
const { machineIdSync } = machinePkg;

// ===== FUNÇÃO PRINCIPAL =====
function createWindow() {

  // ===== Configuração da Janela
  const win = new BrowserWindow({

    // ===== Tamanho mínimo
    minWidth: 787,
    minHeight: 600,

    // ===== Configuração Web
    webPreferences: {
      preload: new URL("./preload.cjs", import.meta.url).pathname,
      contextIsolation: true,
      nodeIntegration: false,
    },

  });

  // ===== Maximiza Janela
  win.maximize();

  // ===== Carrega Frontend React/Vite
  win.loadURL("http://localhost:5173");

}

// ===== GATILHOS =====

// ===== Inicialização do Electron
app.whenReady().then(() => {

  // ===== Retornando ID do Dispositivo
  ipcMain.handle("get-device-id", () => {
    return machineIdSync();
  });

  // ===== Criando Janela
  createWindow();

});

// ===== Fechamento do Aplicativo
app.on("window-all-closed", () => {

  // ===== Fecha no Windows/Linux
  if (process.platform !== "darwin") {
    app.quit();
  }

});