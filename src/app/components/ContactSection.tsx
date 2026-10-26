"use client";

import { useEffect, useRef, useState } from 'react';
import { AnimatedBorderButton } from './AnimatedBorder';
import TerminalSimulation from './TerminalSimulation';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  // Bot protection (issue #7): a honeypot field real users never see, and the
  // time the form has been open. The API rejects a filled honeypot or a
  // submit faster than a human could type.
  const [honeypot, setHoneypot] = useState('');
  const openedAt = useRef<number>(0);
  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          company: honeypot,
          elapsedMs: openedAt.current ? Date.now() - openedAt.current : 0,
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="contact-section" style={{
      background: '#000',
      minHeight: '75vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        gap: '3rem',
        padding: '2rem 1rem md:4rem md:2rem'
      }}>
        {/* Left Side - Terminal */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <TerminalSimulation />
        </div>

        {/* Right Side - Contact Form */}
        <div className="form-container" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: '1rem'
          }}>
            Get In Touch
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#a0a0a0',
            marginBottom: '2.5rem',
            lineHeight: '1.6'
          }}>
            Have a project in mind or want to collaborate? Drop me a message.
          </p>

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {/* Honeypot — hidden from people (and screen readers); bots fill it */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="contact-company">Company</label>
              <input
                type="text"
                id="contact-company"
                name="company"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Name Field */}
            <div style={{ position: 'relative' }}>
              <label className="mc-field-label" htmlFor="contact-name"><b>F01</b> · Name</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
                className="mc-field"
              />
            </div>

            {/* Email Field */}
            <div style={{ position: 'relative' }}>
              <label className="mc-field-label" htmlFor="contact-email"><b>F02</b> · Email</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                className="mc-field"
              />
            </div>

            {/* Message Field */}
            <div style={{ position: 'relative' }}>
              <label className="mc-field-label" htmlFor="contact-message"><b>F03</b> · Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
                rows={6}
                className="mc-field"
                style={{ resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>

            {/* Submit Button */}
            <AnimatedBorderButton type="submit" disabled={isSubmitting} variant="solid" className="mc-lg" index="TX" style={{ width: '100%', justifyContent: 'center' }}>
              {isSubmitting ? 'Transmitting…' : 'Send message'}
            </AnimatedBorderButton>
          </form>

          {/* Success Message */}
          <div style={{
            maxHeight: showSuccess ? '100px' : '0',
            overflow: 'hidden',
            transition: 'all 0.5s ease',
            marginTop: showSuccess ? '1.5rem' : '0',
            opacity: showSuccess ? 1 : 0
          }}>
            <div className="inst-tele" style={{ border: '1px solid rgba(255,255,255,0.4)', padding: '0.9rem 1rem', textAlign: 'center' }}>
              <span className="acc">●</span> ACK · message received — I&apos;ll be in touch.
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .contact-section {
            padding-top: 15% !important;
          }
          
          section > div {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          
          .form-container {
            padding-left: 0 !important;
            padding-right: 0 !important;
            text-align: center !important;
          }
          
          .form-container h2,
          .form-container p {
            text-align: center !important;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          section > div {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}