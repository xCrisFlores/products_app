import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Editar from './pages/editProduct';
import Agregar from './pages/newProduct';
import Login from './pages/Login';
import { ProductProvider } from './ProductContext';
import ProtectedRoute from './ProtectedRoute';
import DashboardGuest from './pages/DashboardGuest';

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/guest" element={<DashboardGuest />} />
          <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
          <Route path="/editar/:productId" element={<ProtectedRoute element={Editar} />} />
          <Route path="/alta" element={<ProtectedRoute element={Agregar} />} />
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
