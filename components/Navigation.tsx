"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/wedding-config";

/* Center nav links (per spec) */
const navCenter = [
  { href: "/story",      label: "Our Story" },
  { href: "/details",    label: "Details" },
  { href: "/schedule",   label: "Schedule" },
  { href: "/gallery",    label: "Gallery" },
];

/* Full link list for mobile drawer */
const allLinks = [
  { href: "/",           label: "Home" },
  { href: "/story",      label: "Our Story" },
  { href: "/details",    label: "Details" },
  { href: "/schedule",   label: "Schedule" },
  { href: "/location",   label: "Location" },
  { href: "/dress-code", label: "Dress Code" },
  { href: "/registry",   label: "Registry" },
  { href: "/gallery",    label: "Gallery" },
  { href: "/faq",        label: "FAQ" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isHome = pathname === "/";

  /* Over the hero on home: always transparent + white text.
     On other pages / after scrolling: white/95 bg + dark text. */
  const navTransparent = isHome && !scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -72 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: navTransparent ? "transparent" : "rgba(255,253,248,0.97)",
          backdropFilter: navTransparent ? "none" : "blur(12px)",
          borderBottom: navTransparent ? "none" : "1px solid rgba(201,146,74,0.15)",
          boxShadow: navTransparent ? "none" : "0 2px 20px rgba(15,28,53,0.06)",
        }}
      >
        <div
          className="mx-auto px-6 sm:px-10 lg:px-14"
          style={{ maxWidth: "1280px" }}
        >
          <div
            className="flex items-center justify-between"
            style={{ height: "68px" }}
          >
            {/* ── LEFT: Monogram ── */}
            <Link href="/" className="shrink-0">
              <span
                className="font-display tracking-[0.3em]"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 400,
                  color: navTransparent ? "#fff" : "#0f1c35",
                  transition: "color 0.4s",
                }}
              >
                I&nbsp;|&nbsp;B
              </span>
            </Link>

            {/* ── CENTER: Nav links (desktop) ── */}
            <nav className="hidden lg:flex items-center gap-8">
              {navCenter.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative label-caps transition-colors duration-200"
                    style={{
                      fontSize: "11px",
                      color: navTransparent
                        ? (active ? "#c9924a" : "rgba(255,255,255,0.88)")
                        : (active ? "#c9924a" : "#0f1c35"),
                    }}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-px"
                        style={{ background: "#c9924a" }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── RIGHT: RSVP + hamburger ── */}
            <div className="flex items-center gap-4">
              <Link
                href="/rsvp"
                className="hidden lg:inline-flex items-center label-caps"
                style={{
                  fontSize: "11px",
                  padding: "9px 22px",
                  border: "1.5px solid #c9924a",
                  color: navTransparent ? "#c9924a" : "#c9924a",
                  background: "transparent",
                  letterSpacing: "0.2em",
                  transition: "background 0.25s, color 0.25s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#c9924a";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#c9924a";
                }}
              >
                RSVP Now
              </Link>

              {/* Mobile toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2"
                style={{
                  color: navTransparent ? "#fff" : "#0f1c35",
                  transition: "color 0.3s",
                }}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: "rgba(15,28,53,0.55)" }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 lg:hidden overflow-y-auto"
              style={{ background: "#0f1c35" }}
            >
              <div className="p-8">
                {/* Drawer header */}
                <div className="flex items-center justify-between mb-10">
                  <span
                    className="font-display tracking-[0.3em]"
                    style={{ fontSize: "1.1rem", fontWeight: 400, color: "#f5ede0" }}
                  >
                    I&nbsp;|&nbsp;B
                  </span>
                  <button
                    onClick={() => setMenuOpen(false)}
                    style={{ color: "rgba(245,237,224,0.6)" }}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="h-px mb-8" style={{ background: "rgba(201,146,74,0.25)" }} />

                <nav className="space-y-1">
                  {allLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        className="block py-3 px-2 label-caps transition-colors"
                        style={{
                          fontSize: "11px",
                          color: pathname === link.href
                            ? "#c9924a"
                            : "rgba(245,237,224,0.65)",
                          borderLeft: pathname === link.href
                            ? "2px solid #c9924a"
                            : "2px solid transparent",
                          paddingLeft: pathname === link.href ? "14px" : "8px",
                          transition: "all 0.2s",
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: allLinks.length * 0.04 }}
                  >
                    <Link
                      href="/rsvp"
                      className="mt-6 block text-center py-3 label-caps"
                      style={{
                        fontSize: "11px",
                        border: "1.5px solid #c9924a",
                        color: "#c9924a",
                      }}
                    >
                      RSVP Now
                    </Link>
                  </motion.div>
                </nav>

                <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(245,237,224,0.08)" }}>
                  <p className="label-caps" style={{ fontSize: "10px", color: "rgba(245,237,224,0.3)" }}>
                    {WEDDING_CONFIG.weddingDateDisplay}
                  </p>
                  <p
                    className="font-sans mt-1"
                    style={{ fontSize: "11px", color: "rgba(245,237,224,0.2)" }}
                  >
                    {WEDDING_CONFIG.ceremonyVenue}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
