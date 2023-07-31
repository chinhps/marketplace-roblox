import ModelBase from "@/components/global/Model/ModelBase";
import {
  Box,
  Button,
  Center,
  VStack,
  Divider,
  Text,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import moment from "moment";
import { TopRechargeItem } from "./TopRecharge";
import { useQuery } from "@tanstack/react-query";
import rechargeApi from "@/apis/recharge";

export interface IGiftListProps {
  alertGift: string;
}

export default function GiftList({ alertGift }: IGiftListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const topRechargeQuery = useQuery({
    queryKey: ["top-recharge-last-month"],
    queryFn: () => rechargeApi.topRecharge("last-month"),
    retry: false,
    cacheTime: 120000,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <ModelBase
        isOpen={isOpen}
        onClose={onClose}
        TextData={
          <>
            <Flex
              as="ul"
              listStyleType="none"
              flexDirection="column"
              height="100%"
              justifyContent="flex-start"
              gap={3}
            >
              {topRechargeQuery.data?.data.data.length === 0 ? (
                <Text textAlign="center" fontWeight="bold" color="ocean.100" mb={5}>
                  Hiện không có ai đứng Top nạp tháng trước
                </Text>
              ) : (
                topRechargeQuery.data?.data.data.map((user, index) => (
                  <TopRechargeItem
                    key={index + 1}
                    name={user.name}
                    price={user.price}
                    stt={index + 1}
                  />
                ))
              )}
            </Flex>
            <Text textAlign="center" color="white" fontWeight="bold">
              Shop đã trao các phần thưởng tương ứng cho
              <Text as="span" color="green" mx={1}>
                5
              </Text>
              bạn đứng top cũng như
              <Text as="span" color="green" mx={1}>
                20
              </Text>
              bạn may mắn ngẫu nhiên đã nạp ít nhất
              <Text as="span" color="green" mx={1}>
                200k
              </Text>
              trong tháng. Cảm ơn các bạn đã ủng hộ shop ❤️
            </Text>
          </>
        }
        children={null}
      />
      <Center>
        <Box dangerouslySetInnerHTML={{ __html: alertGift }} />
      </Center>
      <VStack spacing={3}>
        <Divider w="70%" mx="auto" />
        <Button variant="rechargeNow" className="changeColor" onClick={onOpen}>
          <Text className="showText">
            Top nạp thẻ tháng {moment().subtract("1", "month").get("month") + 1}
          </Text>
        </Button>
      </VStack>
    </>
  );
}
