import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Page from "../pages/Landing";

export function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Page />} />
        </Routes>
    </BrowserRouter>
  );
}