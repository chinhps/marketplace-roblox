import { IServiceListResponse } from "@/types/response/service.type";
import { link_service } from "@/utils/links";
import { numberFormat } from "@/utils/price";
import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Img,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Tag from "../Tag/Tag";
import { FiCreditCard, FiLogIn } from "react-icons/fi";
import Skeleton from "../Skeleton/Skeleton";

export default function ServiceV2({ data }: { data: IServiceListResponse }) {
  return (
    <>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        as="section"
        bg="main.item"
        color="white.100"
        height="370px"
        rounded="md"
        overflow="hidden"
      >
        <Box position="relative" height="50%" overflow="hidden">
          <Link to={link_service(data.gameType).link + data.slug}>
            <Flex
              left={0}
              right={0}
              position="absolute"
              justifyContent="space-between"
              alignItems="flex-start"
              p="1rem"
              zIndex={3}
            >
              <VStack>
                <Tag value="Mới" />
                <Tag fontWeight="bold" value="50%" bg="red" />
              </VStack>
              <HStack>
                <Icon as={FiCreditCard} />
                <Icon as={FiLogIn} />
              </HStack>
            </Flex>
            <Box
              position="absolute"
              inset={0}
              bottom="30%"
              bgGradient="linear(to top,  #00000000, black 100%)"
            />
            <Img src={data.thumb} w="100%" h="100%" objectFit="cover" />
          </Link>
        </Box>
        <Flex
          height="50%"
          flexDirection="column"
          px="1.7rem"
          py="1rem"
          gap={2}
          justifyContent="space-between"
        >
          <Heading
            as="h1"
            fontSize={{ base: "13px", md: "15px" }}
            textAlign="center"
            className="showText"
          >
            {data.name}
          </Heading>
          <Box mx="auto">
            <Tag rounded="full" text="Lượt sử dụng:" value={10000} />
          </Box>
          <Divider borderColor="gray.600" mx="auto" w="85%" />
          <Flex justifyContent="space-between">
            <ServiceV2Item type="NEW" text="Hiện tại" price={data.price} />
            <ServiceV2Item type="OLD" text="Gốc" price={data.price * 2} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

function ServiceV2Item({
  type,
  text,
  price,
}: {
  type: "NEW" | "OLD";
  text: string;
  price: number;
}) {
  return (
    <VStack align="inherit" spacing={0}>
      <Text fontStyle="italic" color="gray.400" fontSize="13px">
        {text}
      </Text>
      {type === "NEW" ? (
        <Text fontSize="17px" as="b">
          {numberFormat(price)}
        </Text>
      ) : (
        <Text fontSize="17px" textDecoration="line-through" color="gray.400">
          {numberFormat(price)}
        </Text>
      )}
    </VStack>
  );
}

ServiceV2.loading = () => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      as="section"
      bg="main.item"
      color="white.100"
      height="370px"
      rounded="md"
      overflow="hidden"
    >
      <Box position="relative" height="50%" overflow="hidden">
        <Box
          position="absolute"
          inset={0}
          bottom="30%"
          bgGradient="linear(to top,  #00000000, black 100%)"
        />
        <Skeleton />
      </Box>
      <Flex
        height="50%"
        flexDirection="column"
        px="1.7rem"
        py="1rem"
        justifyContent="space-between"
      >
        <Center as="header" flexDirection="column" gap={1}>
          <Skeleton height="15px" w={{ base: "120px", md: "200px" }} />
          <Skeleton height="15px" w="100px" />
        </Center>
        <Box mx="auto">
          <Skeleton height="15px" w="150px" />
        </Box>
        <Divider borderColor="gray.600" mx="auto" w="85%" />
        <Flex justifyContent="space-between">
          <Skeleton height="25px" w="85px" />
          <Skeleton height="25px" w="85px" />
        </Flex>
      </Flex>
    </Flex>
  );
};
