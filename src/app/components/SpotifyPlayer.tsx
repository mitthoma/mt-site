"use client";

import { useState, useRef, useEffect } from 'react';
import GlitchyVisualizer from './GlitchyVisualizer';
import { AnimatedBorderButton } from './AnimatedBorder';

interface Track {
  title: string;
  artist: string;
  src: string;
}

interface AudioPlayerProps {
  expandedFromMenu?: boolean;
  onClose?: () => void;
}

export default function AudioPlayer({ expandedFromMenu = false, onClose }: AudioPlayerProps = {}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);

  useEffect(() => {
    if (expandedFromMenu) {
      setIsExpanded(true);
    }
  }, [expandedFromMenu]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Add all your tracks here - put audio files in /public/audio/ folder
  const playlist: Track[] = [
    { title: "Sentient", artist: "Mitchell Thomas", src: "/audio/track2.m4a" },
    { title: "Neocortex", artist: "Mitchell Thomas", src: "/audio/track1.m4a" },
    { title: "Terminal", artist: "Mitchell Thomas", src: "/audio/track4.mp3" },
    { title: "Death's End", artist: "Mitchell Thomas", src: "/audio/track6.mp3" },

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
      // Reset duration when track changes
      setDuration(0);
      setCurrentTime(0);
    }
  }, [currentTrackIndex]);

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
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={currentTrack.src} key={currentTrackIndex} />
      <div className="fixed bottom-4 right-4 md:bottom-4 md:right-4" style={{
        zIndex: 9998,
        transition: 'all 0.3s ease'
      }}>
        {isExpanded ? (
          // Expanded Player with controls
          <div className="w-[calc(100vw-2rem)] md:w-[280px]" style={{
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #ffffff',
            borderRadius: 0,
            padding: '1rem',
            boxShadow: '0 0 2px rgba(255, 255, 255, 0.3)',
            maxWidth: '400px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: '600' }}>
                Tracks ({playlist.length} tracks)
              </span>
              <button
                onClick={() => {
                  setIsExpanded(false);
                  if (onClose) onClose();
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  padding: 0,
                  lineHeight: 1
                }}
              >
                ×
              </button>
            </div>

            {/* Open Visualizer Button */}
            {/* <button
              onClick={() => setIsVisualizerOpen(true)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid #ffffff',
                borderRadius: 0,
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '1rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              🎨 Open Visualizer
            </button> */}

            {/* Current Track Info */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid #ffffff',
              borderRadius: 0,
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
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid #ffffff',
                  borderRadius: 0,
                  color: '#ffffff',
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
                  background: isPlaying ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid #ffffff',
                  borderRadius: 0,
                  color: isPlaying ? '#000' : '#ffffff',
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
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid #ffffff',
                  borderRadius: 0,
                  color: '#ffffff',
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
              <div 
                onClick={handleSeek}
                style={{
                  width: '100%',
                  height: '4px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 0,
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}>
                <div style={{
                  width: `${(currentTime / duration) * 100}%`,
                  height: '100%',
                  background: '#ffffff',
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
              borderTop: '1px solid rgba(255, 255, 255, 0.3)',
              paddingTop: '0.75rem',
              paddingRight: '0.25rem'
            }} className="custom-scrollbar">
              {playlist.map((track, index) => (
                <div
                  key={index}
                  onClick={() => selectTrack(index)}
                  style={{
                    padding: '0.6rem',
                    borderRadius: 0,
                    marginBottom: '0.4rem',
                    background: index === currentTrackIndex ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    border: `1px solid ${index === currentTrackIndex ? '#ffffff' : 'transparent'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (index !== currentTrackIndex) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index !== currentTrackIndex) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', color: index === currentTrackIndex ? '#ffffff' : '#fff', marginBottom: '0.15rem' }}>
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
          // Minimized Button with "Produced by me" text - Hidden on mobile
          <div className="hidden md:block" onContextMenu={(e) => { e.preventDefault(); setIsExpanded(true); }}>
            <AnimatedBorderButton
              onClick={() => setIsExpanded(true)}
              index={isPlaying ? '▶' : 'AUD'}
              active={isPlaying}
              aria-label="Open audio player"
            >
              Music produced by me
            </AnimatedBorderButton>
          </div>
        )}
      </div>

      {/* Visualizer */}
      <GlitchyVisualizer
        isOpen={isVisualizerOpen}
        onClose={() => setIsVisualizerOpen(false)}
        isPlaying={isPlaying}
      />
    </>
  );
}