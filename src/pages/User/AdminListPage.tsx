import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import TableCustom from "@/components/globals/TableCustom";
import { numberFormat } from "@/utils/function";
import { Badge, Td, Text, Tr } from "@chakra-ui/react";

export default function AdminListPage() {
  return (
    <>
      <CardCollection title="Quản lý Admin" fontSize="25px">
        <Text>Quản lý Admin</Text>
        <TableCustom
          thead={[
            "ID",
            "Provider ID",
            "ADMIN",
            "Đang treo",
            "Tên đăng nhập",
            "Tiền",
            "Trạng thái",
            "Thao tác",
          ]}
        >
          {new Array(7).fill(0).map((vl, index) => (
            <Tr key={index}>
              <Td>#{index + 1}</Td>
              <Td>
                <Text>ID USER: 8606835302</Text>
                <Text>
                  Domain:
                  <Badge colorScheme="red" marginLeft="5px">
                    chinh.dev
                  </Badge>
                </Text>
              </Td>
              <Td>KOC</Td>
              <Td>123</Td>
              <Td>leuschke.jacinthe</Td>
              <Td>{numberFormat(100000)}</Td>
              <Td>
                <Text>
                  Đã chặn:
                  <Badge colorScheme="green" marginLeft="5px">
                    Có
                  </Badge>
                </Text>
                <Text>
                  Kích hoạt:
                  <Badge colorScheme="green" marginLeft="5px">
                    Đã kích hoạt
                  </Badge>
                </Text>
              </Td>

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
