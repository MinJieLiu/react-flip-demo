import React, { useLayoutEffect, useMemo, useRef } from "react";
import { FlipContext, FlipItemType, IFlipContext } from "./FlipContext";

export interface FlipperProps {
  flipKey: unknown;
  animateOptions?: KeyframeAnimationOptions;
  children: React.ReactNode;
}

export default function Flipper({
  flipKey,
  animateOptions,
  children,
}: FlipperProps) {
  const lastRectRef = useRef<Map<number, FlipItemType>>(new Map());
  const uniqueIdRef = useRef(0);

  const fnRef = useRef<IFlipContext>({
    add(flipItem) {
      lastRectRef.current.set(flipItem.flipId, flipItem);
    },
    remove(flipId) {
      lastRectRef.current.delete(flipId);
    },
    nextId() {
      return (uniqueIdRef.current += 1);
    },
  });

  useMemo(() => {
    lastRectRef.current.forEach((item) => {
      item.rect = item.node.getBoundingClientRect();
    });
  }, [flipKey]);

  useLayoutEffect(() => {
    const { innerWidth, innerHeight } = window;

    const currentRectMap = new Map<number, DOMRect>();
    lastRectRef.current.forEach((item) => {
      currentRectMap.set(item.flipId, item.node.getBoundingClientRect());
    });

    lastRectRef.current.forEach(({ flipId, node, rect }) => {
      const currentRect = currentRectMap.get(flipId);

      if (!(currentRect && rect)) {
        return;
      }

      const invert = {
        left: rect.left - currentRect.left,
        top: rect.top - currentRect.top,
      };

      const isLastRectOverflow =
        rect.right < 0 ||
        rect.left > innerWidth ||
        rect.bottom < 0 ||
        rect.top > innerHeight;

      const isCurrentRectOverflow =
        currentRect.right < 0 ||
        currentRect.left > innerWidth ||
        currentRect.bottom < 0 ||
        currentRect.top > innerHeight;

      if (isLastRectOverflow && isCurrentRectOverflow) {
        return;
      }

      if (invert.top === 0 && invert.left === 0) {
        return;
      }

      node.animate(
        [
          {
            transform: `translate(${invert.left}px, ${invert.top}px)`,
          },
          { transform: "translate(0, 0)" },
        ],
        {
          duration: 400,
          easing: "cubic-bezier(0.25, 0.8, 0.25, 1)",
          ...animateOptions,
        }
      );
    });
  }, [flipKey]);

  return <FlipContext.Provider value={fnRef}>{children}</FlipContext.Provider>;
}
