"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

// Scroll reveals, the same feel as the brokerage site: fade and rise once, on entry.
// data-reveal lets a <noscript> rule keep everything visible when JavaScript is off.
const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export function Reveal({ children, delay = 0, y = 28, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

type GroupProps = { children: ReactNode; className?: string; as?: "div" | "ul" | "ol" };

export function Stagger({ children, className, as = "div" }: GroupProps) {
  const props = { className, variants: container, initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-60px" } } as const;
  if (as === "ul") return <motion.ul {...props}>{children}</motion.ul>;
  if (as === "ol") return <motion.ol {...props}>{children}</motion.ol>;
  return <motion.div {...props}>{children}</motion.div>;
}

type ItemProps = { children: ReactNode; className?: string; as?: "div" | "li"; style?: CSSProperties; id?: string };

export function StaggerItem({ children, className, as = "div", style, id }: ItemProps) {
  if (as === "li")
    return (
      <motion.li id={id} data-reveal className={className} style={style} variants={item}>
        {children}
      </motion.li>
    );
  return (
    <motion.div id={id} data-reveal className={className} style={style} variants={item}>
      {children}
    </motion.div>
  );
}
