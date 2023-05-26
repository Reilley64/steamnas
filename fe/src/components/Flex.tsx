import Element, { ElementProps, ElementType } from "./Element";
import { CSSObject } from "@emotion/serialize";
import { ParentProps } from "solid-js";

export type FlexProps<T extends ElementType = ElementType> = ParentProps<{
  as?: T;
  sx?: CSSObject;
}> &
  ElementProps<T>;

function Flex(props: FlexProps) {
  return <Element {...props} as={props.as || "div"} children={props.children} sx={{ display: "flex", ...props.sx }} />;
}

export default Flex;
