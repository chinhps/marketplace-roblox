import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
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
import { useQuery } from "@tanstack/react-query";
import { token } from "@/utils/function";
import { AuthApi } from "@/apis/auth";
import { useEffect } from "react";
import { userApi } from "@/apis/user";

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
            <SimpleGrid columns={{ base: 1, lg: 11 }} spacing="1rem">
              <GridItem colSpan={2} display={{ base: "none", lg: "block" }}>
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

const icons: { [key: string]: React.ReactElement } = {
  "Trang chủ": <FiHome />,
  Plugins: <FiServer />,
  "Lịch sử dịch vụ": <FiRepeat />,
  "Dịch vụ": <FiLayers />,
  "Người dùng": <FiUsers />,
  "Top nạp thẻ": <FiBarChart2 />,
  "Trợ giúp": <FiPhone />,
};

export function SildeBar() {
  const location = useLocation();

  const navbarQuery = useQuery({
    queryKey: ["query-navbar"],
    queryFn: () => userApi.navbar(),
    cacheTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Box bg="main.item2" overflow="hidden" rounded="md" p="1rem">
        <Accordion defaultIndex={[2, 3, 4]} allowMultiple>
          {navbarQuery.data?.data.data.map((sildeItem, index) => (
            <AccordionItem border="none" key={index}>
              <h2>
                {(sildeItem.children?.length ?? 0) > 0 ? (
                  <AccordionButton p="1rem">
                    {icons[sildeItem.name]}
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
                    {icons[sildeItem.name]}
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

export function CustomStyleFilter({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Flex
        mt="1rem"
        flexDirection={{ base: "column", lg: "row" }}
        gap={{ base: 0, lg: 3 }}
      >
        {children}
      </Flex>
    </>
  );
}
