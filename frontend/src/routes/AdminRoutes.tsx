import { Navigate } from 'react-router-dom';
import { useApplicationContext } from '../contexts/ApplicationContextProvider.tsx';
import type {JSX} from "react";

export default function AdminRoute({ children }: { children: JSX.Element }) {
    const { user } = useApplicationContext();
    if (!user) return <Navigate to="/login" />;
    // if (!user.role || user.role !== 'ADMIN' ) return <Navigate to="/" />;
    return children;
}