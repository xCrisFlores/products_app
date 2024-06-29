// Importamos todas las dependencias necesarias, imágenes, hooks, y el contexto
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../ProductContext';
import deleteImage from '../assets/delete.png';
import newIcon from '../assets/add.png';
import editImage from '../assets/edit.png';
import default_product from '../assets/default_product.png';
import Slider from '@mui/material/Slider';
import filterImage from '../assets/filter_icon.png';
import Typography from '@mui/material/Typography';

// Componente principal Dashboard, que se muestra después de iniciar sesión y autenticarse
function Dashboard() {
  
  // Uso de hooks para gestionar el estado y la lógica del componente
  
  // Productos traídos desde el contexto
  const { products, deleteProduct: deleteProductContext } = useProductContext();
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar la alerta de eliminación
  const [selectedProductId, setSelectedProductId] = useState(null); // Producto seleccionado para eliminar
  const [productDeleted, setProductDeleted] = useState(false); // Estado para indicar si el producto fue eliminado
  const [filteredProducts, setFilteredProducts] = useState([...products]); // Productos filtrados
  const [priceRange, setPriceRange] = useState([0, 1500]); // Rango de precios para el filtro
  const [minPrice, setMinPrice] = useState(0); // Precio mínimo para el filtro
  const [search, setSearch] = useState(''); // Texto de búsqueda para el filtro
  const [maxPrice, setMaxPrice] = useState(1000); // Precio máximo para el filtro
  const [showSlider, setShowSlider] = useState(false); // Estado para mostrar u ocultar el slider de precios

  // Efecto para actualizar los valores de precio mínimo y máximo según el rango del slider
  useEffect(() => {
    setMinPrice(priceRange[0]);
    setMaxPrice(priceRange[1]);
  }, [priceRange]);

  // Efecto para filtrar los productos según el precio o mostrar todos si no se está filtrando
  useEffect(() => {
    if (showSlider) {
      filterProductsByPrice();
    } else {
      setFilteredProducts([...products]);
    }
  }, [minPrice, maxPrice, showSlider, products]);

  // Efecto para filtrar los productos según la búsqueda, si la búsqueda está vacía, se filtra por precio
  useEffect(() => {
    if (search.trim() === '') {
      filterProductsByPrice();
    } else {
      filterProductsBySearch();
    }
  }, [search]);

  // Función para filtrar los productos según el rango de precios
  const filterProductsByPrice = () => {
    setFilteredProducts(
      products.filter(product => product.price >= minPrice && product.price <= maxPrice)
    );
  };

  // Función para filtrar los productos según la búsqueda de texto
  const filterProductsBySearch = () => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Función para manejar el cambio de rango de precios en el slider
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // Función para mostrar u ocultar el slider de precios
  const toggleSlider = () => {
    setShowSlider(!showSlider);
  };

  // Función para eliminar productos, usa el contexto para la eliminación y maneja la alerta
  const handleDelete = async (id) => {
    try {
      await deleteProductContext(id);
      setProductDeleted(true);
      setTimeout(() => {
        setShowAlert(false);
        setProductDeleted(false);
      }, 2000);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Función para confirmar la eliminación de un producto, muestra la alerta
  const confirmDelete = (id) => {
    setSelectedProductId(id);
    setShowAlert(true);
    setProductDeleted(false);
  };

  // Renderizado del componente
  return (
    <div style={{ marginBottom: '500px' }}>
      <div className='title_div'>
        <p style={{ fontFamily: 'helvetica', fontSize: '3em' }}>Dashboard</p>
      </div>

      {/* Alerta para la eliminación de productos, se muestra según el estado showAlert y productDeleted */}
      {showAlert && (
        <div className='alert_container'>
          <p className='primary_lbl'>
            {productDeleted
              ? '¡El producto se ha eliminado correctamente!'
              : 'Estás a punto de eliminar este producto, ¿quieres continuar?'}
          </p>
          <div className='btn_div'>
            {/* Botón para confirmar la eliminación del producto */}
            {!productDeleted && (
              <button onClick={() => handleDelete(selectedProductId)} className='form_btn'>
                Eliminar producto
              </button>
            )}
            {/* Botón para cerrar la alerta */}
            <button onClick={() => setShowAlert(false)} className='form_btn'>
              Cerrar
            </button>
          </div>
        </div>
      )}
      
      {/* Contenedor del filtro de precios, se muestra si el botón de filtrar está activo */}
      {showSlider && (
        <div className='filter_container'>
          <Typography id="range-slider" gutterBottom>
            Rango de Precio
          </Typography>
          {/* Slider para ajustar el rango de precios */}
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={1500}
            step={5}
          />
          {/* Campo de texto para la búsqueda por nombre o descripción */}
          <div>
            <p className='primary_lbl'>Buscar</p>
            <input
              className='search_inp'
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      )}
      
      {/* Contenedor de tareas, mapeo de productos filtrados */}
      <div className="tasks-container">
        {filteredProducts.map(product => (
          <div key={product.id} className="task">
            <p className='task_title'>{product.title}</p>
            <p className='primary_lbl'>{product.description}</p>
            <p className='primary_lbl'>Price: ${product.price}</p>
            {/* Muestra la imagen del producto o una imagen por defecto si no existe */}
            <img 
              src={Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : default_product} 
              alt={product.title} 
              style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '50%' }} 
            />
            {/* Contenedor de botones de acción para cada producto */}
            <div className="btn_div">
              {/* Enlace para editar el producto */}
              <Link to={`/editar/${product.id}`} className="edit_btn">
                <img src={editImage} alt="Editar" />
              </Link>
              {/* Botón para eliminar el producto */}
              <button className='form_btn delete_btn' onClick={() => confirmDelete(product.id)}>
                <img src={deleteImage} alt="Eliminar" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Contenedor de botones de agregar y filtrar productos */}
      <div className='new_container'>
        <div className='buttons_wrapper'>
          {/* Contenedor del botón para agregar un nuevo producto */}
          <div className='div_btn'>
            <div className='button_container'>
              <Link to={`/alta`}>
                <img src={newIcon} alt="Agregar" className='button_icon' />
              </Link>
            </div>
            <p className='add_lbl'>Agrega un producto</p>
          </div>
          {/* Contenedor del botón para filtrar productos */}
          <div className='div_btn'>
            <button className='button_container' onClick={toggleSlider}>
              <img src={filterImage} alt="Filtrar" className='button_icon'/>
            </button>
            <p className='add_lbl'>Filtrar productos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exportamos el componente para su uso en otras partes de la aplicación
export default Dashboard;
