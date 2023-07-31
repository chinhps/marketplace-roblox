import profileApi from "@/apis/profile";
import { IHistoryGame, Links, Meta } from "@/types/response.type";
import { token } from "@/utils/const";
import { numberFormat } from "@/utils/price";
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
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

export default function GameHistory() {
  /****----------------
   *      HOOK
  ----------------****/
  const dataQuery = useQuery({
    queryKey: ["game-history"],
    queryFn: () => profileApi.historyService(),
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
            Lịch sử chơi Game
          </Heading>
          <Text mb={2} fontSize="sm">
            Lịch sử các game đã chơi của tài khoản
          </Text>
          <Divider />
        </Box>
        <TableContainer>
          <Table>
            <TableCaption>Lịch sử chơi Game</TableCaption>
            <Thead>
              <Tr>
                <Th>Thông tin</Th>
                <Th>Chi tiết</Th>
                <Th>Số lần quay</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataQuery?.data?.data.data.map((vl, index) => (
                <Tr key={index}>
                  <Td>
                    <Text as="b" lineHeight={2}>
                      {vl.service_name}
                    </Text>
                    <Text lineHeight={2}>
                      {moment(vl.created_at).format("DD/MM/yyyy hh:mm")}
                    </Text>
                  </Td>
                  <Td>
                    <VStack alignItems="left">
                      <>
                        <Text as="b" lineHeight={1.5}>
                          Quà: {vl.default}
                        </Text>
                      </>
                      <Text as="b" lineHeight={1} color="ocean.100">
                        Giá trị: {numberFormat(vl.price ?? 0)}
                      </Text>
                    </VStack>
                  </Td>
                  <Td>
                    <Text>{vl.quantity}</Text>
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
