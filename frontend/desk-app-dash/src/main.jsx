// ===== IMPORTAÇÃO =====

// ===== Importação Nomeada
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// ===== Importação Padrão
import App from './App.jsx'

// ===== Injeção do HTML
createRoot(document.getElementById('root')).render(

  // ===== Fiscal de Código
  <StrictMode>
    <App />
  </StrictMode>

)
