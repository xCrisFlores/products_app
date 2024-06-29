import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ProductContext } from './ProductContext';

/**
 * Componente de ruta protegida que verifica la existencia del token de autenticación.
 * Si el token está presente, renderiza el componente proporcionado.
 * Si no hay token, redirige al usuario a la página de inicio.
 * 
 * @param {object} props - Propiedades del componente.
 * @param {React.ComponentType} props.element - Componente que se renderizará si el usuario está autenticado.
 * @returns {JSX.Element} Renderiza el componente si el usuario está autenticado, o redirige a la página de inicio.
 */
const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { token } = useContext(ProductContext); // Obtiene el token de autenticación del contexto

  // Verifica si hay un token presente. Si sí, renderiza el componente. Si no, redirige al inicio.
  return token ? <Component {...rest} /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
