import profileApi from "@/apis/profile";
import { token } from "@/utils/const";
import { numberFormat } from "@/utils/price";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
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
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function RechargeHistory() {
  /****----------------
   *      HOOK
  ----------------****/
  const dataQuery = useQuery({
    queryKey: ["recharge-history"],
    queryFn: () => profileApi.historyRecharge(),
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
            Lịch sử nạp thẻ
          </Heading>
          <Text mb={2} fontSize="sm">
            Lịch sử nạp thẻ của tài khoản
          </Text>
          <Divider />
        </Box>
        <TableContainer>
          <Table>
            <TableCaption>
              Lịch sử nạp thẻ (Thực nhận chưa tính khuyến mãi)
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Thẻ nạp</Th>
                <Th>Mã thẻ/Seri</Th>
                <Th>M.giá/T.nhận</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataQuery?.data?.data.data.map((vl, index) => (
                <Tr key={index}>
                  <Td>
                    <Text as="b" lineHeight={2}>
                      {vl.recharge_type}
                    </Text>
                    <Text lineHeight={2}>
                      {moment(vl.created_at).format("DD/MM/yyyy hh:mm")}
                    </Text>
                    <Text
                      as="b"
                      fontSize="sm"
                      color={
                        vl.status === "PENDING"
                          ? "gray"
                          : vl.status === "SUCCESS"
                          ? "green"
                          : "red"
                      }
                      lineHeight={2}
                    >
                      {vl.status}
                    </Text>
                  </Td>
                  <Td>
                    {vl.detail.map((dt, index) => (
                      <Text key={index} lineHeight={2}>
                        {dt.name}: <Text as="b">{dt.value}</Text>
                      </Text>
                    ))}
                  </Td>
                  <Td>
                    <VStack align="left">
                      <Flex alignItems="center">
                        <Icon as={FaChevronUp} w="10px" />
                        <Text as="b" lineHeight={2} ml={2}>
                          Gửi Thẻ:
                        </Text>
                        <Text ml={2}>{numberFormat(vl.price)}</Text>
                      </Flex>
                      <Flex alignItems="center">
                        <Icon as={FaChevronDown} w="10px" color="green" />
                        <Text as="b" lineHeight={2} ml={2}>
                          Nhận:
                        </Text>
                        <Text ml={2}>
                          {vl.status === "SUCCESS"
                            ? numberFormat(vl.price)
                            : numberFormat(0)}
                        </Text>
                      </Flex>
                      <Flex alignItems="center">
                        <Text as="b" lineHeight={2} ml={2}>
                          Hoàn tiền:
                        </Text>
                        <Text ml={2}>{vl.refund ? "Có" : "Không"}</Text>
                      </Flex>
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
