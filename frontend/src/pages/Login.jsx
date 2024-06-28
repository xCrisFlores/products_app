import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../ProductContext';

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const { login } = useProductContext();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user, password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.access_token);
      } else {
        setShowAlert(true);;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='body_container'>
      <div className='title_div'>
        <p style={{ fontFamily: 'helvetica', fontSize: '3em' }}>Inicio de sesión</p>
      </div>

      {showAlert && (
        <div className='alert_container'>
          <p className='primary_lbl'>EL usuario y contraseña no coinciden</p>
          <div className='btn_div'>
            <button onClick={() => setShowAlert(false)} className='form_btn'>
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div className='form_style'>
        <p className='primary_lbl'>Usuario</p>
        <input
          className='primary_inp'
          type='text'
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <p className='primary_lbl'>Contraseña</p>
        <input
          className='primary_inp'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='form_btn' onClick={handleLogin}>
          <p className='primary_lbl'>Iniciar sesión</p>
        </button>
      </div>
      <Link to='/guest' className='guest_link'>
          <p className='primary_lbl'>Ingresa como invitado</p>
      </Link>
    </div>
  );
}

export default Login;
