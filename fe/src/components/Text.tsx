import Element, { ElementProps, ElementType } from "./Element";
import { CSSObject } from "@emotion/serialize";
import { ParentProps } from "solid-js";

export type TextProps<T extends ElementType = ElementType> = ParentProps<{
  as?: T;
  sx?: CSSObject;
}> &
  ElementProps<T>;

function Text(props: TextProps) {
  return <Element {...props} as={props.as || "span"} children={props.children} />;
}

export default Text;
