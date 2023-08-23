import {
  Box,
  Container,
  Flex,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link as ReactLink } from "react-router-dom";

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
              <Link as={ReactLink} to="/">
                <Image src="http://chính.vn/images/logo.png" alt="logo" />
              </Link>
            </Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="whiteAlpha.400" />
              </InputLeftElement>
              <Input variant="search" placeholder="Tìm kiếm thông tin" />
            </InputGroup>
          </Flex>
          <DropdownNav />
        </Container>
      </Box>
    </>
  );
}

function DropdownNav() {
  const [isDropdown, setIsDropdown] = useState(false);
  return (
    <>
      <Flex alignItems="center" gap="1rem" position="relative">
        <Box rounded="50%" width="30px" height="30px" overflow="hidden">
          <Image src="https://i.imgur.com/Owoq65A.png" alt="avatar" />
        </Box>
        <Text
          cursor="pointer"
          color="main.text"
          fontWeight="500"
          onClick={() => setIsDropdown((prev) => !prev)}
        >
          Phạm Hoàng Chính
        </Text>
        {isDropdown && (
          <Box
            zIndex={5}
            position="absolute"
            bottom="-250%"
            bg="main.item"
            left={0}
            right={0}
            p="1rem"
          >
            <Link color="white">Đăng xuất</Link>
          </Box>
        )}
      </Flex>
    </>
  );
}
