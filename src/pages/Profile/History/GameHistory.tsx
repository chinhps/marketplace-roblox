import { IHistoryGame, Links, Meta } from "@/types/response.type";
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
import moment from "moment";

type IDataResponse = {
  data: IHistoryGame[];
  links: Links;
  meta: Meta;
};

export default function GameHistory() {
  const histories: IDataResponse = {
    data: [
      {
        description: "Tr\u00fang 40 Roblox",
        type: "Game \u0111\u00e3 b\u1ecb x\u00f3a",
        created_at: "2023-06-04T03:33:35.000000Z",
        count: 1,
        cash: null,
      },
    ],
    links: { first: "/?page=1", last: "/?page=1", prev: null, next: null },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      links: [
        { url: null, label: "&laquo; Previous", active: false },
        { url: "/?page=1", label: "1", active: true },
        { url: null, label: "Next &raquo;", active: false },
      ],
      path: "/",
      per_page: 5,
      to: 1,
      total: 1,
    },
  };

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
          <Table variant="simple">
            <TableCaption>Lịch sử chơi Game</TableCaption>
            <Thead>
              <Tr>
                <Th>Thông tin</Th>
                <Th>Chi tiết</Th>
                <Th>Số lần quay</Th>
              </Tr>
            </Thead>
            <Tbody>
              {histories?.data?.map((vl, index) => (
                <Tr key={index}>
                  <Td>
                    <Text as="b" lineHeight={2}>
                      {vl.type}
                    </Text>
                    <Text lineHeight={2}>
                      {moment(vl.created_at).format("DD/MM/yyyy hh:mm")}
                    </Text>
                  </Td>
                  <Td>
                    <VStack alignItems="left">
                      <>
                        <Text as="b" lineHeight={1.5}>
                          Quà: {vl.description}
                        </Text>
                      </>
                      <Text as="b" lineHeight={1} color="ocean.100">
                        Giá trị: {numberFormat(vl.cash ?? 0)}
                      </Text>
                    </VStack>
                  </Td>
                  <Td>
                    <Text>{vl.count}</Text>
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
