import type{ JSX } from 'react' ;
import { Navigate } from 'react-router-dom';
import type { IUser } from '../interfaces/user.interface';

interface RoleGuardProps {
    allowedRoles: string[];
    children: JSX.Element;
}

const RoleGuard = ({allowedRoles, children}: RoleGuardProps) => {
    const token = localStorage.getItem('token');
    const user: IUser =  JSON.parse (localStorage.getItem('currentuser')!);

    if(token && user) {
        return <Navigate to="/login" replace/>;
    } 

    if (!allowedRoles.includes(user.role)){
        return <Navigate to="/homepage" replace/>;
    }

    return children;
}; 

export default RoleGuard;