import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import PageLogin from "../pages/Login";

import PageDash from "../pages/Dashboard";
import PagePrays from "../pages/Prays";
import PageCode from "../pages/QrCode";
import PageConfig from "../pages/Settings";

export function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* LOGIN */}
                <Route
                    path="/"
                    element={<PageLogin />}
                />

                {/* DASHBOARD */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <PageDash />
                        </PrivateRoute>
                    }
                />

                {/* PRAYS */}
                <Route
                    path="/prays"
                    element={
                        <PrivateRoute>
                            <PagePrays />
                        </PrivateRoute>
                    }
                />

                {/* QR CODE */}
                <Route
                    path="/qrcode"
                    element={
                        <PrivateRoute>
                            <PageCode />
                        </PrivateRoute>
                    }
                />

                {/* SETTINGS */}
                <Route
                    path="/settings"
                    element={
                        <PrivateRoute>
                            <PageConfig />
                        </PrivateRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}