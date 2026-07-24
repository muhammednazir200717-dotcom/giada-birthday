import { motion } from "framer-motion";

interface LoadingScreenProps {
  visible: boolean;
}

function LoadingScreen({ visible }: LoadingScreenProps) {
  if (!visible) {
    return null;
  }

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      role="status"
      aria-live="polite"
    >
      <div className="loading-card">
        <motion.div
          className="loading-ornament"
          initial={{ scale: 0.88, opacity: 0.4 }}
          animate={{ scale: [0.9, 1.02, 0.95], opacity: [0.5, 1, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <p>Opening the evening…</p>
      </div>
    </motion.div>
  );
}

export default LoadingScreen;
