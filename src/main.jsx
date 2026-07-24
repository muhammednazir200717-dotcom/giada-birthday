import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Feather } from "lucide-react";
import "./styles.css";

const storySections = [
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
      "Overcome by curiosity, Psyche opened a forbidden box from the Underworld and fell into a death-like sleep. Eros rescued her, and Zeus, moved by their devotion, granted Psyche immortality\u2014uniting Love (Eros) and the Soul (Psyche) forever.",
  },
];

const strawberryField = [
  { left: "8%", top: "12%", size: 34, delay: 0, duration: 11 },
  { left: "22%", top: "72%", size: 24, delay: 0.6, duration: 13 },
  { left: "36%", top: "18%", size: 18, delay: 1.2, duration: 10 },
  { left: "52%", top: "78%", size: 30, delay: 0.3, duration: 12 },
  { left: "66%", top: "16%", size: 26, delay: 1.8, duration: 14 },
  { left: "82%", top: "64%", size: 36, delay: 0.9, duration: 12 },
  { left: "92%", top: "28%", size: 20, delay: 1.4, duration: 10 },
  { left: "14%", top: "42%", size: 18, delay: 2.1, duration: 15 },
  { left: "74%", top: "42%", size: 22, delay: 2.6, duration: 13 },
  { left: "44%", top: "52%", size: 16, delay: 3.1, duration: 11 },
];

const particleField = [
  { left: "12%", top: "22%", size: 4, delay: 0.1, duration: 5.5 },
  { left: "28%", top: "34%", size: 3, delay: 0.7, duration: 6.2 },
  { left: "42%", top: "18%", size: 5, delay: 1.1, duration: 5.8 },
  { left: "57%", top: "62%", size: 3, delay: 1.6, duration: 6.6 },
  { left: "70%", top: "26%", size: 4, delay: 0.4, duration: 5.9 },
  { left: "84%", top: "48%", size: 3, delay: 1.9, duration: 6.3 },
  { left: "18%", top: "78%", size: 5, delay: 2.2, duration: 7 },
  { left: "76%", top: "82%", size: 4, delay: 2.8, duration: 6.4 },
];

const pageVariants = {
  enter: (direction) => ({
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
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -72 : 72,
    rotateY: direction > 0 ? 10 : -10,
    scale: 0.985,
    filter: "blur(8px)",
    transformPerspective: 1100,
  }),
};

function Strawberry({ berry, isEnding, isPoem }) {
  return (
    <motion.span
      className="strawberry"
      style={{
        left: berry.left,
        top: berry.top,
        width: berry.size,
        height: berry.size * 1.15,
      }}
      animate={{
        y: isEnding ? [-4, 26, -4] : [-8, 14, -8],
        x: isEnding ? [-3, 14, -3] : [-4, 8, -4],
        rotate: isEnding ? [-4, 6, -4] : [-7, 9, -7],
        opacity: isPoem ? [0.12, 0.24, 0.12] : isEnding ? [0.14, 0.34, 0.14] : [0.3, 0.75, 0.3],
      }}
      transition={{
        duration: isEnding ? berry.duration + 8 : berry.duration,
        delay: berry.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    >
      <span className="strawberry-leaf" />
      <span className="strawberry-seed seed-one" />
      <span className="strawberry-seed seed-two" />
      <span className="strawberry-seed seed-three" />
    </motion.span>
  );
}

function FloatingStrawberries({ isEnding, isPoem }) {
  return (
    <div className="strawberry-layer" aria-hidden="true">
      {strawberryField.map((berry, index) => (
        <Strawberry
          berry={berry}
          isEnding={isEnding}
          isPoem={isPoem}
          key={`${berry.left}-${index}`}
        />
      ))}
    </div>
  );
}

function MagicParticles() {
  return (
    <motion.div
      className="particle-layer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      aria-hidden="true"
    >
      {particleField.map((particle, index) => (
        <motion.span
          className="particle"
          key={`${particle.left}-${index}`}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.16, 0.85, 0.16],
            scale: [0.7, 1.2, 0.7],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

function ProgressIndicator({ activeIndex }) {
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

function StoryControls({ onPrevious, onNext, isFirst, isFinalStory }) {
  return (
    <motion.nav
      className="controls"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.48, ease: "easeOut", delay: 0.12 }}
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

function Cover({ onBegin }) {
  return (
    <motion.section
      className="screen cover-screen"
      key="cover"
      custom={-1}
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
      >
        A silver myth for Giada
      </motion.p>
      <motion.h1
        className="cover-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, ease: "easeOut", delay: 0.22 }}
      >
        Psyche and Eros
      </motion.h1>
      <motion.p
        className="cover-copy"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, ease: "easeOut", delay: 0.32 }}
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
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.45 }}
      >
        Next
        <ChevronRight aria-hidden="true" size={20} />
      </motion.button>
    </motion.section>
  );
}

function StoryPage({ section, index, direction, onPrevious, onNext }) {
  return (
    <motion.section
      className="screen story-screen"
      key={section.title}
      custom={direction}
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="page-glow"
        initial={{ opacity: 0, x: direction > 0 ? -120 : 120 }}
        animate={{ opacity: [0, 0.55, 0], x: direction > 0 ? 120 : -120 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.05, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <ProgressIndicator activeIndex={index} />
      <motion.div
        className="story-card"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
      >
        <motion.p
          className="chapter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.22 }}
        >
          Section {index + 1}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, ease: "easeOut", delay: 0.28 }}
        >
          {section.title}
        </motion.h2>
        <motion.p
          className="story-body"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.68, ease: "easeOut", delay: 0.38 }}
        >
          {section.body}
        </motion.p>
      </motion.div>
      <StoryControls
        onPrevious={onPrevious}
        onNext={onNext}
        isFirst={index === 0}
        isFinalStory={index === storySections.length - 1}
      />
    </motion.section>
  );
}

function EndingLanding({ onOpenPoem }) {
  return (
    <motion.section
      className="screen ending-screen"
      key="ending"
      initial={{ opacity: 0, y: 34, scale: 0.985, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="ending-glow"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
        aria-hidden="true"
      />
      <motion.blockquote
        className="ending-quote"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, ease: "easeOut", delay: 0.28 }}
      >
        <span>Some stories are remembered.</span>
        <span>Some stories are lived.</span>
        <span>Some stories quietly become someone's own.</span>
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
          opacity: { duration: 0.75, delay: 0.7, ease: "easeOut" },
          y: { duration: 4.2, delay: 0.8, repeat: Infinity, ease: "easeInOut" },
        }}
        aria-label="Echoes of Psyche: A Poem"
      >
        <Feather aria-hidden="true" size={19} />
        <span>Echoes of Psyche: A Poem</span>
      </motion.button>
    </motion.section>
  );
}

