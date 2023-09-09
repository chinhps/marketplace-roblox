import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import TableCustom from "@/components/globals/TableCustom";
import { numberFormat } from "@/utils/function";
import { Badge, Button, Td, Text, Tr } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function RandomListPage() {
  return (
    <>
      <CardCollection
        title="Quản lý Random"
        fontSize="25px"
        button={
          <Link to="./create">
            <Button colorScheme="red" variant="outline">
              Đăng tài khoản
            </Button>
          </Link>
        }
      >
        <Text>Quản lý Random</Text>
        <TableCustom
          thead={[
            "ID",
            "Tên dịch vụ",
            "Thông tin(Private)",
            "Trạng thái",
            "Giá",
            "Thao tác",
          ]}
        >
          {new Array(7).fill(0).map((vl, index) => (
            <Tr key={index}>
              <Td>#{index + 1}</Td>
              <Td>
                <Text>#ID: 43</Text>
                <Text>ADMIN: Dexter Murazik</Text>
                <Text>Tên DV: Nicholas Dibbert DVM</Text>
              </Td>
              <Td>123</Td>
              <Td>
                <Text>
                  Kích hoạt:
                  <Badge colorScheme="red" marginLeft="5px">
                    YES
                  </Badge>
                </Text>
                <Text>
                  Trạng thái:
                  <Badge colorScheme="green" marginLeft="5px">
                    Đã bán
                  </Badge>
                </Text>
              </Td>
              <Td>{numberFormat(100000)}</Td>
              <Td>
                <ActionList />
              </Td>
            </Tr>
          ))}
        </TableCustom>
      </CardCollection>
    </>
  );
}
