import type { JSX } from "react";
import { Navigate } from "react-router-dom";


interface authGuardProps {
    children: JSX.Element;
}

const AuthGuard =({ children }: authGuardProps) => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('currentUser');

    if (token && user) {
        return children;
    } else {
        return <Navigate to="/login" replace />;
    }
};

export default AuthGuard;