function PoemPage({ onBack }) {
  return (
    <motion.section
      className="screen poem-screen"
      key="poem"
      initial={{ opacity: 0, y: 28, scale: 0.985, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -22, filter: "blur(8px)" }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.button
        className="back-button"
        type="button"
        onClick={onBack}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -3, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <ChevronLeft aria-hidden="true" size={18} />
        <span>Back</span>
      </motion.button>
      <motion.div
        className="poem-reading"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.16 }}
      >
        <p className="poem-placeholder">Your poem goes here...</p>
      </motion.div>
    </motion.section>
  );
}

function App() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [direction, setDirection] = useState(1);
  const [screen, setScreen] = useState("cover");
  const isEnding = screen === "ending";
  const isPoem = screen === "poem";
  const activeSection =
    screen === "story" && activeIndex >= 0 && activeIndex < storySections.length
      ? storySections[activeIndex]
      : null;

  const pageKey = useMemo(() => {
    if (isPoem) {
      return "poem";
    }

    if (isEnding) {
      return "ending";
    }

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

  const openPoem = () => {
    setScreen("poem");
  };

  const goBackFromPoem = () => {
    setScreen("ending");
  };

  return (
    <main className={`app-shell ${isEnding ? "ending-mode" : ""} ${isPoem ? "poem-mode" : ""}`}>
      <motion.div
        className="silver-aura"
        animate={{
          opacity: isEnding ? [0.82, 1, 0.82] : [0.68, 0.92, 0.68],
          scale: isEnding ? [1.05, 1.14, 1.05] : [1, 1.035, 1],
        }}
        transition={{ duration: isEnding ? 10 : 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <FloatingStrawberries isEnding={isEnding} isPoem={isPoem} />
      <AnimatePresence>{!isEnding && <MagicParticles />}</AnimatePresence>
      <AnimatePresence mode="wait" custom={direction}>
        {isPoem ? (
          <PoemPage key={pageKey} onBack={goBackFromPoem} />
        ) : isEnding ? (
          <EndingLanding key={pageKey} onOpenPoem={openPoem} />
        ) : activeSection ? (
          <StoryPage
            direction={direction}
            index={activeIndex}
            key={pageKey}
            onNext={goNext}
            onPrevious={goPrevious}
            section={activeSection}
          />
        ) : (
          <Cover key={pageKey} onBegin={beginStory} />
        )}
      </AnimatePresence>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
