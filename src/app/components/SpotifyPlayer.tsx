"use client";

import { useState, useRef, useEffect } from 'react';

interface Track {
  title: string;
  artist: string;
  src: string;
}

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Add all your tracks here - put audio files in /public/audio/ folder
  const playlist: Track[] = [
    { title: "Track One", artist: "Mitchell Thomas", src: "/audio/track1.m4a" },
    { title: "Track Two", artist: "Mitchell Thomas", src: "/audio/track2.m4a" },
    { title: "Track Three", artist: "Mitchell Thomas", src: "/audio/track3.mp3" },
    { title: "Track Four", artist: "Mitchell Thomas", src: "/audio/track4.mp3" },
    { title: "Track Five", artist: "Mitchell Thomas", src: "/audio/track5.mp3" },
    { title: "Track Six", artist: "Mitchell Thomas", src: "/audio/track6.mp3" },

  ];
  
  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };
    }
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      const audio = audioRef.current;
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const selectTrack = (index: number) => {
    if (index !== currentTrackIndex) {
      setCurrentTrackIndex(index);
      setIsPlaying(false);
      setCurrentTime(0);
      // Auto-play the new track
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }, 100);
    }
  };

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    selectTrack(nextIndex);
  };

  const previousTrack = () => {
    const prevIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
    selectTrack(prevIndex);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <audio ref={audioRef} src={currentTrack.src} key={currentTrackIndex} />
      <div style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        zIndex: 9998,
        transition: 'all 0.3s ease'
      }}>
        {isExpanded ? (
          // Expanded Player with controls
          <div style={{
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #70e6ff',
            borderRadius: '12px',
            padding: '1rem',
            boxShadow: '0 0 30px rgba(112, 230, 255, 0.3)',
            width: '280px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{ color: '#70e6ff', fontSize: '0.9rem', fontWeight: '600' }}>
                🎵 Playlist ({playlist.length} tracks)
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#70e6ff',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  padding: 0,
                  lineHeight: 1
                }}
              >
                ×
              </button>
            </div>

            {/* Current Track Info */}
            <div style={{
              background: 'rgba(112, 230, 255, 0.1)',
              border: '1px solid #70e6ff',
              borderRadius: '8px',
              padding: '0.75rem',
              marginBottom: '1rem'
            }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.25rem' }}>
                {currentTrack.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>
                {currentTrack.artist}
              </div>
            </div>

            {/* Playback Controls */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <button
                onClick={previousTrack}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'rgba(112, 230, 255, 0.2)',
                  border: '1px solid #70e6ff',
                  borderRadius: '8px',
                  color: '#70e6ff',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                ⏮
              </button>
              <button
                onClick={handlePlayPause}
                style={{
                  flex: 2,
                  padding: '0.75rem',
                  background: isPlaying ? '#70e6ff' : 'rgba(112, 230, 255, 0.2)',
                  border: '1px solid #70e6ff',
                  borderRadius: '8px',
                  color: isPlaying ? '#000' : '#70e6ff',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button
                onClick={nextTrack}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'rgba(112, 230, 255, 0.2)',
                  border: '1px solid #70e6ff',
                  borderRadius: '8px',
                  color: '#70e6ff',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                ⏭
              </button>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '0.5rem' }}>
              <div style={{
                width: '100%',
                height: '4px',
                background: 'rgba(112, 230, 255, 0.2)',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(currentTime / duration) * 100}%`,
                  height: '100%',
                  background: '#70e6ff',
                  transition: 'width 0.1s linear'
                }} />
              </div>
            </div>

            {/* Time Display */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: '#808080',
              marginBottom: '1rem'
            }}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Playlist */}
            <div style={{
              maxHeight: '500px',
              overflowY: 'auto',
              borderTop: '1px solid rgba(112, 230, 255, 0.3)',
              paddingTop: '0.75rem',
              paddingRight: '0.25rem'
            }} className="custom-scrollbar">
              {playlist.map((track, index) => (
                <div
                  key={index}
                  onClick={() => selectTrack(index)}
                  style={{
                    padding: '0.6rem',
                    borderRadius: '6px',
                    marginBottom: '0.4rem',
                    background: index === currentTrackIndex ? 'rgba(112, 230, 255, 0.2)' : 'transparent',
                    border: `1px solid ${index === currentTrackIndex ? '#70e6ff' : 'transparent'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (index !== currentTrackIndex) {
                      e.currentTarget.style.background = 'rgba(112, 230, 255, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index !== currentTrackIndex) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', color: index === currentTrackIndex ? '#70e6ff' : '#fff', marginBottom: '0.15rem' }}>
                    {index === currentTrackIndex && '▶ '}{track.title}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#808080' }}>
                    {track.artist}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Minimized Button with "Produced by me" text
          <button
            onClick={() => setIsExpanded(true)}
            style={{
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid #70e6ff',
              borderRadius: '20px',
              padding: '0.75rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(112, 230, 255, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(112, 230, 255, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(112, 230, 255, 0.4)';
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              setIsExpanded(true);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#70e6ff" strokeWidth="2">
              {isPlaying ? (
                // Pause icon
                <>
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </>
              ) : (
                // Play icon
                <polygon points="5 3 19 12 5 21 5 3" fill="#70e6ff" />
              )}
            </svg>
            <span style={{
              color: '#70e6ff',
              fontSize: '0.85rem',
              fontWeight: '600',
              whiteSpace: 'nowrap'
            }}>
              Produced by me
            </span>
          </button>
        )}
      </div>
    </>
  );
}