import rechargeApi from "@/apis/recharge";
import { ITopRechargeItem } from "@/types/response/recharge.type";
import { numberFormat } from "@/utils/price";
import {
  Flex,
  Box,
  Text,
  Divider,
  Button,
  Icon,
  VStack,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FiAward, FiOctagon } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function TopRecharge() {
  const topRechargeQuery = useQuery({
    queryKey: ["top-recharge"],
    queryFn: () => rechargeApi.topRecharge("present"),
    retry: false,
    cacheTime: 120000,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Flex
        as="ul"
        listStyleType="none"
        flexDirection="column"
        height="100%"
        justifyContent="flex-start"
        gap={3}
      >
        {topRechargeQuery.isLoading && (
          <Center height="100%">
            <Spinner />
          </Center>
        )}
        {topRechargeQuery.data?.data.data.map((user, index) => (
          <TopRechargeItem
            key={index + 1}
            name={user.name}
            price={user.price}
            stt={index + 1}
          />
        ))}
        {topRechargeQuery.data?.data.data.length === 0 ? (
          <Center height="100%">Chưa có ai đứng top</Center>
        ) : null}
      </Flex>
      <VStack spacing={3}>
        <Divider w="70%" mx="auto" borderColor="main.item3" />
        <Link to="/profile/recharge" style={{ width: "100%" }}>
          <Button variant="rechargeNow" className="changeColor">
            NẠP THẺ NGAY
          </Button>
        </Link>
      </VStack>
    </>
  );
}

export function TopRechargeItem({ stt, name, price }: ITopRechargeItem) {
  return (
    <Flex justifyContent="space-between" as="li">
      <Flex w="60%" gap=".5rem" alignItems="center">
        <Box position="relative" height="100%">
          {stt !== 1 ? (
            <>
              <Icon
                height="100%"
                as={FiOctagon}
                fontSize="30px"
                color={
                  stt === 2
                    ? "ocean.100"
                    : stt === 3
                    ? "yellow.500"
                    : "green.500"
                }
              />
              <Text
                position="absolute"
                top={0}
                left={0}
                right={0}
                textAlign="center"
                bottom={0}
                lineHeight={2.5}
                fontWeight="600"
              >
                {stt}
              </Text>
            </>
          ) : (
            <Icon height="100%" as={FiAward} fontSize="30px" color="red.400" />
          )}
        </Box>
        <Text
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          fontWeight="500"
        >
          {name}
        </Text>
      </Flex>
      <Box
        bg="main.item2"
        rounded="4px"
        w="130px"
        py=".5rem"
        my="auto"
        color="var(--color-text-price-top-recharge)"
        textAlign="center"
        fontWeight="bold"
      >
        {numberFormat(price)}
      </Box>
    </Flex>
  );
}
