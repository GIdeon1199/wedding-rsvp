"use client";

import Reveal from "@/components/Reveal";
import { WEDDING_CONFIG } from "@/lib/wedding-config";
import Image from "next/image";

export default function StoryPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F5E6D0" }}>
      {/* Hero Banner */}
      <section className="page-hero-banner relative h-64 sm:h-80 flex items-center justify-center">
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
              How We Met
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-light text-white">
              Our Story
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-20 px-6 sm:px-10 max-w-4xl mx-auto">
        <Reveal>
          <div className="bg-white rounded-3xl p-8 sm:p-14 shadow-sm border border-cream-300/60 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

            <div className="relative z-10 space-y-8">
              <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden shadow-md mb-8">
                <Image
                  src="/pre1.jpg"
                  alt="Ishmael and Beryl"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="font-display text-4xl text-navy-500 text-center mb-10">
                Beryl&apos;s POV
              </h2>
              
              <div className="space-y-6 font-sans text-navy-500/75 leading-loose text-[15px]">
                <p>
                  It all began on an ordinary Monday, October 21, 2024, around 5:00 p.m. As I was walking to class, a young man stopped me to tell me I looked beautiful. I thanked him and jokingly asked if he was Nigerian because he looked like one. I certainly wasn&apos;t expecting to meet another Ghanaian on campus!
                </p>
                <p>
                  With a smile, he replied, &quot;No, I&apos;m Ghanaian.&quot; Excited, I told him I was Ghanaian too, and from that moment, our conversation flowed so naturally that it felt like we&apos;d known each other for years. Unfortunately, we had to part ways sooner than we wanted because my class was about to begin.
                </p>
                <p>
                  About a week later, he shared that he was interested in getting to know me better. While I appreciated his honesty, I told him it felt a little too soon—even though I had already taken a liking to him. We stayed in touch for a while, but eventually life took us in different directions, and our conversations became less frequent.
                </p>
                <p>
                  Some time later, he mentioned that he had been unwell, so I decided to visit him. During that visit, he expressed his feelings once again. This time, I chose to give us a chance.
                </p>
                <p>
                  Looking back, that simple conversation on the way to class was the beginning of something neither of us could have imagined. What started with a compliment and a shared Ghanaian connection has grown into a love story built on friendship, faith, and God&apos;s perfect timing. And now, here we are—excited to begin the next chapter of our lives together.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 py-10">
                <div className="h-px w-12 bg-gold-400/50" />
                <div className="w-2 h-2 rotate-45 border border-gold-400" />
                <div className="h-px w-12 bg-gold-400/50" />
              </div>

              <h2 className="font-display text-4xl text-navy-500 text-center mb-10">
                Ishmael&apos;s POV
              </h2>
              
              <div className="space-y-6 font-sans text-navy-500/75 leading-loose text-[15px]">
                <p>
                  On that memorable day, I had finished class earlier than usual because Professor Lavin needed to take his son to the doctor. We had already completed the week&apos;s lesson, so class ended ahead of schedule.
                </p>
                <p>
                  As I walked down the staircase outside the Xavier Academic Complex, I noticed a beautiful young African woman. Her natural curly hair, radiant dark skin, and quiet elegance immediately caught my attention. There was something about her that made me stop and look again.
                </p>
                <p>
                  As I walked closer, I couldn&apos;t help but admire how beautiful she was. Then she noticed me looking in her direction. Before I could overthink it, I smiled and said, &quot;You look beautiful.&quot; She smiled back.
                </p>
                <p>
                  That smile... it completely swept me off my feet. It was warm, genuine, and incredibly infectious. I found myself smiling too, and without hesitation I said, &quot;You have a wonderful smile.&quot;
                </p>
                <p>
                  It felt as though we had known each other for so long. The conversation flowed effortlessly. There was no awkwardness, just two people genuinely enjoying each other&apos;s company. We sat down and talked, and for those few precious minutes, neither of us wanted the conversation to end. It truly felt like love at first sight.
                </p>
                <p>
                  The chemistry between us was undeniable. There was a peace, an excitement, and a feeling deep within me that I had never experienced before. It was as though God had orchestrated that exact moment for our paths to cross. I had never felt such an immediate and profound attraction. There was this sweetness and certainty in my heart that I couldn&apos;t explain then, and even today, I still feel that same feeling whenever I think about that day.
                </p>
                <p>
                  What amazes me most is that if I hadn&apos;t found the courage to speak to her, that moment might have been my only chance. We were simply two students passing through campus on an ordinary afternoon, yet that ordinary day became the day that changed my life forever. That beautiful woman was Beryl, my soon-to-be wife.
                </p>
                <p>
                  Finding Beryl is one of God&apos;s greatest blessings in my life. She is no longer just someone I met on campus; she is my best friend, my partner, my greatest source of joy, and an irreplaceable part of my life&apos;s journey. She is woven into my story, my legacy, and every dream I have for the future.
                </p>
                <p>
                  I thank God every day that He gave me the courage to speak to her. One simple conversation led me to the woman I now have the privilege of calling my own. I love Beryl deeply, and with God&apos;s help, I will continue to cherish, honor, and remain carefully committed to her for the rest of our lives together.
                </p>
              </div>

              <div className="pt-10 pb-4 text-center">
                <p className="font-script text-4xl text-gold-500 mb-2">
                  {WEDDING_CONFIG.scriptDisplay}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
