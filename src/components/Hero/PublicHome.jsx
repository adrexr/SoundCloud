import React, { useState, useEffect, useRef } from 'react';
import '../Home/Home.css'; // Reutilizamos los estilos de Home
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosSearch, IoIosArrowForward, IoIosArrowBack, IoIosPlay } from "react-icons/io";
import LoginModal from '../Hero/LoginModal'; // Importamos el modal

function SongCard({ song, onSelect }) {
    return (
        <div className="song-card" onClick={() => onSelect(song)}>
            <div className="song-artwork-container">
                <img src={song.artwork['150x150']} alt={song.title} />
                <button className="play-button"><IoIosPlay size={50} /></button>
            </div>
            <p className="song-title">{song.title}</p>
            <p className="song-artist">{song.user.name}</p>
        </div>
    );
}

const SongRow = ({ songs, title }) => {
    const scrollRef = useRef(null);

    const scroll = (scrollOffset) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += scrollOffset;
        }
    };

    return (
        <div className="song-row-wrapper">
            <button className="scroll-arrow left" onClick={() => scroll(-300)}><IoIosArrowBack size={24} /></button>
            <div className="song-row-content" ref={scrollRef}>
                {songs.map(song => (
                    <SongCard key={song.id} song={song} onSelect={() => {}} />
                ))}
            </div>
            <button className="scroll-arrow" onClick={() => scroll(300)}><IoIosArrowForward size={24} /></button>
        </div>
    );
};

export default function PublicHome() {
    const [songs, setSongs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('trending');
    const navigate = useNavigate();
    const location = useLocation();

    const [isModalOpen, setIsModalOpen] = useState(location.state?.openModal || false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (location.state?.openModal) {
            setIsModalOpen(true);
        }
    }, [location.state]);

    const fetchSongs = async (query) => {
        try {
            const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=20`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();

            if (data.results && Array.isArray(data.results)) {
                const formattedSongs = data.results.map(song => ({
                    id: song.trackId,
                    title: song.trackName,
                    user: { name: song.artistName },
                    artwork: { '150x150': song.artworkUrl100 },
                    previewUrl: song.previewUrl
                }));
                setSongs(formattedSongs);
            } else {
                setSongs([]);
            }
        } catch (error) {
            console.error("Error al buscar canciones en iTunes:", error);
            setSongs([]);
        }
    };

    useEffect(() => {
        fetchSongs(searchTerm);
    }, [searchTerm]);

    const handleLoginSubmit = (credenciales) => {
        console.log('Login Submit:', credenciales);
        navigate('/home'); 
    };

    return (
        <div className="padre1">
            <div className='barra public-navbar'>
                <div className="logo-public">SOUNDCLOUD</div>
                <div className="search-container-public">
                    <IoIosSearch className="search-icon" />
                    <input
                        className='sea'
                        type="text"
                        placeholder='Buscar artistas, canciones...'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="nav-links-public">
                    <button className="btn login" onClick={openModal}>
                        Iniciar sesión
                    </button>
                    <button className="btn signup" onClick={openModal}>
                        Crear cuenta
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <LoginModal
                    onClose={closeModal}
                    onSubmit={handleLoginSubmit}
                />
            )}

            <div className='titleaa'>
                <h1>Canciones del momento</h1>
            </div>
            <div className="home-main-content">
                <div className="song-rows-container">
                    <SongRow songs={songs.slice(0, 10)} />
                    <div>
                        <h1 className='titlea'>Nuevos lanzamientos</h1>
                    </div>
                    <SongRow songs={songs.slice(10, 20)} />
                </div>
            </div>
        </div>
    );
}