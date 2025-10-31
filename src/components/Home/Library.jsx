import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSoundcloud } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import './Library.css';

export default function Library() {
    const navigate = useNavigate();

    return (
        <div className="padre1">
            <div className='barra'>
                <FaSoundcloud size={60} />
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
                <button className='bte'>Try Artist Pro</button>
                <button className='bt'>For Artist</button>
                <button className='bt'>Upload</button>
            </div>

            <div className="library-content">
                <div className="library-nav">
                    <button className="library-nav-btn active">Overview</button>
                    <button className="library-nav-btn">Likes</button>
                    <button className="library-nav-btn">Playlists</button>
                    <button className="library-nav-btn">Albums</button>
                    <button className="library-nav-btn">Stations</button>
                    <button className="library-nav-btn">Following</button>
                    <button className="library-nav-btn">History</button>
                </div>
                <div className="library-view">
                    <h2>Overview</h2>
                    <p>Aquí se mostrará un resumen de tu librería.</p>
                </div>
            </div>
        </div>
    );
}
