"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Metric } from "@/types/domain";
import type { Locale } from "@/lib/i18n";

interface MetricsBarProps {
  metrics: Metric[];
  locale: Locale;
}

export function MetricsBar({ metrics, locale }: MetricsBarProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="border-y border-white/10">
      <div className="mx-auto grid max-w-[92vw] lg:max-w-[80vw] md:grid-cols-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={`${metric.label.en}-${metric.value}`}
            className="border-white/10 py-6 md:border-r last:md:border-r-0 md:pr-6 md:pl-2 first:md:pl-0"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              {metric.label[locale] || metric.label.en}
            </p>
            <p className="mt-3 text-3xl font-semibold text-zinc-50">{metric.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
