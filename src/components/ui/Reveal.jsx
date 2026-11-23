"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/** Apparition progressive au scroll (jouée une seule fois). */
export default function Reveal({
  as = "div",
  delay = 0,
  y = 28,
  duration = 0.75,
  className,
  children,
  ...rest
}) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
