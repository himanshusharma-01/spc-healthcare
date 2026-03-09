import React, { useEffect } from 'react';
import './leadForm.css';
import { zohoFormHtml } from './zohoFormHtml';

interface ZohoLeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  triggerElement?: string;
}

const ZohoLeadForm: React.FC<ZohoLeadFormProps> = ({ isOpen, onClose }) => {
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

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="lead-form-overlay" onClick={handleBackdropClick}>
      <div className="lead-form-modal zoho-lead-form-modal">
        <button
          className="lead-form-close"
          onClick={onClose}
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

        <div className="zoho-lead-form-frame-wrapper">
          <iframe
            srcDoc={zohoFormHtml}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
            title="SPC Healthcare Website Inquiry"
            className="zoho-lead-form-frame"
          />
        </div>
      </div>
    </div>
  );
};

export default ZohoLeadForm;

