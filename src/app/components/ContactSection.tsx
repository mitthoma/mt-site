"use client";

import { useState } from 'react';

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
    <section style={{
      background: '#000',
      minHeight: '75vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        gap: '3rem',
        padding: '4rem 2rem'
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
            preload="auto"
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
        <div style={{
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
            Have a project in mind or want to collaborate? Drop me a message and let's create something amazing together.
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
                color: '#70e6ff',
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
                  background: 'rgba(112, 230, 255, 0.05)',
                  border: `2px solid ${focusedField === 'name' ? '#70e6ff' : 'rgba(112, 230, 255, 0.3)'}`,
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: focusedField === 'name' ? '0 0 20px rgba(112, 230, 255, 0.3)' : 'none'
                }}
              />
            </div>

            {/* Email Field */}
            <div style={{ position: 'relative' }}>
              <label style={{
                display: 'block',
                color: '#70e6ff',
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
                  background: 'rgba(112, 230, 255, 0.05)',
                  border: `2px solid ${focusedField === 'email' ? '#70e6ff' : 'rgba(112, 230, 255, 0.3)'}`,
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: focusedField === 'email' ? '0 0 20px rgba(112, 230, 255, 0.3)' : 'none'
                }}
              />
            </div>

            {/* Message Field */}
            <div style={{ position: 'relative' }}>
              <label style={{
                display: 'block',
                color: '#70e6ff',
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
                  background: 'rgba(112, 230, 255, 0.05)',
                  border: `2px solid ${focusedField === 'message' ? '#70e6ff' : 'rgba(112, 230, 255, 0.3)'}`,
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  boxShadow: focusedField === 'message' ? '0 0 20px rgba(112, 230, 255, 0.3)' : 'none'
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '1.25rem 2rem',
                background: isSubmitting ? 'rgba(112, 230, 255, 0.5)' : 'linear-gradient(135deg, #70e6ff 0%, #00bfff 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#000',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 30px rgba(112, 230, 255, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                opacity: isSubmitting ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(112, 230, 255, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(112, 230, 255, 0.4)';
                }
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
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
              background: 'rgba(112, 230, 255, 0.1)',
              border: '1px solid #70e6ff',
              borderRadius: '8px',
              padding: '1rem',
              color: '#70e6ff',
              fontSize: '1rem',
              textAlign: 'center',
              fontWeight: '500'
            }}>
              Thank you for reaching out. I'll be in touch.
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          section > div {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}