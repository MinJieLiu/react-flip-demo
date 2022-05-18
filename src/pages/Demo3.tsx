import React, { useCallback, useState } from "react";
import { Flipped, Flipper } from "../components/Flipper";
import { ListBox, SortBox, SortItem } from "./components/doc-components";
import { useSortProperty } from "./hooks/useSortProperty";

const initialData = [
  {
    id: 1,
    text: "🍎苹果",
  },
  {
    id: 2,
    text: "🍓草莓",
  },
  {
    id: 3,
    text: "🍌香蕉",
  },
  {
    id: 4,
    text: "🍍菠萝",
  },
  {
    id: 5,
    text: "🍑桃子",
  },
  {
    id: 6,
    text: "🍊橙子",
  },
  {
    id: 7,
    text: "🍇葡萄",
  },
  {
    id: 8,
    text: "🍉西瓜",
  },
  {
    id: 9,
    text: "🥝猕猴桃",
  },
  {
    id: 10,
    text: "🍒樱桃",
  },
];

const Demo2 = () => {
  const [data, setData] = useState(initialData);

  const handleMove = useCallback((dragIndex: number, hoverIndex: number) => {
    setData((prev) => {
      const next = prev.slice();
      next.splice(dragIndex, 1);
      next.splice(hoverIndex, 0, prev[dragIndex]);
      return next;
    });
  }, []);

  return (
    <Flipper flipKey={data}>
      <ListBox title="拖拽排序">
        <SortBox>
          {data.map((item, index) => (
            <DragSortItem
              key={item.id}
              item={item}
              index={index}
              onMove={handleMove}
            />
          ))}
        </SortBox>
      </ListBox>
    </Flipper>
  );
};

interface DragSortItemProps {
  item: {
    id: number;
    text: string;
  };
  index: number;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}

function DragSortItem({ item, index, onMove }: DragSortItemProps) {
  const dropRef = React.useRef<HTMLDivElement>(null);

  const { drag, drop, style } = useSortProperty({
    id: item.id,
    itemType: "Fruit",
    index,
    onMove,
    dropRef,
    canDrag: true,
  });

  drag(drop(dropRef));

  return (
    <Flipped innerRef={dropRef}>
      <SortItem style={style}>{item.text}</SortItem>
    </Flipped>
  );
}

export default Demo2;
