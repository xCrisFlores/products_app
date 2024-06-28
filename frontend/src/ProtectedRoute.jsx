import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ProductContext } from './ProductContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { token } = useContext(ProductContext);

  return token ? <Component {...rest} /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
