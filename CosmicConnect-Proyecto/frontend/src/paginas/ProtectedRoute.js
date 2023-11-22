// En un archivo separado, por ejemplo, ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const userType = localStorage.getItem('userType');
    if (userType !== 'admin') {
        // Si el usuario no es un administrador, redirige a la página de inicio
        return <Navigate to="/" />;
    }

    return children; // Si es un administrador, renderiza el componente hijo
};

export default ProtectedRoute;
