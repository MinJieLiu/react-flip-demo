import React, { useState } from "react";
import { range, shuffle } from "lodash-es";
import { Flipped, Flipper } from "../components/Flipper";
import {
  Button,
  ButtonGroup,
  ListBox,
  SquareBox,
  SquareItem,
} from "./components/doc-components";

const initialData = range(10);

const Demo2 = () => {
  const [data, setData] = useState(initialData);

  return (
    <Flipper flipKey={data}>
      <ListBox title="Flipper 封装">
        <ButtonGroup>
          <Button
            onClick={() =>
              setData((prev) =>
                range(prev.length, prev.length + 10).concat(prev)
              )
            }
          >
            添加
          </Button>
          <Button onClick={() => setData(shuffle)}>乱序</Button>
          <Button onClick={() => setData(initialData)}>重置</Button>
        </ButtonGroup>
        <SquareBox>
          {data.map((item) => (
            <Flipped key={item}>
              <SquareItem>{item}</SquareItem>
            </Flipped>
          ))}
        </SquareBox>
      </ListBox>
    </Flipper>
  );
};

export default Demo2;
