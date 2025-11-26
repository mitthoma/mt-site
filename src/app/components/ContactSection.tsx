"use client";

import { useState } from 'react';
import { AnimatedBorderButton } from './AnimatedBorder';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
        {/* Left Side - Video */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            style={{
              width: '75%',
              height: 'auto',
              objectFit: 'cover',
              display: 'block'
            }}
            onLoadedData={(e) => {
              // Ensure video plays on load
              (e.target as HTMLVideoElement).play().catch(err => {
                console.log('Video autoplay failed:', err);
              });
            }}
          >
            <source src="/videos/arrows.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
            marginBottom: '1rem',
            fontFamily: '"BBH Sans Bogle Variable", sans-serif'
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
            {/* Name Field */}
            <div style={{ position: 'relative' }}>
              <label style={{
                display: 'block',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                transition: 'all 0.3s ease',
                transform: focusedField === 'name' ? 'translateY(-2px)' : 'none'
              }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `2px solid ${focusedField === 'name' ? '#ffffff' : 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: focusedField === 'name' ? '0 0 20px rgba(255, 255, 255, 0.3)' : 'none'
                }}
              />
            </div>

            {/* Email Field */}
            <div style={{ position: 'relative' }}>
              <label style={{
                display: 'block',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                transition: 'all 0.3s ease',
                transform: focusedField === 'email' ? 'translateY(-2px)' : 'none'
              }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `2px solid ${focusedField === 'email' ? '#fff' : 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: focusedField === 'email' ? '0 0 20px rgba(255, 255, 255, 0.3)' : 'none'
                }}
              />
            </div>

            {/* Message Field */}
            <div style={{ position: 'relative' }}>
              <label style={{
                display: 'block',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                transition: 'all 0.3s ease',
                transform: focusedField === 'message' ? 'translateY(-2px)' : 'none'
              }}>
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
                rows={6}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `2px solid ${focusedField === 'message' ? '#fff' : 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  boxShadow: focusedField === 'message' ? '0 0 20px rgba(255, 255, 255, 0.3)' : 'none'
                }}
              />
            </div>

            {/* Submit Button */}
            <AnimatedBorderButton
              type="submit"
              disabled={isSubmitting}
              borderColor="#000000"
              style={{
                padding: '1.25rem 2rem',
                background: isSubmitting ? 'rgba(255, 255, 255, 0.5)' : 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
                borderRadius: '10px',
                color: '#000',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 2px rgba(255, 255, 255, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                opacity: isSubmitting ? 0.7 : 1,
                width: '100%'
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
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
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid #ffffff',
              borderRadius: '10px',
              padding: '1rem',
              color: '#70e6ff',
              fontSize: '1rem',
              textAlign: 'center',
              fontWeight: '500'
            }}>
              Thank you for reaching out. I&apos;ll be in touch.
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