import { Box, Container } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { AuthApi } from "@/apis/auth";
import { useQuery } from "@tanstack/react-query";
import { token } from "@/utils/const";
import UserDataProvider from "@/hooks/UserDataProvider";

interface IHomeLayout {
  banner?: boolean;
  miniBackground?: string;
}

export default function HomeLayout({ banner, miniBackground }: IHomeLayout) {
  const data = useQuery({
    queryKey: ["user"],
    queryFn: () => AuthApi.infoUser(),
    retry: false,
    cacheTime: 120000,
    enabled: !!token, // Fetch dữ liệu chỉ khi token tồn tại,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Navbar />
      {banner ? <Banner /> : null}
      {miniBackground ? (
        <MiniBackground miniBackground={miniBackground} />
      ) : null}
      <Container
        maxW="container.2xl"
        height="100%"
        flex={1}
        mt={banner ? "2rem" : "8rem"}
        p={0}
        zIndex={5}
      >
        <UserDataProvider userData={data}>
          <Outlet />
        </UserDataProvider>
      </Container>
      <Footer />
    </>
  );
}

function MiniBackground({ miniBackground }: { miniBackground: string }) {
  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        height="550px"
        overflow="hidden"
      >
        <Box
          zIndex={2}
          position="absolute"
          left={0}
          right={0}
          top="50%"
          bottom={0}
          bgGradient="linear(to bottom,  #ff000000, white)"
        />
        <Box
          zIndex={1}
          position="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
          filter="blur(20px)"
          backgroundSize="cover"
          backgroundImage={miniBackground}
        />
      </Box>
    </>
  );
}
