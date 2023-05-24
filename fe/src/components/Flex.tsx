import {styled} from "emotion-solid";
import {ParentProps} from "solid-js";
import {CSSProperties} from "@emotion/serialize";

export type FlexProps = ParentProps<{ sx?: CSSProperties }>;

const Flex = styled("div")<FlexProps>((props) => ({
  display: "flex",
  ...props.sx,
}));

export default Flex;
