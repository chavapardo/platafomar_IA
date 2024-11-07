import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';
import ReactModal from 'react-modal';
import { BsPerson, BsEnvelope, BsLock } from 'react-icons/bs';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Por favor, introduce un correo electrónico válido.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, contraseña: password }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error en el inicio de sesión");
      }
    } catch (error) {
      setErrorMessage("Error en la solicitud de inicio de sesión.");
    }
  };

  const handleRegister = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!name || !lastName || !email || !password) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Por favor, introduce un correo electrónico válido.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: name, apellido: lastName, email, contraseña: password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        closeModal(); // Cierra la modal después de registrarse exitosamente
      } else {
        setErrorMessage(data.message || "Error en el registro.");
      }
    } catch (error) {
      setErrorMessage("Error en la solicitud de registro.");
    }
  };

  const handlePasswordReset = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!email) {
      setErrorMessage("Por favor, introduce tu correo electrónico.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Por favor, introduce un correo electrónico válido.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        closePasswordResetModal(); // Cierra la modal después de enviar el enlace
      } else {
        setErrorMessage(data.message || "Error al enviar el enlace de restablecimiento.");
      }
    } catch (error) {
      setErrorMessage("Error en la solicitud de restablecimiento de contraseña.");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  const closeModal = () => setIsModalOpen(false);
  const openPasswordResetModal = () => setIsPasswordResetModalOpen(true);
  const closePasswordResetModal = () => setIsPasswordResetModalOpen(false);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
        {successMessage && <p className="alert alert-success">{successMessage}</p>}

        <div className="form-group mb-3">
          <label htmlFor="email">Correo Electrónico</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text"><BsEnvelope /></span>
            </div>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Contraseña</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text"><BsLock /></span>
            </div>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button onClick={handleLogin} className="btn btn-primary w-100">
          Iniciar Sesión
        </button>
        <div className="text-center mt-3">
          <span>¿No tienes cuenta?{' '}
            <a href="#" onClick={openModal} className="text-primary">
              Regístrate
            </a>
          </span>
        </div>
        <div className="text-center mt-2">
          <a href="#" onClick={openPasswordResetModal} className="text-primary">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Modal de registro */}
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Registro"
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
        >
          <h2 className="text-center">Registrarse</h2>
          {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
          {successMessage && <p className="alert alert-success">{successMessage}</p>}

          {/* Formulario de registro */}
          <div className="form-group mb-3">
            <label htmlFor="registerName">Nombre</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><BsPerson /></span>
              </div>
              <input
                type="text"
                id="registerName"
                className="form-control"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="registerLastName">Apellido</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><BsPerson /></span>
              </div>
              <input
                type="text"
                id="registerLastName"
                className="form-control"
                placeholder="Apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="registerEmail">Correo Electrónico</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><BsEnvelope /></span>
              </div>
              <input
                type="email"
                id="registerEmail"
                className="form-control"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="registerPassword">Contraseña</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><BsLock /></span>
              </div>
              <input
                type="password"
                id="registerPassword"
                className="form-control"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
  
            <button onClick={handleRegister} className="btn btn-primary w-100">
              Registrarse
            </button>
            <button onClick={closeModal} className="btn btn-secondary w-100 mt-2">
              Cerrar
            </button>
          </ReactModal>
  
          {/* Modal para restablecer contraseña */}
          <ReactModal
            isOpen={isPasswordResetModalOpen}
            onRequestClose={closePasswordResetModal}
            contentLabel="Restablecer Contraseña"
            className="Modal"
            overlayClassName="Overlay"
            ariaHideApp={false}
          >
            <h2 className="text-center">Restablecer Contraseña</h2>
            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            {successMessage && <p className="alert alert-success">{successMessage}</p>}
  
            <div className="form-group mb-3">
              <label htmlFor="resetEmail">Correo Electrónico</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><BsEnvelope /></span>
                </div>
                <input
                  type="email"
                  id="resetEmail"
                  className="form-control"
                  placeholder="Introduce tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
  
            <button onClick={handlePasswordReset} className="btn btn-primary w-100">
              Enviar Enlace de Restablecimiento
            </button>
            <button onClick={closePasswordResetModal} className="btn btn-secondary w-100 mt-2">
              Cerrar
            </button>
          </ReactModal>
        </div>
      </div>
    );
  };
  
  export default LoginPage;