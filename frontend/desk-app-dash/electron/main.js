// ===== IMPORTAÇÃO =====

// ===== Importação Nomeada
import { app, BrowserWindow, ipcMain } from "electron";

// ===== Importação Padrão
import machinePkg from "node-machine-id";

// ===== COMPONENTES =====

// ===== Nomear a Maquina
const { machineIdSync } = machinePkg;

// ===== FUNÇÃO PRINCIPAL =====
function createWindow() {
  
  // ===== Configuração de Janela
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minHeight: 600,
    minWidth: 787,
    webPreferences: {
      preload: new URL( "./preload.cjs", import.meta.url ).pathname,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadURL("http://localhost:5173");

}

// ===== GATILHOS =====

// ===== Gatilho de Inicialização
app.whenReady().then(() => {

  // Respondendo ao Chamado
  ipcMain.handle( "get-device-id", () => {
    return machineIdSync();
  });

  // ===== Chamada de Função
  createWindow();

});

// ===== Gatilho de Fechamento
app.on("window-all-closed", () => {

  // Gerenciamento do Aplicativo
  if (process.platform !== "darwin") { app.quit(); }

});