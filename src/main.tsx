import React, { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Feather } from "lucide-react";
import LoadingScreen from "./components/LoadingScreen";
import DecorativeLayer from "./components/DecorativeLayer";
import type { PointerState, ScreenName, StorySection } from "./types";
import "./styles.css";

const storySections: StorySection[] = [
  {
    title: "The Divine Rival",
    body:
      "Psyche was a mortal princess so beautiful that people abandoned the altars of Aphrodite to praise her. Enraged, the goddess of love sent her son, Eros, to curse Psyche into loving a monster. Instead, Eros fell in love with her himself.",
  },
  {
    title: "The Midnight Palace",
    body:
      "An oracle decreed Psyche must marry a terrifying beast. Instead, she was swept away to a hidden palace of luxury. Her new husband visited only in total darkness, loving her deeply but forbidding her from ever looking upon his face.",
  },
  {
    title: "The Broken Trust",
    body:
      "Manipulated by her jealous sisters, Psyche feared her husband was a monster. One night, she lit a lamp and discovered he was actually the beautiful god Eros. Startled, she spilled hot oil on him, and he vanished in heartbreak.",
  },
  {
    title: "The Impossible Tasks",
    body:
      "Desperate to win him back, Psyche surrendered to a vengeful Aphrodite. The goddess forced her through four lethal trials, including journeying to the Underworld. Against all odds, Psyche completed every single task.",
  },
  {
    title: "Soul and Love Unified",
    body:
      "Overcome by curiosity, Psyche opened a forbidden box from the Underworld and fell into a death-like sleep. Eros rescued her, and Zeus, moved by their devotion, granted Psyche immortality—uniting Love (Eros) and the Soul (Psyche) forever.",
  },
];

const pageVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 72 : -72,
    rotateY: direction > 0 ? -10 : 10,
    scale: 0.985,
    filter: "blur(8px)",
    transformPerspective: 1100,
  }),
  center: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    filter: "blur(0px)",
    transformPerspective: 1100,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -72 : 72,
    rotateY: direction > 0 ? 10 : -10,
    scale: 0.985,
    filter: "blur(8px)",
    transformPerspective: 1100,
  }),
};

interface ScreenProps {
  reducedMotion: boolean;
}

function ProgressIndicator({ activeIndex }: { activeIndex: number }) {
  return (
    <motion.div
      className="progress"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      aria-label={`Story progress ${activeIndex + 1} of ${storySections.length}`}
    >
      {storySections.map((section, index) => (
        <motion.span
          className={`progress-dot ${index === activeIndex ? "active" : ""}`}
          key={section.title}
          animate={{
            width: index === activeIndex ? 34 : 9,
            opacity: index <= activeIndex ? 1 : 0.42,
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      ))}
    </motion.div>
  );
}

function StoryControls({
  onPrevious,
  onNext,
  isFirst,
  isFinalStory,
  reducedMotion,
}: {
  onPrevious: () => void;
  onNext: () => void;
  isFirst: boolean;
  isFinalStory: boolean;
  reducedMotion: boolean;
}) {
  return (
    <motion.nav
      className="controls"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: reducedMotion ? 0.2 : 0.48, ease: "easeOut", delay: 0.12 }}
      aria-label="Story navigation"
    >
      <motion.button
        className="nav-button"
        type="button"
        onClick={onPrevious}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        aria-label={isFirst ? "Return to cover" : "Previous story section"}
      >
        <ChevronLeft aria-hidden="true" size={18} />
        Previous
      </motion.button>
      <motion.button
        className="nav-button primary"
        type="button"
        onClick={onNext}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        aria-label={isFinalStory ? "Continue to poem landing" : "Next story section"}
      >
        Next
        <ChevronRight aria-hidden="true" size={18} />
      </motion.button>
    </motion.nav>
  );
}

function Cover({ onBegin, reducedMotion }: { onBegin: () => void; reducedMotion: boolean }) {
  return (
    <motion.section
      className="screen cover-screen"
      key="cover"
      custom={-1}
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: reducedMotion ? 0.2 : 0.78, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.65, ease: "easeOut", delay: 0.12 }}
      >
        A silver myth for Giada
      </motion.p>
      <motion.h1
        className="cover-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.72, ease: "easeOut", delay: 0.22 }}
      >
        Psyche and Eros
      </motion.h1>
      <motion.p
        className="cover-copy"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.72, ease: "easeOut", delay: 0.32 }}
      >
        Turn the first page.
      </motion.p>
      <motion.button
        className="begin-button"
        type="button"
        onClick={onBegin}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3, scale: 1.025 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.55, ease: "easeOut", delay: 0.45 }}
      >
        Next
        <ChevronRight aria-hidden="true" size={20} />
      </motion.button>
    </motion.section>
  );
}

