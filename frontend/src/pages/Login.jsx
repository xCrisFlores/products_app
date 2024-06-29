import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../ProductContext'; // Contexto de productos

// Componente de inicio de sesión, permite acceder al dashboard autenticado o invitado
const Login = () => {
  const [user, setUser] = useState(''); // Estado para el nombre de usuario
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar alerta
  const { login } = useProductContext(); // Función de inicio de sesión del contexto

  // Maneja el proceso de inicio de sesión
  const handleLogin = async () => {
    try {
      // Petición al endpoint del backend para autenticarse con JWT
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Envía el nombre de usuario y la contraseña en el cuerpo de la petición
        body: JSON.stringify({ username: user, password: password }),
      });

      if (response.ok) {
        // Si la respuesta es exitosa, obtiene el token de acceso del backend
        const data = await response.json();
        login(data.access_token); // Llama a la función login con el token de acceso
      } else {
        setShowAlert(true); // Muestra alerta en caso de error
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='body_container'>
      <div className='title_div'>
        {/* Título de la pantalla de inicio de sesión */}
        <p style={{ fontFamily: 'helvetica', fontSize: '3em' }}>Inicio de sesión</p>
      </div>

      {/* Alerta para credenciales incorrectas */}
      {showAlert && (
        <div className='alert_container'>
          <p className='primary_lbl'>El usuario y contraseña no coinciden</p>
          <div className='btn_div'>
            <button onClick={() => setShowAlert(false)} className='form_btn'>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Formulario de inicio de sesión */}
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

      {/* Enlace para acceder como invitado */}
      <Link to='/guest' className='guest_link'>
        <p className='primary_lbl'>Ingresa como invitado</p>
      </Link>
    </div>
  );
}

export default Login;
