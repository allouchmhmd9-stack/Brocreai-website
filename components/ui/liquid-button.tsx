"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "chrome" | "ice" | "ghost";

type Props = {
  href?: string;
  external?: boolean;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  /** Full width on phones, natural width from the sm breakpoint. */
  fluid?: boolean;
};

// Liquid-metal buttons in the brand blues. "chrome" is the primary (deep blue metal with a
// travelling highlight), "ice" is the lighter secondary. Styles live in globals.css (.liquid).
export function LiquidButton({ href, external, variant = "chrome", className, children, type = "button", disabled, onClick, fluid }: Props) {
  const reduce = useReducedMotion();
  const classes = cn("liquid", `liquid-${variant}`, fluid && "w-full sm:w-auto", className);
  const wrap = cn("inline-flex", fluid && "flex w-full sm:inline-flex sm:w-auto");
  const motionProps = reduce
    ? {}
    : { whileHover: { scale: 1.035 }, whileTap: { scale: 0.975 }, transition: { type: "spring" as const, stiffness: 420, damping: 26 } };

  if (href) {
    if (external) {
      return (
        <motion.a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...motionProps}>
          <span className="liquid-label">{children}</span>
        </motion.a>
      );
    }
    return (
      <motion.div className={wrap} {...motionProps}>
        <Link href={href} className={classes}>
          <span className="liquid-label">{children}</span>
        </Link>
      </motion.div>
    );
  }
  return (
    <motion.button type={type} disabled={disabled} onClick={onClick} className={classes} {...motionProps}>
      <span className="liquid-label">{children}</span>
    </motion.button>
  );
}
