import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Container,
  Flex,
  GridItem,
  List,
  ListItem,
  SimpleGrid,
  Spinner,
  useToast,
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
import { ISildeBar } from "@/types/layout";
import { useQuery } from "@tanstack/react-query";
import { token } from "@/utils/function";
import { AuthApi } from "@/apis/auth";
import { useEffect } from "react";

export default function DefaultLayout() {
  const toast = useToast();
  const navigate = useNavigate();
  const dataUserQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => AuthApi.infoUser(),
    retry: false,
    cacheTime: 12000,
    enabled: !!token(), // Only fetch data user when have token ,
    refetchOnWindowFocus: false,
    onError: () => {
      toast({
        description: "Có lỗi vui lòng đăng nhập lại!",
      });
      navigate("/auth/login");
    },
  });

  useEffect(() => {
    if (!token()) {
      toast({
        description: "Bạn cần đăng nhập trước khi sử dụng!",
      });
      navigate("/auth/login");
    }
  }, []);

  return (
    <>
      {dataUserQuery.isLoading && (
        <Center height="100vh">
          <Spinner />
        </Center>
      )}
      {dataUserQuery.isSuccess && (
        <>
          <Navbar />
          <Container
            maxW="container.2xl"
            height="100%"
            flex={1}
            p={0}
            zIndex={2}
          >
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
      )}
    </>
  );
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
        link: "/users/user",
      },
      {
        name: "Quản lý admins",
        link: "/users/admin",
      },
    ],
  },
  {
    name: "Top nạp thẻ",
    icon: <FiBarChart2 />,
    children: [
      {
        name: "Quản lý",
        link: "/top-recharge",
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
                <List>
                  {sildeItem.children?.map((vl, index2) => (
                    <Link key={index2} to={vl.link}>
                      <ListItem
                        py="1rem"
                        px="2.5rem"
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
