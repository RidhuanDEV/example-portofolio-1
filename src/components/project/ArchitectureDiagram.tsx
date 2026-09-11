"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useDraggableNodes } from "@/lib/hooks/useDraggableNodes";

interface ArchitectureDiagramProps {
  title: string;
}

interface NodeDef {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  textOffsetX: number;
  textOffsetY: number;
  fillDark: string;
  strokeDark: string;
  fillLight: string;
  strokeLight: string;
}

const initialNodes: NodeDef[] = [
  {
    label: "Client",
    x: 20, y: 70, width: 140, height: 70,
    textOffsetX: 48, textOffsetY: 42,
    fillDark: "rgba(45,212,191,.08)",    strokeDark: "rgba(94,234,212,.55)",
    fillLight: "rgba(0,0,0,0.04)",       strokeLight: "#333333",
  },
  {
    label: "Policy Engine",
    x: 305, y: 38, width: 150, height: 72,
    textOffsetX: 27, textOffsetY: 44,
    fillDark: "rgba(253,230,138,.08)",   strokeDark: "rgba(253,230,138,.5)",
    fillLight: "rgba(0,0,0,0.04)",       strokeLight: "#333333",
  },
  {
    label: "Cache Layer",
    x: 305, y: 150, width: 150, height: 72,
    textOffsetX: 32, textOffsetY: 44,
    fillDark: "rgba(16,185,129,.08)",    strokeDark: "rgba(110,231,183,.5)",
    fillLight: "rgba(0,0,0,0.04)",       strokeLight: "#333333",
  },
  {
    label: "Telemetry",
    x: 600, y: 94, width: 140, height: 72,
    textOffsetX: 37, textOffsetY: 44,
    fillDark: "rgba(167,139,250,.08)",   strokeDark: "rgba(147,197,253,.5)", // Soft Blue from Violet
    fillLight: "rgba(0,0,0,0.04)",       strokeLight: "#333333",
  },
];

const edgeColors = [
  { dark: "rgb(94 234 212)", light: "#333333" },
  { dark: "rgb(110 231 183)", light: "#333333" },
  { dark: "rgb(147 197 253)", light: "#333333" }, // Soft Blue
  { dark: "rgb(147 197 253)", light: "#333333" }, // Soft Blue
];

export function ArchitectureDiagram({ title }: ArchitectureDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const isLight = theme === "light";

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
    initialNodes.map((n) => ({ ...n })),
    760,
    260,
    ref,
    150,
    72
  );

  const arrowFill   = isLight ? "#333333" : "rgb(94 234 212)";
  const labelColor  = isLight ? "#333333" : "#f4f4f5";
  const containerBg = isLight ? "#ffffff" : "#0c0e11";
  const containerBorder = isLight ? "rgba(51,51,51,0.18)" : "rgba(255,255,255,0.1)";
  const titleColor  = isLight ? "#333333" : "rgb(153 246 228)"; /* teal-200 in dark */
  const subtitleColor = isLight ? "#333333" : "#71717a";

  const getDynamicPath = (edgeIndex: number): string => {
    const client = nodesState[0];
    const policy = nodesState[1];
    const cache = nodesState[2];
    const telemetry = nodesState[3];

    if (edgeIndex === 0) {
      // client -> policy
      const x1 = client.x + client.width;
      const y1 = client.y + 36;
      const x2 = policy.x;
      const y2 = policy.y + 38;
      const cp1x = x1 + 60;
      const cp1y = y1;
      const cp2x = x2 - 64;
      const cp2y = y2;
      return `M${x1} ${y1} C${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x2} ${y2}`;
    }
    if (edgeIndex === 1) {
      // client -> cache
      const x1 = client.x + client.width;
      const y1 = client.y + 50;
      const x2 = cache.x;
      const y2 = cache.y + 36;
      const cp1x = x1 + 65;
      const cp1y = y1 + 6;
      const cp2x = x2 - 61;
      const cp2y = y2 - 2;
      return `M${x1} ${y1} C${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x2} ${y2}`;
    }
    if (edgeIndex === 2) {
      // policy -> telemetry
      const x1 = policy.x + policy.width;
      const y1 = policy.y + 39;
      const x2 = telemetry.x;
      const y2 = telemetry.y + 30;
      const cp1x = x1 + 64;
      const cp1y = y1 + 3;
      const cp2x = x2 - 58;
      const cp2y = y2 - 6;
      return `M${x1} ${y1} C${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x2} ${y2}`;
    }
    if (edgeIndex === 3) {
      // cache -> telemetry
      const x1 = cache.x + cache.width;
      const y1 = cache.y + 36;
      const x2 = telemetry.x;
      const y2 = telemetry.y + 46;
      const cp1x = x1 + 66;
      const cp1y = y1 - 2;
      const cp2x = x2 - 56;
      const cp2y = y2 + 10;
      return `M${x1} ${y1} C${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x2} ${y2}`;
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
              key={node.label}
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
                x={node.x + node.textOffsetX}
                y={node.y + node.textOffsetY}
                fill={labelColor}
                fontSize="16"
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
