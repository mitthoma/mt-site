"use client";

import { useEffect, useRef } from 'react';
import { Fragment } from 'react';

export default function HorizontalResume() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!container || !scrollContainer) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress
      const start = rect.top;
      const end = rect.bottom - viewportHeight;
      const scrollProgress = Math.max(0, Math.min(1, -start / (scrollHeight - viewportHeight)));
      
      // Convert to horizontal scroll
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.offsetWidth;
      scrollContainer.scrollLeft = scrollProgress * maxScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const experiences = [
    {
      year: '2021-Present',
      role: 'Senior Fullstack Developer',
      company: 'OPEN Health',
      bullets: [
        'Architected and built from scratch a central API application supporting multiple platforms',
        'Spearheaded multi-tenancy architecture redesign optimizing database separation for improved security',
        'Reduced hosting costs by thousands monthly while enhancing system reliability and scalability'
      ],
      tech: ['Vue', 'Nuxt.js', 'Node.js', 'AWS', 'CI/CD', 'MySQL', 'TypeORM', 'Prisma', 'Multi-Tenancy', 'End-To-End', 'Enterprise Production Apps'],
      color: '#eaeaea'
    },
    {
      year: '2019-Present',
      role: 'Software Engineer, Co-Founder',
      company: 'Blacsand, LLC',
      bullets: [
        'Founded and led a web development firm managing a team of 5 to deliver 25+ full-cycle projects',
        'Developed HIPAA-compliant SaaS platform with microservice architecture',
        'Built mobile apps for chiropractic practices driving revenue growth'
      ],
      tech: ['Vue 3', 'TypeScript', 'PostgreSQL', 'AWS', 'Swift', 'Java', 'Next.js', 'React Native', 'Prisma', 'React', 'Vue', 'Android/Java'],
      color: '#eaeaea'
    },
    {
      year: '2018-2019',
      role: 'Web Developer',
      company: 'Vadela',
      bullets: [
        'Acted as sole web developer for a creative agency',
        'Increased top-line revenue by $15,000 per year',
        'Collaborated with designers, marketers, and photographers'
      ],
      tech: ['React', 'JavaScript', 'HTML', 'CSS'],
      color: '#eaeaea'
    },
    {
      year: '2015-2019',
      role: 'B.S. Computer Science',
      company: 'Indiana University Bloomington',
      bullets: [
        'Specialization in Artificial Intelligence',
        'Minor in Human Centered Computing',
        'Resident Assistant for 2 years'
      ],
      tech: [],
      color: '#eaeaea'
    },
  ];

  return (
    <Fragment>
      {/* Desktop Horizontal Scroll */}
      <div ref={containerRef} className="horizontal-resume-wrapper hidden md:block" style={{ height: '400vh' }}>
        <div className="horizontal-resume-sticky" style={{ 
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          background: '#0a0a0a'
        }}>
          <div 
            ref={scrollContainerRef}
            className="horizontal-resume-container"
            style={{
              display: 'flex',
              gap: '4rem',
              paddingLeft: '10vw',
              paddingRight: '10vw',
              overflow: 'hidden'
            }}
          >
            {/* Start Marker */}
            <div style={{ 
              minWidth: '300px',
              height: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: '2rem',
              borderLeft: '4px solid #ffffff'
            }}>
              <h2 style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold', 
                color: 'white',
                marginBottom: '1rem'
              }}>
                Work & Education
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#a0a0a0' }}>
                Scroll down to explore →
              </p>
            </div>

            {/* Experience Cards */}
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="resume-card"
                style={{
                  minWidth: '400px',
                  height: '450px',
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                  border: `2px solid ${exp.color}`,
                  borderRadius: '10px',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  boxShadow: `0 0 2px ${exp.color}40`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Year Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: exp.color,
                  color: '#000',
                  padding: '0.5rem 1rem',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}>
                  {exp.year}
                </div>

                {/* Role */}
                <div style={{ marginTop: '3rem' }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: 'bold', 
                    color: exp.color,
                    marginBottom: '0.5rem'
                  }}>
                    {exp.role}
                  </h3>
                  <p style={{ 
                    fontSize: '1.2rem', 
                    color: '#a0a0a0',
                    fontWeight: '500'
                  }}>
                    {exp.company}
                  </p>
                </div>

                {/* Description */}
                <ul style={{ 
                  fontSize: '0.95rem', 
                  color: '#d0d0d0',
                  lineHeight: '1.6',
                  flex: 1,
                  paddingLeft: '1.5rem',
                  margin: 0
                }}>
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                {exp.tech.length > 0 && (
                  <div>
                    <p style={{ 
                      fontSize: '0.9rem', 
                      color: '#808080',
                      marginBottom: '0.5rem',
                      fontWeight: '600'
                    }}>
                      Tech Stack:
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '0.5rem' 
                    }}>
                      {exp.tech.map((tech, i) => (
                        <span 
                          key={i}
                          style={{
                            padding: '0.4rem 0.8rem',
                            background: '#1a1a1a',
                            border: `1px solid ${exp.color}60`,
                            borderRadius: '10px',
                            fontSize: '0.85rem',
                            color: exp.color
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Connecting Line */}
                {index < experiences.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    right: '-4rem',
                    top: '50%',
                    width: '4rem',
                    height: '2px',
                    background: `linear-gradient(90deg, ${exp.color} 0%, ${experiences[index + 1].color} 100%)`
                  }} />
                )}
              </div>
            ))}

            {/* End Marker */}
            <div style={{ 
              minWidth: '300px',
              height: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: '2rem',
              borderRight: '4px solid #ffffff'
            }}>
              <button style={{
                padding: '1rem 2rem',
                background: '#ffffff',
                color: '#000',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 0 2px rgba(255, 255, 255, 0.3)'
              }}>
                Browse Projects
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Vertical Scroll */}
      <div className="md:hidden" style={{ background: '#0a0a0a', padding: '2rem 1rem' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: 'white',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Work<br></br>& Education
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '500px', margin: '0 auto' }}>
          {experiences.map((exp, index) => (
            <div
              key={index}
              style={{
                minWidth: '100%',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                border: `2px solid ${exp.color}`,
                borderRadius: '10px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: `0 0 2px ${exp.color}40`,
                position: 'relative'
              }}
            >
              {/* Year Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: exp.color,
                color: '#000',
                padding: '0.4rem 0.8rem',
                borderRadius: '10px',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}>
                {exp.year}
              </div>

              {/* Role */}
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  color: exp.color,
                  marginBottom: '0.5rem'
                }}>
                  {exp.role}
                </h3>
                <p style={{ 
                  fontSize: '1rem', 
                  color: '#a0a0a0',
                  fontWeight: '500'
                }}>
                  {exp.company}
                </p>
              </div>

              {/* Description */}
              <ul style={{ 
                fontSize: '0.85rem', 
                color: '#d0d0d0',
                lineHeight: '1.5',
                paddingLeft: '1.2rem',
                margin: 0
              }}>
                {exp.bullets.map((bullet, i) => (
                  <li key={i} style={{ marginBottom: '0.4rem' }}>
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Tech Stack */}
              {exp.tech.length > 0 && (
                <div>
                  <p style={{ 
                    fontSize: '0.8rem', 
                    color: '#808080',
                    marginBottom: '0.5rem',
                    fontWeight: '600'
                  }}>
                    Tech Stack:
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '0.4rem' 
                  }}>
                    {exp.tech.map((tech, i) => (
                      <span 
                        key={i}
                        style={{
                          padding: '0.3rem 0.6rem',
                          background: '#1a1a1a',
                          border: `1px solid ${exp.color}60`,
                          borderRadius: '10px',
                          fontSize: '0.75rem',
                          color: exp.color
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
  
              <button style={{
                padding: '1rem 2rem',
                background: '#ffffff',
                color: '#000',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 0 2px rgba(255, 255, 255, 0.3)'
              }}>
                Browse more projects
              </button>
        </div>
      </div>
    </Fragment>
  );
}