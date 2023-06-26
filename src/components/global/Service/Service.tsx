import { ServicePriceProps } from "@/types/service.type";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Skeleton from "../Skeleton/Skeleton";
import { IServiceListResponse } from "@/types/response/service.type";
import { numberFormat } from "@/utils/price";
import { Link } from "react-router-dom";
import { link_service } from "@/utils/links";

export default function Service({ data }: { data: IServiceListResponse }) {
  return (
    <Box
      as="section"
      height="400px"
      position="relative"
      shadow="base"
      borderRadius="5px"
      overflow="hidden"
      transition="0.5s"
      _hover={{
        shadow: "md",
      }}
    >
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        bg="white.500"
        height="100%"
      >
        <Box as="figure" height="50%" overflow="hidden">
          <Link to={link_service(data.gameType).link + data.slug}>
            <Image src={data.thumb} alt={data.name + "by chinh.dev"} />
          </Link>
        </Box>
        <VStack my="1rem" spacing={2}>
          <Box as="header">
            <Heading
              as="h1"
              fontSize={{ base: "13px", md: "15px" }}
              textAlign="center"
              className="showText"
            >
              {data.name}
            </Heading>
          </Box>
          <Box>
            <Text color="gray.600" fontSize="13px">
              {data.counterText !== "AUTO"
                ? data.counterText
                : "Lượt sử dụng: "}
              {data.counter}
            </Text>
          </Box>
          <Flex
            as="section"
            flexDirection={{ base: "column", md: "row" }}
            gap={{ base: 1, md: 2 }}
          >
            <ServicePrice borderColor="gray.400" textColor="gray.500" textDecoration="line-through">
              {numberFormat(data.price * 2)}
            </ServicePrice>
            <ServicePrice borderColor="ocean.100" textColor="ocean.200" m={0}>
              {numberFormat(data.price)}
            </ServicePrice>
          </Flex>
          <Box as="footer">
            <Link to={link_service(data.gameType).link + data.slug}>
              <Button variant="serviceBtn">
                {link_service(data.gameType).textBtn}
              </Button>
            </Link>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
}

function ServicePrice({ children, ...props }: ServicePriceProps) {
  return (
    <Box
      border="1px"
      w="100px"
      textAlign="center"
      py=".3rem"
      borderRadius="5px"
      fontWeight="500"
      {...props}
    >
      {children}
    </Box>
  );
}

Service.loading = () => {
  return (
    <Box
      as="section"
      height="400px"
      position="relative"
      shadow="base"
      borderRadius="5px"
      overflow="hidden"
      transition="0.5s"
      _hover={{
        shadow: "md",
      }}
    >
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        bg="white.500"
        height="100%"
      >
        <Box as="figure" height="50%" overflow="hidden">
          <Skeleton />
        </Box>
        <VStack my="1rem" spacing={2}>
          <Center as="header" flexDirection="column" gap={1}>
            <Skeleton height="10px" w={{ base: "120px", md: "200px" }} />
            <Skeleton height="10px" w="100px" />
          </Center>
          <Box>
            <Skeleton height="10px" w="130px" />
          </Box>
          <Flex
            as="section"
            flexDirection={{ base: "column", md: "row" }}
            gap={{ base: 1, md: 2 }}
          >
            <Skeleton height="35px" w="100px" />
            <Skeleton height="35px" w="100px" />
          </Flex>
          <Box as="footer">
            <Skeleton height="40px" w="140px" />
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};
