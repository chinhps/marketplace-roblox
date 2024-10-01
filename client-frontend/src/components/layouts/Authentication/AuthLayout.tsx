import { Flex, Img } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { useMemo } from "react";
import { useInformationShopData } from "@/hooks/InfomationShopProvider";
import Skeleton from "@/components/global/Skeleton/Skeleton";

export default function AuthLayout() {
  const memoizedOutlet = useMemo(() => <Outlet />, []);
  const data = useInformationShopData();

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
      <Flex justifyContent={{ base: "center", lg: "flex-start" }} my=".5rem">
        <Link to="/">
          {data?.status === "loading" ? (
            <Skeleton w="300px" height="110px" rounded="lg" />
          ) : (
            <Img w="175px" src={data?.data?.data.information.logo_url} alt="logo" />
          )}
        </Link>
      </Flex>
      <Flex justifyContent="center">{memoizedOutlet}</Flex>
    </Flex>
  );
}
