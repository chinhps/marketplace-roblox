import { ServicePriceProps } from "@/types/service.type";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function Service() {
  return (
    <Box
      as="section"
      height="400px"
      position="relative"
      shadow="base"
      borderRadius="5px"
      overflow="hidden"
      transition="0.5s"
      _hover={{
        shadow: "md",
      }}
    >
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        bg="white.500"
        height="100%"
      >
        <Box as="figure" height="50%" overflow="hidden">
          <Image src="/service.jpg" alt="service" />
        </Box>
        <VStack my="1rem" spacing={2}>
          <Box as="header">
            <Heading
              as="h1"
              fontSize={{ base: "13px", md: "15px" }}
              textAlign="center"
              className="showText"
            >
              THỬ VẬN MAY ACC MAXLEVEL - GODHUMAN - COMBO CDK
            </Heading>
          </Box>
          <Box>
            <Text color="gray.600" fontSize="13px">
              Lượt sử dụng: 123
            </Text>
          </Box>
          <Flex
            as="section"
            flexDirection={{ base: "column", md: "row" }}
            gap={{ base: 1, md: 2 }}
          >
            <ServicePrice borderColor="gray.300">90.000đ</ServicePrice>
            <ServicePrice borderColor="ocean.100" textColor="ocean.200" m={0}>
              199.000đ
            </ServicePrice>
          </Flex>
          <Box as="footer">
            <Button variant="serviceBtn">CHƠI NGAY</Button>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
}

function ServicePrice({ children, ...props }: ServicePriceProps) {
  return (
    <Box
      border="1px"
      w="100px"
      textAlign="center"
      py=".3rem"
      borderRadius="5px"
      fontWeight="500"
      {...props}
    >
      {children}
    </Box>
  );
}
