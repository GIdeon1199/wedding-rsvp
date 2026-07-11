"use client";

import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { WEDDING_CONFIG } from "@/lib/wedding-config";
import { ExternalLink, Package, Target, Palmtree, Banknote, Zap, Globe } from "lucide-react";

const registries = [
  {
    name: "CashApp",
    description: "Send a gift directly to our CashApp.",
    icon: <Banknote size={28} strokeWidth={1.5} />,
    url: WEDDING_CONFIG.registry.cashapp,
    note: `$berylgyamf`,
    color: "#0B7A3A",
    bg: "#F0FDF5",
  },
  {
    name: "Zelle",
    description: "Quick and easy bank transfer via Zelle.",
    icon: <Zap size={28} strokeWidth={1.5} />,
    url: "#",
    note: WEDDING_CONFIG.registry.zelle,
    color: "#5A2080",
    bg: "#F8F0FF",
  },
];

export default function RegistryPage() {
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
              Your generosity means the world
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-light text-white">
              Registry
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Message */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <SectionHeader
              label="Gift Registry"
              title="From Our Hearts"
              subtitle="Your presence at our wedding is the greatest gift of all. If you'd like to celebrate with a gift, we've listed a few options below — but please know that nothing is expected."
            />
          </Reveal>
        </div>
      </section>

      {/* Registry cards */}
      <section className="py-16 px-6" style={{ background: "#F5E6D0" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {registries.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-6 border card-hover h-full flex flex-col"
                  style={{ background: r.bg, borderColor: r.color + "30" }}
                >
                  <div className="mb-4" style={{ color: r.color }}>
                    {r.icon}
                  </div>
                  <h3 className="font-display text-xl font-medium text-center sm:text-left text-navy-500 mb-2">
                    {r.name}
                  </h3>
                  <p className="font-sans text-sm text-navy-500/55 leading-relaxed mb-4 flex-1">
                    {r.description}
                  </p>
                  {r.note && (
                    <p
                      className="font-sans text-sm font-semibold mb-4 tracking-wide"
                      style={{ color: r.color }}
                    >
                      {r.note}
                    </p>
                  )}
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 text-white text-xs font-sans font-medium uppercase tracking-[0.2em] transition-all hover:opacity-90 hover:-translate-y-0.5"
                    style={{ background: r.color }}
                  >
                    <ExternalLink size={13} />
                    {r.note ? "Copy Details" : `View ${r.name.split(" ")[0]}`}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
