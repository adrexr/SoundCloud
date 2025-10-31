import React, { useState, useEffect } from 'react';
import './Hero.css';
import { useNavigate } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { supabase } from '../../supabaseClient';

function Hero({ openModal }) {
  
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
     
      setCurrentSlide(prevSlide => (prevSlide + 1) % 3);
    }, 5000); 
    return () => clearInterval(timer); 
  }, []); 


  const images = [
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVzaWN8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bXVzaWN8ZW58MHx8MHx8fDA%3D'
  ];

  return (
    <div className="welcome-container" style={{ backgroundImage: `url(${images[currentSlide]})` }}>
      <div className="navbar">
        <div className="logo">SOUNDCLOUD</div>
        <div className="nav-links">
          <button className="btn login" onClick={() => openModal()}>Inicia sesión</button>
          <button className="btn signup" onClick={() => openModal()}>Crea tu cuenta</button>
        </div>
      </div>

      <div className="hero-content">
        <h1>Conecta en SoundCloud</h1>
        <p>Descubre, escucha y comparte música de artistas emergentes y consolidados de todo el mundo.</p>
      </div>

      <div className="slider-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>

      <div className="background-overlay"></div>
    </div>
  );
}

export default Hero;
