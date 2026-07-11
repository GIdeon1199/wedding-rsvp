"use client";

import Link from "next/link";
import { Camera, Mail, Phone } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/wedding-config";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "#0f1c35" }} className="text-white">
      <div
        className="mx-auto px-6 py-16 text-center"
        style={{ maxWidth: "900px" }}
      >
        {/* Monogram + divider */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-12" style={{ background: "rgba(201,146,74,0.35)" }} />
            <span style={{ color: "#c9924a", fontSize: "11px" }}>✦</span>
            <div className="h-px w-12" style={{ background: "rgba(201,146,74,0.35)" }} />
          </div>
          <p
            className="font-display tracking-[0.3em] mb-2"
            style={{ fontSize: "2rem", fontWeight: 400, color: "#f5ede0" }}
          >
            I&nbsp;|&nbsp;B
          </p>
          <p className="font-script" style={{ fontSize: "1.6rem", color: "#c9924a", lineHeight: 1.3 }}>
            {WEDDING_CONFIG.scriptDisplay}
          </p>
          <p
            className="label-caps mt-3"
            style={{ fontSize: "10px", color: "rgba(245,237,224,0.35)" }}
          >
            {WEDDING_CONFIG.weddingDateDisplay} · {WEDDING_CONFIG.ceremonyVenue}
          </p>
        </div>

        <div className="h-px mb-8 mx-auto w-16" style={{ background: "linear-gradient(90deg,transparent,#c9924a,transparent)" }} />

        {/* Nav links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {[
            { href: "/",           label: "Home" },
            { href: "/details",    label: "Details" },
            { href: "/schedule",   label: "Schedule" },
            { href: "/location",   label: "Location" },
            { href: "/registry",   label: "Registry" },
            { href: "/gallery",    label: "Gallery" },
            { href: "/faq",        label: "FAQ" },
            { href: "/rsvp",       label: "RSVP" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="label-caps hover:text-yellow-300 transition-colors"
              style={{ fontSize: "10px", color: "rgba(245,237,224,0.4)" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex justify-center gap-4 mb-8">
          {[
            { href: `mailto:${WEDDING_CONFIG.contactEmail},${WEDDING_CONFIG.contactEmail2}`, icon: <Mail size={14} /> },
            { href: "/gallery",                               icon: <Camera size={14} /> },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="w-9 h-9 flex items-center justify-center transition-colors"
              style={{
                border: "1px solid rgba(245,237,224,0.12)",
                color: "rgba(245,237,224,0.35)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,146,74,0.6)";
                (e.currentTarget as HTMLElement).style.color = "#c9924a";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,237,224,0.12)";
                (e.currentTarget as HTMLElement).style.color = "rgba(245,237,224,0.35)";
              }}
            >
              {item.icon}
            </a>
          ))}
        </div>

        <p
          className="label-caps"
          style={{ fontSize: "10px", color: "rgba(245,237,224,0.18)" }}
        >
          {WEDDING_CONFIG.hashtag}&nbsp;·&nbsp;Made with love&nbsp;·&nbsp;© {year}
        </p>
      </div>
    </footer>
  );
}
