# Re-Pray

# INSTALAÇÃO

## Mobi-Web-Form

cd frontend/

cd mobi-web-form/

npm install react-router-dom

npm run dev

## Desk-App-Dash

cd frontend/

cd desk-app-dash/

npm install react-router-dom jspdf html2canvas

npm install electron concurrently wait-on electron-builder qrcode.react --save-dev

npm run dev

## Instalações


| Camada | Utilizado | Instalador | Descrição |
| :--- | :--- | :--- | :--- |
| *Frontend* | **React** | `react-router-dom` | Gerenciamento de rotas e navegação entre páginas da aplicação |
| | **Electron** | `electron` | Framework para transformar aplicações web em aplicativos desktop |
| | **Utilitários** | `concurrently` | Executa múltiplos comandos simultaneamente no terminal |
| | **Utilitários** | `wait-on` | Aguarda a inicialização de serviços/URLs antes de executar outro processo |
| | **Build** | `electron-builder` | Empacota e gera o executável instalável da aplicação desktop |
| | **QR Code** | `qrcode.react` | Geração de QR Codes em componentes React usando Canvas ou SVG |
| | **PDF** | `jspdf` | Criação e manipulação de arquivos PDF diretamente pelo JavaScript |
| | **Captura HTML** | `html2canvas` | Converte elementos HTML renderizados em imagem/canvas |
