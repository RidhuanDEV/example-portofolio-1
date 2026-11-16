"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useDraggableNodes } from "@/lib/hooks/useDraggableNodes";

const nodes = [
  { id: "api",   label: "OIDC / API",     x: 62,  y: 90,  tone: "teal"   },
  { id: "rbac",  label: "138-Perm RBAC",  x: 238, y: 58,  tone: "amber"  },
  { id: "cache", label: "Redis / MQTT",   x: 420, y: 112, tone: "green"  },
  { id: "db",    label: "SQL / MongoDB",  x: 310, y: 236, tone: "teal"   },
  { id: "qa",    label: "E2E & MCP Gate", x: 100, y: 248, tone: "blue"   },
] as const;

interface ToneStyles {
  border: string;
  bg: string;
  text: string;
}

function darkTone(tone: (typeof nodes)[number]["tone"]): ToneStyles {
  if (tone === "amber")  return { border: "rgba(253,230,138,.50)", bg: "rgba(253,230,138,.08)", text: "#fde68a" };
  if (tone === "green")  return { border: "rgba(110,231,183,.50)", bg: "rgba(16,185,129,.08)",  text: "#6ee7b7" };
  if (tone === "blue")   return { border: "rgba(147,197,253,.50)", bg: "rgba(59,130,246,.08)",  text: "#93c5fd" };
  return                          { border: "rgba(94,234,212,.50)",  bg: "rgba(45,212,191,.08)",  text: "#99f6e4" };
}

const lightTone: ToneStyles = {
  border: "rgba(15,23,42,0.22)",
  bg:     "#ffffff",
  text:   "#0f172a",
};

const darkEdgeStrokes = [
  "rgba(94,234,212,.55)",
  "rgba(253,230,138,.55)",
  "rgba(147,197,253,.55)",
];

const lightEdgeStrokes = [
  "rgba(15,118,110,.55)",
  "rgba(15,23,42,.38)",
  "rgba(15,23,42,.38)",
];

export function SystemMapIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineOffset = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const nodeOffset = useTransform(scrollYProgress, [0, 1], [16, -16]);

  const containerBg     = isLight ? "#f8fafc" : "#0d0f12";
  const containerBorder = isLight ? "rgba(15,23,42,0.16)" : "rgba(255,255,255,0.1)";
  const metaColor       = isLight ? "#475569" : "#94a3b8";
  const edgeStrokes     = isLight ? lightEdgeStrokes : darkEdgeStrokes;

  const {
    nodes: nodesState,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    activeDragIndex,
  } = useDraggableNodes(
    nodes.map((n) => ({ ...n })),
    560,
    340,
    ref,
    132,
    58
  );

  const findNode = (id: string) => nodesState.find((n) => n.id === id);

  const getDynamicPath = (edgeIndex: number): string => {
    const api = findNode("api");
    const rbac = findNode("rbac");
    const cache = findNode("cache");
    const db = findNode("db");
    const qa = findNode("qa");

    if (!api || !rbac || !cache || !db || !qa) {
      return "";
    }

    if (edgeIndex === 0) {
      const x1 = api.x + 58;
      const y1 = api.y + 22;
      const x2 = cache.x;
      const y2 = cache.y + 18;
      const cp1x = api.x + 118;
      const cp1y = api.y - 12;
      const cp2x = api.x + 134;
      const cp2y = api.y - 14;
      const midx = api.x + 198;
      const midy = api.y - 4;
      const cp3x = cache.x - 82;
      const cp3y = cache.y + 2;
      return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${midx} ${midy} S ${cp3x} ${cp3y}, ${x2} ${y2}`;
    }
    if (edgeIndex === 1) {
      const x1 = rbac.x + 34;
      const y1 = rbac.y + 38;
      const x2 = db.x + 8;
      const y2 = db.y - 6;
      const cp1x = rbac.x + 52;
      const cp1y = rbac.y + 82;
      const cp2x = rbac.x + 64;
      const cp2y = rbac.y + 118;
      return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
    }
    if (edgeIndex === 2) {
      const x1 = qa.x + 14;
      const y1 = qa.y + 14;
      const x2 = db.x - 6;
      const y2 = db.y + 10;
      const cp1x = qa.x + 76;
      const cp1y = qa.y + 8;
      const cp2x = qa.x + 120;
      const cp2y = qa.y + 2;
      return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
    }
    return "";
  };

  return (
    <div
      ref={ref}
      className="relative min-h-[360px] overflow-hidden border p-4 select-none touch-none"
      style={{ backgroundColor: containerBg, borderColor: containerBorder }}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {!isLight && (
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      )}

      <motion.svg
        viewBox="0 0 560 340"
        className="absolute inset-0 h-full w-full pointer-events-none"
        style={reducedMotion ? undefined : { y: lineOffset }}
        aria-hidden="true"
      >
        {edgeStrokes.map((stroke, i) => (
          <path
            key={i}
            d={getDynamicPath(i)}
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            strokeDasharray="8 10"
          />
        ))}
      </motion.svg>

      {nodesState.map((node, index) => {
        const tone = isLight ? lightTone : darkTone(node.tone);
        const isDragged = activeDragIndex === index;

        return (
          <motion.div
            key={node.id}
            className="absolute w-[132px] border px-3 py-2 shadow-lg backdrop-blur select-none"
            style={{
              left: `${(node.x / 560) * 100}%`,
              top: `${(node.y / 340) * 100}%`,
              y: isDragged ? 0 : (reducedMotion ? undefined : nodeOffset),
              borderColor: tone.border,
              backgroundColor: tone.bg,
              color: tone.text,
              cursor: isDragged ? "grabbing" : "grab",
              touchAction: "none",
              zIndex: isDragged ? 30 : 10,
            }}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: isDragged ? 0 : index * 0.08 }}
            onPointerDown={(e) => onPointerDown(e, index)}
            onPointerUp={onPointerUp}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70 pointer-events-none">
              {node.id}
            </p>
            <p className="mt-1 text-sm font-medium pointer-events-none">{node.label}</p>
          </motion.div>
        );
      })}

      <div
        className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 text-[11px] pointer-events-none"
        style={{ color: metaColor }}
      >
        <span>strict contracts</span>
        <span>atomic state</span>
        <span>verified QA</span>
      </div>
    </div>
  );
}
