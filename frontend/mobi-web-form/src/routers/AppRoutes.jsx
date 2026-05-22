import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PageForm from "../pages/ViewForm";
import PageResp from "../pages/FormResponse";

import PageNFound from '../pages/NotFound';

export function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/forms/viewform/:id" element={<PageForm />} />
            <Route path="/forms/formresponse/:id" element={<PageResp />} />

            <Route path="*" element={<PageNFound />} />
        </Routes>
    </BrowserRouter>
  );
}