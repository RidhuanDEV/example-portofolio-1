"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useDraggableNodes } from "@/lib/hooks/useDraggableNodes";
import type { DiagramNode, DiagramTone } from "@/types/domain";

interface ArchitectureDiagramProps {
  title: string;
  nodes?: DiagramNode[];
}

interface NodeDef {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fillDark: string;
  strokeDark: string;
  fillLight: string;
  strokeLight: string;
}

const slotTemplates: Array<{
  x: number;
  y: number;
  width: number;
  height: number;
  defaultTone: DiagramTone;
}> = [
  { x: 20, y: 78, width: 160, height: 74, defaultTone: "teal" },
  { x: 295, y: 34, width: 170, height: 74, defaultTone: "amber" },
  { x: 295, y: 152, width: 170, height: 74, defaultTone: "green" },
  { x: 580, y: 92, width: 160, height: 74, defaultTone: "blue" },
];

const defaultCustomNodes: DiagramNode[] = [
  { id: "client", label: "Client / UI", tone: "teal" },
  { id: "policy", label: "Auth / Policy", tone: "amber" },
  { id: "cache", label: "Cache / Queue", tone: "green" },
  { id: "store", label: "Primary Store", tone: "blue" },
];

function paletteForTone(tone: DiagramTone): Pick<NodeDef, "fillDark" | "strokeDark" | "fillLight" | "strokeLight"> {
  if (tone === "amber") {
    return {
      fillDark: "rgba(253,230,138,.08)",
      strokeDark: "rgba(253,230,138,.5)",
      fillLight: "rgba(180,83,9,0.06)",
      strokeLight: "#b45309",
    };
  }
  if (tone === "green") {
    return {
      fillDark: "rgba(16,185,129,.08)",
      strokeDark: "rgba(110,231,183,.5)",
      fillLight: "rgba(15,118,110,0.06)",
      strokeLight: "#0f766e",
    };
  }
  if (tone === "blue") {
    return {
      fillDark: "rgba(147,197,253,.08)",
      strokeDark: "rgba(147,197,253,.5)",
      fillLight: "rgba(15,23,42,0.05)",
      strokeLight: "#0f172a",
    };
  }
  return {
    fillDark: "rgba(45,212,191,.08)",
    strokeDark: "rgba(94,234,212,.55)",
    fillLight: "rgba(15,118,110,0.06)",
    strokeLight: "#0f766e",
  };
}

function buildInitialNodes(customNodes?: DiagramNode[]): NodeDef[] {
  const source = customNodes && customNodes.length >= 4 ? customNodes.slice(0, 4) : defaultCustomNodes;
  return slotTemplates.map((slot, index) => {
    const item = source[index] ?? defaultCustomNodes[index];
    const tone = item.tone ?? slot.defaultTone;
    const palette = paletteForTone(tone);
    return {
      label: item.label,
      x: slot.x,
      y: slot.y,
      width: slot.width,
      height: slot.height,
      ...palette,
    };
  });
}

const edgeColors = [
  { dark: "rgb(94 234 212)", light: "#0f766e" },
  { dark: "rgb(110 231 183)", light: "#0f766e" },
  { dark: "rgb(147 197 253)", light: "#334155" },
  { dark: "rgb(147 197 253)", light: "#334155" },
];

