import LoadingGlobal from "@/components/globals/Loading";
import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useIsFetching, useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { SildeBar } from "../DefaultLayout";
import { AuthApi } from "@/apis/auth";
import { numberFormat, token } from "@/utils/function";

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
              icon={isOpen ? <FiX color="white" /> : <FiMenu color="white" />}
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
              _hover={{
                bg: "black.200",
              }}
            />
            <Box p="0.5rem">
              <Link as={ReactLink} to="/">
                <Image
                  src={
                    import.meta.env.VITE_APP_LOGO_URL ??
                    "https://i.imgur.com/Owoq65A.png"
                  }
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
  const toast = useToast();
  const navigate = useNavigate();

  const logoutMutate = useMutation({
    mutationFn: () => AuthApi.logout(),
    onSuccess: ({ data }) => {
      toast({ description: data.data.msg, status: "success" });
      navigate("/auth/login");
    },
  });

  const dataUserQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => AuthApi.infoUser(),
    retry: false,
    cacheTime: 12000,
    enabled: !!token(), // Only fetch data user when have token ,
    refetchOnWindowFocus: false,
    onError: () => {
      navigate("/auth/login");
    },
  });

  return (
    <>
      <Flex alignItems="center" gap="1rem" position="relative">
        <Box rounded="50%" width="30px" height="30px" overflow="hidden">
          <Image src="https://i.imgur.com/Owoq65A.png" alt="avatar" />
        </Box>
        <HStack spacing={2}>
          <Text
            cursor="pointer"
            color="main.text"
            fontWeight="500"
            onClick={() => setIsDropdown((prev) => !prev)}
          >
            Hi, {dataUserQuery.data?.data.data.name}
          </Text>
          {dataUserQuery.data?.data.data.price && (
            <Text color="main.text" fontWeight="500">
              | Số dư: {numberFormat(dataUserQuery.data?.data.data.price)}
            </Text>
          )}
        </HStack>

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
            <Link color="white" onClick={() => logoutMutate.mutate()}>
              Đăng xuất
            </Link>
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
