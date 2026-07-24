import { motion } from "framer-motion";
import type { PointerState } from "../types";

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

interface DecorativeLayerProps {
  isEnding: boolean;
  isPoem: boolean;
  pointer: PointerState;
  reducedMotion: boolean;
  showParticles: boolean;
}

function Strawberry({
  berry,
  isEnding,
  isPoem,
  pointer,
  reducedMotion,
  index,
}: {
  berry: (typeof strawberryField)[number];
  isEnding: boolean;
  isPoem: boolean;
  pointer: PointerState;
  reducedMotion: boolean;
  index: number;
}) {
  const offsetX = (pointer.x - 0.5) * 10;
  const offsetY = (pointer.y - 0.5) * 8;
  const parallax = reducedMotion ? 0 : offsetX * (0.03 + index * 0.004);

  return (
    <motion.span
      className="strawberry"
      style={{
        left: berry.left,
        top: berry.top,
        width: berry.size,
        height: berry.size * 1.15,
        transform: `translate3d(${parallax}px, ${offsetY * 0.02 + index * 0.4}px, 0)`,
      }}
      animate={{
        y: isEnding ? [-4, 26, -4] : [-8, 14, -8],
        x: isEnding ? [-3, 14, -3] : [-4, 8, -4],
        rotate: isEnding ? [-4, 6, -4] : [-7, 9, -7],
        opacity: isPoem ? [0.12, 0.24, 0.12] : isEnding ? [0.14, 0.34, 0.14] : [0.3, 0.75, 0.3],
      }}
      transition={{
        duration: reducedMotion ? 0 : isEnding ? berry.duration + 8 : berry.duration,
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

function DecorativeLayer({
  isEnding,
  isPoem,
  pointer,
  reducedMotion,
  showParticles,
}: DecorativeLayerProps) {
  return (
    <>
      <div className="strawberry-layer" aria-hidden="true">
        {strawberryField.map((berry, index) => (
          <Strawberry
            berry={berry}
            isEnding={isEnding}
            isPoem={isPoem}
            pointer={pointer}
            reducedMotion={reducedMotion}
            index={index}
            key={`${berry.left}-${index}`}
          />
        ))}
      </div>

      {showParticles ? (
        <motion.div
          className="particle-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
          transition={{ duration: reducedMotion ? 0.2 : 1.4, ease: "easeOut" }}
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
                y: reducedMotion ? [0] : [-10, 10, -10],
                opacity: reducedMotion ? [0.3] : [0.16, 0.85, 0.16],
                scale: reducedMotion ? [1] : [0.7, 1.2, 0.7],
              }}
              transition={{
                duration: reducedMotion ? 0 : particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      ) : null}
    </>
  );
}

export default DecorativeLayer;
