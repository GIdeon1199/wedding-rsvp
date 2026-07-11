import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { WEDDING_CONFIG } from "@/lib/wedding-config";

export const metadata: Metadata = {
  title: `${WEDDING_CONFIG.coupleDisplay} — ${WEDDING_CONFIG.weddingDateDisplay}`,
  description: `Join us as we celebrate the marriage of ${WEDDING_CONFIG.coupleDisplay} on ${WEDDING_CONFIG.weddingDateDisplay} at ${WEDDING_CONFIG.ceremonyVenue}. RSVP online — no account required.`,
  keywords: ["wedding", "RSVP", WEDDING_CONFIG.bride, WEDDING_CONFIG.groom, "save the date", WEDDING_CONFIG.hashtag],
  openGraph: {
    title: `${WEDDING_CONFIG.coupleDisplay} are getting married!`,
    description: `${WEDDING_CONFIG.weddingDateDisplay} · ${WEDDING_CONFIG.ceremonyVenue}`,
    type: "website",
    images: [
      {
        url: "/pre2.jpg",
        width: 1200,
        height: 630,
        alt: `${WEDDING_CONFIG.coupleDisplay}`,
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-cream-200 text-charcoal">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontFamily: "'Inter', sans-serif",
              background: "#0B1D3A",
              color: "#FFFDF7",
              border: "1px solid rgba(70,130,180,0.3)",
              borderRadius: "12px",
            },
          }}
        />
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
