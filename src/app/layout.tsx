import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import WhatsAppFloating from "./floatingWhatapp/whatsapp";
import PreventInternalScroll from "./components/PreventInternalScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SPC Healthcare - Premium Healthcare Solutions",
  description:
    "Experience world-class medical care with cutting-edge technology and compassionate healthcare professionals dedicated to your wellbeing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Immediately hide scrollbars on internal components before React loads
                function hideInternalScrollbars() {
                  const mobileMenu = document.querySelector('.mobile-menu');
                  if (mobileMenu) {
                    mobileMenu.style.overflow = 'hidden';
                    mobileMenu.style.overflowY = 'hidden';
                    mobileMenu.style.overflowX = 'hidden';
                  }
                  document.querySelectorAll('.product-modal').forEach(function(modal) {
                    modal.style.overflow = 'hidden';
                    modal.style.overflowY = 'hidden';
                    modal.style.overflowX = 'hidden';
                  });
                }
                // Run immediately
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', hideInternalScrollbars);
                } else {
                  hideInternalScrollbars();
                }
                // Also run after a short delay to catch dynamically added elements
                setTimeout(hideInternalScrollbars, 50);
              })();
            `,
          }}
        />
        <PreventInternalScroll />
        <Navbar />
        {children}
        <WhatsAppFloating phoneNumber="917710301301" position="bottom-right" showPopup={true} popupText="Chat with us on WhatsApp" />
        <Footer />
      </body>
    </html>
  );
}
