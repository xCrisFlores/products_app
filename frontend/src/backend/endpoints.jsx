import axios from 'axios';

// URL base de la API (configurada por defecto en el puerto 3001)
const API_URL = 'http://localhost:3001';

// Función para obtener el token de autenticación almacenado en localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Instancia de Axios configurada con la URL base y headers comunes
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token de autorización a las peticiones si está disponible
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Función para obtener todos los productos mediante una petición GET a /products
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get('/products');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para obtener un producto por su ID mediante una petición GET a /products/:id
export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para agregar un nuevo producto mediante una petición POST a /products
export const addProduct = async (product) => {
  try {
    const response = await axiosInstance.post('/products', product);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para actualizar un producto existente por su ID mediante una petición PUT a /products/:id
export const updateProduct = async (id, product) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para eliminar un producto por su ID mediante una petición DELETE a /products/:id
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
