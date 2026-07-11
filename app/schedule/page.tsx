"use client";

import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { WEDDING_CONFIG } from "@/lib/wedding-config";
import {
  Flower2,
  Flower,
  Gem,
  Wine,
  Sparkles,
  Music,
  Star,
  PartyPopper,
  HeartHandshake,
  Heart,
} from "lucide-react";

const events = [
  {
    time: "12:00 PM",
    title: "Guest Arrival",
    description: "Guests are welcomed and guided to their seats by ushers as we prepare for the ceremony.",
    icon: <Flower2 size={22} strokeWidth={1.5} className="text-gold-400" />,
    location: WEDDING_CONFIG.ceremonyVenue,
  },
  {
    time: "1:00 PM",
    title: "The Wedding Ceremony",
    description: "The exchange of vows and rings. We say 'I do' before God and our loved ones.",
    icon: <Gem size={22} strokeWidth={1.5} className="text-gold-400" />,
    location: WEDDING_CONFIG.ceremonyVenue,
    highlight: true,
  },
  {
    time: "2:30 PM",
    title: "Cocktail Hour & Photos",
    description: "Join us for drinks and hors d'oeuvres while the wedding party takes photos.",
    icon: <Wine size={22} strokeWidth={1.5} className="text-gold-400" />,
    location: WEDDING_CONFIG.receptionVenue,
  },
  {
    time: "4:00 PM",
    title: "Grand Entrance & Reception",
    description: "The newlyweds make their grand entrance! The celebration officially begins with music and joy.",
    icon: <Sparkles size={22} strokeWidth={1.5} className="text-gold-400" />,
    location: WEDDING_CONFIG.receptionVenue,
    highlight: true,
  },
  {
    time: "5:00 PM",
    title: "Dinner & Toasts",
    description: "A delicious feast featuring a blend of authentic Ghanaian and American cuisine, accompanied by heartfelt toasts.",
    icon: <PartyPopper size={22} strokeWidth={1.5} className="text-gold-400" />,
    location: WEDDING_CONFIG.receptionVenue,
  },
  {
    time: "6:30 PM",
    title: "First Dance & Open Dance Floor",
    description: "The couple shares their first dance, followed by a night of Afrobeats, Highlife, and endless dancing!",
    icon: <HeartHandshake size={22} strokeWidth={1.5} className="text-gold-400" />,
    location: WEDDING_CONFIG.receptionVenue,
  },
  {
    time: "9:30 PM",
    title: "Send-Off",
    description: "We exit with a joyful send-off as we begin our happily ever after!",
    icon: <Star size={22} strokeWidth={1.5} className="text-gold-400" />,
    location: WEDDING_CONFIG.receptionVenue,
  },
];

export default function SchedulePage() {
  return (
    <div className="min-h-screen" style={{ background: "#F5E6D0" }}>
      {/* Hero Banner */}
      <section
        className="page-hero-banner relative h-64 sm:h-80 flex items-center justify-center"
      >
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url('/pre2.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(11,29,58,0.5), rgba(11,29,58,0.85))" }} />
        <div className="relative z-10 text-center px-4">
          <Reveal>
            <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-gold-400 mb-3">
              {WEDDING_CONFIG.weddingDateDisplay}
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-light text-white">
              Day-of Schedule
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <SectionHeader
                label="Timeline"
                title="The Big Day"
                subtitle="Here's everything that's planned for our special day. We can't wait to share every moment with you."
              />
            </div>
          </Reveal>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ background: "linear-gradient(to bottom, #E0C9A4, #C47C3A, #E0C9A4)" }}
            />

            <div className="space-y-8">
              {events.map((event, i) => (
                <Reveal key={event.title} delay={i * 0.07}>
                  <div
                    className={`relative flex ${
                      i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                    } flex-row items-start gap-4 sm:gap-8`}
                  >
                    {/* Dot */}
                    <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 mt-1.5">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          event.highlight
                            ? "border-gold-400"
                            : "bg-white border-cream-400"
                        }`}
                        style={event.highlight ? { background: "#C47C3A", boxShadow: "0 0 12px rgba(196,124,58,0.35)" } : {}}
                      />
                    </div>

                    {/* Card */}
                    <div className={`flex-1 pl-16 text-left sm:pl-0 ${i % 2 === 0 ? "sm:pr-10 sm:text-right" : "sm:pl-10"}`}>
                      <div
                        className={`bg-white rounded-2xl p-5 sm:p-6 shadow-sm border card-hover ${
                          event.highlight
                            ? "border-gold-300/50"
                            : "border-cream-300/50"
                        }`}
                        style={event.highlight ? { background: "linear-gradient(to bottom right, #fff, #fdf8ee)" } : {}}
                      >
                        <div
                          className={`flex items-center gap-3 mb-3 ${
                            i % 2 === 0 ? "sm:flex-row-reverse" : ""
                          }`}
                        >
                          {event.icon}
                          <span className="font-sans text-xs font-semibold text-gold-500 uppercase tracking-[0.25em]">
                            {event.time}
                          </span>
                        </div>
                        <h3 className={`font-display text-xl font-medium text-navy-500 mb-2 text-center ${i % 2 === 0 ? "sm:text-right" : "sm:text-left"}`}>
                          {event.title}
                        </h3>
                        <p className="font-sans text-sm text-navy-500/55 leading-relaxed">
                          {event.description}
                        </p>
                        <p className={`font-sans text-xs text-gold-400/80 mt-2 font-medium flex items-center gap-1 ${i % 2 === 0 ? "sm:justify-end" : "justify-start"}`}>
                          — {event.location}
                        </p>
                      </div>
                    </div>

                    {/* Empty side */}
                    <div className="hidden sm:block flex-1" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
