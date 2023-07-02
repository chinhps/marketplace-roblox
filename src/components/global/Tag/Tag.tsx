import { BoxProps, Center, Text } from "@chakra-ui/react";

interface ITag extends BoxProps {
  text?: string;
  value?: string | number;
}

export default function Tag({ text, value, ...props }: ITag) {
  return (
    <>
      <Center
        as="span"
        bg="main.item2"
        px="0.8rem"
        py="0.2rem"
        rounded="md"
        fontSize="13px"
        width="auto"
        zIndex={3}
        {...props}
      >
        {text && <Text mr=".3rem">{text}</Text>} {value && <Text as="b">{value}</Text>}
      </Center>
    </>
  );
}
