import React, { createContext } from "react";

export type FlipItemType = {
  flipId: number;
  node: HTMLElement;
  rect?: DOMRect;
};

export interface IFlipContext {
  add: (item: FlipItemType) => void;
  remove: (flipId: number) => void;
  nextId: () => number;
}

export const FlipContext = createContext(
  undefined as unknown as React.MutableRefObject<IFlipContext>
);
