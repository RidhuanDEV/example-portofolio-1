"use client";

import { useState, useRef, useCallback } from "react";

interface BaseNode {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export function useDraggableNodes<T extends BaseNode>(
  initialNodes: T[],
  virtualWidth: number,
  virtualHeight: number,
  containerRef: React.RefObject<HTMLDivElement | null>,
  nodeWidth = 120,
  nodeHeight = 50
) {
  const [nodes, setNodes] = useState<T[]>(initialNodes);
  const [activeDragIndex, setActiveDragIndex] = useState<number | null>(null);
  const dragInfoRef = useRef<{
    nodeIndex: number;
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
  } | null>(null);

  const onPointerDown = useCallback((e: React.PointerEvent, index: number) => {
    if (e.button !== 0) return; // Only trigger for main button (left click)
    if (!(e.currentTarget instanceof Element)) return;
    const target = e.currentTarget;
    
    // Set pointer capture to track drag movements even if pointer leaves element
    try {
      target.setPointerCapture(e.pointerId);
    } catch {
      // Fallback for custom nodes that do not support pointer capture
    }

    dragInfoRef.current = {
      nodeIndex: index,
      startX: e.clientX,
      startY: e.clientY,
      initialX: nodes[index].x,
      initialY: nodes[index].y,
    };
    setActiveDragIndex(index);
    
    e.stopPropagation();
  }, [nodes]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragInfoRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    const { nodeIndex, startX, startY, initialX, initialY } = dragInfoRef.current;
    const rect = container.getBoundingClientRect();

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // Convert pixel delta on screen to virtual coordinates relative to viewport bounds
    const virtualDx = (dx / rect.width) * virtualWidth;
    const virtualDy = (dy / rect.height) * virtualHeight;

    setNodes((prevNodes) => {
      const nextNodes = [...prevNodes];
      const targetX = initialX + virtualDx;
      const targetY = initialY + virtualDy;

      const currentWidth = prevNodes[nodeIndex].width ?? nodeWidth;
      const currentHeight = prevNodes[nodeIndex].height ?? nodeHeight;

      // Clamp positions inside graph canvas boundary
      const clampedX = Math.max(0, Math.min(virtualWidth - currentWidth, targetX));
      const clampedY = Math.max(0, Math.min(virtualHeight - currentHeight, targetY));

      nextNodes[nodeIndex] = Object.assign({}, prevNodes[nodeIndex], {
        x: clampedX,
        y: clampedY,
      });

      return nextNodes;
    });
  }, [containerRef, virtualWidth, virtualHeight, nodeWidth, nodeHeight]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragInfoRef.current) return;
    if (!(e.currentTarget instanceof Element)) return;
    const target = e.currentTarget;
    try {
      target.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
    dragInfoRef.current = null;
    setActiveDragIndex(null);
  }, []);

  return {
    nodes,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    activeDragIndex,
  };
}
