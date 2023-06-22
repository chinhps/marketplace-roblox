import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Img,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { FiChevronRight, FiGift } from "react-icons/fi";

export default function Account() {
  return (
    <>
      <Flex
        as="section"
        boxSizing="border-box"
        flexDirection="column"
        justifyContent="space-between"
        bg="white.500"
        minH="400px"
        borderRadius="3px"
        overflow="hidden"
        shadow="base"
        border="solid .1px white"
        transition=".5s"
        _hover={{
          border: "solid .1px",
          borderColor: "ocean.100",
          shadow: "md",
        }}
      >
        <Box as="figure" height="170px" overflow="hidden">
          <Img
            src="/service.jpg"
            transition=".8s"
            alt="hihi"
            _hover={{ transform: "scale(1.1)" }}
          />
        </Box>
        <Box as="header">
          <Flex py={3} px={4} gap={2} alignItems="center">
            <Icon as={FiGift} color="red.500" fontSize="18px" />
            <Text fontSize=".85rem">Trái Dough V2 Thức Tỉnh Full, 23...</Text>
          </Flex>
          <Divider />
          <List px={3} py={2} fontSize=".85rem">
            <ListItem>
              <ListIcon as={FiChevronRight} color="green.500" />
              <Text as="b">Level:</Text> 2450
            </ListItem>
            <ListItem>
              <ListIcon as={FiChevronRight} color="green.500" />
              <Text as="b">Thông tin:</Text> Nick Bloxfruit Level...
            </ListItem>
            <ListItem>
              <ListIcon as={FiChevronRight} color="green.500" />
              <Text as="b">Thông tin:</Text> Nick Bloxfruit Level...
            </ListItem>
          </List>
        </Box>
        <Divider borderColor="gray.100" />
        <Box as="section" textAlign="center" py={2}>
          <Text fontWeight="bold" fontSize="18px" color="red.600">
            900.000đ
          </Text>
        </Box>
        <Box as="footer">
          <Button
            // leftIcon={<FiShoppingCart />}
            py="1.4rem"
            w="100%"
            borderRadius={0}
            bg="ocean.100"
            color="black.100"
            fontWeight="bold"
            textTransform="uppercase"
          >
            <Text className="showText">Mua ngay</Text>
          </Button>
        </Box>
      </Flex>
    </>
  );
}
