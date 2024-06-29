import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct as deleteProductApi, updateProduct, addProduct } from './backend/endpoints';

// Creamos el contexto ProductContext
export const ProductContext = createContext();

// Hook personalizado para consumir el contexto
export const useProductContext = () => {
  return useContext(ProductContext);
};

// Proveedor de contexto que encapsula el estado y las funciones relacionadas con productos y autenticación
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // Estado para almacenar la lista de productos
  const [productsLoaded, setProductsLoaded] = useState(false); // Estado para indicar si los productos han sido cargados
  const [index, setIndex] = useState(164); // Índice utilizado para generar identificadores únicos para nuevos productos
  //Se inicializa en 164 por la resta de 195(total de productos de la api) - 30(productos cargados por defecto) -1
  const [token, setToken] = useState(null); // Estado para almacenar el token de autenticación
  const navigate = useNavigate(); // Hook de navegación para redireccionar a otras rutas

  // Efecto para cargar los productos desde el backend al inicio
  useEffect(() => {
    const storedToken = localStorage.getItem('token'); // Obtener el token almacenado en localStorage
    if (storedToken) {
      setToken(storedToken); // Establecer el token si existe en el estado
    }

    // Función asincrónica para obtener productos desde el backend
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); // Llamar a la función del backend para obtener productos
        setProducts(data.products); // Actualizar el estado con la lista de productos
        setProductsLoaded(true); // Marcar que los productos han sido cargados correctamente
      } catch (error) {
        console.error(error);
        setProductsLoaded(false); // Marcar que hubo un error al cargar los productos
      }
    };

    // Si los productos no han sido cargados, llamar a fetchProducts para cargarlos
    if (!productsLoaded) {
      fetchProducts();
    }
  }, [productsLoaded]); // Dependencia para volver a cargar productos si productsLoaded cambia

  // Función para iniciar sesión
  const login = (token) => {
    localStorage.setItem('token', token); // Guardar el token en localStorage
    setToken(token); // Establecer el token en el estado
    navigate('/dashboard'); // Redireccionar al dashboard después de iniciar sesión
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('token'); // Eliminar el token de localStorage al cerrar sesión
    setToken(null); // Establecer el token como null en el estado
    navigate('/'); // Redireccionar a la página de inicio después de cerrar sesión
  };

  // Función asincrónica para eliminar un producto por su ID
  const deleteProduct = async (id) => {
    try {
      const deletedProduct = await deleteProductApi(id); // Llamar a la función del backend para eliminar el producto
      if (deletedProduct.isDeleted || !deletedProduct) {
        // Si se elimina correctamente o no hay producto eliminado, actualizar la lista de productos
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      } else {
        // Si hay algún error específico, manejarlo según sea necesario
        const idProduct = Number(id);
        const productToDelete = products.find(p => p.id === idProduct);

        if (productToDelete) {
          setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
        }
      }
    } catch (error) {
      console.error(error); // Manejar errores si hay problemas con la eliminación del producto
    }
  };

  // Función asincrónica para editar un producto por su ID con los datos actualizados
  const editProduct = async (id, updatedProduct) => {
    try {
      const response = await updateProduct(id, updatedProduct); // Llamar a la función del backend para actualizar el producto
      const responseId = Number(response.id);
      const productId = Number(id);

      if (response && responseId === productId) {
        // Si la respuesta es válida y el ID coincide, actualizar la lista de productos con los datos actualizados
        setProducts(prevProducts => {
          const updatedProducts = prevProducts.map(p =>
            p.id === productId ? {
              ...p,
              title: response.title,
              description: response.description,
              price: response.price
            } : p
          );
          return updatedProducts;
        });
        return true; // Devolver true si la edición fue exitosa
      } else {
        console.warn(`No se encontró un producto con el ID ${productId} en la respuesta.`);
      }
    } catch (error) {
      console.error(error); // Manejar errores si hay problemas con la edición del producto
    }
    return false; // Devolver false si la edición no fue exitosa
  };

  // Función asincrónica para agregar un nuevo producto con los datos proporcionados
  const newProduct = async (product) => {
    try {
      const response = await addProduct(product); // Llamar a la función del backend para agregar un nuevo producto
      setIndex(prevIndex => prevIndex - 1); // Actualizar el índice para el siguiente producto nuevo
      const idResponse = Number(response.id);
      const newId = idResponse - index; // Calcular un nuevo ID único para el producto nuevo
      const newProductData = {
        id: newId,
        title: response.title,
        description: response.description,
        price: response.price
      };
      setProducts(prevProducts => [...prevProducts, newProductData]); // Agregar el nuevo producto a la lista de productos
      return true; // Devolver true si la adición del producto fue exitosa
    } catch (error) {
      console.error(error); // Manejar errores si hay problemas con la adición del producto
      return false; // Devolver false si la adición del producto no fue exitosa
    }
  };

  // Función para obtener un producto específico por su ID desde la lista de productos
  const getProduct = (id) => {
    try {
      const idProduct = Number(id);
      const product = products.find(p => p.id === idProduct); // Encontrar el producto por su ID en la lista de productos
      return product; // Devolver el producto encontrado
    } catch (error) {
      console.error(error); // Manejar errores si hay problemas con la obtención del producto
    }
  };

  // Proveedor de contexto que proporciona el estado y las funciones definidas para el contexto ProductContext
  return (
    <ProductContext.Provider value={{ products, deleteProduct, editProduct, getProduct, newProduct, token, login, logout }}>
      {children} {/* Renderizar los componentes hijos dentro del proveedor de contexto */}
    </ProductContext.Provider>
  );
};
