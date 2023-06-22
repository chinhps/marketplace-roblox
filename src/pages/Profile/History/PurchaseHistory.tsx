import { IHistoryPurchase, Links, Meta } from "@/types/response.type";
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
import moment from "moment";

type IDataResponse = {
  data: IHistoryPurchase[];
  links: Links;
  meta: Meta;
};

export default function PurchaseHistory() {
  const histories: IDataResponse = {
    data: [
      {
        id: 22469,
        id_account: 37840,
        user: "abc",
        account: true,
        password: "wer",
        created_at: "2023-06-03T04:04:13.000000Z",
        cash: 129000,
        type: "ACC MAXLEVEL - GODHUMAN - SOUL GUITAR",
      },
      {
        id: 22468,
        id_account: 37841,
        user: "werwe",
        account: true,
        password: "wer",
        created_at: "2023-06-03T04:04:02.000000Z",
        cash: 19000,
        type: "TH\u01af\u0309 V\u00c2\u0323N MAY BLOX FRUITS 19K",
      },
    ],
    links: {
      first: "https://api.anhbaphairoblox.vn/api/profile/buy?page=1",
      last: "https://api.anhbaphairoblox.vn/api/profile/buy?page=1",
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
          url: "https://api.anhbaphairoblox.vn/api/profile/buy?page=1",
          label: "1",
          active: true,
        },
        { url: null, label: "Next &raquo;", active: false },
      ],
      path: "https://api.anhbaphairoblox.vn/api/profile/buy",
      per_page: 5,
      to: 2,
      total: 2,
    },
  };

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
          <Table variant="simple">
            <TableCaption>Lịch sử mua tài khoản</TableCaption>
            <Thead>
              <Tr>
                <Th>Thông tin</Th>
                <Th>#ID</Th>
                <Th>Chi tiết</Th>
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
                    <Text as="b" lineHeight={1}>#ID: {vl.id_account}</Text>
                  </Td>
                  <Td>
                    <VStack alignItems="left">
                      {vl.account ? (
                        <>
                          <Text as="b" lineHeight={1.5}>
                            Tài khoản: {vl.user}
                          </Text>
                          <Text as="b" lineHeight={1.5}>
                            Mật khẩu: {vl.password}
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text as="b" lineHeight={1.5}>
                            Quà: {vl.user}
                          </Text>
                        </>
                      )}
                      <Text as="b" lineHeight={1} color="ocean.100">
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
