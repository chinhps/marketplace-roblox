import { Box, Button, Center, VStack, Divider, Text } from "@chakra-ui/react";
import moment from "moment";

export interface IGiftListProps {
  alertGift: string;
}

export default function GiftList({ alertGift }: IGiftListProps) {
  return (
    <>
      <Center>
        <Box dangerouslySetInnerHTML={{ __html: alertGift }} />
      </Center>
      <VStack spacing={3}>
        <Divider w="70%" mx="auto" />
        <Button variant="rechargeNow" className="changeColor">
          <Text className="showText">
            Top nạp thẻ tháng {moment().subtract("1", "month").get("month") + 1}
          </Text>
        </Button>
      </VStack>
    </>
  );
}
