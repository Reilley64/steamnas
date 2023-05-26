import {styled} from "emotion-solid";
import {CSSObject} from "@emotion/serialize";
import {JSX, ParentProps} from "solid-js";

export type ElementType = keyof JSX.IntrinsicElements;

export type ElementProps<T extends ElementType> = JSX.IntrinsicElements[T];

const Element = styled("div")<ParentProps<{ sx?: CSSObject }>>((props) => props.sx);

export default Element;