function StoryPage({
  section,
  index,
  direction,
  onPrevious,
  onNext,
  reducedMotion,
}: {
  section: StorySection;
  index: number;
  direction: number;
  onPrevious: () => void;
  onNext: () => void;
  reducedMotion: boolean;
}) {
  return (
    <motion.section
      className="screen story-screen"
      key={section.title}
      custom={direction}
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: reducedMotion ? 0.2 : 0.78, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="page-glow"
        initial={{ opacity: 0, x: direction > 0 ? -120 : 120 }}
        animate={{ opacity: [0, 0.55, 0], x: direction > 0 ? 120 : -120 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reducedMotion ? 0.2 : 1.05, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <ProgressIndicator activeIndex={index} />
      <motion.div
        className="story-card"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.7, ease: "easeOut", delay: 0.08 }}
      >
        <motion.p
          className="chapter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.5, delay: 0.22 }}
        >
          Section {index + 1}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.62, ease: "easeOut", delay: 0.28 }}
        >
          {section.title}
        </motion.h2>
        <motion.p
          className="story-body"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.68, ease: "easeOut", delay: 0.38 }}
        >
          {section.body}
        </motion.p>
      </motion.div>
      <StoryControls
        onPrevious={onPrevious}
        onNext={onNext}
        isFirst={index === 0}
        isFinalStory={index === storySections.length - 1}
        reducedMotion={reducedMotion}
      />
    </motion.section>
  );
}

function EndingLanding({ onOpenPoem, reducedMotion }: { onOpenPoem: () => void; reducedMotion: boolean }) {
  return (
    <motion.section
      className="screen ending-screen"
      key="ending"
      initial={{ opacity: 0, y: 34, scale: 0.985, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      transition={{ duration: reducedMotion ? 0.2 : 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="ending-glow"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reducedMotion ? 0.2 : 1.5, ease: "easeOut", delay: 0.1 }}
        aria-hidden="true"
      />
      <motion.blockquote
        className="ending-quote"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.95, ease: "easeOut", delay: 0.28 }}
      >
        <span>Some stories are remembered.</span>
        <span>Some stories are lived.</span>
        <span>Some stories quietly become someone&apos;s own.</span>
      </motion.blockquote>
      <motion.button
        className="poem-button"
        type="button"
        onClick={onOpenPoem}
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        whileHover={{ y: -5, scale: 1.035 }}
        whileTap={{ scale: 0.98 }}
        transition={{
          opacity: { duration: reducedMotion ? 0.2 : 0.75, delay: 0.7, ease: "easeOut" },
          y: { duration: reducedMotion ? 0.2 : 4.2, delay: 0.8, repeat: Infinity, ease: "easeInOut" },
        }}
        aria-label="Echoes of Psyche: A Poem"
      >
        <Feather aria-hidden="true" size={19} />
        <span>Echoes of Psyche: A Poem</span>
      </motion.button>
    </motion.section>
  );
}

function PoemPage({ onBack, reducedMotion }: { onBack: () => void; reducedMotion: boolean }) {
  return (
    <motion.section
      className="screen poem-screen"
      key="poem"
      initial={{ opacity: 0, y: 28, scale: 0.985, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -22, filter: "blur(8px)" }}
      transition={{ duration: reducedMotion ? 0.2 : 0.95, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.button
        className="back-button"
        type="button"
        onClick={onBack}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -3, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.5, ease: "easeOut" }}
      >
        <ChevronLeft aria-hidden="true" size={18} />
        <span>Back</span>
      </motion.button>
      <motion.div
        className="poem-reading"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.9, ease: "easeOut", delay: 0.16 }}
      >
        <p className="poem-placeholder" style={{ whiteSpace: "pre-line" }}>
          the sky is blue but not when i look at you
          i could see red and could see silver too
          because with you colors don't mean the same
          there's a special feeling when you call my name
          i begin to prance and i begin to dance much like you before it fell through

          song is playing what is that noise then check and see it is a Lana del ray song
          about love and about hate about how things don't always stay the same
          even when you hate you love but when you love you feel like you can never hate again

          summary of my feeling talking to you my little gia my strawberry loving cat
          i call you cat much like you say many times i think you wish you were born a cat instead

          walking long walking hard like in search of that special one what is special
          a question commonly asked well its what it is to a pirate when he has found his precious stone at last
          battling for years trial and tribulations much like a pirate you still stand
          much trauma much pain

          but i still see the strong gia at last the fighter the biter the gelato liker
          but mostly the gia who would understand a problem hidden in a bucket of glass
          forcing her hand in regardless of pain seeing the struggle and acknowledging the thats what you do for me
          i find it super cool

          Giada to put it simply i really appreciate you
        </p>
      </motion.div>
    </motion.section>
  );
}

