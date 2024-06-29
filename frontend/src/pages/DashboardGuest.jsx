import React, { useState, useEffect } from 'react';
import { useProductContext } from '../ProductContext'; // Contexto de productos
import Slider from '@mui/material/Slider';
import filterImage from '../assets/filter_icon.png'; // Icono para filtrar
import Typography from '@mui/material/Typography';

// Dashboard para usuarios no autenticados, permite visualizar y filtrar productos
function DashboardGuest() {
  const { products } = useProductContext(); // Obtenemos productos del contexto
  const [filteredProducts, setFilteredProducts] = useState([...products]); // Productos filtrados
  const [priceRange, setPriceRange] = useState([0, 1500]); // Rango de precios
  const [search, setSearch] = useState(''); // Texto de búsqueda
  const [showSlider, setShowSlider] = useState(false); // Mostrar u ocultar el slider

  // Actualiza los límites de precio al cambiar el rango de precios
  useEffect(() => {
    setFilteredProducts(
      products.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1])
    );
  }, [priceRange, products]);

  // Filtra los productos por búsqueda de texto
  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  // Maneja el cambio de rango de precios en el slider
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // Alterna la visibilidad del slider de precios
  const toggleSlider = () => {
    setShowSlider(!showSlider);
  };

  return (
    <div style={{ marginBottom: '500px' }}>
      <div className='title_div'>
        {/* Título del Dashboard */}
        <p style={{ fontFamily: 'helvetica', fontSize: '3em' }}>Dashboard</p>
      </div>

      {/* Sección de filtros, se muestra si el slider está activo */}
      {showSlider && (
        <div className='filter_container'>
          <Typography id="range-slider" gutterBottom>
            Rango de Precio
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={1500}
            step={5}
          />
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

      {/* Lista de productos filtrados */}
      <div className="tasks-container">
        {filteredProducts.map(product => (
          <div key={product.id} className="task">
            <p className='task_title'>{product.title}</p>
            <p className='primary_lbl'>{product.description}</p>
            <p className='primary_lbl'>Price: ${product.price}</p>
            <img
              src={Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : 'default_image.png'}
              alt={product.title}
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
          </div>
        ))}
      </div>

      {/* Botón para mostrar u ocultar los filtros */}
      <div className='new_container'>
        <div className='buttons_wrapper'>
          <button className='button_container' onClick={toggleSlider}>
            <img src={filterImage} alt="filtrar" className='button_icon' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardGuest;