export function ArchitectureDiagram({ title, nodes }: ArchitectureDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const initialNodes = useMemo(() => buildInitialNodes(nodes), [nodes]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const dashOffset = useTransform(scrollYProgress, [0, 1], [80, 0]);

  const {
    nodes: nodesState,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    activeDragIndex,
  } = useDraggableNodes<NodeDef>(
    initialNodes,
    760,
    260,
    ref,
    170,
    74
  );

  const arrowFill = isLight ? "#0f766e" : "rgb(94 234 212)";
  const labelColor = isLight ? "#0f172a" : "#f4f4f5";
  const containerBg = isLight ? "#f8fafc" : "#0c0e11";
  const containerBorder = isLight ? "rgba(15,23,42,0.16)" : "rgba(255,255,255,0.1)";
  const titleColor = isLight ? "#0f766e" : "rgb(153 246 228)";
  const subtitleColor = isLight ? "#475569" : "#94a3b8";

  const getDynamicPath = (edgeIndex: number): string => {
    const n0 = nodesState[0];
    const n1 = nodesState[1];
    const n2 = nodesState[2];
    const n3 = nodesState[3];
    if (!n0 || !n1 || !n2 || !n3) return "";

    if (edgeIndex === 0) {
      const x1 = n0.x + n0.width;
      const y1 = n0.y + 34;
      const x2 = n1.x;
      const y2 = n1.y + 38;
      return `M${x1} ${y1} C${x1 + 56} ${y1} ${x2 - 58} ${y2} ${x2} ${y2}`;
    }
    if (edgeIndex === 1) {
      const x1 = n0.x + n0.width;
      const y1 = n0.y + 48;
      const x2 = n2.x;
      const y2 = n2.y + 36;
      return `M${x1} ${y1} C${x1 + 58} ${y1 + 6} ${x2 - 56} ${y2 - 2} ${x2} ${y2}`;
    }
    if (edgeIndex === 2) {
      const x1 = n1.x + n1.width;
      const y1 = n1.y + 38;
      const x2 = n3.x;
      const y2 = n3.y + 28;
      return `M${x1} ${y1} C${x1 + 56} ${y1 + 4} ${x2 - 54} ${y2 - 6} ${x2} ${y2}`;
    }
    if (edgeIndex === 3) {
      const x1 = n2.x + n2.width;
      const y1 = n2.y + 36;
      const x2 = n3.x;
      const y2 = n3.y + 46;
      return `M${x1} ${y1} C${x1 + 56} ${y1 - 2} ${x2 - 54} ${y2 + 8} ${x2} ${y2}`;
    }
    return "";
  };

  return (
    <div
      ref={ref}
      className="my-8 overflow-hidden border p-5 select-none touch-none"
      style={{ backgroundColor: containerBg, borderColor: containerBorder }}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <p
          className="font-mono text-xs uppercase tracking-[0.2em]"
          style={{ color: titleColor }}
        >
          interactive diagram
        </p>
        <p className="text-xs" style={{ color: subtitleColor }}>
          {title}
        </p>
      </div>
      <svg viewBox="0 0 760 260" className="h-auto w-full select-none" role="img" aria-label={title}>
        <defs>
          <marker
            id="arrow-arch"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={arrowFill} />
          </marker>
        </defs>

        {edgeColors.map((edgeColor, i) => (
          <motion.path
            key={i}
            d={getDynamicPath(i)}
            fill="none"
            stroke={isLight ? edgeColor.light : edgeColor.dark}
            strokeWidth={isLight ? 1.5 : 2}
            strokeDasharray="10 10"
            strokeDashoffset={reducedMotion ? 0 : dashOffset}
            markerEnd="url(#arrow-arch)"
          />
        ))}

        {nodesState.map((node, index) => {
          const isDragged = activeDragIndex === index;
          return (
            <g
              key={`${node.label}-${index}`}
              className="select-none"
              style={{
                cursor: isDragged ? "grabbing" : "grab",
              }}
              onPointerDown={(e) => onPointerDown(e, index)}
              onPointerUp={onPointerUp}
            >
              <rect
                x={node.x}
                y={node.y}
                width={node.width}
                height={node.height}
                fill={isLight ? node.fillLight : node.fillDark}
                stroke={isLight ? node.strokeLight : node.strokeDark}
                strokeWidth={isLight ? 1.5 : 1}
                rx={2}
                ry={2}
              />
              <text
                x={node.x + node.width / 2}
                y={node.y + node.height / 2 + 5}
                textAnchor="middle"
                fill={labelColor}
                fontSize="13.5"
                fontFamily="monospace"
                className="pointer-events-none select-none"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
