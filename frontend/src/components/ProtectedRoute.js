import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { user } = useAuth();
    
    if (!user) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
