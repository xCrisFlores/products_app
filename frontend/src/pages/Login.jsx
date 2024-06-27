import React, { useState } from 'react';

function Login() {
 
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = async () => {
   
  };

  return (
    <div className='body_container'>
       <div className='title_div'>
        <p style={{ fontFamily: 'helvetica', fontSize: '3em' }}>Inicio de sesion</p>
      </div>

      {showAlert && (
        <div className='alert_container'>
          <p className='primary_lbl'>Credenciales invalidas</p>
          <div className='btn_div'>
            <button onClick={() => {setShowAlert(false)}} className='form_btn'>
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div className='form_style'>
        <p className='primary_lbl'>Usuario</p>
        <input
          className='primary_inp'
          type="text" 
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <p className='primary_lbl'>Contraseña</p>
        <input
          className='primary_inp'
          type="text" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='form_btn' onClick={handleLogin()}>
          <p className='primary_lbl'>Iniciar sesion</p>
        </button>
      </div>
    </div>
  );
}

export default Login;
