import { Box, Container, useToast } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import { Outlet, useSearchParams } from "react-router-dom";
import { AuthApi, loginWith } from "@/apis/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { customToast, token } from "@/utils/const";
import UserDataProvider from "@/hooks/UserDataProvider";
import { useEffect } from "react";
import ScrollToTop from "@/components/global/Scroll/ScrollToTop";

interface IHomeLayout {
  banner?: boolean;
  miniBackground?: string;
}

export default function HomeLayout({ banner, miniBackground }: IHomeLayout) {
  const toast = useToast(customToast);
  const [searchParams, setSearchParams] = useSearchParams();

  const data = useQuery({
    queryKey: ["user"],
    queryFn: () => AuthApi.infoUser(),
    retry: false,
    cacheTime: 120000,
    enabled: !!token(), // Only fetch data user when have token ,
    refetchOnWindowFocus: false,
  });

  const loginFacebookMutate = useMutation({
    mutationFn: (token: string) => loginWith.facebook(token),
    onSuccess: ({ data }) => {
      toast({
        description: data?.msg,
        status: "success",
      });
      if (data?.token) {
        localStorage.setItem("auth._token.local", data?.token);
      }
    },
  });

  useEffect(() => {
    const token = searchParams.get("token_facebook");
    if (token) {
      loginFacebookMutate.mutate(token);
      searchParams.delete("token_facebook");
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <>
      <ScrollToTop />
      <UserDataProvider userData={{ status: data?.status, ...data.data }}>
        <Navbar />
        {banner ? <Banner.v1 /> : null}
        {miniBackground ? (
          <MiniBackground miniBackground={miniBackground} />
        ) : null}
        <Container
          maxW="container.2xl"
          height="100%"
          flex={1}
          mt={banner ? "2rem" : "6rem"}
          p={0}
          zIndex={5}
        >
          <Outlet />
        </Container>
        <Footer />
      </UserDataProvider>
    </>
  );
}

function MiniBackground({ miniBackground }: { miniBackground: string }) {
  return (
    <>
      <Box
        zIndex={-1}
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
          bgGradient="linear(to bottom,  #ff000000, #131930)"
        />
        <Box
          zIndex={1}
          position="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
          filter="blur(15px)"
          backgroundSize="cover"
          backgroundImage={miniBackground}
        />
      </Box>
    </>
  );
}
