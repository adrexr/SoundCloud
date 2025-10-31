import React, { useState } from 'react';
import './UploadModal.css';

const UploadModal = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file || !title || !artist) {
            setError('Por favor, completa todos los campos y selecciona un archivo.');
            return;
        }

        setUploading(true);
        setError('');
        setSuccess('');

        console.log('Subiendo:', { title, artist, fileName: file.name });
        await new Promise(resolve => setTimeout(resolve, 2000)); 

        setUploading(false);
        setSuccess(`¡"${title}" se ha subido correctamente!`);
        setTimeout(() => {
            onClose();
        }, 2500);
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content upload-modal" onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={onClose} className="close-btn">&times;</button>
                <h2>Sube tu música</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <form onSubmit={handleUpload}>
                    <input type="text" placeholder="Título de la canción" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <input type="text" placeholder="Artista" value={artist} onChange={(e) => setArtist(e.target.value)} required />
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
    );
};

export default UploadModal;