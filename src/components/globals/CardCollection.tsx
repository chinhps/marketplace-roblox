import { Box, Flex, Heading } from "@chakra-ui/react";

export default function CardCollection({
  children,
  title,
  fontSize,
  button,
}: {
  children: React.ReactElement | React.ReactNode | string;
  title: string;
  fontSize?: string | undefined;
  button?: React.ReactElement;
}) {
  return (
    <>
      <Box bg="main.item2" rounded="md" p="1.5rem" w="100%" height="100%">
        <Flex justifyContent="space-between">
          <Heading
            fontSize={fontSize ?? "18px"}
            color="main.item"
            textTransform="uppercase"
          >
            {title}
          </Heading>
          {button}
        </Flex>
        <Box mt="0.5rem">{children}</Box>
      </Box>
    </>
  );
}
