import ActionList from "@/components/globals/ActionList";
import CardCollection from "@/components/globals/CardCollection";
import TableCustom from "@/components/globals/TableCustom";
import { numberFormat } from "@/utils/function";
import { Badge, Td, Text, Tr } from "@chakra-ui/react";

export default function TopRechargeListPage() {
  return (
    <>
      <CardCollection title="Quản lý top nạp" fontSize="25px">
        <Text>
          Sử dụng bộ lọc để lọc theo domain. Khi lọc sẽ hiển thị theo thứ tự top
          nạp. Bình thường sẽ hiển thị những người mới nạp lớn nhất
        </Text>
        <TableCustom
          thead={[
            "ID",
            "Domain",
            "Tên hiển thị",
            "Số tiền",
            "Thời gian cập nhật",
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
              <Td>Cordia Volkman</Td>
              <Td>mohr.frieda</Td>
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