function App() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [direction, setDirection] = useState(1);
  const [screen, setScreen] = useState<ScreenName>("cover");
  const [isLoaded, setIsLoaded] = useState(false);
  const [pointer, setPointer] = useState<PointerState>({ x: 0.5, y: 0.5 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(true), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      setPointer({ x, y });
    };

    const handlePointerLeave = () => setPointer({ x: 0.5, y: 0.5 });

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  const isEnding = screen === "ending";
  const isPoem = screen === "poem";
  const activeSection =
    screen === "story" && activeIndex >= 0 && activeIndex < storySections.length
      ? storySections[activeIndex]
      : null;

  const pageKey = useMemo(() => {
    if (isPoem) return "poem";
    if (isEnding) return "ending";
    return activeSection ? activeSection.title : "cover";
  }, [activeSection, isEnding, isPoem]);

  const beginStory = () => {
    setDirection(1);
    setScreen("story");
    setActiveIndex(0);
  };

  const goPrevious = () => {
    setDirection(-1);
    if (activeIndex <= 0) {
      setScreen("cover");
      setActiveIndex(-1);
      return;
    }
    setScreen("story");
    setActiveIndex((current) => current - 1);
  };

  const goNext = () => {
    setDirection(1);
    if (activeIndex >= storySections.length - 1) {
      setScreen("ending");
      setActiveIndex(storySections.length);
      return;
    }
    setScreen("story");
    setActiveIndex((current) => current + 1);
  };

  const openPoem = () => setScreen("poem");
  const goBackFromPoem = () => setScreen("ending");

  return (
    <main
      className={`app-shell ${isEnding ? "ending-mode" : ""} ${isPoem ? "poem-mode" : ""}`}
      onPointerMove={(event) => {
        const x = event.clientX / window.innerWidth;
        const y = event.clientY / window.innerHeight;
        setPointer({ x, y });
      }}
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="center-cherry" aria-hidden="true" />
      <motion.div
        className="silver-aura"
        animate={{
          opacity: isEnding ? [0.82, 1, 0.82] : [0.68, 0.92, 0.68],
          scale: isEnding ? [1.05, 1.14, 1.05] : [1, 1.035, 1],
          x: reducedMotion ? 0 : (pointer.x - 0.5) * 14,
          y: reducedMotion ? 0 : (pointer.y - 0.5) * 12,
        }}
        transition={{ duration: reducedMotion ? 0.2 : 10, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="cursor-glow"
        animate={{
          x: reducedMotion ? 0 : `${(pointer.x - 0.5) * 36}%`,
          y: reducedMotion ? 0 : `${(pointer.y - 0.5) * 28}%`,
          opacity: reducedMotion ? 0 : 0.75,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        aria-hidden="true"
      />
      <Suspense fallback={null}>
        <DecorativeLayer
          isEnding={isEnding}
          isPoem={isPoem}
          pointer={pointer}
          reducedMotion={reducedMotion}
          showParticles={!isEnding && !isPoem}
        />
      </Suspense>
      <AnimatePresence>{!isLoaded && <LoadingScreen visible={!isLoaded} />}</AnimatePresence>
      <div id="main-content" className="screen-shell">
        <AnimatePresence mode="wait" custom={direction}>
          {isPoem ? (
            <PoemPage key={pageKey} onBack={goBackFromPoem} reducedMotion={reducedMotion} />
          ) : isEnding ? (
            <EndingLanding key={pageKey} onOpenPoem={openPoem} reducedMotion={reducedMotion} />
          ) : activeSection ? (
            <StoryPage
              direction={direction}
              index={activeIndex}
              key={pageKey}
              onNext={goNext}
              onPrevious={goPrevious}
              section={activeSection}
              reducedMotion={reducedMotion}
            />
          ) : (
            <Cover key={pageKey} onBegin={beginStory} reducedMotion={reducedMotion} />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
