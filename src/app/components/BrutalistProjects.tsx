"use client";

import { useState } from 'react';

export default function BrutalistProjects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: 'PROJECT_001',
      name: 'FULL STACK APPLICATION',
      tech: 'REACT / NODE / POSTGRES',
      year: '2024',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      type: 'video'
    },
    {
      id: 2,
      title: 'PROJECT_002',
      name: 'BLOCKCHAIN PLATFORM',
      tech: 'SOLIDITY / WEB3 / ETHERS',
      year: '2023',
      imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
      type: 'image'
    },
    {
      id: 3,
      title: 'PROJECT_003',
      name: 'AI INTEGRATION SYSTEM',
      tech: 'PYTHON / TENSORFLOW / DOCKER',
      year: '2024',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      type: 'video'
    },
    {
      id: 4,
      title: 'PROJECT_004',
      name: 'REAL-TIME ANALYTICS',
      tech: 'TYPESCRIPT / GRAPHQL / REDIS',
      year: '2023',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      type: 'image'
    }
  ];

  return (
    <section style={{
      background: '#000',
      minHeight: '100vh',
      padding: '4rem 2rem',
      // borderTop: '8px solid #fff',
      // borderBottom: '8px solid #fff'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        marginBottom: '4rem'
      }}>
        <h2 style={{
          fontSize: 'clamp(3rem, 2vw, 8rem)',
          fontWeight: 'bold',
          color: '#fff',
          letterSpacing: '-0.05em',
          lineHeight: '0.9',
          margin: 0,
          textTransform: 'uppercase',
          fontFamily: 'monospace'
        }}>
          SELECTED<br/>
          WORK
        </h2>
        <div style={{
          marginTop: '1rem',
          padding: '0.5rem 0',
          borderTop: '2px solid #fff',
          borderBottom: '2px solid #fff'
        }}>
          <p style={{
            fontFamily: 'monospace',
            color: '#fff',
            margin: 0,
            fontSize: '0.875rem',
            letterSpacing: '0.1em'
          }}>
            [ARCHIVE_2023-2024] — {projects.length} PROJECTS
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            onMouseEnter={() => setHoveredProject(index)}
            onMouseLeave={() => setHoveredProject(null)}
            style={{
              border: '3px solid #fff',
              background: hoveredProject === index ? '#fff' : '#000',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Project Number */}
            <div style={{
              padding: '0.75rem 1rem',
              borderBottom: '3px solid ' + (hoveredProject === index ? '#000' : '#fff'),
              background: hoveredProject === index ? '#000' : 'transparent'
            }}>
              <span style={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: hoveredProject === index ? '#fff' : '#fff',
                letterSpacing: '0.2em',
                fontWeight: 'bold'
              }}>
                {project.title}
              </span>
            </div>

            {/* Media */}
            <div style={{
              aspectRatio: '16/9',
              overflow: 'hidden',
              background: '#000',
              position: 'relative'
            }}>
              {project.type === 'video' ? (
                <video
                  src={project.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: hoveredProject === index ? 'grayscale(0%)' : 'grayscale(100%)',
                    transition: 'filter 0.3s ease'
                  }}
                />
              ) : (
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: hoveredProject === index ? 'grayscale(0%)' : 'grayscale(100%)',
                    transition: 'filter 0.3s ease'
                  }}
                />
              )}
              
              {/* Overlay on hover */}
              {hoveredProject === index && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '4px solid #000',
                  margin: '1rem'
                }} />
              )}
            </div>

            {/* Project Info */}
            <div style={{
              padding: '1.5rem',
              borderTop: '3px solid ' + (hoveredProject === index ? '#000' : '#fff'),
              background: hoveredProject === index ? '#fff' : 'transparent'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: hoveredProject === index ? '#000' : '#fff',
                margin: '0 0 0.5rem 0',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                fontFamily: 'monospace'
              }}>
                {project.name}
              </h3>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginTop: '1rem'
              }}>
                <p style={{
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  color: hoveredProject === index ? '#000' : '#fff',
                  margin: 0,
                  letterSpacing: '0.05em',
                  opacity: 0.8
                }}>
                  {project.tech}
                </p>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: hoveredProject === index ? '#000' : '#fff',
                  letterSpacing: '-0.05em'
                }}>
                  [{project.year}]
                </span>
              </div>
            </div>

            {/* Corner Accent */}
            <div style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '20px',
              height: '20px',
              border: '3px solid ' + (hoveredProject === index ? '#000' : '#fff'),
              borderLeft: 'none',
              borderBottom: 'none',
              pointerEvents: 'none'
            }} />
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div style={{
        maxWidth: '1400px',
        margin: '4rem auto 0',
        padding: '1rem 0',
        borderTop: '2px solid #fff'
      }}>
        <p style={{
          fontFamily: 'monospace',
          color: '#fff',
          margin: 0,
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          textAlign: 'right',
          opacity: 0.7
        }}>
          [VIEW_ALL_PROJECTS] → GITHUB.COM
        </p>
      </div>
    </section>
  );
}
