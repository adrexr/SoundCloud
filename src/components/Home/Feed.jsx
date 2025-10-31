import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSoundcloud } from "react-icons/fa6";
import { IoMdNotificationsOutline, IoIosMail } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { RiFindReplaceLine } from 'react-icons/ri';
import { PiDiscoBallFill } from 'react-icons/pi';
import { LuAlignHorizontalDistributeCenter } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import './Feed.css';

const genres = ['rock', 'pop', 'electronic', 'hip-hop', 'jazz', 'classical', 'reggae', 'alternative'];

function getRandomGenre(current) {
    let newGenre = current;
    while (newGenre === current) {
        newGenre = genres[Math.floor(Math.random() * genres.length)];
    }
    return newGenre;
}

export default function Feed() {
    const [artists, setArtists] = useState([]);
    const [searchTerm, setSearchTerm] = useState('alternative');
    const [followedArtists, setFollowedArtists] = useState(new Set());
    const [showMessages, setShowMessages] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [sideArtists, setSideArtists] = useState([]);
    const [sideArtistsGenre, setSideArtistsGenre] = useState('pop');
    const navigate = useNavigate();

    const handleFollowToggle = (artistId) => {
        setFollowedArtists(prevFollowed => {
            const newFollowed = new Set(prevFollowed);
            if (newFollowed.has(artistId)) {
                newFollowed.delete(artistId);
            } else {
                newFollowed.add(artistId);
            }
            return newFollowed;
        });
    };

    const handleRefresh = () => {
        setSearchTerm(getRandomGenre(searchTerm));
    };

    const handleSignOut = async () => {
        navigate('/');
    };

    const fetchSideArtists = async (query) => {
        try {
            const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=album&limit=20`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();

            if (data.results && Array.isArray(data.results)) {
                const uniqueArtists = new Map();
                data.results.forEach(album => {
                    if (!uniqueArtists.has(album.artistId)) {
                        uniqueArtists.set(album.artistId, {
                            artistId: album.artistId,
                            artistName: album.artistName,
                            artworkUrl100: album.artworkUrl100
                        });
                    }
                });
                setSideArtists(Array.from(uniqueArtists.values()));
            } else {
                setSideArtists([]);
            }
        } catch (error) {
            console.error("Error fetching side artists:", error);
            setSideArtists([]);
        }
    };

    useEffect(() => {
        const fetchArtists = async (query) => {
            try {
                const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=album&limit=50`;
                const response = await fetch(url);
                if (!response.ok) throw new Error("La respuesta de la red no fue correcta");
                const data = await response.json();

                if (data.results && Array.isArray(data.results)) {
                    const uniqueArtists = new Map();
                    data.results.forEach(album => {
                        if (!uniqueArtists.has(album.artistId)) {
                            uniqueArtists.set(album.artistId, {
                                artistId: album.artistId,
                                artistName: album.artistName,
                                artworkUrl100: album.artworkUrl100 
                            });
                        }
                    });
                    setArtists(Array.from(uniqueArtists.values()));
                } else {
                    setArtists([]);
                }
            } catch (error) {
                console.error("Error al buscar artistas en iTunes:", error);
                setArtists([]);
            }
        };

        if (searchTerm) {
            fetchArtists(searchTerm);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchSideArtists(sideArtistsGenre);
    }, [sideArtistsGenre]);

    const handleSideArtistsRefresh = () => {
        setSideArtistsGenre(getRandomGenre(sideArtistsGenre));
    };

    return (
        <div className="padre1">
            <div className='barra'>
                <div onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
                    <FaSoundcloud size={60} />
                </div>
                <button className='bt' onClick={() => navigate('/home')}>Home</button>
                <button className='bte'>Feed</button>
                <button className='bt' onClick={() => navigate('/library')}>Library</button>
                <div className="search-container">
                    <IoIosSearch className="search-icon" />
                    <input
                        className='sea'
                        type="text"
                        placeholder='Buscar artistas...'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className='bte'>Try Artist Pro</button>
                <button className='bt'>For Artist</button>
                <button className='bt' onClick={() => navigate('/upload')}>Upload</button>
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

                <div className='hear'>
                    <h1>Hear the latest posts from the people you’re following:</h1>
                </div>
            <div className="home-main-content">
                <div className="artist-grid">
                    <div className='your'>
                        <p>Your feed is currently empty. Go to search, home or use the <br /> suggestions below to find creators to follow. Refresh the <br /> page to see tracks they are posting.</p>
                    </div>
                    <div className="refresh-container">
                        <span className="refresh-text" onClick={handleRefresh}>Refresh list</span>
                    </div>
                    {artists.slice(0, 10).map(artist => {
                        const isFollowing = followedArtists.has(artist.artistId);
                        return (
                            <div key={artist.artistId} className="artist-card">
                                <div className="artist-info">
                                    <img src={artist.artworkUrl100} alt={artist.artistName} className="artist-photo" />
                                    <span className="artist-name">{artist.artistName}</span>
                                </div>
                                <button onClick={() => handleFollowToggle(artist.artistId)} className={isFollowing ? 'following-btn' : 'follow-btn'}>
                                    {isFollowing ? 'Following' : 'Follow'}
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className="side-artist-list">
                    <p>Herramientas de artistas</p>
                    <div className='dad'>
                        <button className='herra'><BsFillLightningChargeFill size={20} />Amplificar</button>
                        <button className='herra'><RiFindReplaceLine size={20} />Sustituir</button>
                        <button className='herra'><PiDiscoBallFill size={20} />Distribuir</button>
                        <button className='herra'><LuAlignHorizontalDistributeCenter size={20} />Masterizar</button>
                    </div>
                    <div className="side-list-header">
                        <span>Artists to follow</span>
                        <span className="refresh-text" onClick={handleSideArtistsRefresh}>Refresh</span>
                    </div>
                    {sideArtists.slice(0, 3).map(artist => (
                        <div key={artist.artistId} className="side-artist-item">
                            <img src={artist.artworkUrl100} alt={artist.artistName} />
                            <span>{artist.artistName}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
