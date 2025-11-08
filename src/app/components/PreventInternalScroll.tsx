'use client';

import { useEffect } from 'react';

export default function PreventInternalScroll() {
  useEffect(() => {
    // Only run on client side to avoid hydration errors
    if (typeof window === 'undefined') return;

    // Function to hide scrollbars on internal components
    const hideInternalScrollbars = () => {
      // DO NOT target mobile menu - it needs to be scrollable when active
      // The mobile menu should be handled by Navbar.tsx

      // Target homepage container - remove scrollbars
      const homepageContainer = document.querySelector('.l3-container');
      if (homepageContainer) {
        const container = homepageContainer as HTMLElement;
        requestAnimationFrame(() => {
          container.style.setProperty('overflow', 'hidden', 'important');
          container.style.setProperty('overflow-x', 'hidden', 'important');
          container.style.setProperty('overflow-y', 'hidden', 'important');
          container.style.setProperty('scrollbar-width', 'none', 'important');
          container.style.setProperty('-ms-overflow-style', 'none', 'important');
        });
      }

      // Target product modals
      const productModals = document.querySelectorAll('.product-modal');
      productModals.forEach((modal) => {
        requestAnimationFrame(() => {
          (modal as HTMLElement).style.setProperty('overflow', 'hidden', 'important');
          (modal as HTMLElement).style.setProperty('overflow-y', 'hidden', 'important');
          (modal as HTMLElement).style.setProperty('overflow-x', 'hidden', 'important');
        });
      });

      // Target any modal overlays
      const modalOverlays = document.querySelectorAll('.product-modal-overlay');
      modalOverlays.forEach((overlay) => {
        requestAnimationFrame(() => {
          (overlay as HTMLElement).style.setProperty('overflow', 'hidden', 'important');
        });
      });
    };

    // Run immediately
    hideInternalScrollbars();

    // Use MutationObserver to watch for new elements being added
    // Exclude mobile-menu completely to avoid interfering with its scrolling
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Skip if it's the mobile menu - don't interfere at all
        if (mutation.type === 'attributes' || mutation.type === 'childList') {
          const target = mutation.target as HTMLElement;
          if (target && (
            target.classList.contains('mobile-menu') || 
            target.closest('.mobile-menu') ||
            target.id === 'mobile-menu'
          )) {
            return; // Don't interfere with mobile menu at all
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


