import { Flex, Img } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <Flex
      flexDirection="column"
      backgroundRepeat="no-repeat"
      backgroundImage="/background.jpg"
      backgroundAttachment="fixed"
      backgroundSize="cover"
      height="100%"
      minH="100vh"
      position="relative"
      p={{ base: ".5rem", lg: "2rem" }}
    >
      <Flex justifyContent={{ base: "center", lg: "flex-start" }}>
        <Link to="/">
          <Img src="/logo.png" alt="logo" />
        </Link>
      </Flex>
      <Flex justifyContent="center">
        <Outlet />
      </Flex>
    </Flex>
  );
}
