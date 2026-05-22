import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {

    const token = localStorage.getItem("token");

    // sem token
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // autorizado
    return children;
}

export default PrivateRoute;