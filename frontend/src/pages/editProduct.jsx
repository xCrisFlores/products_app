import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductContext } from '../ProductContext'; // Contexto de productos
import '../styles/styles.css'; // Estilos CSS

// Componente para editar un producto existente
const Editar = () => {
  const { productId } = useParams(); // Obtiene el ID del producto de los parámetros de la URL
  const navigate = useNavigate(); // Hook de navegación para redirigir a otra página
  const { editProduct, getProduct } = useProductContext(); // Funciones del contexto de productos
  const [title, setTitle] = useState(""); // Estado para el título del producto
  const [description, setDescription] = useState(""); // Estado para la descripción del producto
  const [price, setPrice] = useState(""); // Estado para el precio del producto
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar la alerta de edición exitosa

  // Efecto para cargar los datos del producto al montar el componente
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Llama a la función del contexto para obtener los datos del producto
        const data = await getProduct(productId);
        setTitle(data.title); // Actualiza el estado del título con el valor del producto
        setDescription(data.description); // Actualiza el estado de la descripción con el valor del producto
        setPrice(data.price); // Actualiza el estado del precio con el valor del producto
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct(); // Llama a la función para obtener los datos del producto al cargar el componente
  }, [getProduct, productId]);

  // Función para guardar los cambios editados del producto
  const handleSaveChanges = async () => {
    const updatedProduct = { id: productId, title, description, price }; // Objeto con los datos actualizados del producto

    try {
      // Llama a la función del contexto para editar el producto
      const success = await editProduct(productId, updatedProduct);
      if (success) {
        setShowAlert(true); // Muestra la alerta de edición exitosa si la operación tiene éxito
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
        <p style={{ fontFamily: 'helvetica', fontSize: '3em' }}>{title}</p>
      </div>

      {/* Alerta para mostrar cuando se edita correctamente el producto */}
      {showAlert && (
        <div className='alert_container'>
          <p className='primary_lbl'>El producto se ha editado correctamente</p>
          <div className='btn_div'>
            <button onClick={() => { setShowAlert(false); navigate('/dashboard'); }} className='form_btn'>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Formulario para editar los detalles del producto */}
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
        <button className='form_btn' onClick={handleSaveChanges}>
          <p className='primary_lbl'>Guardar cambios</p>
        </button>
      </div>
    </div>
  );
}

export default Editar;
