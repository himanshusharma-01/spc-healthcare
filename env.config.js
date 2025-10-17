// Environment configuration for SPC Healthcare website
// This file handles environment variables for both development and production

const isDevelopment = process.env.NODE_ENV === 'development';

const config = {
  // Google Sheets API
  googleSheetsApiUrl: process.env.GOOGLE_SHEETS_API_URL || 
    'https://script.google.com/macros/s/AKfycby0QnDhYUggQ1p6Au7pOsvqxKXf-C6ThCvD4oB08hpkVCoUukuUVHK0fKuC7_mOXH5u/exec',
  
  // Site Configuration
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 
    (isDevelopment ? 'http://localhost:3000' : 'https://yourdomain.com'),
  
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'SPC Healthcare',
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || 'SPC Healthcare',
  companyEmail: process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@spchealthcare.com',
  companyPhone: process.env.NEXT_PUBLIC_COMPANY_PHONE || '+91-7710301301',
  
  // Environment
  isDevelopment,
  isProduction: process.env.NODE_ENV === 'production',
};

module.exports = config;

