import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import ReactModal from 'react-modal';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Inicializar el SDK de Facebook
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : 'YOUR_APP_ID', // Reemplaza 'YOUR_APP_ID' con tu ID de aplicación de Facebook
        cookie     : true,
        xfbml      : true,
        version    : 'v10.0'
      });
    };
  }, []);

  const handleLogin = () => {
    // Lógica de inicio de sesión
    console.log('Iniciar sesión', { name, email, password });
  };

  const handleFacebookLogin = () => {
    window.FB.login(function(response) {
      if (response.authResponse) {
        console.log('Bienvenido!  Fetching your information.... ');
        window.FB.api('/me', function(response) {
          console.log('Good to see you, ' + response.name + '.');
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRegister = () => {
    // Lógica de registro
    console.log('Registrarse', { name, email, password });
    closeModal();
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h2>Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button
          onClick={handleLogin}
          className="button"
        >
          Iniciar Sesión
        </button>
        <button
          onClick={handleFacebookLogin}
          className="button"
          style={{ backgroundColor: '#3b5998', color: 'white' }}
        >
          Iniciar sesión con Facebook
        </button>
        <span>
          ¿No tienes cuenta?{' '}
          <a href="#" onClick={openModal} className="link">
            Regístrate
          </a>
        </span>
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Registro"
          className="Modal"
          overlayClassName="Overlay"
        >
          <h2>Registrarse</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />

          <input
            type="text"
            placeholder="Apellido"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <button

            onClick={handleRegister}
            className="button_modal"
          >
            Registrarse
          </button>
          <button
            onClick={closeModal}
            className="button_modal"
            style={{ backgroundColor: '#dc3545', color: 'white' }}
          >
            Cancelar
          </button>
        </ReactModal>
      </div>
    </div>
  );
};

export default LoginPage;