import React, {
  cloneElement,
  memo,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import { FlipContext } from "./FlipContext";

export interface FlippedProps {
  children: React.ReactElement;
  innerRef?: React.RefObject<HTMLElement>;
}

function Flipped({ children, innerRef }: FlippedProps) {
  const ctxRef = useContext(FlipContext);
  const ref = useRef<HTMLElement>(null);
  const currentRef = innerRef || ref;

  useLayoutEffect(() => {
    const ctx = ctxRef.current;
    const node = currentRef.current;

    const flipId = ctx.nextId();

    if (node) {
      ctx.add({ flipId, node });
    }

    return () => {
      ctx.remove(flipId);
    };
  }, []);

  return cloneElement(children, { ref: currentRef });
}

export default memo(Flipped);
