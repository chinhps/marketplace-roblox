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

interface ITopRecharge {
  id: number;
  name: string;
  price: number;
}

export default function TopRecharge() {
  const data: Array<ITopRecharge> = [
    {
      id: 1,
      name: "pham haong chinhwerwerwerert",
      price: 60000000,
    },
    {
      id: 2,
      name: "hoang pahm werwerwe",
      price: 5300000,
    },
    {
      id: 3,
      name: "hoang pahm werwerwe",
      price: 430000,
    },
    {
      id: 4,
      name: "hoang pahm sdfsdfwer",
      price: 300000,
    },
    {
      id: 5,
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
        {data.map((user) => (
          <TopRechargeItem
            key={user.id}
            name={user.name}
            price={user.price}
            stt={user.id}
          />
        ))}
      </Flex>
      <VStack spacing={3}>
        <Divider w="70%" mx="auto" />
        <Alert status="warning">
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

interface ITopRechargeItem {
  stt: number;
  name: string;
  price: number;
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
        bg="ocean.50"
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
