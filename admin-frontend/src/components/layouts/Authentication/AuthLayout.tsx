import { Flex, Img } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { useMemo } from "react";

export default function AuthLayout() {
  const memoizedOutlet = useMemo(() => <Outlet />, []); // <Outlet /> chỉ tính toán lại khi dependencies thay đổi

  return (
    <Flex
      flexDirection="column"
      backgroundRepeat="no-repeat"
      backgroundImage="/images/background.png"
      backgroundAttachment="fixed"
      backgroundSize="cover"
      height="100%"
      minH="100vh"
      position="relative"
      p={{ base: ".5rem", lg: "2rem" }}
    >
      <Flex justifyContent={{ base: "center", lg: "flex-start" }}>
        <Link to="/">
          <Img
            h={100}
            w={250}
            objectFit="contain"
            src={
              import.meta.env.VITE_APP_LOGO_URL ??
              "https://i.imgur.com/Owoq65A.png"
            }
            alt="logo"
          />
        </Link>
      </Flex>
      <Flex justifyContent="center">{memoizedOutlet}</Flex>
    </Flex>
  );
}
