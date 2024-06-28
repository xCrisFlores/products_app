import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../ProductContext';
import '../styles/styles.css'; 

const Agregar = () => {
  const navigate = useNavigate();
  const { newProduct } = useProductContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleAddProduct = async () => {
    const product = { title, description, price };

    try {
      const success = await newProduct(product);
      if (success) {
        setShowAlert(true);
      } else {
       
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

      {showAlert && (
        <div className='alert_container'>
          <p className='primary_lbl'>El producto se ha agregado correctamente</p>
          <div className='btn_div'>
            <button onClick={() => {setShowAlert(false);  navigate('/');}} className='form_btn'>
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div className='form_style'>
        <p className='primary_lbl'>Titulo</p>
        <input
          className='primary_inp'
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className='primary_lbl'>Descripcion</p>
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
