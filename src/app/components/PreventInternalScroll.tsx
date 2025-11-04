'use client';

import { useEffect } from 'react';

export default function PreventInternalScroll() {
  useEffect(() => {
    // Only run on client side to avoid hydration errors
    if (typeof window === 'undefined') return;

    // Function to hide scrollbars on internal components
    const hideInternalScrollbars = () => {
      // Target mobile menu - CSS already handles this, but ensure it's enforced
      const mobileMenu = document.querySelector('.mobile-menu');
      if (mobileMenu) {
        const menuElement = mobileMenu as HTMLElement;
        // Only set overflow properties after React has hydrated, preserve transform
        // Use requestAnimationFrame to ensure React has rendered
        requestAnimationFrame(() => {
          menuElement.style.setProperty('overflow', 'hidden', 'important');
          menuElement.style.setProperty('overflow-y', 'hidden', 'important');
          menuElement.style.setProperty('overflow-x', 'hidden', 'important');
        });
      }

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


