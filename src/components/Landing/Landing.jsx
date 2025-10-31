import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../Hero/Hero';
import Busqueda from '../Busqueda/Busqueda';
import "./landing.css";
import Canciones from '../Canciones1/canciones';
import Cuadros from '../Cuadros/Cuadros';
import LoginModal from '../Hero/LoginModal'; 

export default function LandingPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (location.state?.openModal) {
            openModal();
        }
    }, [location.state]);

    return (
        <div className='page'>
            <Hero openModal={openModal} />
            <Busqueda />
            <p className='letras'>Escucha la música del momento gratis en la comunidad SoundCloud</p>
            <Canciones/>
            <Cuadros openModal={openModal} />
            {isModalOpen && <LoginModal onClose={closeModal} />}
        </div>

    )
}