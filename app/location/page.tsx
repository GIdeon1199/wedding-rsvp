"use client";

import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { WEDDING_CONFIG } from "@/lib/wedding-config";
import { MapPin, Car, Bus, ExternalLink } from "lucide-react";

const locations = [
  {
    name: WEDDING_CONFIG.ceremonyVenue,
    address: WEDDING_CONFIG.ceremonyAddress,
    time: `Ceremony at ${WEDDING_CONFIG.ceremonyTime}`,
    label: "Ceremony",
    parking: "",
    tips: [],
    mapUrl: `https://maps.google.com/?q=${encodeURIComponent(WEDDING_CONFIG.ceremonyAddress)}`,
    imgId: "1438232992991-995b7058bbb3",
  },
  {
    name: WEDDING_CONFIG.receptionVenue,
    address: WEDDING_CONFIG.receptionAddress,
    time: `Reception at ${WEDDING_CONFIG.receptionTime}`,
    label: "Reception",
    parking: "",
    tips: [],
    mapUrl: `https://maps.google.com/?q=${encodeURIComponent(WEDDING_CONFIG.receptionAddress)}`,
    imgId: "1568515387631-8b650bbcdb90",
  },
];

export default function LocationPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F5E6D0" }}>
      {/* Hero Banner */}
      <section
        className="page-hero-banner relative h-64 sm:h-80 flex items-center justify-center"
      >
        <div
          className="absolute inset-0 opacity-20"
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
              Pawtucket, Rhode Island
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-light text-white">
              Location & Parking
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Location Cards */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          {locations.map((loc, i) => (
            <Reveal key={loc.name + i} delay={i * 0.1}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cream-300/50">
                {/* Image header */}
                <div
                  className="h-64 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-${loc.imgId}?w=1200&q=70')`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-500/70 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="flex items-center gap-2 text-white mb-1">
                      <p className="font-sans text-[9px] uppercase tracking-[0.35em] text-gold-400 font-medium">{loc.label}</p>
                    </div>
                    <h3 className="font-display text-2xl font-light text-white">{loc.name}</h3>
                    <p className="font-sans text-xs text-white/65 flex items-center gap-1 mt-1">
                      <MapPin size={11} />
                      {loc.address}
                    </p>
                  </div>
                </div>

                <div className="p-8">
                  <div className={`grid grid-cols-1 gap-8 ${loc.parking || loc.tips.length > 0 ? 'sm:grid-cols-2' : 'max-w-md mx-auto'}`}>
                    {/* Parking info */}
                    {(loc.parking || loc.tips.length > 0) && (
                      <div>
                        {loc.parking && (
                          <>
                            <div className="flex items-center gap-2 mb-3">
                              <Car size={18} strokeWidth={1.5} className="text-gold-400" />
                              <h4 className="font-display text-lg text-center sm:text-left text-navy-500">Parking</h4>
                            </div>
                            <p className="font-sans text-sm text-navy-500/55 leading-relaxed mb-5">
                              {loc.parking}
                            </p>
                          </>
                        )}
                        {loc.tips.length > 0 && (
                          <>
                            <div className="flex items-center gap-2 mb-3">
                              <Bus size={18} strokeWidth={1.5} className="text-gold-400" />
                              <h4 className="font-display text-lg text-center sm:text-left text-navy-500">Getting Here</h4>
                            </div>
                            <ul className="space-y-2">
                              {loc.tips.map((tip) => (
                                <li key={tip} className="flex items-start gap-2 font-sans text-sm text-navy-500/55">
                                  <span className="text-gold-400 mt-1">·</span>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    )}

                    {/* Details sidebar */}
                    <div className="space-y-4">
                      <div className="rounded-2xl p-5 border border-cream-300/60" style={{ background: "#FDFAF5" }}>
                        <p className="font-sans text-[9px] uppercase tracking-[0.35em] text-gold-500 mb-2">
                          Event Time
                        </p>
                        <p className="font-display text-xl text-center sm:text-left text-navy-500">{loc.time}</p>
                        <p className="font-sans text-xs text-navy-500/40 mt-1">
                          {WEDDING_CONFIG.weddingDateDisplay}
                        </p>
                      </div>
                      <a
                        href={loc.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-accent flex items-center justify-center gap-2 w-full py-3 text-white font-sans text-xs font-medium uppercase tracking-[0.2em]"
                      >
                        <ExternalLink size={13} />
                        Open in Google Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Hotel block */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <SectionHeader
              label="Accommodations"
              title="Where to Stay"
              subtitle={<>While we recommend the <strong>Hampton Inn & Suites</strong>, please feel free to <strong>book any hotel in the area</strong> that best suits your needs.</>}
            />
            <div className="mt-8 rounded-2xl p-8 border border-cream-300/60" style={{ background: "#FDFAF5" }}>
              <p className="font-display text-xl text-center sm:text-left text-navy-500 mb-1">
                Hampton Inn & Suites Providence/Pawtucket (Suggested)
              </p>
              <p className="font-sans text-sm text-navy-500/55 mb-1 text-center sm:text-left">321 Fountain St, Pawtucket, RI 02860</p>
              
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
                <a
                  href="https://www.hilton.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-sans text-[11px] font-medium uppercase tracking-[0.2em] w-full sm:w-auto"
                >
                  Book Hampton Inn
                  <ExternalLink size={12} />
                </a>
                <a
                  href="https://www.google.com/maps/search/hotels+near+Pawtucket,+RI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-navy inline-flex items-center justify-center gap-2 px-6 py-3 text-navy-500 font-sans text-[11px] font-medium uppercase tracking-[0.2em] w-full sm:w-auto"
                >
                  View Other Hotels
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
