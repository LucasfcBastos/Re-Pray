// ===== IMPORTAÇÃO =====

// ===== Importação Nomeada
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ===== Importação Padrão
import PrivateRoute from "./PrivateRoute";
import PageLogin from "../pages/Login";
import PageDash from "../pages/Dashboard";
import PagePrays from "../pages/Prays";
import PageCode from "../pages/QrCode";
import PageConfig from "../pages/Settings";

// ===== FUNÇÃO PRINCIPAL =====
export function AppRoutes() {

    // ===== VISUALIZAÇÃO =====
    return (
        <>
        
            {/* Estrutura de Rotas */}
            <BrowserRouter>
                <Routes>

                    {/* Rotas Padrão */}
                    <Route path="/" element={<PageLogin />} />

                    {/* Rotas Segura */}
                    <Route path="/dashboard" element={ <PrivateRoute> <PageDash /> </PrivateRoute> } />
                    <Route path="/prays" element={ <PrivateRoute> <PagePrays /> </PrivateRoute> } />
                    <Route path="/qrcode" element={ <PrivateRoute> <PageCode /> </PrivateRoute> } />
                    <Route path="/settings" element={ <PrivateRoute> <PageConfig /> </PrivateRoute> } />

                </Routes>
            </BrowserRouter>

        </>
    );

}