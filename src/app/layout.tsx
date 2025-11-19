import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import WhatsAppFloating from "./floatingWhatapp/whatsapp";
import PreventInternalScroll from "./components/PreventInternalScroll";
import { ProductSearchProvider } from "./contexts/ProductSearchContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
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
    <html lang="en" className={manrope.className}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} antialiased`}>
        <ProductSearchProvider>
          <PreventInternalScroll />
          <Navbar />
          {children}
          <WhatsAppFloating phoneNumber="917710301301" position="bottom-right" showPopup={true} popupText="Chat with us on WhatsApp" />
          <Footer />
        </ProductSearchProvider>
      </body>
    </html>
  );
}
