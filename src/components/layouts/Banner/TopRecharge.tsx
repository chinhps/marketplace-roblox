import { ITopRecharge, ITopRechargeItem } from "@/types/response/recharge";
import { numberFormat } from "@/utils/price";
import {
  Flex,
  Box,
  Text,
  Divider,
  Alert,
  AlertIcon,
  Button,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { FiAward, FiOctagon } from "react-icons/fi";

export default function TopRecharge() {
  const data: Array<ITopRecharge> = [
    {
      name: "pham haong chinhwerwerwerert",
      price: 60000000,
    },
    {
      name: "hoang pahm werwerwe",
      price: 5300000,
    },
    {
      name: "hoang pahm werwerwe",
      price: 430000,
    },
    {
      name: "hoang pahm sdfsdfwer",
      price: 300000,
    },
    {
      name: "hoang pahm dfghdg dfgdf",
      price: 20000,
    },
  ];

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
        {data.map((user, index) => (
          <TopRechargeItem
            key={index + 1}
            name={user.name}
            price={user.price}
            stt={index + 1}
          />
        ))}
      </Flex>
      <VStack spacing={3}>
        <Divider w="70%" mx="auto" />
        <Alert status="info" color="black.100">
          <AlertIcon />
          Đang có sự kiện: Phần thưởng người mới (Nhận ngay)
        </Alert>
        <Button variant="rechargeNow" className="changeColor">
          <Text className="showText"> NẠP THẺ NGAY</Text>
        </Button>
      </VStack>
    </>
  );
}

function TopRechargeItem({ stt, name, price }: ITopRechargeItem) {
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
        color="white.100"
        textAlign="center"
        fontWeight="bold"
      >
        {numberFormat(price)}
      </Box>
    </Flex>
  );
}
