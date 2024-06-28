import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct as deleteProductApi, updateProduct, addProduct } from './backend/endpoints';

export const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [index, setIndex] = useState(164);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }

    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.products);
        setProductsLoaded(true);
      } catch (error) {
        console.error(error);
        setProductsLoaded(false);
      }
    };

    if (!productsLoaded) {
      fetchProducts();
    }
  }, [productsLoaded]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    console.log(token);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  const deleteProduct = async (id) => {
    try {
      const deletedProduct = await deleteProductApi(id);
      if (deletedProduct.isDeleted || !deletedProduct) {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      } else {
        const idProduct = Number(id);
        const productToDelete = products.find(p => p.id === idProduct);

        if (productToDelete) {
          setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editProduct = async (id, updatedProduct) => {
    try {
      const response = await updateProduct(id, updatedProduct);
      const responseId = Number(response.id);
      const productId = Number(id);

      if (response && responseId === productId) {
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
        return true;
      } else {
        console.warn(`No se encontró un producto con el ID ${productId} en la respuesta.`);
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  };

  const newProduct = async (product) => {
    try {
      const response = await addProduct(product);
      setIndex(prevIndex => prevIndex - 1);
      const idResponse = Number(response.id);
      const newId = idResponse - index;
      const newProductData = {
        id: newId,
        title: response.title,
        description: response.description,
        price: response.price
      };
      setProducts(prevProducts => [...prevProducts, newProductData]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const getProduct = (id) => {
    try {
      const idProduct = Number(id);
      const product = products.find(p => p.id === idProduct);
      return product;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, deleteProduct, editProduct, getProduct, newProduct, token, login, logout }}>
      {children}
    </ProductContext.Provider>
  );
};
