import { styleTextShadow } from "@/utils/const";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function CategoryPage() {
  return (
    <>
      <Box as="header" mt="1rem" px={{ base: 5, lg: 0 }}>
        <Text size="sm" sx={styleTextShadow}>
          Danh mục
        </Text>
        <Heading
          as="h1"
          textTransform="uppercase"
          fontSize="35px"
          mb={5}
          sx={styleTextShadow}
        ></Heading>
      </Box>
    </>
  );
}
