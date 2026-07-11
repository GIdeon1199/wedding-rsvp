"use client";

import { ReactNode } from "react";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string | ReactNode;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  center = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={center ? "text-center" : ""}>
      {label && (
        <p
          className="label-caps mb-4"
          style={{ color: light ? "#c9924a" : "#c9924a", fontSize: "11px" }}
        >
          {label}
        </p>
      )}
      <h2
        className="font-display"
        style={{
          fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
          fontWeight: 400,
          lineHeight: 1.15,
          color: light ? "#f5ede0" : "#1a1a1a",
          marginBottom: "20px",
        }}
      >
        {title}
      </h2>

      {/* Diamond divider */}
      <div
        className={`flex items-center gap-3 mb-5 ${center ? "justify-center" : ""}`}
      >
        <div className="h-px w-12" style={{ background: "rgba(201,146,74,0.5)" }} />
        <span style={{ color: "#c9924a", fontSize: "11px" }}>✦</span>
        <div className="h-px w-12" style={{ background: "rgba(201,146,74,0.5)" }} />
      </div>

      {subtitle && (
        <p
          className="font-sans leading-relaxed"
          style={{
            fontSize: "14px",
            color: light ? "rgba(245,237,224,0.7)" : "rgba(26,26,26,0.6)",
            maxWidth: "600px",
            margin: center ? "0 auto" : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
