"use client";

import { motion } from "framer-motion";

/** Fondu discret à chaque changement de page (remonté par Next.js via template.js). */
export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
