import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductContext } from '../ProductContext';
import '../styles/styles.css'; 

const Editar = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { editProduct, getProduct } = useProductContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(productId);
        const data = await getProduct(productId);
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, []);

  const handleSaveChanges = async () => {
    const updatedProduct = { id: productId, title, description, price };

    try {
      const success = await editProduct(productId, updatedProduct);
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
        <p style={{ fontFamily: 'helvetica', fontSize: '3em' }}>{title}</p>
      </div>

      {showAlert && (
        <div className='alert_container'>
          <p className='primary_lbl'>El producto se ha ediatdo correctamente</p>
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
        <button className='form_btn' onClick={handleSaveChanges}>
          <p className='primary_lbl'>Guardar cambios</p>
        </button>
      </div>
    </div>
  );
}

export default Editar;
