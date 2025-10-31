import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSoundcloud } from "react-icons/fa6";
import { IoIosSearch, IoIosMail, IoMdNotificationsOutline } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import './UploadPage.css';

const UploadPage = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Por favor, selecciona un archivo.');
            return;
        }

        setUploading(true);
        setError('');
        setSuccess('');

        console.log('Subiendo:', { fileName: file.name });
        await new Promise(resolve => setTimeout(resolve, 2000));

        setUploading(false);
        setSuccess(`¡"${file.name}" se ha subido correctamente! Redirigiendo...`);
        
        setTimeout(() => {
            navigate('/home');
        }, 2500);
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
                <button className='bt' onClick={() => navigate('/library')}>Library</button>
                <div className="search-container">
                    <IoIosSearch className="search-icon" />
                    <input className='sea' type="text" placeholder='Buscar...' />
                </div>
                <button className='bte'>Try Artist Pro</button>
                <button className='bt'>For Artist</button>
                <button className='bte' onClick={() => navigate('/upload')}>Upload</button>
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

            <div className="upload-page-container">
                <div className="upload-form-content">
                    <h2>Sube tus archivos de audio.</h2>
                    <p>Para obtener la mejor calidad, utiliza WAV, FLAC, AIFF o ALAC. El tamaño máximo del archivo es de 4 GB sin comprimir.<a href='https://help.soundcloud.com/hc/es/articles/115003452847--Requisitos-de-subida-de-archivos'>Más información.</a>
                    </p>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <form onSubmit={handleUpload}>
                        <label className="file-label">
                            {file ? file.name : 'Seleccionar archivo de audio'}
                            <input type="file" accept="audio/*" onChange={handleFileChange} required />
                        </label>
                        <button type="submit" className="btn-upload" disabled={uploading}>
                            {uploading ? 'Subiendo...' : 'Subir canción'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadPage;