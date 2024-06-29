import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../ProductContext'; // Contexto de productos
import '../styles/styles.css'; // Estilos CSS

// Componente para agregar un nuevo producto
const Agregar = () => {
  const navigate = useNavigate(); // Hook de navegación para redirigir a otra página
  const { newProduct } = useProductContext(); // Función del contexto para agregar un nuevo producto
  const [title, setTitle] = useState(""); // Estado para el título del nuevo producto
  const [description, setDescription] = useState(""); // Estado para la descripción del nuevo producto
  const [price, setPrice] = useState(""); // Estado para el precio del nuevo producto
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar la alerta de agregado exitoso

  // Función para agregar un nuevo producto
  const handleAddProduct = async () => {
    const product = { title, description, price }; // Objeto con los datos del nuevo producto

    try {
      // Llama a la función del contexto para agregar el nuevo producto
      const success = await newProduct(product);
      if (success) {
        setShowAlert(true); // Muestra la alerta de agregado exitoso si la operación tiene éxito
      } else {
        // Manejar el caso de error si es necesario
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='body_container'>
       <div className='title_div'>
        <p style={{ fontFamily: 'helvetica', fontSize: '3em' }}>Nuevo producto</p>
      </div>

      {/* Alerta para mostrar cuando se agrega correctamente el producto */}
      {showAlert && (
        <div className='alert_container'>
          <p className='primary_lbl'>El producto se ha agregado correctamente</p>
          <div className='btn_div'>
            <button onClick={() => { setShowAlert(false); navigate('/dashboard'); }} className='form_btn'>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Formulario para agregar los detalles del nuevo producto */}
      <div className='form_style'>
        <p className='primary_lbl'>Título</p>
        <input
          className='primary_inp'
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className='primary_lbl'>Descripción</p>
        <textarea
          className='area_inp'
          type="text" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <p className='primary_lbl'>Precio</p>
        <input
          className='primary_inp'
          type="number" 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className='form_btn' onClick={handleAddProduct}>
          <p className='primary_lbl'>Guardar cambios</p>
        </button>
      </div>
    </div>
  );
}

export default Agregar;
