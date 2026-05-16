import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PageLogin from "../pages/Login";

import PageDash from "../pages/Dashboard";

export function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PageLogin />} />

            <Route path="/dashboard" element={<PageDash />} />
        </Routes>
    </BrowserRouter>
  );
}