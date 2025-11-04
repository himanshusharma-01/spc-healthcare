'use client';

import { useEffect } from 'react';

export default function PreventInternalScroll() {
  useEffect(() => {
    // Function to hide scrollbars on internal components
    const hideInternalScrollbars = () => {
      // Target mobile menu - only set overflow, don't touch transform
      const mobileMenu = document.querySelector('.mobile-menu');
      if (mobileMenu) {
        const menuElement = mobileMenu as HTMLElement;
        // Only set overflow properties, preserve transform
        menuElement.style.overflow = 'hidden';
        menuElement.style.overflowY = 'hidden';
        menuElement.style.overflowX = 'hidden';
        // Don't modify transform - it's controlled by React state
      }

      // Target product modals
      const productModals = document.querySelectorAll('.product-modal');
      productModals.forEach((modal) => {
        (modal as HTMLElement).style.overflow = 'hidden';
        (modal as HTMLElement).style.overflowY = 'hidden';
        (modal as HTMLElement).style.overflowX = 'hidden';
      });

      // Target any modal overlays
      const modalOverlays = document.querySelectorAll('.product-modal-overlay');
      modalOverlays.forEach((overlay) => {
        (overlay as HTMLElement).style.overflow = 'hidden';
      });
    };

    // Run immediately
    hideInternalScrollbars();

    // Use MutationObserver to watch for new elements being added
    // But exclude mobile-menu from style attribute changes to avoid interfering
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Skip if it's the mobile menu with style changes
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const target = mutation.target as HTMLElement;
          if (target.classList.contains('mobile-menu')) {
            return; // Don't interfere with mobile menu transforms
          }
        }
        hideInternalScrollbars();
      });
    });

    // Observe the document body for changes
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style'],
      });
    }

    // Run multiple times to catch elements that load later
    const runMultipleTimes = () => {
      hideInternalScrollbars();
      setTimeout(hideInternalScrollbars, 50);
      setTimeout(hideInternalScrollbars, 100);
      setTimeout(hideInternalScrollbars, 200);
      setTimeout(hideInternalScrollbars, 500);
      setTimeout(hideInternalScrollbars, 1000);
    };

    // Run on various events
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runMultipleTimes);
    } else {
      runMultipleTimes();
    }
    
    window.addEventListener('load', runMultipleTimes);
    window.addEventListener('pageshow', runMultipleTimes); // Handle page refresh

    return () => {
      observer.disconnect();
      window.removeEventListener('load', runMultipleTimes);
      window.removeEventListener('pageshow', runMultipleTimes);
      document.removeEventListener('DOMContentLoaded', runMultipleTimes);
    };
  }, []);

  return null;
}


