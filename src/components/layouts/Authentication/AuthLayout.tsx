import { Flex, Img } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { useMemo } from "react";
import { useInformationShopData } from "@/hooks/InfomationShopProvider";
import Skeleton from "@/components/global/Skeleton/Skeleton";

export default function AuthLayout() {
  const memoizedOutlet = useMemo(() => <Outlet />, []); // <Outlet /> chỉ tính toán lại khi dependencies thay đổi
  const data = useInformationShopData();

  return (
    <Flex
      flexDirection="column"
      backgroundRepeat="no-repeat"
      backgroundImage={
        data?.data?.data.information.background_url || "/images/background.png"
      }
      backgroundAttachment="fixed"
      backgroundSize="cover"
      height="100%"
      minH="100vh"
      position="relative"
      p={{ base: ".5rem", lg: "2rem" }}
    >
      <Flex justifyContent={{ base: "center", lg: "flex-start" }}>
        <Link to="/">
          {data?.status === "loading" ? (
            <Skeleton w="300px" height="110px" rounded="lg" />
          ) : (
            <Img src={data?.data?.data.information.logo_url} alt="logo" />
          )}
        </Link>
      </Flex>
      <Flex justifyContent="center">{memoizedOutlet}</Flex>
    </Flex>
  );
}
