import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PageForm from "../pages/ViewForm";

export function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/forms/viewform" element={<PageForm />} />
        </Routes>
    </BrowserRouter>
  );
}