import { IHistoryRobux, Links, Meta } from "@/types/response.type";
import { colorStatus, numberFormat } from "@/utils/price";
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
import moment from "moment";

type IDataResponse = {
  data: IHistoryRobux[];
  links: Links;
  meta: Meta;
};

export default function RobuxHistory() {
  const histories: IDataResponse = {
    data: [
      {
        id: 4020,
        robux: 200,
        created_at: "2023-05-10T18:15:38.000000Z",
        updated_at: "2023-06-10T18:15:38.000000Z",
        status: 1,
        name_withdraw: "120h",
        status_name: "Th\u1ea5t b\u1ea1i",
        type_withdraw: "Mua",
      },
    ],
    links: {
      first: "https://api.anhbaphairoblox.vn/api/profile/withdraws?page=1",
      last: "https://api.anhbaphairoblox.vn/api/profile/withdraws?page=1",
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
          url: "https://api.anhbaphairoblox.vn/api/profile/withdraws?page=1",
          label: "1",
          active: true,
        },
        { url: null, label: "Next &raquo;", active: false },
      ],
      path: "https://api.anhbaphairoblox.vn/api/profile/withdraws",
      per_page: 10,
      to: 1,
      total: 1,
    },
  };

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
          <Table variant="simple">
            <TableCaption>Lịch sử rút và mua Robux</TableCaption>
            <Thead>
              <Tr>
                <Th>Mã Đơn</Th>
                <Th>Loại</Th>
                <Th>Số Robux</Th>
                <Th>Thời Gian</Th>
                <Th>Thời duyệt robux</Th>
                <Th>Trạng thái</Th>
              </Tr>
            </Thead>
            <Tbody>
              {histories?.data?.map((vl, index) => (
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
                      color={vl.type_withdraw == "Rút" ? "green" : "ocean.100"}
                    >
                      {vl.type_withdraw} {vl.name_withdraw}
                    </Text>
                  </Td>
                  <Td>
                    <Text lineHeight={2}>{numberFormat(vl.robux, false)}</Text>
                  </Td>
                  <Td>
                    <Text lineHeight={2}>
                      {moment(vl.created_at).format("DD/MM/yyyy hh:mm")}
                    </Text>
                  </Td>
                  <Td>
                    <Text as="b" lineHeight={2} color={colorStatus(vl.status)}>
                      {vl.created_at !== vl.updated_at
                        ? moment(vl.updated_at).format("DD/MM/yyyy hh:mm")
                        : "Chưa duyệt"}
                    </Text>
                  </Td>
                  <Td>
                    <Text
                      as="b"
                      fontSize="sm"
                      color={colorStatus(vl.status)}
                      lineHeight={2}
                    >
                      {vl.status_name}
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
