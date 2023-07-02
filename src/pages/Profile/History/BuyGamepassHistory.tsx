import { IHistoryBuyGamepass, Links, Meta } from "@/types/response.type";
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
  data: IHistoryBuyGamepass[];
  links: Links;
  meta: Meta;
};

export default function BuyGamepassHistory() {
  const histories: IDataResponse = {
    data: [
      {
        id: 380,
        name_product: "GIFT GAMEPASS BLOX FRUITS",
        type: "Yoru Blox Fruit (gamepass kh\u00f4ng b\u1ecf v\u00e0o r\u01b0\u01a1ng kho b\u00e1u Treasure Inventory)",
        status: 2,
        created_at: "2023-06-04T03:33:35.000000Z",
        user: "1111111111111111111",
        password: "111111111111111111",
        note: "testkhongduyet",
        cash: 200000,
        note_admin: null,
        status_name: "T\u1eeb ch\u1ed1i",
      },
    ],
    links: {
      first: "https://api.anhbaphairoblox.vn/api/profile/rent?page=1",
      last: "https://api.anhbaphairoblox.vn/api/profile/rent?page=1",
      prev: null,
      next: null,
    },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      links: [
        { url: null, label: "&laquo; Previous", active: false },
        {
          url: "https://api.anhbaphairoblox.vn/api/profile/rent?page=1",
          label: "1",
          active: true,
        },
        { url: null, label: "Next &raquo;", active: false },
      ],
      path: "https://api.anhbaphairoblox.vn/api/profile/rent",
      per_page: 6,
      to: 1,
      total: 1,
    },
  };

  return (
    <>
      <Flex flexDirection="column" gap={5}>
        <Box>
          <Heading as="h1" fontSize="25px">
            Lịch sử mua Gamepass
          </Heading>
          <Text mb={2} fontSize="sm">
            Lịch sử mua Gamepass của tài khoản
          </Text>
          <Divider />
        </Box>
        <TableContainer>
          <Table>
            <TableCaption>Lịch sử mua Gamepass </TableCaption>
            <Thead>
              <Tr>
                <Th>Thông tin</Th>
                <Th>Chi tiết</Th>
              </Tr>
            </Thead>
            <Tbody>
              {histories?.data?.map((vl, index) => (
                <Tr key={index}>
                  <Td>
                    <Text fontWeight="bold" lineHeight={2} color="red">
                      {vl.name_product}
                    </Text>
                    <Text as="b" lineHeight={2}>
                      {vl.type}
                    </Text>
                    <Text lineHeight={2}>
                      {moment(vl.created_at).format("DD/MM/yyyy hh:mm")}
                    </Text>
                    <Text
                      as="b"
                      fontSize="sm"
                      color={
                        vl.status == 3
                          ? "green"
                          : vl.status == 0 || vl.status == 1
                          ? "brand.500"
                          : "red"
                      }
                      lineHeight={2}
                    >
                      {vl.status_name}
                    </Text>
                    {vl.note_admin && (
                      <Text lineHeight={1.5}>
                        Ghi chú Admin: {vl.note_admin}
                      </Text>
                    )}
                  </Td>
                  <Td>
                    <VStack alignItems="left">
                      <>
                        <Text as="b" lineHeight={1.5}>
                          Tài khoản: {vl.user}
                        </Text>
                        <Text as="b" lineHeight={1.5}>
                          Mật khẩu: {vl.password}
                        </Text>
                        <Text lineHeight={1.5}>Ghi chú: {vl.note}</Text>
                      </>

                      <Text as="b" lineHeight={1} color="brand.500">
                        Giá trị: {numberFormat(vl.cash)}
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
