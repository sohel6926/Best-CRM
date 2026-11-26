import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from 'motion/react';

const EASE_CURVE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 22,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.55, delay, ease: EASE_CURVE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: EASE_CURVE,
    },
  },
};

export function StaggerGrid({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

export function FloatElement({
  children,
  className = '',
  distance = 8,
  duration = 5.5,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -distance, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function parseStatToken(raw: string) {
  const match = raw.match(/^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, numPart, suffix] = match;
  const useCommas = numPart.includes(',');
  const cleanNum = numPart.replace(/,/g, '');
  const decimalIdx = cleanNum.indexOf('.');
  const decimals = decimalIdx >= 0 ? cleanNum.length - decimalIdx - 1 : 0;
  const target = parseFloat(cleanNum);
  if (Number.isNaN(target)) return null;
  return { prefix, target, decimals, useCommas, suffix };
}

export function AnimatedCounter({
  value,
  duration = 1.4,
  delay = 0,
}: {
  value: string;
  duration?: number;
  delay?: number;
}) {
  const parsed = useMemo(() => parseStatToken(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReduced = useReducedMotion();

  const [display, setDisplay] = useState<string>(() => {
    if (!parsed) return value;
    const initial = (0).toFixed(parsed.decimals);
    return `${parsed.prefix}${initial}${parsed.suffix}`;
  });

  useEffect(() => {
    if (!parsed || prefersReduced) {
      setDisplay(value);
      return;
    }

    if (!isInView || hasAnimatedRef.current) return;

    let rafId = 0;
    let delayTimer = 0;
    const durationMs = Math.max(duration * 1000, 300);

    const startAnimation = () => {
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        // Smooth easeOutQuart deceleration
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = parsed.target * eased;

        const rounded =
          parsed.decimals > 0
            ? current.toFixed(parsed.decimals)
            : Math.round(current).toString();

        const formatted = parsed.useCommas
          ? Number(rounded).toLocaleString('en-US', {
              minimumFractionDigits: parsed.decimals,
              maximumFractionDigits: parsed.decimals,
            })
          : rounded;

        setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);

        if (progress < 1) {
          rafId = window.requestAnimationFrame(step);
        } else {
          hasAnimatedRef.current = true;
          setDisplay(value);
        }
      };

      rafId = window.requestAnimationFrame(step);
    };

    if (delay > 0) {
      delayTimer = window.setTimeout(startAnimation, delay * 1000);
    } else {
      startAnimation();
    }

    return () => {
      window.clearTimeout(delayTimer);
      window.cancelAnimationFrame(rafId);
    };
  }, [isInView, prefersReduced, value, duration, delay, parsed]);

  return (
    <span ref={ref} className="inline-block" aria-label={value}>
      {display}
    </span>
  );
}
