import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { SiteContext } from "../context/SiteContext";

const RequireAuth = () => {

    const { state , dispatch } = useContext(SiteContext);
    const location = useLocation();

    const login = state.login;

    return (
        
        login?.email
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;