import { Box, Flex, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box py={10} as="footer">
      <Flex justifyContent="center">
        <Text pt={6} fontSize="sm" textAlign="center" color="gray.500">
          © 2024 Admin Dashboard. All rights reserved
        </Text>
      </Flex>
    </Box>
  );
}
