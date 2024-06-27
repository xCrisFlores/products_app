import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../ProductContext';
import deleteImage from '../assets/delete.png';
import newIcon from '../assets/add.png';
import editImage from '../assets/edit.png';
import '../styles/styles.css';

function Dashboard() {
  const { products, deleteProduct: deleteProductContext } = useProductContext();
  const [showAlert, setShowAlert] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productDeleted, setProductDeleted] = useState(false); 

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

  const confirmDelete = (id) => {
    setSelectedProductId(id);
    setShowAlert(true);
    setProductDeleted(false); 
  };

  return (
    <div style={{ marginBottom: '500px' }}>
      <div className='title_div'>
        <p style={{ fontFamily: 'helvetica', fontSize: '3em' }}>Dashboard</p>
      </div>

      {showAlert && (
        <div className='alert_container'>
          <p className='primary_lbl'>
            {productDeleted
              ? '¡El producto se ha eliminado correctamente!'
              : 'Estás a punto de eliminar este producto, ¿quieres continuar?'}
          </p>
          <div className='btn_div'>
            {!productDeleted && (
              <button onClick={() => handleDelete(selectedProductId)} className='form_btn'>
                Eliminar producto
              </button>
            )}
            <button onClick={() => setShowAlert(false)} className='form_btn'>
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div className="tasks-container">
        {products.map(product => (
          <div key={product.id} className="task">
            <p className='task_title'>{product.title}</p>
            <p className='primary_lbl'>{product.description}</p>
            <p className='primary_lbl'>Price: ${product.price}</p>
            <div className="btn_div">
              <Link to={`/editar/${product.id}`} className="edit_btn">
                <img src={editImage} alt="Editar" />
              </Link>
              <button className="delete_btn" onClick={() => confirmDelete(product.id)}>
                <img src={deleteImage} alt="Eliminar" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className='new_container'>
        <p className='add_lbl'>Agrega un nuevo producto</p>
        <div className='add_container'>
          <Link to={`/alta`}>
            <img src={newIcon} alt="alta" className='add_btn' />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
