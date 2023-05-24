import Flex, {FlexProps} from "./Flex";

function Button(props: FlexProps) {
  const { children, ...rest } = props;

  return (
    <Flex
      as="button"
      sx={{
        backgroundColor: "blue",
        color: "white",
      }}
    >
      {children}
    </Flex>
  )
}

export default Button;
