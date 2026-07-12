"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { WEDDING_CONFIG } from "@/lib/wedding-config";
import { ChevronDown, Mail } from "lucide-react";
import { ReactNode } from "react";

type FAQ = {
  q: string;
  a: ReactNode;
};

const faqs: FAQ[] = [
  {
    q: "Do I need an invitation to RSVP?",
    a: "No — this site is open to all invited guests. Simply fill out the RSVP form with your name and contact information. If you received a save-the-date card or personal invitation, you're on the list!",
  },
  {
    q: "What is the RSVP deadline?",
    a: <>Please RSVP by <strong>{WEDDING_CONFIG.rsvpDeadline}</strong>. After that date, we won't be able to guarantee your seat as final headcounts will be confirmed with our caterer and venue.</>,
  },
  {
    q: "Is the reception adults-only?",
    a: "Yes, the reception is an adults-only celebration (18+). Children are warmly welcome at the ceremony. We hope this gives parents the chance to relax and enjoy a special night out!",
  },
  {
    q: "Can I bring a plus one?",
    a: "Please check your invitation for plus-one details. If you received an invitation addressed to 'you and guest,' you are welcome to bring one additional guest. Please indicate this in your RSVP.",
  },
  {
    q: "What should I wear?",
    a: `The dress code is ${WEDDING_CONFIG.dressCode}. We'd love to see guests in elegant attire. Please check our Dress Code page for colour suggestions and style guidance. Please avoid wearing white or cream — that's for the bride!`,
  },
  {
    q: "Will there be transportation between venues?",
    a: <>The church service will be held at <strong>The Apostolic Church</strong>, and the reception will take place at the <strong>Portuguese Social Club</strong>. Guests are responsible for their own transportation between venues.</>,
  },
  {
    q: "Are there dietary accommodations?",
    a: "Absolutely! Please indicate any dietary restrictions (vegan, vegetarian, gluten-free, nut allergy, etc.) in your RSVP form. Our caterer is fully equipped to accommodate all dietary needs.",
  },
  {
    q: "What time should I arrive?",
    a: <>Please aim to arrive by <strong>{WEDDING_CONFIG.ceremonyTime}</strong> for the ceremony. Arriving late may disturb the ceremony, so we kindly ask all guests to be seated on time.</>,
  },
  {
    q: "Can I take photos during the ceremony?",
    a: "We're having an 'unplugged ceremony' — please keep phones and cameras away during the ceremony so everyone can be fully present. Our photographer will capture everything beautifully. Photography is absolutely encouraged at the reception!",
  },
  {
    q: "What if I have a question not answered here?",
    a: `We're happy to help! Reach out to us at ${WEDDING_CONFIG.contactEmail} or ${WEDDING_CONFIG.contactEmail2} and we'll get back to you as soon as possible.`,
  },
];

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={index * 0.05}>
      <div className="border border-cream-300/50 rounded-2xl overflow-hidden bg-white">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-cream-50/50"
        >
          <span className="font-display text-lg font-light text-navy-500">{faq.q}</span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 text-gold-400"
          >
            <ChevronDown size={18} />
          </motion.div>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-0">
                <div className="w-full h-px bg-cream-200 mb-4" />
                <p className="font-sans text-sm text-navy-500/55 leading-relaxed">{faq.a}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function FAQPage() {
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
              Everything you need to know
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-light text-white">
              FAQ
            </h1>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <SectionHeader
                label="Questions"
                title="We've Got Answers"
                subtitle="Can't find what you're looking for? Drop us a message anytime."
              />
            </div>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} index={i} />
            ))}
          </div>

          {/* Contact block */}
          <Reveal>
            <div className="mt-14 text-center bg-white rounded-2xl p-10 border border-cream-300/50">
              <div className="flex justify-center mb-5">
                <Mail size={36} strokeWidth={1} className="text-gold-400" />
              </div>
              <h3 className="font-display text-2xl font-light text-navy-500 mb-3">
                Still have a question?
              </h3>
              <p className="font-sans text-sm text-navy-500/55 mb-6">
                We&apos;d love to hear from you. Reach us any time and we&apos;ll respond within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`mailto:${WEDDING_CONFIG.contactEmail},${WEDDING_CONFIG.contactEmail2}`}
                  className="btn-accent inline-flex items-center justify-center gap-2 px-8 py-3 text-white font-sans font-medium text-xs uppercase tracking-[0.2em]"
                >
                  <Mail size={14} />
                  Email Us
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
