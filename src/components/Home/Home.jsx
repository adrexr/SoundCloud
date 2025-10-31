import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { FaSoundcloud } from "react-icons/fa6";
import { IoIosSearch, IoIosArrowForward, IoIosArrowBack, IoIosPlay } from "react-icons/io";
import Player from './Player';
import { useNavigate } from 'react-router-dom';
import { BsFillLightningChargeFill } from "react-icons/bs";
import { RiFindReplaceLine } from 'react-icons/ri';
import { PiDiscoBallFill } from 'react-icons/pi';
import { LuAlignHorizontalDistributeCenter } from "react-icons/lu";
import { IoMdNotificationsOutline, IoIosMail } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";



export default function Home() {
    const [songs, setSongs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('Daft Punk');
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const [songHistory, setSongHistory] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [sideArtists, setSideArtists] = useState([]);
    const [sideArtistsGenre, setSideArtistsGenre] = useState('pop'); 
    const genres = ['rock', 'pop', 'electronic', 'hip-hop', 'jazz', 'classical'];

    const getRandomGenre = (current) => {
        let newGenre = current;
        while (newGenre === current) {
            newGenre = genres[Math.floor(Math.random() * genres.length)];
        }
        return newGenre;
    };

    const SongRow = ({ songs, title }) => {
        const scrollRef = useRef(null);
        const [showLeftArrow, setShowLeftArrow] = useState(false);
        const [showRightArrow, setShowRightArrow] = useState(false);

        const scroll = (scrollOffset) => {
            if (scrollRef.current) {
                scrollRef.current.scrollLeft += scrollOffset;
            }
        };

        const handleScroll = () => {
            if (scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                setShowLeftArrow(scrollLeft > 0);
                setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1); 
            }
        };

        useEffect(() => {
            if (scrollRef.current) {
                const { scrollWidth, clientWidth } = scrollRef.current;
                setShowRightArrow(scrollWidth > clientWidth);
            }
        }, [songs]);

        return (
            <div className="song-row-wrapper">
                {showLeftArrow && <button className="scroll-arrow left" onClick={() => scroll(-300)}><IoIosArrowBack size={24} /></button>}
                <div className="song-row-content" ref={scrollRef} onScroll={handleScroll}>
                    {songs.map(song => (
                        <SongCard key={song.id} song={song} onSelect={handleSelectSong} />
                    ))}
                </div>
                {showRightArrow && <button className="scroll-arrow" onClick={() => scroll(300)}><IoIosArrowForward size={24} /></button>}
            </div>
        );
    };

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

    const handleSideArtistsRefresh = () => {
        setSideArtistsGenre(getRandomGenre(sideArtistsGenre));
    };

    useEffect(() => {
        if (searchTerm) {
            fetchSongs(searchTerm);
        } else {
            setSongs([]);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchSideArtists(sideArtistsGenre);
    }, [sideArtistsGenre]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentSong]);

    const handleSelectSong = (song) => {
        setCurrentSong(song);
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(true);

        setSongHistory(prevHistory => {
            if (prevHistory.length > 0 && prevHistory[0].id === song.id) {
                return prevHistory;
            }
            return [song, ...prevHistory].slice(0, 5);
        });
    };

    const handlePlayPause = () => {
        if (!currentSong) return;
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        if (!currentSong) return;
        const currentIndex = songs.findIndex(s => s.id === currentSong.id);
        const nextIndex = (currentIndex + 1) % songs.length;
        setCurrentSong(songs[nextIndex]);
    };

    const handlePrev = () => {
        if (!currentSong) return;
        const currentIndex = songs.findIndex(s => s.id === currentSong.id);
        const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
        setCurrentSong(songs[prevIndex]);
    };

    const handleSignOut = async () => {
        navigate('/'); 
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (e) => {
        audioRef.current.currentTime = e.target.value;
    };

    return (
        <div className="padre1">
            <div className='barra'>
                <div onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
                    <FaSoundcloud size={60} />
                </div>
                <button className='bte'>Home</button>
                <button className='bt' onClick={() => navigate('/feed')}>Feed</button>
                <button className='bt' onClick={() => navigate('/library')}>Library</button>
                <div className="search-container">
                    <IoIosSearch className="search-icon" />
                    <input
                        className='sea'
                        type="text"
                        placeholder='Search for artists, bands, tracks, podcasts'
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

                <div className='titleaa'>
                    <h1>Artists to watch out for</h1>
                </div>
            <div className="home-main-content">
                <div className="song-rows-container">
                    <SongRow songs={songs.slice(0, 10)} />
                    <div>
                        <h1 className='titlea'>Curated for your taste</h1>
                    </div>
                    <SongRow songs={songs.slice(10, 20)} />
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

                    <div className="history-list">
                        <div className="side-list-header">
                            <span>Listening History</span>
                        </div>
                        {songHistory.map(song => (
                            <div key={`${song.id}-history`} className="side-artist-item" onClick={() => handleSelectSong(song)}>
                                <img src={song.artwork['150x150']} alt={song.title} />
                                <span>{song.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {currentSong && (
                <audio
                    ref={audioRef}
                    src={currentSong.previewUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    autoPlay
                />
            )}

            {currentSong && (
                <Player
                    currentSong={currentSong}
                    isPlaying={isPlaying}
                    duration={duration}
                    currentTime={currentTime}
                    onPlayPause={handlePlayPause}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onSeek={handleSeek}
                />
            )}
         </div>   
    )
}



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
