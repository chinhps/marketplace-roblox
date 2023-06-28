import ModelLogout from "@/components/global/Model/ModelLogout";
import { useUserData } from "@/hooks/UserDataProvider";
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
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment/moment";

export default function Profile() {
  const userData = useUserData();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ModelLogout isOpen={isOpen} onClose={onClose} />
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
              <Td color="ocean.200">{userData?.data?.data.name}</Td>
            </Tr>
            <Tr>
              <Td>Số dư</Td>
              <Td color="ocean.200">
                {numberFormat(userData?.data?.data.price ?? 0)}
              </Td>
            </Tr>
            <Tr>
              <Td>Ngày Tham Gia</Td>
              <Td>
                {moment(userData?.data?.data.created_at).format("MM/DD/YYYY")}
              </Td>
            </Tr>
            <Tr>
              <Td>Thoát</Td>
              <Td>
                <Button variant="black" rounded="md" onClick={onOpen}>
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
