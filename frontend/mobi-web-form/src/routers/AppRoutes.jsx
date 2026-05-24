// ===== IMPORTAÇÃO =====

// ===== Importação Nomeada
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ===== Importação Padrão
import PageForm from "../pages/ViewForm";
import PageResp from "../pages/FormResponse";
import PageNFound from '../pages/NotFound';

// ===== FUNÇÃO PRINCIPAL =====
export function AppRoutes() {

  // ===== VISUALIZAÇÃO =====
  return (
    <>

      {/* Estrutura de Rotas */}
      <BrowserRouter>
        <Routes>

          {/* Rotas Padrão */}
          <Route path="/forms/viewform/:id" element={<PageForm />} />
          <Route path="/forms/formresponse/:id" element={<PageResp />} />
          <Route path="*" element={<PageNFound />} />

        </Routes>
      </BrowserRouter>

    </>
  );

}