import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import a1 from "@/assets/adel/adel-1.jpg";
import a2 from "@/assets/adel/adel-2.jpg";
import a3 from "@/assets/adel/adel-3.jpg";
import a4 from "@/assets/adel/adel-4.jpg";
import a5 from "@/assets/adel/adel-5.jpg";
import a6 from "@/assets/adel/adel-6.jpg";
import a7 from "@/assets/adel/adel-7.jpg";
import a8 from "@/assets/adel/adel-8.jpg";

export const Route = createFileRoute("/")({
  component: Birthday,
  head: () => ({
    meta: [
      { title: "Happy Birthday, Debo" },
      { name: "description", content: "A small place built just for you, on your day." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Karla:wght@300;400;500&display=swap",
      },
    ],
  }),
});

const photos = [a1, a2, a3, a4, a5, a6, a7, a8];

const letters = [
  {
    title: "For the one who matters",
    body: "Today the world gets a little louder, because it is your day.",
  },
  {
    title: "What you are to me",
    body: "You are my sister, my first friend, the steady voice I hear when everything else is noise. I have watched you grow into someone strong and kind, and I am proud of you in a way words barely reach.",
  },
  {
    title: "Thank you",
    body: "Thank you for the late calls, the long silences that never felt empty, the small jokes only we understand. Thank you for being patient with me when I was not easy to love.",
  },
  {
    title: "My wish for you",
    body: "May this year be soft where you have been tired, and bright where you have waited too long in the dark. May good people find you. May your work bloom. May you laugh more than you cry.",
  },
  {
    title: "Always",
    body: "Wherever you go, I am still here. One message away. One flight away. One memory away. Happy birthday, Debo. The world is better because you are in it.",
  },
];

function Embers() {
  const [items, setItems] = useState<{ left: number; delay: number; dur: number; id: number }[]>([]);
  useEffect(() => {
    setItems(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        dur: 8 + Math.random() * 10,
      })),
    );
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {items.map((e) => (
        <span
          key={e.id}
          className="ember"
          style={{ left: `${e.left}%`, animationDelay: `${e.delay}s`, animationDuration: `${e.dur}s` }}
        />
      ))}
    </div>
  );
}

function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const a = new Audio("/music.mp3");
    a.loop = true;
    a.volume = 0.35;
    audioRef.current = a;
    setReady(true);
    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        // ignore
      }
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={!ready}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-border bg-card/70 px-5 py-3 text-xs uppercase tracking-[0.3em] text-foreground backdrop-blur-md transition hover:bg-card hover:scale-105"
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inset-0 rounded-full ${playing ? "bg-primary animate-ping" : "bg-muted-foreground"}`}
        />
        <span className={`relative h-2 w-2 rounded-full ${playing ? "bg-primary" : "bg-muted-foreground"}`} />
      </span>
      {playing ? "Music on" : "Play music"}
    </button>
  );
}

function HeroPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);
  return (
    <div ref={ref} className="relative mx-auto mt-16 h-[60vh] w-[min(90vw,400px)] overflow-hidden rounded-[2rem] border border-border shadow-2xl">
      <motion.img
        src={a1}
        alt="Adel"
        style={{ y, scale }}
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" />
    </div>
  );
}

function Gallery() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-16 text-center"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-accent">Moments</p>
        <h2 className="mt-6 text-4xl italic text-foreground sm:text-6xl">A few of you</h2>
      </motion.div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
        {photos.map((src, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: (i % 3) * 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.03, y: -6 }}
            className={`group relative overflow-hidden rounded-2xl border border-border shadow-xl ${
              i % 5 === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[3/4]"
            }`}
          >
            <img
              src={src}
              alt={`Adel — moment ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-30" />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

function Birthday() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.28 0.08 35 / 0.8) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, oklch(0.22 0.06 25 / 0.6) 0%, transparent 50%)",
        }}
      />
      <Embers />
      <MusicToggle />

      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-20 pt-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-sm uppercase tracking-[0.4em] text-accent"
        >
          For my sister
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.2 }}
          className="mt-8 text-6xl leading-[1.05] text-foreground sm:text-8xl md:text-9xl"
        >
          Happy Birthday,
          <br />
          <span className="italic text-primary">Deborah</span>
        </motion.h1>
        <HeroPortrait />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 1 }}
          className="mt-10 max-w-md text-base text-muted-foreground"
        >
          Scroll slowly. Turn the music on. I made all of this for you.
        </motion.p>
      </section>

      <section className="relative mx-auto max-w-2xl px-6 py-32">
        {letters.map((l, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-32 last:mb-0"
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="text-xs uppercase tracking-[0.3em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <h2 className="text-4xl text-foreground sm:text-5xl">
              <span className="italic">{l.title}</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground sm:text-xl">{l.body}</p>
          </motion.article>
        ))}
      </section>

      <Gallery />

      <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6 }}
        >
          <p className="text-sm uppercase tracking-[0.4em] text-accent">One more thing</p>
          <h2 className="mt-10 text-5xl italic text-primary sm:text-7xl">I love you, sis.</h2>
          <p className="mt-10 text-base text-muted-foreground">— Your brother</p>
        </motion.div>
      </section>
    </main>
  );
}
