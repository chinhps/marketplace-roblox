import { IServiceListResponse } from "@/types/response/service.type";
import { link_service } from "@/utils/links";
import {
  hiddenPriceByGameType,
  numberFormat,
  textCounterService,
} from "@/utils/price";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Img,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Tag from "../Tag/Tag";
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
        height={{ base: "275px", lg: "350px" }}
        rounded="md"
        overflow="hidden"
      >
        <Box
          position="relative"
          height={{ base: "40%", lg: "50%" }}
          overflow="hidden"
        >
          <Link
            to={
              data.gameType === "LINKTO"
                ? data.more.link_to ?? "./"
                : link_service(data.gameType).link + data.slug
            }
          >
            <Img
              src={data.thumb}
              alt={data.name}
              w="100%"
              h="100%"
              // objectFit="cover"
            />
          </Link>
        </Box>
        <Flex
          height={{ base: "60%", lg: "50%" }}
          flexDirection="column"
          px={{ base: "1rem", lg: "2rem" }}
          py="1rem"
          gap={2}
          justifyContent="space-between"
        >
          <Heading
            as="h1"
            fontSize={{ base: "13px", md: "15px" }}
            textAlign="center"
            className="showText"
            noOfLines={2}
          >
            {data.name}
          </Heading>
          <Box mx="auto">
            {data.gameType !== "LINKTO" ? (
              <Tag
                rounded="full"
                text={textCounterService(data.gameType)}
                value={numberFormat(data.counter, false)}
              />
            ) : null}
          </Box>
          <Divider borderColor="gray.600" mx="auto" w="85%" />
          <Flex justifyContent="space-between">
            {hiddenPriceByGameType(data.gameType) ? (
              <>
                <ServiceV2Item type="NEW" text="Hiện tại" price={data.price} />
                <ServiceV2Item type="OLD" text="Gốc" price={data.price * 2} />
              </>
            ) : (
              <Center w="100%">
                <Text className="break-word" noOfLines={2}>
                  {data.notification}
                </Text>
              </Center>
            )}
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
        <Text fontSize={{ base: "15px", lg: "17px" }} as="b">
          {numberFormat(price)}
        </Text>
      ) : (
        <Text
          fontSize={{ base: "15px", lg: "17px" }}
          textDecoration="line-through"
          color="gray.400"
        >
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
