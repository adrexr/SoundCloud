import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSoundcloud } from "react-icons/fa6";
import { IoIosSearch, IoIosMail, IoMdNotificationsOutline } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import './components/Home/Library.css';

export default function Library() {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('Overview'); 
    const [showMessages, setShowMessages] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const viewContent = {
        Overview: <div><h2>Overview</h2><p>Aquí se mostrará un resumen de tu librería.</p></div>,
        Likes: <div><h2>Likes</h2><p>Aquí se mostrarán las canciones que te han gustado.</p></div>,
        Playlists: <div><h2>Playlists</h2><p>Aquí se mostrarán tus playlists.</p></div>,
        Albums: <div><h2>Albums</h2><p>Aquí se mostrarán los álbumes que has guardado.</p></div>,
        Stations: <div><h2>Stations</h2><p>Aquí se mostrarán tus estaciones.</p></div>,
        Following: <div><h2>Following</h2><p>Aquí se mostrarán los artistas que sigues.</p></div>,
        History: <div><h2>History</h2><p>Aquí se mostrará tu historial de reproducción.</p></div>,
    };

    const handleSignOut = async () => {
        navigate('/');
    };

    return (
        <div className="padre1">
            <div className='barra'>
                <div onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
                    <FaSoundcloud size={60} />
                </div>
                <button className='bt' onClick={() => navigate('/home')}>Home</button>
                <button className='bt' onClick={() => navigate('/feed')}>Feed</button>
                <button className='bte'>Library</button>
                <div className="search-container">
                    <IoIosSearch className="search-icon" />
                    <input
                        className='sea'
                        type="text"
                        placeholder='Buscar en tu librería...'
                    />
                </div>
                <div className="notification-container">
                    <button className='bt-icon' onClick={() => setShowNotifications(!showNotifications)}>
                        <IoMdNotificationsOutline size={24} />
                    </button>
                    {showNotifications && (
                        <div className="notification-box">
                            <p>No hay notificaciones nuevas.</p>
                        </div>
                    )} 
                </div>
                <div className="message-container">
                    <button className='bt-icon' onClick={() => setShowMessages(!showMessages)}>
                        <IoIosMail size={24} />
                    </button>
                    {showMessages && (
                        <div className="message-box">
                            <p>No hay mensajes nuevos.</p>
                        </div>
                    )}
                </div>
                <button className='bte'>Try Artist Pro</button>
                <button className='bt'>For Artist</button>
                <button className='bt' onClick={() => navigate('/upload')}>Upload</button>
                <div className="menu-container">
                    <button className='bt-icon' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <BsThreeDotsVertical size={24} />
                    </button>
                    {isMenuOpen && (
                        <div className="dropdown-menu">
                            <button onClick={() => navigate('/about')}>About</button>
                            <button onClick={() => navigate('/legal')}>Legal</button>
                            <button onClick={() => navigate('/copyright')}>Copyright</button>
                            <button onClick={() => navigate('/mobile')}>Mobile apps</button>
                            <button onClick={() => navigate('/creators')}>For creators</button>
                            <button onClick={() => navigate('/newsroom')}>Newsroom</button>
                            <button onClick={() => navigate('/jobs')}>Jobs</button>
                            <button onClick={() => navigate('/developers')}>Developers</button>
                            <button onClick={() => navigate('/store')}>SoundCloud Store</button>
                            <button onClick={() => navigate('/support')}>Support</button>
                            <button onClick={() => navigate('/shortcuts')}>Keyboard shortcuts</button>
                            <button onClick={() => navigate('/subscription')}>Subscription</button>
                            <button onClick={() => navigate('/settings')}>Settings</button>
                            <hr />
                            <button onClick={handleSignOut}>Sign out</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="library-content">
                <div className="library-nav">
                    <button onClick={() => setActiveView('Overview')} className={`library-nav-btn ${activeView === 'Overview' ? 'active' : ''}`}>Overview</button>
                    <button onClick={() => setActiveView('Likes')} className={`library-nav-btn ${activeView === 'Likes' ? 'active' : ''}`}>Likes</button>
                    <button onClick={() => setActiveView('Playlists')} className={`library-nav-btn ${activeView === 'Playlists' ? 'active' : ''}`}>Playlists</button>
                    <button onClick={() => setActiveView('Albums')} className={`library-nav-btn ${activeView === 'Albums' ? 'active' : ''}`}>Albums</button>
                    <button onClick={() => setActiveView('Stations')} className={`library-nav-btn ${activeView === 'Stations' ? 'active' : ''}`}>Stations</button>
                    <button onClick={() => setActiveView('Following')} className={`library-nav-btn ${activeView === 'Following' ? 'active' : ''}`}>Following</button>
                    <button onClick={() => setActiveView('History')} className={`library-nav-btn ${activeView === 'History' ? 'active' : ''}`}>History</button>
                </div>
                <div className="library-view">
                    {viewContent[activeView]}
                </div>
            </div>
        </div>
    );
}
