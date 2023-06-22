import { IInfoUserResponse } from "@/types/response/auth.type";
import { numberFormat } from "@/utils/price";
import {
  Button,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment/moment";

export default function Profile() {
  const queryClient = useQueryClient();
  const queryState = queryClient.getQueryState<IInfoUserResponse>(["user"]);

  return (
    <>
      <Heading as="h1" fontSize="25px">
        Thông tin tài khoản
      </Heading>
      <TableContainer mt={5}>
        <Table>
          <TableCaption>Thông tin cơ bản về tài khoản</TableCaption>
          <Thead>
            <Tr>
              <Th>Thông tin</Th>
              <Th>Hiện tại</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Tên Hiển Thị</Td>
              <Td color="ocean.200">{queryState?.data?.data.name}</Td>
            </Tr>
            <Tr>
              <Td>Số dư</Td>
              <Td color="ocean.200">
                {numberFormat(queryState?.data?.data.price ?? 0)}
              </Td>
            </Tr>
            <Tr>
              <Td>Ngày Tham Gia</Td>
              <Td>
                {moment(queryState?.data?.data.created_at).format("MM/DD/YYYY")}
              </Td>
            </Tr>
            <Tr>
              <Td>Thoát</Td>
              <Td>
                <Button variant="black" rounded="md">
                  Đăng xuất
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
