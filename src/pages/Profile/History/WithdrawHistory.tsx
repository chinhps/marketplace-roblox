import profileApi from "@/apis/profile";
import { token } from "@/utils/const";
import { colorStatus, nameStatus, numberFormat } from "@/utils/price";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

export default function WithdrawHistory() {
  /****----------------
   *      HOOK
  ----------------****/
  const dataQuery = useQuery({
    queryKey: ["purchase-history"],
    queryFn: () => profileApi.historyWithdraw(),
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
            Lịch sử rút và mua Robux
          </Heading>
          <Text mb={2} fontSize="sm">
            Lịch sử rút và mua Robux của tài khoản
          </Text>
          <Divider />
        </Box>
        <TableContainer>
          <Table>
            <TableCaption>Lịch sử rút và mua Robux</TableCaption>
            <Thead>
              <Tr>
                <Th>Mã Đơn</Th>
                <Th>Loại</Th>
                <Th>Số Robux</Th>
                <Th>Thông tin</Th>
                <Th>Thời Gian</Th>
                <Th>Trạng thái</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataQuery?.data?.data.data.map((vl, index) => (
                <Tr key={index}>
                  <Td>
                    <Text as="b" lineHeight={2}>
                      #{vl.id}
                    </Text>
                  </Td>
                  <Td>
                    <Text
                      as="b"
                      lineHeight={2}
                      color={vl.withdraw_type == "DIAMOND" ? "green" : "yellow"}
                    >
                      {vl.withdraw_type}
                    </Text>
                  </Td>
                  <Td>
                    <Text lineHeight={2}>{numberFormat(vl.value, false)}</Text>
                  </Td>
                  <Td>
                    {vl.detail.map((dt, index) => (
                      <Text key={index} lineHeight={2}>
                        {dt.name}: {dt.value}
                      </Text>
                    ))}
                  </Td>
                  <Td>
                    <Text lineHeight={2}>
                      {moment(vl.created_at).format("DD/MM/yyyy hh:mm")}
                    </Text>
                  </Td>
                  <Td>
                    <Text
                      as="b"
                      fontSize="sm"
                      color={colorStatus(vl.status)}
                      lineHeight={2}
                    >
                      {nameStatus(vl.status)}
                    </Text>
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
