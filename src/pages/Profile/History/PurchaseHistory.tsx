import profileApi from "@/apis/profile";
import { token } from "@/utils/const";
import { numberFormat } from "@/utils/price";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Text,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

export default function PurchaseHistory() {
  /****----------------
   *      HOOK
  ----------------****/
  const dataQuery = useQuery({
    queryKey: ["purchase-history"],
    queryFn: () => profileApi.historyPurchase(),
    retry: false,
    cacheTime: 120000,
    enabled: !!token(), // Only fetch data user when have token ,
    refetchOnWindowFocus: false,
  });
  /****----------------
   *      END-HOOK
  ----------------****/

  return (
    <>
      <Flex flexDirection="column" gap={5}>
        <Box>
          <Heading as="h1" fontSize="25px">
            Lịch sử mua tài khoản
          </Heading>
          <Text mb={2} fontSize="sm">
            Lịch sử mua tài khoản của tài khoản
          </Text>
          <Divider />
        </Box>
        <TableContainer>
          <Table>
            <TableCaption>Lịch sử mua tài khoản</TableCaption>
            <Thead>
              <Tr>
                <Th>Thông tin</Th>
                <Th>#ID</Th>
                <Th>Chi tiết</Th>
                <Th>Giá tiền</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataQuery?.data?.data.data.map((vl, index) => (
                <Tr key={index}>
                  <Td>
                    <Text as="b" lineHeight={2} color="ocean.100">
                      {vl.service_name}
                    </Text>
                    <Text lineHeight={2}>
                      {moment(vl.created_at).format("DD/MM/yyyy hh:mm")}
                    </Text>
                  </Td>
                  <Td>
                    <Text as="b" lineHeight={1}>
                      #ID: {vl.account_id}
                    </Text>
                  </Td>
                  <Td>
                    <VStack alignItems="left">
                      {vl.detail.map((dt, index) => (
                        <Text key={index} as="b" lineHeight={1.5}>
                          {dt.name}: {dt.value}
                        </Text>
                      ))}
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems="left">
                      <Text as="b" lineHeight={1} color="ocean.100">
                        Giá trị: {numberFormat(vl.price)}
                      </Text>
                      <Text as="b" lineHeight={1}>
                        Hoàn tiền: {vl.refund ? "Có" : "Không"}
                      </Text>
                    </VStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
}
