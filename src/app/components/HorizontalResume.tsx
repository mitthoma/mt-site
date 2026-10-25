"use client";

import { useEffect, useRef } from 'react';
import { Fragment } from 'react';
import { AnimatedBorderButton } from './AnimatedBorder';

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
      role: 'Senior Full-Stack Engineer',
      company: 'OPEN Health (Peloton Advantage)',
      bullets: [
        'Building agent systems and agentic workflows that replace manual processes inside the company (2025–present)',
        'Architected and built from scratch a central API application supporting multiple platforms',
        'Spearheaded multi-tenancy architecture redesign optimizing database separation for improved security',
        'Reduced hosting costs by thousands monthly while enhancing system reliability and scalability'
      ],
      tech: ['LLM APIs', 'Agent Orchestration', 'Node.js', 'Vue', 'Nuxt.js', 'TypeScript', 'MySQL', 'TypeORM', 'Prisma', 'AWS', 'CI/CD', 'Multi-Tenancy'],
      color: '#eaeaea'
    },
    {
      year: '2019-Present',
      role: 'Founder & Software Engineer',
      company: 'Timberwright (timberwright.ai)',
      bullets: [
        'Founded Timberwright — your entire tech team as a service: managed care, SEO/AEO, and full-stack engineering for long-term retainer clients; 25+ full-cycle projects',
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
              height: '500px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: '2rem',
              borderLeft: '4px solid #ffffff'
            }}>
              <h2 style={{
                fontSize: 'clamp(3rem, 2vw, 8rem)',
                fontWeight: 'bold',
                color: '#fff',
                letterSpacing: '-0.05em',
                lineHeight: '0.9',
                margin: 0,
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                marginBottom: '2rem',
                marginRight: '2rem'
              }}>
                WORK +<br/>
                EDUCATION
              </h2>
              <div className="inst-tele" style={{ marginBottom: '1rem' }}><span className="acc">●</span> LOG · {String(experiences.length).padStart(2, '0')} ENTRIES · CHRONO DESC</div>
              <p style={{ fontSize: '1.2rem', color: '#a0a0a0' }}>
                Scroll to explore →
              </p>
            </div>

            {/* Experience Cards */}
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="resume-card mc-log"
                style={{
                  minWidth: '400px',
                  minHeight: '500px',
                  height: 'auto',
                  
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  position: 'relative'
                }}
              >
                {/* Year Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  }} className="mc-log-year">
                  <b>{String(index + 1).padStart(2, '0')}</b> · {exp.year}
                </div>

                {/* Role */}
                <div style={{ marginTop: '3rem' }}>
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: 'bold', 
                    color: '#fff',
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
                    <p className="inst-tele" style={{ marginBottom: '0.5rem' }}>STACK</p>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '0.5rem' 
                    }}>
                      {exp.tech.map((tech, i) => (
                        <span key={i} className="mc-chip mc-chip-sm">
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
                    background: 'rgba(255,255,255,0.28)'
                  }} />
                )}
              </div>
            ))}

            {/* End Marker */}
            <div style={{ 
              minWidth: '300px',
              height: '500px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: '2rem',
              borderRight: '4px solid #ffffff'
            }}>
              <AnimatedBorderButton variant="solid" className="mc-lg" index="→">Browse Projects</AnimatedBorderButton>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Vertical Scroll */}
      <div className="md:hidden" style={{ background: '#0a0a0a', padding: '2rem 1rem' }}>
        <h2 style={{
          fontSize: 'clamp(3rem, 2vw, 8rem)',
          fontWeight: 'bold',
          color: '#fff',
          letterSpacing: '-0.05em',
          lineHeight: '0.9',
          margin: 0,
          textTransform: 'uppercase',
          fontFamily: 'monospace',
          marginBottom: '2rem',
        }}>
          WORK<br/>
          + EDUCATION
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '500px', margin: '0 auto' }}>
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="mc-log"
              style={{
                minWidth: '100%',
                minHeight: '350px',
                
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative'
              }}
            >
              {/* Year Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                }} className="mc-log-year">
                <b>{String(index + 1).padStart(2, '0')}</b> · {exp.year}
              </div>

              {/* Role */}
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  color: '#fff',
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
                    STACK
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '0.4rem' 
                  }}>
                    {exp.tech.map((tech, i) => (
                      <span key={i} className="mc-chip mc-chip-sm">
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
  
              <AnimatedBorderButton variant="solid" className="mc-lg" index="→">Browse more projects</AnimatedBorderButton>
        </div>
      </div>
    </Fragment>
  );
}