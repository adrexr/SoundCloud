import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { supabase } from '../../supabaseClient';
import './Hero.css';

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        navigate('/home');
      }
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSignup}>
          <button type="button" onClick={onClose} className="close-btn">&times;</button>
          <h1>Inicia sesión o crea una cuenta</h1>
          {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}<p>Al hacer clic en cualquiera de los botones “Continuar” a <br /> continuación, aceptas los Términos de Uso de SoundCloud <br /> y reconoces nuestra Política de privacidad.</p>
          <button type="button" className='btn-facebook'><FaFacebook size={17} />Continuar con Facebook</button>
          <button type="button" onClick={async () => {
            const { data, error } = await supabase.auth.signInWithOAuth({
              provider: 'google',
              options: {
                redirectTo: window.location.origin + '/home',
              },
            });
            if (error) console.error(error.message);
          }} className='btn-google'><FcGoogle size={17} />Continuar con Google</button>
          <button type="button" className='btn-apple'><FaApple size={17} />Continuar con Apple</button>
          <p>O por correo electrónico</p>
          <input
            className='input-email'
            type="email"
            placeholder="Tu dirección de email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className='input-email'
            type="password"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className='btn-continue'>Continuar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;