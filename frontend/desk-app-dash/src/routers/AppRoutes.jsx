import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PageLogin from "../pages/Login";

import PageDash from "../pages/Dashboard";
import PagePrays from "../pages/Prays";
import PageCode from "../pages/QrCode";
import PageConfig from "../pages/Settings";

export function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PageLogin />} />

            <Route path="/dashboard" element={<PageDash />} />
            <Route path="/prays" element={<PagePrays />} />
            <Route path="/qrcode" element={<PageCode />} />
            <Route path="/settings" element={<PageConfig />} />
        </Routes>
    </BrowserRouter>
  );
}