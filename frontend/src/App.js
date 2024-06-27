import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ProductProvider } from "./ProductContext";
import Editar from "./pages/editProduct";
import Agregar from "./pages/newProduct";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          {/*<Route path="/" element={<Login />} />*/}
          <Route path="/" element={<Dashboard />} />
          <Route path="/editar/:productId" element={<Editar />} />
          <Route path="/alta" element={<Agregar />} />
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
