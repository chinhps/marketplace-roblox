import { Outlet } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  ListIcon,
  Text,
  Box,
  List,
  ListItem,
  HStack,
  GridItem,
  Flex,
  Img,
  Stack,
  Divider,
  SimpleGrid,
  useMediaQuery,
  Button,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { handleCopy, numberFormat } from "@/utils/price";
import { listOption } from "@/utils/const";
import IsAuthentication from "@/guards/IsAuthentication";
import { useUserData } from "@/hooks/UserDataProvider";
import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiCopy } from "react-icons/fi";

export default function ProfileLayout() {
  return (
    <IsAuthentication>
      <SimpleGrid
        columns={{ base: 1, lg: 12 }}
        spacing={{ base: 0, lg: 3 }}
        color="white.100"
      >
        <GridItem
          rounded="md"
          colSpan={3}
          bg="main.item"
          p={5}
          mb={{ base: "2rem", lg: "0px" }}
        >
          <SideBar />
        </GridItem>
        <GridItem rounded="md" colSpan={9} bg="main.item" p={10}>
          <Outlet />
        </GridItem>
      </SimpleGrid>
    </IsAuthentication>
  );
}

function SideBar() {
  const [isDesktop] = useMediaQuery("(min-width: 768px)");
  const [openMenu, setOpenMenu] = useState(false);
  const userData = useUserData();

  return (
    <>
      <HStack spacing={5}>
        <Flex justifyContent="center" w="30%">
          <Img w="100%" rounded="md" src="/icon.jpeg" alt="chinh.dev" />
        </Flex>

        <Stack spacing={2} flex="1" fontSize="15px">
          <Button
            size="sm"
            rightIcon={<FiCopy />}
            variant="user"
            onClick={() => handleCopy(userData?.data?.data.providerId ?? "")}
          >
            ID: {userData?.data?.data.providerId}
          </Button>
          <HStack justifyContent="space-between" mt=".5rem">
            <VStack alignItems="flex-start">
              <Text>
                <Text as="b" pr={2}>
                  Tên:
                </Text>
                {userData?.data?.data.name}
              </Text>
              <Text>
                <Text as="b" pr={2}>
                  Số dư:
                </Text>
                <Text color="ocean.200" as="b" pr={1}>
                  {numberFormat(userData?.data?.data.price ?? 0)}
                </Text>
              </Text>
            </VStack>
            {!isDesktop && (
              <IconButton
                aria-label={(!openMenu ? "Mở" : "Đóng") + "Menu"}
                variant="user"
                onClick={() => setOpenMenu((prev) => !prev)}
                icon={!openMenu ? <FiChevronDown /> : <FiChevronUp />}
              />
            )}
          </HStack>
        </Stack>
      </HStack>
      {isDesktop && <Divider my={5} />}
      {isDesktop || openMenu ? (
        <Accordion defaultIndex={[0, 1, 2, 3, 4]} allowMultiple mt={2}>
          <ListSideBar />
        </Accordion>
      ) : null}
    </>
  );
}

function ListSideBar() {
  return (
    <>
      {listOption.map((option, index) => (
        <AccordionItem border="none" key={index}>
          <AccordionButton>
            <Box as="b" flex="1" color="ocean.200" textAlign="left">
              {option.lable}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={2}>
            <List>
              {option.children.map((child, index2) => (
                <ListItem key={index2}>
                  <Link to={child.link}>
                    <HStack py={1}>
                      <ListIcon as={FaChevronRight} height="10px" />
                      <Text>{child.lable}</Text>
                    </HStack>
                  </Link>
                </ListItem>
              ))}
            </List>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </>
  );
}
