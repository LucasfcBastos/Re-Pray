import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PageLogin from "../pages/Login";

export function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PageLogin />} />
        </Routes>
    </BrowserRouter>
  );
}