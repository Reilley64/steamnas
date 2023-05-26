import { ElementType } from "./Element";
import Flex, { FlexProps } from "./Flex";

export type ButtonProps<T extends ElementType = "button"> = FlexProps<T>;

function Button(props: ButtonProps) {
  return (
    <Flex
      {...props}
      as={props.as || "button"}
      sx={{
        backgroundColor: "#273b4b",
        border: "none",
        borderRadius: "6px",
        color: "#67c1f5",
        cursor: "pointer",
        fontSize: "0.875rem",
        outline: "none",
        padding: "0.5rem 1rem",
        transition: "background-color 200ms, color 200ms",

        "&:hover": {
          backgroundColor: "#417a9b",
          color: "white",
        },

        "&:active": {
          backgroundColor: "#233543",
        },

        ...props.sx,
      }}
    />
  );
}

export default Button;
