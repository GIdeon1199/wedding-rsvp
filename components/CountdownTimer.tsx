"use client";

import { useState, useEffect } from "react";
import { WEDDING_CONFIG } from "@/lib/wedding-config";

interface TimeLeft {
  days: number; hours: number; minutes: number; seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = WEDDING_CONFIG.weddingDate.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

interface CountdownTimerProps {
  dark?: boolean;
  variant?: "default" | "band";
}

export default function CountdownTimer({ dark = false, variant = "default" }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  const units = [
    { value: timeLeft.days,    label: "Days" },
    { value: timeLeft.hours,   label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  if (variant === "band") {
    return (
      <div className="flex items-center justify-center gap-0 flex-wrap">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center">
            <div className="flex flex-col items-center px-6 sm:px-10">
              <div className="countdown-number">{unit.value}</div>
              <div className="countdown-label mt-1">{unit.label}</div>
            </div>
            {i < 3 && (
              <div className="countdown-pipe" style={{ opacity: 0.55 }}>|</div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 sm:gap-5">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-start gap-3 sm:gap-5">
          <div className="text-center">
            <div
              className="font-display tabular-nums"
              style={{
                fontSize: "clamp(2.8rem,8vw,4rem)",
                fontWeight: 400,
                color: dark ? "#1a1a1a" : "#fff",
                lineHeight: 1,
              }}
            >
              {String(unit.value).padStart(2, "0")}
            </div>
            <div
              className="label-caps mt-1"
              style={{
                fontSize: "10px",
                color: dark ? "rgba(26,26,26,0.45)" : "rgba(245,237,224,0.55)",
              }}
            >
              {unit.label}
            </div>
          </div>
          {i < 3 && (
            <span
              className="font-display"
              style={{
                fontSize: "clamp(1.8rem,4vw,2.8rem)",
                fontWeight: 300,
                color: "#c9924a",
                marginTop: "4px",
              }}
            >
              |
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
