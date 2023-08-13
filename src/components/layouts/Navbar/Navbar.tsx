import {
  Box,
  Container,
  Flex,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

export default function Navbar() {
  return (
    <>
      <Box as="nav" bg="main.item" py="0.5rem" mb="1rem">
        <Container
          as={Flex}
          maxW="container.2xl"
          height="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex alignItems="center" gap="3rem">
            <Box>
              <Image src="http://chính.vn/images/logo.png" alt="logo" />
            </Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="whiteAlpha.400" />
              </InputLeftElement>
              <Input variant="search" placeholder="Tìm kiếm thông tin" />
            </InputGroup>
          </Flex>
          <Flex alignItems="center" gap="1rem">
            <Box rounded="50%" width="30px" height="30px" overflow="hidden">
              <Image src="https://i.imgur.com/Owoq65A.png" alt="avatar" />
            </Box>
            <Text color="main.text" fontWeight="500">
              Phạm Hoàng Chính
            </Text>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
