// ===== IMPORTAÇÃO =====

// ===== Importação Nomeada
import { Navigate } from "react-router-dom";

// ===== FUNÇÃO PRINCIPAL =====
function PrivateRoute({ children }) {

    // ===== COMPONENTES =====

    // ===== Banco do Navegador
    const token = localStorage.getItem("token");

    // ===== A Barragem
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // ===== Retonar
    return children;
}

// ===== Expondo a Função
export default PrivateRoute;