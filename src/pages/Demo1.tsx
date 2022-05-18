import React, { useLayoutEffect, useRef, useState } from "react";
import { shuffle, range } from "lodash-es";
import { createChildElementRectMap } from "./utils";
import {
  Button,
  ButtonGroup,
  ListBox,
  SquareBox,
  SquareItem,
} from "./components/doc-components";

const initialData = range(10);

const Demo1 = () => {
  const [data, setData] = useState(initialData);
  const listRef = useRef<HTMLDivElement>(null);

  const lastRectRef = useRef<Map<HTMLElement, DOMRect>>(new Map());

  useLayoutEffect(() => {
    const currentRectMap = createChildElementRectMap(listRef.current);
    // 变更后计算位置
    lastRectRef.current.forEach((prevRect, node) => {
      const currentRect = currentRectMap.get(node);

      const invert = {
        left: prevRect.left - currentRect.left,
        top: prevRect.top - currentRect.top,
      };

      const keyframes = [
        {
          transform: `translate(${invert.left}px, ${invert.top}px)`,
        },
        { transform: "translate(0, 0)" },
      ];

      node.animate(keyframes, {
        duration: 400,
        easing: "cubic-bezier(0.25, 0.8, 0.25, 1)",
      });
    });
  }, [data]);

  function add() {
    setData((prev) => range(prev.length, prev.length + 10).concat(prev));
    lastRectRef.current = createChildElementRectMap(listRef.current);
  }

  function shuffleList() {
    setData(shuffle);
    // 存储变更前的位置信息
    lastRectRef.current = createChildElementRectMap(listRef.current);
  }

  return (
    <ListBox title="直接实现">
      <ButtonGroup>
        <Button onClick={add}>添加</Button>
        <Button onClick={shuffleList}>乱序</Button>
      </ButtonGroup>
      <SquareBox ref={listRef}>
        {data.map((n) => (
          <SquareItem key={n}>{n}</SquareItem>
        ))}
      </SquareBox>
    </ListBox>
  );
};

export default Demo1;
