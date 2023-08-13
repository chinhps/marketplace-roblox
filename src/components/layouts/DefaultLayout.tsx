import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Flex,
  GridItem,
  List,
  ListItem,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  FiBarChart2,
  FiHome,
  FiLayers,
  FiPhone,
  FiRepeat,
  FiServer,
  FiUsers,
} from "react-icons/fi";
import Footer from "./Footer/Footer";

export default function DefaultLayout() {
  return (
    <>
      <Navbar />
      <Container maxW="container.2xl" height="100%" flex={1} p={0} zIndex={2}>
        <SimpleGrid columns={11} spacing="1rem">
          <GridItem colSpan={2}>
            <SildeBar />
          </GridItem>
          <GridItem colSpan={9}>
            <Outlet />
          </GridItem>
        </SimpleGrid>
      </Container>
      <Footer />
    </>
  );
}

interface ISildeBar {
  name: string;
  icon: React.ReactElement;
  link?: string;
  children?: Array<{
    name: string;
    link: string;
  }>;
}

const dataSildeBar: Array<ISildeBar> = [
  {
    name: "Trang chủ",
    icon: <FiHome />,
    children: [
      {
        name: "Trang chủ",
        link: "/",
      },
      {
        name: "Quản lý shop",
        link: "/shop-list",
      },
    ],
  },
  {
    name: "Plugins",
    icon: <FiServer />,
    children: [
      {
        name: "Quản lý Plugins",
        link: "/abc",
      },
    ],
  },
  {
    name: "Lịch sử dịch vụ",
    icon: <FiRepeat />,
    children: [
      {
        name: "Trò chơi",
        link: "/history/services",
      },
      {
        name: "Mua tài khoản",
        link: "/history/purchases",
      },
      {
        name: "Rút / Thuê / ...",
        link: "/history/buy-services",
      },
    ],
  },
  {
    name: "Dịch vụ",
    icon: <FiLayers />,
    children: [
      {
        name: "Quản lý dịch vụ",
        link: "/services",
      },
      {
        name: "Quản lý tài khoản",
        link: "/services/accounts",
      },
      {
        name: "Quản lý Random",
        link: "/services/account-random",
      },
    ],
  },
  {
    name: "Người dùng",
    icon: <FiUsers />,
    children: [
      {
        name: "Quản lý khách",
        link: "/abc",
      },
      {
        name: "Quản lý admins",
        link: "/abc",
      },
    ],
  },
  {
    name: "Top nạp thẻ",
    icon: <FiBarChart2 />,
    children: [
      {
        name: "Quản lý",
        link: "/abc",
      },
    ],
  },
  {
    name: "Trợ giúp",
    icon: <FiPhone />,
    link: "/abc",
  },
];

function SildeBar() {
  const location = useLocation();

  return (
    <>
      <Box bg="main.item2" overflow="hidden" rounded="md" p="1rem">
        <Accordion defaultIndex={[0, 1, 2, 3]} allowMultiple>
          {dataSildeBar.map((sildeItem, index) => (
            <AccordionItem border="none" key={index}>
              <h2>
                {(sildeItem.children?.length ?? 0) > 0 ? (
                  <AccordionButton p="1rem">
                    {sildeItem.icon}
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      pl="10px"
                      fontWeight="500"
                      fontSize="15px"
                    >
                      {sildeItem.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                ) : (
                  <Flex
                    p="1rem"
                    alignItems="center"
                    _hover={{ bg: "gray.100" }}
                  >
                    {sildeItem.icon}
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      pl="10px"
                      fontWeight={"500"}
                      fontSize="15px"
                    >
                      {sildeItem.name}
                    </Box>
                  </Flex>
                )}
              </h2>
              <AccordionPanel p={0}>
                <List pl="0.5rem">
                  {sildeItem.children?.map((vl, index2) => (
                    <Link key={index2} to={vl.link}>
                      <ListItem
                        py="1rem"
                        px="1.5rem"
                        fontWeight={
                          location.pathname == vl.link ? "500" : "normal"
                        }
                        bg={location.pathname == vl.link ? "gray.100" : "none"}
                        _hover={{ bg: "gray.100" }}
                      >
                        {vl.name}
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </>
  );
}
