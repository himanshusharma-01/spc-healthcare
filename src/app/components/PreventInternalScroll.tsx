'use client';

import { useEffect } from 'react';

export default function PreventInternalScroll() {
  useEffect(() => {
    // Function to hide scrollbars on internal components
    const hideInternalScrollbars = () => {
      // Target mobile menu
      const mobileMenu = document.querySelector('.mobile-menu');
      if (mobileMenu) {
        (mobileMenu as HTMLElement).style.overflow = 'hidden';
        (mobileMenu as HTMLElement).style.overflowY = 'hidden';
        (mobileMenu as HTMLElement).style.overflowX = 'hidden';
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
    const observer = new MutationObserver(() => {
      hideInternalScrollbars();
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

    // Also run on window load and after a short delay
    window.addEventListener('load', hideInternalScrollbars);
    const timeout = setTimeout(hideInternalScrollbars, 100);

    return () => {
      observer.disconnect();
      window.removeEventListener('load', hideInternalScrollbars);
      clearTimeout(timeout);
    };
  }, []);

  return null;
}

