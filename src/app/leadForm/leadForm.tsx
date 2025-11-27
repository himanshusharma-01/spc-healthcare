import React, { useState, useEffect } from 'react';
import './leadForm.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  triggerElement?: string;
}

const LeadForm: React.FC<LeadFormProps> = ({ isOpen, onClose, triggerElement }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      // Normalize to digits only and validate Indian numbers: optional 91 prefix + 10 digits starting 6-9
      const digitsOnly = formData.phone.replace(/\D/g, '');
      const indianPattern = /^(91)?[6-9]\d{9}$/;
      if (!indianPattern.test(digitsOnly)) {
        newErrors.phone = 'Please enter a valid Indian phone number (e.g. +91 98765 43210)';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        triggerElement,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        console.error('Lead form submission failed:', data);
        alert('Failed to send your details. Please try again.');
        return;
      }
      
      setIsSubmitted(true);
      
      setTimeout(() => {
        handleClose();
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="lead-form-overlay" onClick={handleBackdropClick}>
      <div 
        className="lead-form-container"
        style={{ width: '70vw', maxWidth: '900px', maxHeight: '80vh' }}
      >
        <button 
          className="lead-form-close"
          onClick={handleClose}
          aria-label="Close form"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M18 6L6 18M6 6l12 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="lead-form-content">
          {isSubmitted ? (
            <div className="lead-form-success">
              <div className="success-icon">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="32" fill="#00A676" fillOpacity="0.1"/>
                  <path 
                    d="M44 24L28 40L20 32" 
                    stroke="#00A676" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Thank You!</h3>
              <p>Your message has been received. Our healthcare specialist will contact you shortly.</p>
              <button 
                className="success-close-btn"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="lead-form-header">
                <div className="form-badge">
                  <span>Get Expert Consultation</span>
                </div>
                <h2>Connect With Healthcare Experts</h2>
                <p>Share your requirements and our team will provide personalized solutions</p>
              </div>

              <form className="lead-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'input-error' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <span className="error-message">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" stroke="#E53E3E" strokeWidth="2"/>
                        <path d="M8 4V9M8 12V12.5" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <span className="error-message">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" stroke="#E53E3E" strokeWidth="2"/>
                        <path d="M8 4V9M8 12V12.5" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${errors.phone ? 'input-error' : ''}`}
                    placeholder="+91 XXXXXXXXXX"
                  />
                  {errors.phone && (
                    <span className="error-message">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" stroke="#E53E3E" strokeWidth="2"/>
                        <path d="M8 4V9M8 12V12.5" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                    placeholder="Tell us about your healthcare requirements, product interests, or any specific needs..."
                    rows={4}
                  />
                  {errors.message && (
                    <span className="error-message">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" stroke="#E53E3E" strokeWidth="2"/>
                        <path d="M8 4V9M8 12V12.5" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      {errors.message}
                    </span>
                  )}
                </div>

                <button 
                  type="submit" 
                  className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path 
                          d="M2.5 10H17.5M17.5 10L12.5 5M17.5 10L12.5 15" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                      Submit Requirements
                    </>
                  )}
                </button>
              </form>

              <div className="form-footer">
                <p>We respect your privacy. Your information is secure with us.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadForm;