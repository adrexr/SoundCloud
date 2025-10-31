import React from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

const formatTime = (time) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default function Player({
    currentSong,
    isPlaying,
    duration,
    currentTime,
    onPlayPause,
    onNext,
    onPrev,
    onSeek
}) {
    if (!currentSong) {
        return null; 
    }

    return (
        <div className="player">
            <div className="song-info">
                <img src={currentSong.artwork['150x150']} alt={currentSong.title} />
                <div className="song-details">
                    <span className="song-title-player">{currentSong.title}</span>
                    <span className="song-artist-player">{currentSong.user.name}</span>
                </div>
            </div>

            <div className="controls">
                <button onClick={onPrev} className="control-btn"><FaStepBackward /></button>
                <button onClick={onPlayPause} className="control-btn play-pause">
                    {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                </button>
                <button onClick={onNext} className="control-btn"><FaStepForward /></button>
            </div>

            <div className="timeline">
                <span>{formatTime(currentTime)}</span>
                <input type="range" min="0" max={duration} value={currentTime} onChange={onSeek} className="seek-bar" />
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    );
}
