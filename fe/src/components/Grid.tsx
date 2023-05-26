import Element, { ElementProps, ElementType } from "./Element";
import { CSSObject } from "@emotion/serialize";
import { ParentProps } from "solid-js";

export type GridProps<T extends ElementType = ElementType> = ParentProps<{
  as?: T;
  columns: number;
  sx?: CSSObject;
}> &
  ElementProps<T>;

function Grid(props: GridProps) {
  return (
    <Element
      {...props}
      as={props.as}
      sx={{
        display: "grid",
        gridAutoFlow: "row dense",
        gridTemplateColumns: `repeat(${props.columns}, minmax(0px, 1fr))`,
        ...props.sx,
      }}
    />
  );
}

export default Grid;