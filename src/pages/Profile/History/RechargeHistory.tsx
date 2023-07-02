import { IHistoryRecharge, Links, Meta } from "@/types/response.type";
import { numberFormat } from "@/utils/price";
import {
  Box,
  Center,
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
} from "@chakra-ui/react";

import moment from "moment";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type IDataResponse = {
  data: IHistoryRecharge[];
  links: Links;
  meta: Meta;
};

export default function RechargeHistory() {
  const histories: IDataResponse = {
    data: [
      {
        id: 8553,
        code: "56756756765556",
        serial: "56756756756756",
        cash: 10000,
        status_name: "Th\u1ea5t b\u1ea1i",
        status: false,
        type: "VIETTEL",
        created_at: "2023-02-06T16:36:51.000000Z",
      },
    ],
    links: {
      first: "https://api.anhbaphairoblox.vn/api/profile/recharge?page=1",
      last: "https://api.anhbaphairoblox.vn/api/profile/recharge?page=1",
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
          url: "https://api.anhbaphairoblox.vn/api/profile/recharge?page=1",
          label: "1",
          active: true,
        },
        { url: null, label: "Next &raquo;", active: false },
      ],
      path: "https://api.anhbaphairoblox.vn/api/profile/recharge",
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
              {histories?.data?.map((vl, index) => (
                <Tr key={index}>
                  <Td>
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
                        vl.status_name == "Chờ duyệt"
                          ? "gray"
                          : vl.status
                          ? "green"
                          : "red"
                      }
                      lineHeight={2}
                    >
                      {vl.status_name}
                    </Text>
                  </Td>
                  <Td>
                    <Text as="b" lineHeight={2}>
                      Mã thẻ: {vl.code}
                    </Text>
                    <Text lineHeight={2}>Seri: {vl.serial}</Text>
                  </Td>
                  <Td>
                    <Center justifyContent="left">
                      <Icon as={FaChevronUp} mr={2} w="10px" />
                      <Text lineHeight={2}>
                        Gửi Thẻ: {numberFormat(vl.cash)}
                      </Text>
                    </Center>

                    <Center justifyContent="left">
                      <Icon
                        as={FaChevronDown}
                        mr={2}
                        w="10px"
                        color="brand.500"
                      />
                      <Text lineHeight={2} color="brand.500">
                        Nhận:{" "}
                        {vl.status ? numberFormat(vl.cash) : numberFormat(0)}
                      </Text>
                    </Center>
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
