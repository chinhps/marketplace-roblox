import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Icon,
  Img,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { FiChevronRight, FiGift } from "react-icons/fi";
import Skeleton from "../Skeleton/Skeleton";
import { IAccountService } from "@/types/response/service.type";
import { numberFormat } from "@/utils/price";
import Tag from "../Tag/Tag";

export default function Account({ data }: { data: IAccountService }) {
  return (
    <>
      <Flex
        position="relative"
        color="white.100"
        as="section"
        boxSizing="border-box"
        flexDirection="column"
        justifyContent="space-between"
        bg="main.item"
        // minH="400px"
        borderRadius="3px"
        overflow="hidden"
        shadow="base"
        border="solid .1px"
        borderColor="main.item"
        transition=".5s"
        _hover={{
          border: "solid .1px",
          borderColor: "ocean.100",
          shadow: "md",
        }}
      >
        <Flex position="absolute" top=".5rem" left=".5rem" gap="6px" flexDirection="column">
          <Tag value={"MS " + data.id} />
          <Tag bgColor="ocean.100" value={data.sale + "%"} />
        </Flex>
        <Box as="figure" height="170px" overflow="hidden">
          <Img
            src={data.thumb}
            transition=".3s"
            alt="hihi"
            _hover={{ transform: "scale(1.02)" }}
          />
        </Box>
        <Flex py={3} px={4} gap={2} alignItems="center" overflow="hidden">
          <Icon as={FiGift} color="red.500" fontSize="18px" />
          <Text
            fontSize=".85rem"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {data.note}
          </Text>
        </Flex>
        <Box as="header">
          <Divider borderColor="ocean.300" />
          <List px={3} py={2} fontSize=".85rem">
            {data.detail.map((detail) => (
              <ListItem key={detail.key}>
                <ListIcon as={FiChevronRight} color="green.500" />
                <Text as="b">{detail.name}:</Text> {detail.value}
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider borderColor="ocean.300" />
        <Box as="section" textAlign="center" py={2}>
          <Text fontWeight="bold" fontSize="18px" color="red.400">
            {numberFormat(data.price)}
          </Text>
        </Box>
        <Box as="footer">
          <Button
            // leftIcon={<FiShoppingCart />}
            py="1.4rem"
            w="100%"
            borderRadius={0}
            bg="ocean.100"
            color="black.100"
            fontWeight="bold"
            textTransform="uppercase"
          >
            <Text className="showText">Mua ngay</Text>
          </Button>
        </Box>
      </Flex>
    </>
  );
}

Account.loading = function () {
  return (
    <>
      <Flex
        color="white.100"
        as="section"
        boxSizing="border-box"
        flexDirection="column"
        justifyContent="space-between"
        bg="main.item"
        minH="400px"
        borderRadius="3px"
        overflow="hidden"
        shadow="base"
        border="solid .1px"
        borderColor="main.item"
        transition=".5s"
        _hover={{
          border: "solid .1px",
          borderColor: "ocean.100",
          shadow: "md",
        }}
      >
        <Box as="figure" height="170px" overflow="hidden">
          <Skeleton />
        </Box>
        <Box as="header">
          <Flex py={3} px={4} gap={2} alignItems="center">
            <Skeleton height="15px" w="100%" />
          </Flex>
          <Divider />
          <List px={3} py={2} spacing={3} fontSize=".85rem">
            {new Array(3).fill(0).map((_, index) => (
              <ListItem key={index} display="flex">
                <ListIcon as={FiChevronRight} color="green.500" />
                <Skeleton height="15px" w="90%" />
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider borderColor="gray.100" />
        <Center as="section" py={2}>
          <Skeleton height="30px" w="50%" />
        </Center>
        <Box as="footer">
          <Skeleton height="45px" w="100%" />
        </Box>
      </Flex>
    </>
  );
};
