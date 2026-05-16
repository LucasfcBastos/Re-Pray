import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PageForm from "../pages/ViewForm";
import PageResp from "../pages/FormResponse";

export function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/forms/viewform" element={<PageForm />} />
            <Route path="/forms/formresponse" element={<PageResp />} />
        </Routes>
    </BrowserRouter>
  );
}