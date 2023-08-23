import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import TableCustom from "@/components/globals/TableCustom";
import { numberFormat } from "@/utils/function";
import { Badge, Td, Text, Tr } from "@chakra-ui/react";

export default function UserListPage() {
  return (
    <>
      <CardCollection title="Quản lý khách" fontSize="25px">
        <Text>Quản lý khách</Text>
        <TableCustom
          thead={[
            "ID",
            "Provider ID",
            "Tên",
            "Tiền(hiển thị)",
            "Trạng thái",
            "Ngày tạo",
            "Thao tác",
          ]}
        >
          {new Array(7).fill(0).map((vl, index) => (
            <Tr key={index}>
              <Td>#{index + 1}</Td>
              <Td>
                <Text>ID: 8606835302</Text>
                <Text>
                  Domain:
                  <Badge colorScheme="red" marginLeft="5px">
                    chinh.dev
                  </Badge>
                </Text>
              </Td>
              <Td>
                <Text>Tên hiển thị: Cordia Volkman</Text>
                <Text>
                  Tên đăng nhập:
                  <Badge colorScheme="purple" marginLeft="5px">
                    mohr.frieda
                  </Badge>
                </Text>
              </Td>
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
              <Td>234234234234</Td>
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
