import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Editar from './pages/editProduct';
import Agregar from './pages/newProduct';
import Login from './pages/Login';
import { ProductProvider } from './ProductContext'; // Importa el proveedor de contexto ProductContext
import ProtectedRoute from './ProtectedRoute'; // Importa el componente de ruta protegida
import DashboardGuest from './pages/DashboardGuest';

/**
 * Componente principal de la aplicación que maneja las rutas y el contexto del producto.
 * Utiliza BrowserRouter para la navegación y ProductProvider para el contexto de productos.
 * Define rutas para Login, Dashboard, Editar, Agregar y DashboardGuest, utilizando ProtectedRoute para proteger rutas privadas.
 * 
 * @returns {JSX.Element} Componente de la aplicación principal con enrutamiento y contexto de productos.
 */
function App() {
  return (
    <BrowserRouter>
      <ProductProvider> {/* Proporciona el contexto de productos a toda la aplicación */}
        <Routes> {/* Define las rutas de la aplicación */}
          <Route path="/" element={<Login />} /> {/* Ruta para la página de inicio de sesión */}
          <Route path="/guest" element={<DashboardGuest />} /> {/* Ruta para la página de dashboard para invitados */}
          <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} /> {/* Ruta protegida para el dashboard */}
          <Route path="/editar/:productId" element={<ProtectedRoute element={Editar} />} /> {/* Ruta protegida para editar productos */}
          <Route path="/alta" element={<ProtectedRoute element={Agregar} />} /> {/* Ruta protegida para agregar nuevos productos */}
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
