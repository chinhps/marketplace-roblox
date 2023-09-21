import LoadingGlobal from "@/components/globals/Loading";
import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useIsFetching } from "@tanstack/react-query";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link as ReactLink } from "react-router-dom";
import { SildeBar } from "../DefaultLayout";

export default function Navbar() {
  const isFetching = useIsFetching();
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      {isFetching ? <LoadingGlobal /> : null}
      <Box as="nav" bg="main.item" py="0.5rem" mb="1rem">
        <Container
          as={Flex}
          maxW="container.2xl"
          height="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex alignItems="center">
            <IconButton
              onClick={onToggle}
              display={{ base: "flex", lg: "none" }}
              icon={
                isOpen ? (
                  <FiX w={3} h={3} color="white" />
                ) : (
                  <FiMenu w={5} h={5} color="white" />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
              _hover={{
                bg: "black.200",
              }}
            />
            <Box p="0.5rem">
              <Link as={ReactLink} to="/">
                <Image
                  src="http://chính.vn/images/logo.png"
                  w="120px"
                  alt="logo"
                />
              </Link>
            </Box>
            {/* <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="whiteAlpha.400" />
              </InputLeftElement>
              <Input variant="search" placeholder="Tìm kiếm thông tin" />
            </InputGroup> */}
            {isOpen && <MobileNav isOpen={isOpen} onClose={onClose} />}
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

function MobileNav({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="white.100">
          <DrawerBody>
            <SildeBar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
